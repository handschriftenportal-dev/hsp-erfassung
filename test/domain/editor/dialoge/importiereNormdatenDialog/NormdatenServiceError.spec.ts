import { NormdatenServiceError } from 'src/domain/editor/dialoge/importiereNormdatumDialog/NormdatenServiceError'

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
