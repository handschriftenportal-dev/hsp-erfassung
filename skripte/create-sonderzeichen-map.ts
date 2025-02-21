/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { fetch, ProxyAgent, setGlobalDispatcher } from 'undici'

import { SonderzeichenListen } from '../src/domain/sonderzeichen/data/SonderzeichenListen'
import { SonderzeichenAPI } from '../src/domain/sonderzeichen/SonderzeichenAPI'
import { SkriptExport } from './utility/SkriptExport'

const FILE_NAME = 'SonderzeichenMap.ts'
const REQUESTS_PER_MINUTE = 50

type CodePointInformation = {
  character: string
  name: string
  codepoint: string
  block: string
  plane: string
  age: string
  generalCategory: string
  combiningClass: string
}

const NOT_COMBINED_CLASS = 'Not Reordered'

function sleep(seconds: number) {
  const ms = seconds * 1000
  return () => new Promise((resolve) => setTimeout(resolve, ms))
}

const sleeper = sleep(60 / REQUESTS_PER_MINUTE)

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (_error) {
    return false
  }
}

function setup() {
  const proxy = process.argv[2] ?? process.env['https_proxy']
  if (proxy === undefined || !isValidUrl(proxy)) {
    console.log('Fetch without proxy')
  } else {
    console.log(`Using proxy ${proxy}`)
    const proxyAgent = new ProxyAgent(proxy)
    setGlobalDispatcher(proxyAgent)
  }
}

async function fetchCodepointInformation(
  key: string
): Promise<CodePointInformation | undefined> {
  await sleeper()
  const url = `https://unicode-api.aaronluna.dev/v1/codepoints/${key}?show_props=Basic`
  try {
    const response = await fetch(url)
    const result = (await response.json()) as CodePointInformation
    if ('codepoint' in result) {
      return Promise.resolve(result)
    }
    console.warn(result)
  } catch (e) {
    console.warn(`failed to fetch ${url}`, e)
  }
  return Promise.resolve(undefined)
}

function description(info: CodePointInformation): string {
  const description = info.name
  if (
    description.startsWith('<') &&
    description.endsWith('>') &&
    SonderzeichenAPI.isKnown(info.codepoint)
  ) {
    return SonderzeichenAPI.getSonderzeichen(info.codepoint).description
  }
  return info.name
}

function codepoint(info: CodePointInformation): string {
  return info.codepoint.slice(2)
}

function sign(info: CodePointInformation): string {
  const cp = codepoint(info)
  return info.combiningClass.startsWith(NOT_COMBINED_CLASS)
    ? `\\u{${cp}}`
    : `\\u{25CC}\\u{${cp}}`
}

function infoToString(info: CodePointInformation): string {
  return `  '${info.codepoint}': {
    codepoint: 0x${codepoint(info)},
    sign: '${sign(info)}',
    description: '${description(info)}',
  },\n`
}

function escapedString(s: string): string {
  return [...s]
    .map(
      (char) =>
        `\\u{${char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}}`
    )
    .join('')
}

function entryFromKnownSonderzeichen(key: string): string {
  const sonderzeichen = SonderzeichenAPI.getSonderzeichen(key)
  return `  '${key}': {
    codepoint: 0x${key.slice(2)},
    sign: '${escapedString(sonderzeichen.sign)}',
    description: '${sonderzeichen.description}',
  },\n`
}

async function keyToEntry(key: string): Promise<string> {
  if (
    SonderzeichenAPI.isKnown(key) &&
    SonderzeichenAPI.getSonderzeichen(key).description !== ''
  ) {
    return Promise.resolve(entryFromKnownSonderzeichen(key))
  }
  const info = await fetchCodepointInformation(key)
  if (!info) {
    return Promise.resolve('')
  }
  return Promise.resolve(infoToString(info))
}

async function run(file: string) {
  const stream = SkriptExport.writeStream(file, { writeBOM: true })
  stream.write(
    'export const SonderzeichenMap: Record<string, Sonderzeichen> = {\n'
  )
  stream.write(await keyToEntry('U+FFFD'))

  for (const key of SonderzeichenListen.gesamt) {
    const entry = await keyToEntry(key)
    stream.write(entry)
  }
  stream.write('}')
  stream.end()
}

setup()
void run(FILE_NAME)
