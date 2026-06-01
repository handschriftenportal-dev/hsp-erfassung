import type { Parser, ParserGenerator } from './Parser'
import { XMLEntityParser } from './XMLEntityParser'

const is = {
  whitespace: /\s/,
}

export const XMLTextParser: ParserGenerator = Object.freeze((callback) => {
  let entity: undefined | Parser
  let finished = false
  return {
    process(codepoint: number, content: string) {
      if (finished) {
        return finished
      }
      if (entity !== undefined) {
        if (entity.process(codepoint, content)) {
          entity = undefined
        }
      } else if (content === '&') {
        entity = XMLEntityParser(callback)
        entity.process(codepoint, content)
      } else if (!is.whitespace.test(content)) {
        callback({ type: 'found', codepoint, content })
      }
      return false
    },
    finish() {
      if (finished) {
        return finished
      }
      finished = true
      if (entity !== undefined) {
        entity.finish()
      }
    },
  }
})
