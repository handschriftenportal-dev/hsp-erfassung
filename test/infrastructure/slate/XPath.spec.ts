import { XPath } from 'src/infrastructure/slate/XPath'

describe('XPath utilities', () => {
  const xPath =
    '/*:TEI[1]/*:text[1]/*:body[1]/*:msDesc[1]/*:head[1]/*:index[2]/*:term[2]'

  test('parsing multiple times yields same result', () => {
    /* Since parseXPath relies on a RegEx, which has inner state and is not
     * pure, we have to test that it successfully resets the RegEx after each
     * invocation */
    expect(XPath.parse(xPath)).toEqual(XPath.parse(xPath))
  })

  test('parsing splits into components', () => {
    expect(XPath.parse(xPath)).toEqual([
      ['TEI', 1],
      ['text', 1],
      ['body', 1],
      ['msDesc', 1],
      ['head', 1],
      ['index', 2],
      ['term', 2],
    ])
  })
})
