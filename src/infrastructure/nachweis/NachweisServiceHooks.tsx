import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectConfiguration,
  selectSlateState,
} from 'src/domain/erfassung/ErfassungsState'
import { SerializationError } from 'src/domain/erfassung/transformation/SerializationError'
import { SerialisierungsFehlerAnzeige } from 'src/domain/toolbar/SerialisierungsFehlerAnzeige'
import { downloadXML } from 'src/infrastructure/DownloadXML'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import type {
  NachweisSperren,
  SpeichernResponse,
} from 'src/infrastructure/nachweis/NachweisServiceAdapter'
import { findBeschreibungSperren } from 'src/infrastructure/nachweis/NachweisServiceAdapter'
import { findKODSignaturen } from 'src/infrastructure/nachweis/NachweisServiceAdapter'
import { fetchDataFromNachweis } from 'src/infrastructure/nachweis/NachweisServiceAdapter'
import { speichern } from 'src/infrastructure/nachweis/NachweisServiceAdapter'
import { XMLPipeline } from 'src/infrastructure/slate/transformation/XMLPipeline'

export const useSpeichern = (): (() => Promise<SpeichernResponse>) => {
  const { beschreibungsUrl, authorizationToken, language, standalone } =
    useSelector(selectConfiguration)
  const data = useSelector(selectSlateState)
  const { t } = useTranslation()
  const { showModal } = useGlobalModalContext()

  return function speichernWrapper() {
    const { data: xml, serializationErrors = [] } = XMLPipeline.serialize({
      data,
    })

    const filteredErrors = serializationErrors.filter(
      (error) => error.level !== SerializationError.level.info
    )
    if (filteredErrors.length > 0) {
      showModal(
        <SerialisierungsFehlerAnzeige serializationError={filteredErrors} />
      )
    }

    if (standalone) {
      downloadXML(xml, 'tei.xml')
      return Promise.resolve({
        success: true,
        message: t('toolbar.successful_save_message'),
        content: t('toolbar.successful_save_message'),
        level: 'info',
      })
    }
    return speichern(beschreibungsUrl, authorizationToken, language, xml)
  }
}

export function useFindBeschreibungsSperren(): () => Promise<
  NachweisSperren[]
> {
  const { beschreibungsUrl, authorizationToken } =
    useSelector(selectConfiguration)
  return () => findBeschreibungSperren(beschreibungsUrl, authorizationToken)
}

export const useFetchBeschreibung = () => {
  const dispatch = useDispatch()
  const { beschreibungsUrl, authorizationToken } =
    useSelector(selectConfiguration)

  return () => {
    fetchDataFromNachweis(beschreibungsUrl, authorizationToken, dispatch)
  }
}

export const useFindKODSignaturen = () => {
  const dispatch = useDispatch()
  const { beschreibungsUrl, authorizationToken, standalone } =
    useSelector(selectConfiguration)
  return () => {
    if (!standalone) {
      findKODSignaturen(beschreibungsUrl, authorizationToken, dispatch)
    }
  }
}
