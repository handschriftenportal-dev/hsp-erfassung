import { last } from 'lodash'
import type { NormdatenTEIElement } from 'src/domain/editor/normdaten/NormdatenTEIElement'
import type { VolltextNormdatum } from 'src/infrastructure/slate/volltext/VolltextElement'

const DNB_INFO_GND_URL = 'https://d-nb.info/gnd/'
const NORMDATENSERVICE_PREFIX = 'NORM-'
const NORMDATENSERVICE_AUTHORITY_FILE_URL_PREFIX =
  'https://normdaten.staatsbibliothek-berlin.de/data/authority-file/'

function urlToId(ref: string): string {
  const id = last(ref.split('/')) ?? ''
  return id.trim()
}

function idToUrl(id: string): string {
  if (id === '' || id.startsWith(NORMDATENSERVICE_PREFIX)) {
    return NORMDATENSERVICE_AUTHORITY_FILE_URL_PREFIX + id
  }
  return DNB_INFO_GND_URL + id
}

function elementToNormdatenTEIElement(
  element: VolltextNormdatum
): NormdatenTEIElement {
  const { data_origin: dataOrigin, content: normdatenText, box } = element
  const { data_ref = '', data_role: role = '', data_key } = box
  const result: NormdatenTEIElement = {
    dataOrigin,
    role,
    normdatenText,
    gndIdentifierOption: urlToId(data_ref),
  }
  if (data_key) {
    result.identifier = data_key
  }
  return result
}

export const NormdatenUtilities = Object.freeze({
  idToUrl,
  urlToId,
  elementToNormdatenTEIElement,
})
