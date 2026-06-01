import { Parser } from 'skripte/utility/parser/Parser'

describe('Parser', () => {
  it('traverses string', () => {
    const parser: Parser = {
      process: jest.fn(),
      finish: jest.fn(),
    }
    const text = 'Hello World'
    Parser.traverse(parser, text)
    expect(parser.process).toHaveBeenCalledTimes(text.length)
    expect(parser.finish).toHaveBeenCalledTimes(1)
  })
  it('handles utf-16 encodings', () => {
    const parser: Parser = {
      process: jest.fn(),
      finish: jest.fn(),
    }
    const text = '\ud83d\udca9'
    Parser.traverse(parser, text)
    expect(parser.process).toHaveBeenCalledTimes(1)
    expect(parser.finish).toHaveBeenCalledTimes(1)
  })
})
