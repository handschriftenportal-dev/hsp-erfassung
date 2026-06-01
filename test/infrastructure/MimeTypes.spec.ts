import { MimeTypes } from 'src/infrastructure/MimeTypes'

describe('MimeTypes', () => {
  it.each(Object.entries(MimeTypes))(
    'key %s has value %s of type string',
    ([_, value]) => {
      expect(typeof value).toBe('string')
    }
  )
})
