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

import { isNormdatumAnsichtViewModel } from '../../../../../src/domain/editor/normdaten/ansicht/NormdatenAnsichtViewModel'

describe('NormdatenAnsichtViewModel', () => {
  const emptyRole = {
    type: 'person',
    roles: [],
    text: 'Robert',
    id: '123',
    ref: 'url://123',
  }
  const singleRole = {
    type: 'person',
    roles: ['author'],
    text: 'Robert',
    id: '123',
    ref: 'url://123',
  }
  const multipleRoles = {
    type: 'person',
    roles: ['author', 'commissionedBy'],
    text: 'Robert',
    id: '123',
    ref: 'url://123',
  }
  const unknownRole = {
    type: 'person',
    roles: ['INVALID'],
    text: 'Robert',
    id: '123',
    ref: 'url://123',
  }
  const invalidType = {
    type: 'INVALID',
    role: ['author'],
    text: 'Robert',
    id: '123',
    ref: 'url://123',
  }

  it.each([emptyRole, singleRole, unknownRole, multipleRoles])(
    'recognizes %o as valid',
    (value) => {
      expect(isNormdatumAnsichtViewModel(value)).toBe(true)
    }
  )

  it.each([invalidType, null, 42, 'invalid'])(
    'recognizes %o as invalid',
    (value) => {
      expect(isNormdatumAnsichtViewModel(value)).toBe(false)
    }
  )
})
