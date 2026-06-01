import { CheckCircle } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import type { FC, MouseEvent } from 'react'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import type { Editor } from 'slate'
import {
  selectConfiguration,
  selectValidationState,
  updateAlertMessage,
  updateValidationState,
} from 'src/domain/erfassung/ErfassungsState'
import ConfigureReduxStore from 'src/infrastructure/ConfigureReduxStore'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { validateTEI } from 'src/infrastructure/nachweis/NachweisServiceAdapter'
import type {
  ImportValidationResponse,
  ValidationError,
} from 'src/infrastructure/nachweis/ValidationResponse'
import {
  detailErrorsToValidationErrors,
  unsetElementMatchId,
  updateNodes,
} from 'src/infrastructure/slate/SlateBoundary'
import { XMLPipeline } from 'src/infrastructure/slate/transformation/XMLPipeline'
import { colors } from 'src/theme'

import { ValidateWhiteIcon } from './icons/ValidateWhiteIcon'
import { HSPToolbarButton } from './styles/HSPToolbarButton'
import { ValidierungsFehlerAnzeige } from './ValidierungsFehlerAnzeige'

interface Props {
  editor: Editor
  withODD?: boolean
}

export const ValidateTEIButton: FC<Props> = memo(
  ({ editor, withODD = false }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { validationUrl } = useSelector(selectConfiguration)
    const formerValidationState = useSelector(selectValidationState)
    const { t } = useTranslation()
    const { showModal } = useGlobalModalContext()

    const validateXML = (event: MouseEvent<HTMLElement>) => {
      setLoading(true)
      event.preventDefault()
      validateTEI(
        validationUrl,
        XMLPipeline.serialize({
          data: ConfigureReduxStore.getState().erfassung.slateValue,
        }).data,
        withODD
      )
        .then((response: ImportValidationResponse) => {
          const validationState = detailErrorsToValidationErrors(
            editor,
            response.details
          )
          formerValidationState.forEach(({ id }: ValidationError): void => {
            unsetElementMatchId(editor, 'error', id)
          })
          validationState.forEach(({ path, error }: ValidationError): void => {
            updateNodes(editor, { error }, path)
          })
          dispatch(updateValidationState(validationState))

          if (validationState.length === 0) {
            const { message, valid } = response
            dispatch(
              updateAlertMessage({
                level: valid ? 'info' : 'error',
                message,
              })
            )
          } else {
            showModal(<ValidierungsFehlerAnzeige />)
          }
        })
        .catch(() => {
          dispatch(
            updateAlertMessage({
              level: 'error',
              message: t('toolbar.validate_server_error_msg'),
            })
          )
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 0)
        })
    }

    return (
      <HSPToolbarButton
        id={withODD ? 'validateTEIButtonODD' : 'validateTEIButton'}
        title={
          withODD ? t('toolbar.validate_publication') : t('toolbar.validate')
        }
        disableTouchRipple
        onMouseDown={validateXML}
        loading={loading}
        loadingIndicator={
          <CircularProgress
            size={32}
            thickness={4}
            sx={{ color: colors.greyscale.white }}
          />
        }
      >
        {withODD ? (
          <CheckCircle style={{ color: 'white' }} />
        ) : (
          <ValidateWhiteIcon />
        )}
      </HSPToolbarButton>
    )
  }
)
