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

import { PassThrough } from 'node:stream'

import { CSVStream } from '../../../skripte/utility/CSVStream'

describe('CSVStream', () => {
  it('closing it directly yields empty stream', () => {
    const stream: any = new PassThrough()
    stream.on('data', (_: any) => {
      expect(true).toBe(false)
    })
    stream.on('end', () => {
      expect(true).toBe(true)
    })
    const csv = CSVStream(stream, [])
    csv.end()
  })

  it("adding rows add's chunks called", () => {
    const stream: any = new PassThrough()
    stream.on('data', (chunk: any) => {
      expect(chunk.toString()).toBe('"1","2","3"\n')
    })
    stream.on('end', () => {
      expect(true).toBe(true)
    })
    const csv = CSVStream(stream, ['a', 'b', 'c'])
    csv.addRow({
      a: '1',
      b: '2',
      c: '3',
    })
    csv.end()
  })

  it('delimiter and new row can be configured', () => {
    const stream: any = new PassThrough()
    stream.on('data', (chunk: any) => {
      expect(chunk.toString()).toBe('"1"$"2"$"3"\t')
    })
    stream.on('end', () => {
      expect(true).toBe(true)
    })
    const csv = CSVStream(stream, ['a', 'b', 'c'], {
      delimiter: '$',
      rowEnd: '\t',
    })
    csv.addRow({
      a: '1',
      b: '2',
      c: '3',
    })
    csv.end()
  })

  it('escapes csv specifics', () => {
    const stream: any = new PassThrough()
    stream.on('data', (chunk: any) => {
      expect(chunk.toString()).toBe('""""," ","3 6"\n')
    })
    const csv = CSVStream(stream, ['a', 'b', 'c'])
    csv.addRow({
      a: '"',
      b: '\n',
      c: '3     6',
    })
    csv.end()
  })
})
