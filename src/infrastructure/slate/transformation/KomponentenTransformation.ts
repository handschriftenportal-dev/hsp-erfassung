import { cloneDeep } from 'lodash'
import type { Descendant } from 'slate'
import { Element, Text } from 'slate'
import {
  TEI_ELEMENT_DECODESC,
  TEI_ELEMENT_PARAGRAPH,
} from 'src/domain/erfassung/TEIConstants'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import { SerializationError } from 'src/domain/erfassung/transformation/SerializationError'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import type { KomponentenTyp } from 'src/infrastructure/slate/Komponente'
import { Komponente } from 'src/infrastructure/slate/Komponente'
import { VolltextEditorElement } from 'src/infrastructure/slate/volltext/VolltextEditorElement'

import { VolltextTransformation } from './volltext/VolltextTransformation'

type TransformationDirection = 'transform' | 'invert'

export const KomponentenTransformation: InvertibleTransformation<
  WithErrors<Descendant[]>,
  WithErrors<Descendant[]>
> = {
  transform: directedTransform('transform'),
  invert: directedTransform('invert'),
}

function directedTransform(direction: TransformationDirection) {
  return function transformClone({
    data,
    serializationErrors = [],
  }: WithErrors<Descendant[]>): WithErrors<Descendant[]> {
    return {
      data: cloneDeep(data).map(transformNode(direction, serializationErrors)),
      serializationErrors,
    }
  }
}

function transformNode(
  direction: TransformationDirection,
  serializationErrors: SerializationError[]
): (node: Descendant) => Descendant {
  function invertChildren(nodes: Descendant[]): Descendant[] {
    return nodes.flatMap((node) => {
      if (Text.isText(node)) {
        return node
      } else if (VolltextEditorElement.isVolltextEditorElement(node)) {
        const { data, serializationErrors: errors } =
          VolltextTransformation.invert({ data: node })
        if (errors) {
          serializationErrors.push(...errors)
        }
        return data
      } else {
        node.children = invertChildren(node.children)
        return node
      }
    })
  }

  function invert(element: Element): Element {
    element.children = invertChildren(element.children)
    return element
  }

  function pathToVolltext(
    dataOriginPath: string[]
  ): InvertibleTransformation<Element, Element> {
    return {
      transform(element) {
        const volltextParent = HSPNode.findFirstElement(element, dataOriginPath)
        if (volltextParent) {
          volltextParent.children = [
            VolltextTransformation.transform({ data: volltextParent.children })
              .data,
          ]
        }
        return element
      },
      invert,
    }
  }

  const childrenToVolltext = pathToVolltext([])

  const transformationLookup: Partial<
    Record<KomponentenTyp, InvertibleTransformation<Element, Element>>
  > = {
    sonstiges: pathToVolltext([TEI_ELEMENT_PARAGRAPH]),
    aeusseres: {
      transform(element) {
        const [p, decoDesc] = element.children
        if (Element.isElement(p) && p.data_origin === TEI_ELEMENT_PARAGRAPH) {
          const { data, serializationErrors: errors } =
            VolltextTransformation.transform({ data: p.children })
          if (errors) {
            serializationErrors.push(...errors)
          }
          p.children = [data]
        }
        if (
          Element.isElement(decoDesc) &&
          decoDesc.data_origin === TEI_ELEMENT_DECODESC
        ) {
          decoDesc.children = decoDesc.children.map(
            transformNode('transform', serializationErrors)
          )
        }
        return element
      },
      invert,
    },
    aeusseresKunst: childrenToVolltext,
    inhaltText: childrenToVolltext,
    inhaltMusik: childrenToVolltext,
    inhaltKunst: childrenToVolltext,
    geschichte: pathToVolltext(['p']),
    literatur: pathToVolltext(['listBibl', 'bibl']),
  }

  return function recursiveTransformation(node: Descendant): Descendant {
    if (!Element.isElement(node)) {
      return node
    }
    const komponente = Komponente.type(node)
    if (komponente) {
      const transformation = transformationLookup?.[komponente]?.[direction]
      if (transformation) {
        return transformation(node)
      }
    } else {
      serializationErrors.push({
        level: SerializationError.level.info,
        errorCode: SerializationError.errorCode.unknownBeschreibungsKomponente,
        detail: node,
        tag: node.data_origin,
      })
    }
    node.children = node.children.map(recursiveTransformation)
    return node
  }
}
