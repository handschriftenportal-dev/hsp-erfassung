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

import { Element } from 'slate'

import { InvertibleTransformation } from '../../../../../domain/erfassung/transformation/InvertibleTransformation'
import { SerializationError } from '../../../../../domain/erfassung/transformation/SerializationError'
import { WithErrors } from '../../../../../domain/erfassung/transformation/WithErrors'
import { extractText } from '../../../SlateNormdataBoundary'

export const FallbackTransformation: InvertibleTransformation<
  WithErrors<Element>,
  any
> = {
  transform({ data: element }) {
    const content = extractText(element)
    return {
      data_origin: 'box',
      box: element,
      content,
      children: [{ text: '' }],
    }
  },
  invert(element) {
    if (
      typeof element === 'object' &&
      element !== null &&
      'box' in element &&
      Element.isElement(element.box)
    ) {
      return {
        data: element.box,
      }
    } else {
      return {
        data: {
          data_origin: 'span',
          children: [{ text: extractText(element) || element?.content || '' }],
        },
        serializationErrors: [
          {
            errorCode: SerializationError.errorCode.unknownVolltextElement,
            level: SerializationError.level.error,
            detail: element,
            tag: element?.data_origin ?? 'NoTagProvided',
          },
        ],
      }
    }
  },
}
