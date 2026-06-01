import { useTranslation } from 'react-i18next'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import { normdatenBeziehungenFileAdapter } from 'src/infrastructure/normdaten/NormdatenBeziehungenFileAdapter'

export interface NormdatenBeziehungenPort {
  getNormdaten: () => VolltextSemantik[]
  getBeziehungen: (konzept: VolltextSemantik) => readonly string[]
}

export const NormdatenBeziehungenPort: NormdatenBeziehungenPort =
  normdatenBeziehungenFileAdapter()

export const useBeziehungsUebersetzung = () => {
  const { t } = useTranslation()
  return (beziehung: string): [string, boolean] => {
    const label = t(`text_tagging.referenz.role.${beziehung}`, '')
    return [label || beziehung, label !== '']
  }
}
