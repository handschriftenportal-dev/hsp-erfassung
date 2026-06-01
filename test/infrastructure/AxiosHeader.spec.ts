import { AxiosHeader } from 'src/infrastructure/AxiosHeader'

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
