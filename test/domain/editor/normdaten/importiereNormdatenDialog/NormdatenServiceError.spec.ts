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

import { NormdatenServiceError } from '../../../../../src/domain/editor/normdaten/importiereNormdatumDialog/NormdatenServiceError'

describe('NormdatenServiceError', () => {
  it('isNormdatenServiceError recognizes an error', () => {
    const validError = {
      status: 'failed',
      reason: {
        data: 'null',
        error: 'Not found',
      },
    }
    expect(NormdatenServiceError.isNormdatenServiceError(validError)).toBe(true)
  })

  it.each([
    ['error', new Error('hi')],
    ['null', null],
    ['undefined', undefined],
    ['"string"', 'string'],
    ['[1,2,3]', [1, 2, 3]],
    ['1', 1],
    ['{"message":"hi"}', { message: 'hi' }],
    ['undefined', Symbol('symbol')],
    ['{}', new Set([1, 2, 3])],
  ])('isNormdatenServiceError recognizes %s not be an error', (_, unknown) => {
    expect(NormdatenServiceError.isNormdatenServiceError(unknown)).toBe(false)
  })
})
