/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { CheckCircle } from '@mui/icons-material'
import { FC, memo, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from 'slate'

import ConfigureReduxStore from '../../infrastructure/ConfigureReduxStore'
import { useGlobalModalContext } from '../../infrastructure/modal/GlobalModal'
import { validateTEI } from '../../infrastructure/nachweis/NachweisServiceAdapter'
import {
  ImportValidationResponse,
  ValidationError,
} from '../../infrastructure/nachweis/ValidationResponse'
import {
  detailErrorsToValidationErrors,
  unsetElementMatchId,
  updateNodes,
} from '../../infrastructure/slate/SlateBoundary'
import { XMLPipeline } from '../../infrastructure/slate/transformation/XMLPipeline'
import {
  selectConfiguration,
  selectValidationState,
  updateAlertMessage,
  updateValidationState,
} from '../erfassung/ErfassungsState'
import { ValidateWhiteIcon } from './icons/ValidateWhiteIcon'
import { HSPToolbarButton } from './styles/HSPToolbarButton'
import { ValidierungsFehlerAnzeige } from './ValidierungsFehlerAnzeige'

interface Props {
  editor: Editor
  withODD: boolean
}

export const ValidateTEIButton: FC<Props> = memo(({ editor, withODD }) => {
  const dispatch = useDispatch()
  const { validationUrl } = useSelector(selectConfiguration)
  const formerValidationState = useSelector(selectValidationState)
  const { t } = useTranslation()
  const { showModal } = useGlobalModalContext()

  const validateXML = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    validateTEI(
      validationUrl,
      XMLPipeline.serialize({
        data: ConfigureReduxStore.getState().erfassung.slateValue,
      }).data,
      withODD
    ).then((response: ImportValidationResponse) => {
      const validationState = detailErrorsToValidationErrors(
        editor,
        response.details
      )
      formerValidationState.forEach(({ id }: ValidationError): void => {
        unsetElementMatchId(editor, 'error', id)
      })
      validationState.forEach(({ path, error }: ValidationError): void => {
        updateNodes(editor, { error } as any, path)
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
  }

  return (
    <HSPToolbarButton
      id={withODD ? 'validateTEIButtonODD' : 'validateTEIButton'}
      title={
        withODD ? t('toolbar.validate_publication') : t('toolbar.validate')
      }
      disableTouchRipple={true}
      onMouseDown={validateXML}
    >
      {withODD ? (
        <CheckCircle style={{ color: 'white' }} />
      ) : (
        <ValidateWhiteIcon />
      )}
    </HSPToolbarButton>
  )
})
