import type { VolltextSemantik } from './VolltextSemantik'

export const erfassungNormdatenTEIRollen: Partial<
  Record<VolltextSemantik, string[]>
> = {
  koerperschaft: [
    'commissionedBy',
    'author',
    'bookbinder',
    'mentionedIn',
    'scribe',
    'previousOwner',
    'other',
  ],
  person: [
    'commissionedBy',
    'author',
    'bookbinder',
    'mentionedIn',
    'scribe',
    'previousOwner',
    'translator',
    'illuminator',
    'conservator',
    'other',
  ],
  ort: ['origin', 'provenance', 'mentionedIn', 'other'],
}
