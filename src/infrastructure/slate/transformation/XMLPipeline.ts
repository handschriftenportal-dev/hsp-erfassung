import { compose } from 'src/domain/erfassung/transformation/InvertibleTransformation'

import { KomponentenTransformation } from './KomponentenTransformation'
import { TEITransformation } from './TEITransformation'
import { XMLTransformation } from './XMLTransformation'

const xmlToKomponenten = compose(TEITransformation, KomponentenTransformation)

const { transform: deserialize, invert: serialize } = compose(
  XMLTransformation,
  xmlToKomponenten
)

export const XMLPipeline = Object.freeze({
  deserialize,
  serialize,
  xmlToKomponenten,
})
