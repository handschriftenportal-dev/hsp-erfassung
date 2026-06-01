export interface NormdatenTEIElement {
  normdatenText: string
  role: string
  gndIdentifierOption: string
  dataOrigin: 'person' | 'koerperschaft' | 'ort'
  identifier?: string
}
