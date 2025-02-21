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

import { ParserCallbackInput, ParserGenerator } from './Parser'

const is = {
  whitespace: /\s/,
  hex: /[\dA-Fa-f]/,
  digit: /\d/,
  alpha: /[A-Za-z]/,
}

type ParserStep =
  | 'init'
  | 'charOrNumber'
  | 'dezOrHex'
  | 'parseChar'
  | 'parseHex'
  | 'parseDigit'
  | 'end'
  | 'parserError'
type EntityType = 'undetermined' | 'name' | 'hex' | 'dez'

const XML_PREDEFINED_ENTITIES: Record<string, number> = {
  '&lt;': '<'.codePointAt(0)!,
  '&gt;': '>'.codePointAt(0)!,
  '&amp;': '&'.codePointAt(0)!,
  '&quot;': '"'.codePointAt(0)!,
  '&apos;': "'".codePointAt(0)!,
}

type StateValue = {
  step: ParserStep
  content: string
  char: string
  type: EntityType
}

type StateTransition = (state: StateValue) => StateValue

const stateMachine: Record<ParserStep, StateTransition> = {
  end(state) {
    return {
      ...state,
      step: 'parserError',
    }
  },
  parserError(state) {
    return state
  },
  init(state) {
    const { char } = state
    return {
      ...state,
      step: char === '&' ? 'charOrNumber' : 'parserError',
    }
  },
  charOrNumber(state) {
    const { char } = state
    if (char === '#') {
      return { ...state, step: 'dezOrHex' }
    } else if (is.alpha.test(char)) {
      return { ...state, step: 'parseChar', type: 'name' }
    } else {
      return { ...state, step: 'parserError' }
    }
  },
  parseChar(state) {
    const { char } = state
    if (char === ';') {
      return { ...state, step: 'end' }
    } else if (is.alpha.test(char)) {
      return state
    } else {
      return { ...state, step: 'parserError' }
    }
  },
  dezOrHex(state) {
    const { char } = state
    if (char === 'x') {
      return { ...state, type: 'hex', step: 'parseHex' }
    } else if (is.digit.test(char)) {
      return { ...state, type: 'dez', step: 'parseDigit' }
    } else {
      return { ...state, step: 'parserError' }
    }
  },
  parseDigit(state) {
    const { char } = state
    if (char === ';') {
      return { ...state, step: 'end' }
    } else if (is.digit.test(char)) {
      return { ...state, step: 'parseDigit' }
    } else {
      return { ...state, step: 'parserError' }
    }
  },
  parseHex(state) {
    const { char, content } = state
    if (char === ';' && content.length > 4) {
      return { ...state, step: 'end' }
    } else if (is.hex.test(char)) {
      return { ...state, step: 'parseHex' }
    } else {
      return { ...state, step: 'parserError' }
    }
  },
}

const validCallback: Record<
  EntityType,
  (state: StateValue) => ParserCallbackInput
> = {
  undetermined({ content }) {
    return { type: 'error', content }
  },
  name({ content }) {
    return content in XML_PREDEFINED_ENTITIES
      ? {
          type: 'found',
          content,
          codepoint: XML_PREDEFINED_ENTITIES[content],
        }
      : { type: 'unknown_name', content }
  },
  hex({ content }) {
    return {
      type: 'found',
      content,
      codepoint: Number.parseInt(content.substring(3, content.length - 1), 16),
    }
  },
  dez({ content }) {
    return {
      type: 'found',
      content,
      codepoint: Number.parseInt(content.substring(2, content.length - 1), 10),
    }
  },
}

function endCallbackValue(state: StateValue): ParserCallbackInput {
  const { type, step, content } = state
  return step === 'parserError'
    ? { type: 'error', content }
    : validCallback[type](state)
}

function isEndState({ step }: StateValue): boolean {
  return step === 'end' || step === 'parserError'
}

export const XMLEntityParser: ParserGenerator = Object.freeze((callback) => {
  let state: StateValue = {
    step: 'init',
    type: 'undetermined',
    content: '',
    char: '',
  }

  function handleEndState(state: StateValue): boolean {
    if (isEndState(state)) {
      const callbackInput = endCallbackValue(state)
      callback(callbackInput)
      return true
    } else {
      return false
    }
  }

  return {
    process(_codepoint: number, char: string): boolean {
      state.char = char
      state.content = state.content + char
      const transition = stateMachine[state.step]
      state = transition(state)
      return handleEndState(state)
    },
    finish(): void {
      if (state.step !== 'parserError' && state.step !== 'end') {
        state.step = 'parserError'
        callback({ type: 'error', content: state.content })
      }
    },
  }
})
