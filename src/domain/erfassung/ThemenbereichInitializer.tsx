import type { FC } from 'react'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { SBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { useThemenbereich } from 'src/infrastructure/normdaten/ThemenbereichService'

import { updateAlertMessage, updateTaggableNormdaten } from './ErfassungsState'
import { ThemenbereicheAPI, ThemenbereichNotationen } from './ThemenbereicheAPI'
import type { VolltextSemantik } from './VolltextSemantik'

export const ThemenbereichInitializer: FC = memo(
  function ThemenbereichInitializer() {
    const api = useThemenbereich()
    const { t } = useTranslation()
    const dispatch = useDispatch()

    useEffect(() => {
      ThemenbereicheAPI.loadAllThemenbereich(api, SBBNormdatenServiceAdapter)
        .then((state) => {
          dispatch(updateTaggableNormdaten(state))

          const notation = Object.entries(state).reduce((result, entry) => {
            const [semantik, didLoad] = entry
            const notation =
              ThemenbereichNotationen[semantik as VolltextSemantik]
            if (!didLoad && notation !== undefined) {
              result.push(notation)
            }
            return result
          }, [] as string[])
          if (notation.length > 0) {
            dispatch(
              updateAlertMessage({
                message: t('subject_area_dialog.subject_area_loading_error', {
                  notation,
                  count: notation.length,
                }),
                level: 'warning',
              })
            )
          }
        })
        .catch((error) => {
          const details = error.message
            ? t('subject_area_dialog.service_error_details', {
                message: error.message,
              })
            : ''

          dispatch(
            updateAlertMessage({
              message: t('subject_area_dialog.service_error', { details }),
              level: 'error',
            })
          )
        })
    }, [api, dispatch, t])

    return null
  }
)
