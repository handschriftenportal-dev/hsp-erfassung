/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updateValidationState } from '../erfassung/ErfassungsState'
import { validateTEI } from '../../infrastructure/nachweis/NachweisServiceAdapter'
import { NachweisErfassungResponse } from '../../infrastructure/nachweis/NachweisErfassungResponse'
import { serialize } from '../../infrastructure/XMLConverter'
import { HSPRightToolbarButton } from './styles/HSPRightToolbarButton'
import { ValidateWhiteIcon } from './icons/ValidateWhiteIcon'
import { CheckCircle } from '@material-ui/icons'
import ConfigureReduxStore from '../../infrastructure/ConfigureReduxStore'

/**
 * Author: Christoph Marten on 23.03.2021 at 11:15
 */
interface ValidateTEIButtonProps {
  title: string
  validationUrl: string
  withODD: boolean

  setNachweisResponse(nachweisErfassungResponse: NachweisErfassungResponse): void

  setOpenMessage(openMessage: boolean): void
}
export const ValidateTEIButton = React.memo(({
  title,
  validationUrl,
  withODD,
  setNachweisResponse,
  setOpenMessage

}: ValidateTEIButtonProps) => {

  const dispatch = useDispatch()

  const callbackNachweis = useCallback((response: NachweisErfassungResponse) => {
    setNachweisResponse(response)
    dispatch(updateValidationState({
      valid: response.success,
      errorMessage: response.message
    }))
    setOpenMessage(true)
  }, [])

  const validateXML = useCallback((event: any) => {
    event.preventDefault()
    validateTEI(validationUrl, serialize(ConfigureReduxStore.getState().erfassung.slateValue[0]), dispatch, callbackNachweis, withODD)
  }, [])


  return (
      <HSPRightToolbarButton id={withODD ? 'validateTEIButtonODD' : 'validateTEIButton'}
                             title={title}
                             disableTouchRipple={true}
                             style={{ float: 'right' }}
                             onMouseDown={validateXML}>
        {withODD ? <CheckCircle style={{ color: 'white' }}/> : <ValidateWhiteIcon/>}
      </HSPRightToolbarButton>)
})
