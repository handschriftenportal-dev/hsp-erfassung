import type { Descendant, Element } from 'slate'
import type {
  BeschreibungsObject,
  CreateBeschreibung,
} from 'src/domain/erfassung/Erfassung'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

function getMsDesc(description: Descendant[]): Element | undefined {
  if (description.length === 0) {
    return undefined
  }
  return HSPNode.findFirstElement(description[0], ['text', 'body', 'msDesc'])
}

const create: CreateBeschreibung = (description) => {
  const msDesc = getMsDesc(description)
  if (msDesc === undefined) {
    throw new Error(
      'Invalid description: missing element at path "text.body.msDesc"',
      { cause: description }
    )
  }
  const { 'data_xml:id': id = '', data_type: type = 'hsp:string' } = msDesc
  const signatureElement = HSPNode.findFirstElement(msDesc, [
    'msIdentifier',
    'idno',
  ])
  return {
    id,
    type: type as BeschreibungsObject['type'],
    signature: signatureElement ? HSPNode.extractText(signatureElement) : '',
    kodsignaturen: [],
    kodid: '',
  }
}

export const Beschreibung = Object.freeze({
  getMsDesc,
  create,
})
