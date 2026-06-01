import type { ParserCallbackInput } from 'skripte/utility/parser/Parser'
import { Parser } from 'skripte/utility/parser/Parser'
import { XMLTextParser } from 'skripte/utility/parser/XMLTextParser'

describe('XMLTextParser', () => {
  it('simple string gets traversed and ignores whitespaces', () => {
    let collect = ''
    const callback = ({ type, content }: ParserCallbackInput) => {
      expect(type).toBe('found')
      collect += content
    }
    Parser.traverse(XMLTextParser(callback), 'Hello World\nGoodbye\tMars')
    expect(collect).toBe('HelloWorldGoodbyeMars')
  })

  it.each([
    ['\uabcd', 0xabcd],
    ['\u{1ceef}', 0x1ceef],
    ['\ud83d\udca9', 0x1f4a9],
  ])('correctly handles unicode sign %s as codepoint %i', (char, codepoint) => {
    let result = 0
    const callback = (input: ParserCallbackInput) => {
      const { type, codepoint } = input as { type: string; codepoint: number }
      expect(type).toBe('found')
      result = codepoint
    }
    Parser.traverse(XMLTextParser(callback), char)
    expect(result).toBe(codepoint)
  })
})
