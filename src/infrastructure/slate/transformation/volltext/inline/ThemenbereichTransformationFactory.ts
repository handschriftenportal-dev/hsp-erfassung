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

import { ThemenbereichNotationen } from '../../../../../domain/erfassung/ThemenbereicheAPI'
import { InvertibleTransformation } from '../../../../../domain/erfassung/transformation/InvertibleTransformation'
import { WithErrors } from '../../../../../domain/erfassung/transformation/WithErrors'
import { findFirstElements } from '../../../SlateBoundary'
import { VolltextThemenbereich } from '../../../volltext/VolltextElement'

type ThemenbereichOrigin = 'einband'

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
  origin: ThemenbereichOrigin
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
  origin: ThemenbereichOrigin
): InvertibleTransformation<WithErrors<Element>, VolltextThemenbereich> => {
  return {
    transform({ data: element }) {
      const content = element.children.reduce(
        (text, element) => (Text.isText(element) ? text + element.text : text),
        ''
      )
      return {
        data_origin: origin,
        auswahl: extractAuswahl(findFirstElements(element, ['index'])),
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
