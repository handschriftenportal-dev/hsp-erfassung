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

import { AxiosHeader } from '../../src/infrastructure/AxiosHeader'

describe('Creating Axios Headers', () => {
  test('generic creation fallsback to xml', () => {
    expect(AxiosHeader.generic({})).toMatchObject({
      headers: {
        'Content-Type': 'application/xml;charset=UTF-8',
      },
    })
  })
  test('Content-type xml can be created', () => {
    expect(AxiosHeader.xml({})).toMatchObject({
      headers: {
        'Content-Type': 'application/xml;charset=UTF-8',
      },
    })
  })
  test('Content-type json can be created', () => {
    expect(AxiosHeader.json({})).toMatchObject({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  })
  test.each([['de' as const], ['en' as const]])(
    'Accept Language "%s"',
    (acceptLanguage) => {
      expect(AxiosHeader.generic({ acceptLanguage })).toMatchObject({
        headers: {
          'Accept-Language': acceptLanguage,
        },
      })
    }
  )
  test("Empty Authentication Token doesn't add Authorization", () => {
    expect(
      AxiosHeader.generic({ authorizationToken: '' }).headers.Authorization
    ).toBeUndefined()
  })
  test("Non Empty Authentication Token get's added as Bearer", () => {
    expect(
      AxiosHeader.generic({ authorizationToken: 'hello-world' })
    ).toMatchObject({
      headers: {
        Authorization: 'Bearer hello-world',
      },
    })
  })
  test('Multiple Options work', () => {
    const authorizationToken = 'goodbye-mars'
    const acceptLanguage = 'en'
    const contentType = 'application/json;charset=UTF-8'
    expect(
      AxiosHeader.generic({ authorizationToken, acceptLanguage, contentType })
    ).toMatchObject({
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
        'Content-Type': contentType,
        'Accept-Language': acceptLanguage,
      },
    })
  })
})
