import type { FC, MouseEvent } from 'react'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import type { AlertMessage } from 'src/domain/erfassung/AlertMessage'
import {
  saveDocument,
  selectSaveAllowed,
  updateAlertMessage,
} from 'src/domain/erfassung/ErfassungsState'
import { useSpeichern } from 'src/infrastructure/nachweis/NachweisServiceHooks'

import { SaveWhiteIcon } from './icons/SaveWhiteIcon'
import { HSPToolbarButton } from './styles/HSPToolbarButton'

interface Props {}

export const TEISpeichernButton: FC<Props> = memo(() => {
  const dispatch = useDispatch()
  const saveAllowed = useSelector(selectSaveAllowed)

  const { t } = useTranslation()
  const title = t('toolbar.save')
  const speichern = useSpeichern()

  const callbackNachweis = useCallback(
    (alertMessage: AlertMessage, success: boolean) => {
      dispatch(updateAlertMessage(alertMessage))

      if (success) {
        dispatch(saveDocument())
      }
    },
    [dispatch]
  )

  const documentSpeichern = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      speichern().then((response) => {
        const { success, ...alertMessage } = response
        callbackNachweis({ ...alertMessage, hideAfter: 4000 }, success)
      })
    },
    [speichern, callbackNachweis]
  )

  return (
    <HSPToolbarButton
      id="speichernButton"
      title={title}
      disabled={!saveAllowed.allowed}
      onMouseDown={documentSpeichern}
    >
      <SaveWhiteIcon />
    </HSPToolbarButton>
  )
})
