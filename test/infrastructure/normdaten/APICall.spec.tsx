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

import { render, screen } from '@testing-library/react'
import { FC } from 'react'

import de from '../../../src/infrastructure/i18n/translation_de.json'
import {
  APICall,
  useAPICallTranslation,
} from '../../../src/infrastructure/normdaten/APICall'
import { TestContext } from '../../TestContext'

describe('APICall', () => {
  describe('has constructors without arguments', () => {
    it('for status "loading"', () => {
      expect(APICall.loading()).toMatchObject({ status: 'loading' })
    })

    it('for status "failed" with reason of type string', () => {
      expect(typeof APICall.tooManyResults().reason).toBe('string')
    })

    it('for status "not found"', () => {
      expect(APICall.notFound()).toMatchObject({ status: 'not_found' })
    })
  })

  describe('has constructors with arguments', () => {
    const testCases = [undefined, 1, 'string', { a: 1 }]

    it.each(testCases)('for status "failed" with reason %p', (reason) => {
      expect(APICall.failed(reason)).toMatchObject({ status: 'failed', reason })
    })

    it.each(testCases)('for status "success" with value %p', (value) => {
      expect(APICall.success(value)).toMatchObject({ status: 'success', value })
    })
  })

  describe('guards', () => {
    it('isSuccess recognizes only success', () => {
      expect(APICall.isSuccess(APICall.success('data'))).toBe(true)
      expect(APICall.isSuccess(APICall.loading())).toBe(false)
      expect(APICall.isSuccess(APICall.notFound())).toBe(false)
      expect(APICall.isSuccess(APICall.failed('error'))).toBe(false)
    })

    it('isNotFound recognizes only not found', () => {
      expect(APICall.isNotFound(APICall.notFound())).toBe(true)
      expect(APICall.isNotFound(APICall.loading())).toBe(false)
      expect(APICall.isNotFound(APICall.success('data'))).toBe(false)
      expect(APICall.isNotFound(APICall.failed('error'))).toBe(false)
    })
  })
})

type Props = {
  apiCall: APICall<any>
  transform: (value: any) => string
}

describe('useAPICallTranslation', () => {
  const APICallWrapper: FC<Props> = ({ apiCall, transform }) => {
    const text = useAPICallTranslation()(apiCall, transform)
    return (
      <TestContext>
        <div data-testid="text">{text}</div>
      </TestContext>
    )
  }
  const i18n = de.api_call.state

  it.each([
    [APICall.loading(), i18n.loading, jest.fn()],
    [APICall.notFound(), i18n.not_found, jest.fn()],
    [APICall.failed(500), i18n.failed, jest.fn()],
    [APICall.tooManyResults(), i18n.failed, jest.fn()],
    [APICall.success({ a: { b: 'nested' } }), 'nested', (val: any) => val.a.b],
    [APICall.success(0), 'constant', (_val: any) => 'constant'],
  ])('Translates "%o" into "%s"', (apiCall, translation, transform) => {
    render(<APICallWrapper apiCall={apiCall} transform={transform} />)

    expect(screen.getByTestId('text')).toHaveTextContent(translation)
  })
})
