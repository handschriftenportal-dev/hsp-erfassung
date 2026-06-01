import type { NormdatenBeziehungenPort } from 'src/domain/editor/normdaten/NormdatenBeziehungenPort'
import { erfassungNormdatenTEIRollen } from 'src/domain/erfassung/ErfassungNormdatenTEIRollen'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'

export const normdatenBeziehungenFileAdapter = (): NormdatenBeziehungenPort => {
  const getNormdaten = (): VolltextSemantik[] => [
    'ort',
    'person',
    'koerperschaft',
  ]
  const getBeziehungen = (konzept: VolltextSemantik) => {
    return erfassungNormdatenTEIRollen[konzept] || []
  }
  return {
    getNormdaten,
    getBeziehungen,
  }
}
