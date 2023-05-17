/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import {
  ErfassungsRuleDefaultChildrenFactory,
  ErfassungsRuleDefaultElementFactory,
  ErfassungsRuleForComponent,
  ErfassungsRuleForType,
  ErfassungsRuleWrapperFactory
} from '../../../src/domain/erfassung/ErfassungRules'

describe('ErfassungsRules Test', () => {
  it('Create ErfassungsRule For Type', () => {
    expect(ErfassungsRuleForType('')).toEqual(undefined)
    expect(ErfassungsRuleForType('medieval')).toBeDefined()
  })

  it('Create ErfassungsRule For Component', () => {
    expect(ErfassungsRuleForComponent('medieval', '')).toEqual(undefined)
    expect(ErfassungsRuleForComponent('medieval', 'head')).toBeDefined()
  })

  it('Create ErfassungsRule For Component DefaultWrapper Creation', () => {
    expect(ErfassungsRuleWrapperFactory('medieval', 'head')).toEqual(undefined)
    expect(ErfassungsRuleWrapperFactory('medieval', 'additional')).toEqual(undefined)
  })

  it('Create ErfassungsRule For Component DefaultElement Creation', () => {
    expect(ErfassungsRuleDefaultElementFactory('medieval', '')).toEqual(undefined)
    expect(ErfassungsRuleDefaultElementFactory('medieval', 'additional')).toBeDefined()
  })

  it('Create ErfassungsRule For Component DefaultChildren Creation', () => {
    expect(ErfassungsRuleDefaultChildrenFactory('medieval', '')).toEqual(undefined)
    expect(ErfassungsRuleDefaultChildrenFactory('medieval', 'additional')).toBeDefined()
  })
})
