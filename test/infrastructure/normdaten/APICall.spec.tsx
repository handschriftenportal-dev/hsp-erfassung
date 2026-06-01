import { render, screen } from '@testing-library/react'
import type { FC } from 'react'
import de from 'src/infrastructure/i18n/translation_de.json'
import {
  APICall,
  useAPICallTranslation,
} from 'src/infrastructure/normdaten/APICall'
import { TestContext } from 'test/TestContext'

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

// Generische Props mit unknown statt any
type Props = {
  apiCall: APICall<unknown>
  transform: (value: unknown) => string
}

describe('useAPICallTranslation', () => {
  // Generische Wrapper-Komponente
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
    [
      APICall.success({ a: { b: 'nested' } }),
      'nested',
      (val: unknown) => (val as { a: { b: string } }).a.b,
    ],
    [APICall.success(0), 'constant', (_val: unknown) => 'constant'],
  ])('Translates "%o" into "%s"', (apiCall, translation, transform) => {
    render(<APICallWrapper apiCall={apiCall} transform={transform} />)

    expect(screen.getByTestId('text')).toHaveTextContent(translation)
  })
})
