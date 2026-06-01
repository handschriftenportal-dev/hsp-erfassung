import type { Descendant } from 'slate'
import { Text } from 'slate'
import { TEI_ELEMENT_LINEBREAK } from 'src/domain/erfassung/TEIConstants'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import type { VolltextBlock } from 'src/infrastructure/slate/volltext/VolltextElement'

import { InlineTransformation } from './InlineTransformation'

type Data = {
  value: VolltextBlock[]
  paragraph: VolltextBlock
  text: Text
}
type Reducer = (data: Data, node: Descendant) => Data
type Transition = 'inlineElement' | 'text' | 'newParagraph'

const emptyParagraph = (): [paragraph: VolltextBlock, text: Text] => {
  const text = { text: '' }
  const paragraph: VolltextBlock = {
    data_origin: 'paragraph',
    children: [text],
  }
  return [paragraph, text]
}

const teiToTransition = (node: Descendant): Transition => {
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
      data: node,
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
  WithErrors<Descendant[]>,
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
