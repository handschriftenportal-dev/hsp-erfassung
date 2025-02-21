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

import { VolltextSemantik } from '../../../src/domain/erfassung/VolltextSemantik'
import {
  ErfassungsRuleDefaultChildrenFactory,
  ErfassungsRuleDefaultElementFactory,
  ErfassungsRuleForComponent,
  ErfassungsRuleForType,
  ErfassungsRuleWrapperFactory,
  normdatumElementForType,
} from '../../../src/infrastructure/slate/ErfassungsRules'

describe('ErfassungsRules Test', () => {
  it('Create ErfassungsRule For Type', () => {
    expect(ErfassungsRuleForType('')).toBeUndefined()
    expect(ErfassungsRuleForType('medieval')).toBeDefined()
  })

  it('Create ErfassungsRule For Component', () => {
    expect(ErfassungsRuleForComponent('medieval', '')).toBeUndefined()
    expect(ErfassungsRuleForComponent('medieval', 'head')).toBeDefined()
  })

  it('Create ErfassungsRule For Component DefaultWrapper Creation', () => {
    expect(ErfassungsRuleWrapperFactory('medieval', 'head')).toBeUndefined()
    expect(
      ErfassungsRuleWrapperFactory('medieval', 'additional')
    ).toBeUndefined()
  })

  it('Create ErfassungsRule For Component DefaultElement Creation', () => {
    expect(ErfassungsRuleDefaultElementFactory('medieval', '')).toBeUndefined()
    expect(
      ErfassungsRuleDefaultElementFactory('medieval', 'additional')
    ).toBeDefined()
  })

  it('Create ErfassungsRule For Component DefaultChildren Creation', () => {
    expect(ErfassungsRuleDefaultChildrenFactory('medieval', '')).toBeUndefined()
    expect(
      ErfassungsRuleDefaultChildrenFactory('medieval', 'additional')
    ).toBeDefined()
  })

  describe('create normdatum nodes', () => {
    const normdataTypes: VolltextSemantik[] = ['person', 'ort', 'koerperschaft']

    it('Invalid Beschreibungstype returns undefined', () => {
      expect(normdatumElementForType('invalid', 'person', {})).toBeUndefined()
    })
    it('Invalid normdatum type returns undefined', () => {
      expect(normdatumElementForType('medieval', 'invalid', {})).toBeUndefined()
    })
    it.each(normdataTypes)(
      'Normdatum of type %s can be created with options',
      (normdatumTyp) => {
        const options = {
          normdatenText: 'marker',
          role: 'author',
          gndIdentifierOption: '123',
        }
        const result = normdatumElementForType(
          'medieval',
          normdatumTyp,
          options
        )
        expect(result).toMatchObject({
          data_origin: normdatumTyp,
          content: options.normdatenText,
          box: {
            data_role: 'author',
            data_ref: 'http://d-nb.info/gnd/123',
          },
        })
      }
    )
  })
})
