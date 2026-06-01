import type { Descendant, Element } from 'slate'
import { Text } from 'slate'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import type { SerializationError } from 'src/domain/erfassung/transformation/SerializationError'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import { teiToVolltextSemantik } from 'src/infrastructure/slate/transformation/volltext/TeiToVolltextSemantik'
import type {
  VolltextBox,
  VolltextFormatierung,
  VolltextReferenz,
} from 'src/infrastructure/slate/volltext/VolltextElement'

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
  WithErrors<Descendant>,
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
