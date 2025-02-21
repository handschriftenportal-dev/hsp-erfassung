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

import { cloneDeep } from 'lodash'
import { Element, Node, Text } from 'slate'

import {
  TEI_ELEMENT_DECODESC,
  TEI_ELEMENT_PARAGRAPH,
} from '../../../domain/erfassung/TEIConstants'
import { InvertibleTransformation } from '../../../domain/erfassung/transformation/InvertibleTransformation'
import { SerializationError } from '../../../domain/erfassung/transformation/SerializationError'
import { WithErrors } from '../../../domain/erfassung/transformation/WithErrors'
import { Komponente, KomponentenTyp } from '../Komponente'
import { findFirstElements } from '../SlateBoundary'
import { VolltextEditorElement } from '../volltext/VolltextEditorElement'
import { VolltextTransformation } from './volltext/VolltextTransformation'

type TransformationDirection = 'transform' | 'invert'

export const KomponentenTransformation: InvertibleTransformation<
  WithErrors<Node[]>,
  WithErrors<Node[]>
> = {
  transform: directedTransform('transform'),
  invert: directedTransform('invert'),
}

function directedTransform(direction: TransformationDirection) {
  return function transformClone({
    data,
    serializationErrors = [],
  }: WithErrors<Node[]>): WithErrors<Node[]> {
    return {
      data: cloneDeep(data).map(transformNode(direction, serializationErrors)),
      serializationErrors,
    }
  }
}

function transformNode(
  direction: TransformationDirection,
  serializationErrors: SerializationError[]
) {
  function invertChildren(nodes: Node[]): Node[] {
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
        const volltextParent = findFirstElements(element, dataOriginPath)
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

  return function recursiveTransformation(node: Node): Node {
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
