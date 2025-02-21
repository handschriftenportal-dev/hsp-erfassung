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

import { InvertibleTransformation } from '../../../../domain/erfassung/transformation/InvertibleTransformation'
import { WithErrors } from '../../../../domain/erfassung/transformation/WithErrors'
import { VolltextSemantik } from '../../../../domain/erfassung/VolltextSemantik'
import {
  VolltextBox,
  VolltextFormatierung,
  VolltextReferenz,
} from '../../volltext/VolltextElement'
import { BoxTransformation } from './inline/BoxTransformation'
import { ExternerLinkTransformation } from './inline/ExternerLinkTransformation'
import { FallbackTransformation } from './inline/FallbackTransformation'
import { FormatierungTransformationFactory } from './inline/FormatierungTransformationFactory'
import { NormdatumTransformationFactory } from './inline/NormdatumTransformationFactory'
import { ThemenbereichTransformationFactory } from './inline/ThemenbereichTransformationFactory'
import { teiToVolltextSemantik } from './TeiToVolltextSemantik'

type VolltextInlineElement =
  | VolltextFormatierung
  | VolltextBox
  | VolltextReferenz

const transformations: Partial<
  Record<
    VolltextSemantik,
    InvertibleTransformation<WithErrors<Element>, VolltextInlineElement>
  >
> = {
  // Normdatum
  person: NormdatumTransformationFactory('person'),
  koerperschaft: NormdatumTransformationFactory('koerperschaft'),
  ort: NormdatumTransformationFactory('ort'),
  // Themenbereich
  buchkunde: FallbackTransformation,
  buchschmuck: FallbackTransformation,
  einband: ThemenbereichTransformationFactory('einband'),
  initium: FallbackTransformation,
  musiknotation: FallbackTransformation,
  schriftart: FallbackTransformation,
  sprache: FallbackTransformation,
  textgattung: FallbackTransformation,
  // Link
  externerLink: ExternerLinkTransformation,
  // Semantische Formatierung
  autor: FormatierungTransformationFactory('autor'),
  werktitel: FormatierungTransformationFactory('werktitel'),
  incipit: FormatierungTransformationFactory('incipit'),
  explicit: FormatierungTransformationFactory('explicit'),
  zitat: FormatierungTransformationFactory('zitat'),
  // Nicht-Semantische Formatierung
  superskript: FormatierungTransformationFactory('superskript'),
  subskript: FormatierungTransformationFactory('subskript'),
  // Box
  box: BoxTransformation,
}

export const InlineTransformation: InvertibleTransformation<
  WithErrors<Node>,
  WithErrors<VolltextInlineElement | Text>
> = {
  transform(input) {
    const { data } = input
    if (Text.isText(data)) {
      return { data }
    }
    const origin = teiToVolltextSemantik(data)
    const transformation = transformations[origin] ?? FallbackTransformation
    return { data: transformation.transform({ data }) }
  },
  invert(input) {
    const { data, serializationErrors = [] } = input
    if (Text.isText(data)) {
      return { data }
    }
    const transformation =
      transformations[data.data_origin] ?? BoxTransformation
    const output = transformation.invert(data)
    if (output.serializationErrors) {
      serializationErrors.push(...output.serializationErrors)
    }
    return { data: output.data, serializationErrors }
  },
}
