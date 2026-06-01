import type { Descendant } from 'slate'

export interface BeschreibungsObject {
  id: string
  kodid: string
  kodsignaturen: string[]
  signature: string
  type: 'hsp:description' | 'hsp:description_retro' | 'iiif:manifest'
}

export type CreateBeschreibung = (
  description: Descendant[]
) => BeschreibungsObject
