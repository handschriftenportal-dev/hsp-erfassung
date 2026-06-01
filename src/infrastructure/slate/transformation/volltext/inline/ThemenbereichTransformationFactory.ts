import type { Node } from 'slate'
import { Element, Text } from 'slate'
import { ThemenbereichNotationen } from 'src/domain/erfassung/ThemenbereicheAPI'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import type { VolltextThemenbereich } from 'src/infrastructure/slate/volltext/VolltextElement'

function createTerm({ id, uri }: VolltextThemenbereich['auswahl'][0]): Element {
  return {
    data_origin: 'term',
    data_key: id,
    data_ref: uri,
    children: [{ text: '' }],
  } as Element
}

function createIndex(
  auswahl: VolltextThemenbereich['auswahl'],
  origin: VolltextThemenbereich['data_origin']
): Element {
  return {
    data_origin: 'index',
    data_indexName: ThemenbereichNotationen[origin],
    children: auswahl.map(createTerm),
  } as Element
}

interface ValidTerm extends Element {
  data_origin: 'term'
  data_key: string
  data_ref: string
}

function isValidTerm(node: Node): node is ValidTerm {
  return (
    Element.isElement(node) &&
    node.data_origin === 'term' &&
    'data_key' in node &&
    'data_ref' in node
  )
}

function termToAuswahl(term: ValidTerm): VolltextThemenbereich['auswahl'][0] {
  const { data_key: id, data_ref: uri } = term
  return { id, uri }
}

function extractAuswahl(
  index: Element | undefined
): VolltextThemenbereich['auswahl'] {
  if (index === undefined) {
    return []
  }
  return index.children.filter(isValidTerm).map(termToAuswahl)
}

export const ThemenbereichTransformationFactory = (
  origin: VolltextThemenbereich['data_origin']
): InvertibleTransformation<WithErrors<Element>, VolltextThemenbereich> => {
  return {
    transform({ data: element }) {
      const content = element.children.reduce(
        (text, element) => (Text.isText(element) ? text + element.text : text),
        ''
      )
      return {
        data_origin: origin,
        auswahl: extractAuswahl(HSPNode.findFirstElement(element, ['index'])),
        content,
        children: [{ text: '' }],
      }
    },
    invert(element) {
      const { auswahl, content, data_origin } = element
      return {
        data: {
          data_origin: 'ref',
          data_type: 'subjectArea',
          children: [{ text: content }, createIndex(auswahl, data_origin)],
        },
      }
    },
  }
}
