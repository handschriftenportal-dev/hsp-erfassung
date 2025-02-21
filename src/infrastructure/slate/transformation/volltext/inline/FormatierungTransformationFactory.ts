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

import { Descendant, Element, Node, Text } from 'slate'

import { InvertibleTransformation } from '../../../../../domain/erfassung/transformation/InvertibleTransformation'
import { SerializationError } from '../../../../../domain/erfassung/transformation/SerializationError'
import { WithErrors } from '../../../../../domain/erfassung/transformation/WithErrors'
import { VolltextSemantik } from '../../../../../domain/erfassung/VolltextSemantik'
import {
  VolltextBox,
  VolltextFormatierung,
  VolltextReferenz,
} from '../../../volltext/VolltextElement'
import { teiToVolltextSemantik } from '../TeiToVolltextSemantik'
import { BoxTransformation } from './BoxTransformation'
import { NormdatumTransformationFactory } from './NormdatumTransformationFactory'

type VolltextVoidElement = VolltextReferenz | VolltextBox

const transformations: Partial<
  Record<
    VolltextSemantik,
    InvertibleTransformation<WithErrors<Element>, VolltextVoidElement>
  >
> = {
  person: NormdatumTransformationFactory('person'),
  koerperschaft: NormdatumTransformationFactory('koerperschaft'),
  ort: NormdatumTransformationFactory('ort'),
}

const formatierungChildrenTransformation: InvertibleTransformation<
  WithErrors<Node>,
  VolltextVoidElement | Text
> = {
  transform(input) {
    const { data } = input
    if (Text.isText(data)) {
      return data
    }
    const origin = teiToVolltextSemantik(data)
    const transformation = transformations[origin] ?? BoxTransformation
    return transformation.transform({ data })
  },
  invert(node) {
    if (Text.isText(node)) {
      return { data: node }
    }
    const transformation =
      transformations[node.data_origin] ?? BoxTransformation
    return transformation.invert(node)
  },
}

export const FormatierungTransformationFactory = (
  origin: VolltextFormatierung['data_origin']
): InvertibleTransformation<WithErrors<Element>, VolltextFormatierung> => {
  return {
    transform({ data: element }) {
      const { children } = element
      return {
        data_origin: origin,
        box: element,
        children: children.map((child) =>
          formatierungChildrenTransformation.transform({ data: child })
        ),
      }
    },
    invert(formatierung) {
      const { box, children } = formatierung
      const newChildren: Descendant[] = []
      const serializationErrors: SerializationError[] = []
      children.forEach((child) => {
        const { data, serializationErrors: errors } =
          formatierungChildrenTransformation.invert(child)
        newChildren.push(data)
        if (errors) {
          serializationErrors.push(...errors)
        }
      })
      return {
        data: {
          ...box,
          children: newChildren,
        },
        serializationErrors,
      }
    },
  }
}
