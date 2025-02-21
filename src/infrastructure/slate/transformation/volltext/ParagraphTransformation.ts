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

import { Element, Node, Text } from 'slate'

import { TEI_ELEMENT_LINEBREAK } from '../../../../domain/erfassung/TEIConstants'
import { InvertibleTransformation } from '../../../../domain/erfassung/transformation/InvertibleTransformation'
import { WithErrors } from '../../../../domain/erfassung/transformation/WithErrors'
import { VolltextBlock } from '../../volltext/VolltextElement'
import { InlineTransformation } from './InlineTransformation'

type Data = {
  value: VolltextBlock[]
  paragraph: VolltextBlock
  text: Text
}
type Reducer = (data: Data, node: Node) => Data
type Transition = 'inlineElement' | 'text' | 'newParagraph'

const emptyParagraph = (): [paragraph: VolltextBlock, text: Text] => {
  const text = { text: '' }
  const paragraph: VolltextBlock = {
    data_origin: 'paragraph',
    children: [text],
  }
  return [paragraph, text]
}

const teiToTransition = (node: Node): Transition => {
  if (Text.isText(node)) {
    return 'text'
  }
  if (node.data_origin === TEI_ELEMENT_LINEBREAK) {
    return 'newParagraph'
  }
  return 'inlineElement'
}

const actions: Record<Transition, Reducer> = {
  newParagraph: (data, _) => {
    const [paragraph, text] = emptyParagraph()
    data.value.push(paragraph)
    return { ...data, paragraph, text }
  },
  text: (data, node) => {
    data.text.text += (node as Text).text
    return data
  },
  inlineElement: (data, node) => {
    const { data: element } = InlineTransformation.transform({
      data: node as Element,
    })
    const text = { text: '' }
    data.paragraph.children.push(element)
    data.paragraph.children.push(text)
    return { ...data, text }
  },
}

const reducer: Reducer = (data, node) => {
  const type = teiToTransition(node)
  const action = actions[type]
  return action(data, node)
}

export const ParagraphTransformation: InvertibleTransformation<
  WithErrors<Node[]>,
  WithErrors<VolltextBlock[]>
> = {
  transform({ data }) {
    const [paragraph, text] = emptyParagraph()
    const initial = {
      value: [paragraph],
      paragraph,
      text,
    }
    return { data: data.reduce(reducer, initial).value }
  },
  invert({ data, serializationErrors = [] }) {
    return {
      data: data
        .map(({ children }) =>
          children.map(
            (child) =>
              InlineTransformation.invert({ data: child, serializationErrors })
                .data
          )
        )
        .flatMap((children, index) =>
          index === 0
            ? children
            : [
                {
                  data_origin: TEI_ELEMENT_LINEBREAK,
                  children: [{ text: '' }],
                },
                ...children,
              ]
        ),
      serializationErrors,
    }
  },
}
