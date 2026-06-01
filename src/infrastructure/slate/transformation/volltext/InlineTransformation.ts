import type { Descendant } from 'slate'
import { Text } from 'slate'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import { InitiumTransformation } from 'src/infrastructure/slate/transformation/volltext/inline/InitiumTransformation'
import { LiteraturTransformation } from 'src/infrastructure/slate/transformation/volltext/inline/LiteraturTransformation'
import { SuperskriptTransformation } from 'src/infrastructure/slate/transformation/volltext/inline/SuperskriptTransformation'
import type {
  VolltextBox,
  VolltextFormatierung,
  VolltextReferenz,
} from 'src/infrastructure/slate/volltext/VolltextElement'

import { BoxTransformation } from './inline/BoxTransformation'
import { ExternerLinkTransformation } from './inline/ExternerLinkTransformation'
import { FallbackTransformation } from './inline/FallbackTransformation'
import { FormatierungTransformationFactory } from './inline/FormatierungTransformationFactory'
import { NormdatumTransformationFactory } from './inline/NormdatumTransformationFactory'
import { ThemenbereichTransformationFactory } from './inline/ThemenbereichTransformationFactory'
import { teiToVolltextSemantik } from './TeiToVolltextSemantik'

export type VolltextInlineElement =
  | VolltextFormatierung
  | VolltextBox
  | VolltextReferenz

const transformations: Partial<
  Record<
    VolltextSemantik,
    InvertibleTransformation<
      WithErrors<Descendant>,
      VolltextInlineElement | Text
    >
  >
> = {
  // Normdatum
  person: NormdatumTransformationFactory('person'),
  koerperschaft: NormdatumTransformationFactory('koerperschaft'),
  ort: NormdatumTransformationFactory('ort'),
  // Themenbereich
  buchkunde: ThemenbereichTransformationFactory('buchkunde'),
  buchschmuck: ThemenbereichTransformationFactory('buchschmuck'),
  einband: ThemenbereichTransformationFactory('einband'),
  musiknotation: ThemenbereichTransformationFactory('musiknotation'),
  schreibsprache: ThemenbereichTransformationFactory('schreibsprache'),
  schriftart: ThemenbereichTransformationFactory('schriftart'),
  textgattung: ThemenbereichTransformationFactory('textgattung'),
  ueberlieferungsform: ThemenbereichTransformationFactory(
    'ueberlieferungsform'
  ),
  // Initien
  initium: InitiumTransformation,
  // Link
  externerLink: ExternerLinkTransformation,
  literatur: LiteraturTransformation,
  // Semantische Formatierung
  autor: FormatierungTransformationFactory('autor'),
  werktitel: FormatierungTransformationFactory('werktitel'),
  incipit: FormatierungTransformationFactory('incipit'),
  explicit: FormatierungTransformationFactory('explicit'),
  zitat: FormatierungTransformationFactory('zitat'),
  // Box
  box: BoxTransformation,
  // Text Transformation
  superskript: SuperskriptTransformation,
}

export const InlineTransformation: InvertibleTransformation<
  WithErrors<Descendant>,
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
      return data.superskript
        ? SuperskriptTransformation.invert(data)
        : { data }
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
