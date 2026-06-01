import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'

interface BaseLink {
  type: VolltextSemantik
  text: string
  id: string
  ref: string
  roles: string[]
}
interface OrtLink extends BaseLink {
  type: 'ort'
}
interface PersonLink extends BaseLink {
  type: 'person'
}
interface KoerperschaftLink extends BaseLink {
  type: 'koerperschaft'
}

export type NormdatenAnsichtViewModel = PersonLink | OrtLink | KoerperschaftLink

export function isNormdatumAnsichtViewModel(
  value: unknown
): value is NormdatenAnsichtViewModel {
  if (!value) return false
  if (typeof value !== 'object') return false
  if (
    !(
      'text' in value &&
      'id' in value &&
      'ref' in value &&
      'type' in value &&
      'roles' in value
    )
  )
    return false
  const { text, id, ref, type, roles } = value
  return (
    typeof text === 'string' &&
    typeof id === 'string' &&
    typeof ref === 'string' &&
    typeof type === 'string' &&
    Array.isArray(roles) &&
    roles.every((role) => typeof role === 'string')
  )
}
