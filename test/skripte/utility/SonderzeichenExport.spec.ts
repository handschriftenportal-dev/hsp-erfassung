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

import { uniq } from 'lodash'

import { SonderzeichenExport } from '../../../skripte/utility/SonderzeichenExport'
import { SonderzeichenAPI } from '../../../src/domain/sonderzeichen/SonderzeichenAPI'

describe('SonderzeichenExport', () => {
  it('can show fields which is a non-empty array with uniq entries', () => {
    const fields = SonderzeichenExport.fields()
    expect(fields).not.toHaveLength(0)
    expect(fields).toMatchObject(uniq(fields))
  })

  it('can show header which has a description for each field', () => {
    const fields = SonderzeichenExport.fields()
    const header = SonderzeichenExport.header()
    fields.forEach((field) => expect(header[field]).not.toBeUndefined())
  })

  it('can show sonderzeichen for key which has a description for each field', () => {
    const fields = SonderzeichenExport.fields()
    const sonderzeichen = SonderzeichenExport.keyToRow('U+2022')
    fields.forEach((field) => expect(sonderzeichen[field]).not.toBeUndefined())
  })

  it('iterates over all keys', () => {
    const callback = jest.fn()
    SonderzeichenExport.iterateSonderzeichen(callback)
    expect(callback).toHaveBeenCalledTimes(SonderzeichenAPI.getList().length)
  })
})
