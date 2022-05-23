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

import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { EditableTextfieldTwoColumnElement } from '../../EditableTextfieldTwoColumnElement'
import { NoneEditableTwoColumnElementJSX } from '../../NoneEditableTwoColumnElementJSX'
import { useDispatch, useSelector } from 'react-redux'
import { selectReadOnly, updateSaveAllowed } from '../../../erfassung/ErfassungsState'

interface IndoSimpleInputFieldProps {
  props: any
  title: string
  required: boolean
  helpertext?: string
  empty?: boolean
}

export const IndoSimpleInputField = React.memo(({
  props,
  title,
  required,
  helpertext, empty
}: IndoSimpleInputFieldProps) => {

  const readOnly = useSelector(selectReadOnly)
  const dispatch = useDispatch()
  const error = props.element.children[0].children[0].text === '' && !empty

  useEffect(() => {
    if (error) {
      dispatch(updateSaveAllowed(false))
    } else {
      dispatch(updateSaveAllowed(true))
    }
  }, [error])


  return <Grid className={'small-bottom-gab'} container contentEditable={false}>
    {!readOnly
      ? <>
          <EditableTextfieldTwoColumnElement helpertext={helpertext} error={error}
                                             title={title}
                                             element={props.element} marginTop={''} deleteParam={!required}
                                             paddingLeft={'24px'}/>
        </>
      : <>
          <NoneEditableTwoColumnElementJSX title={title}
                                           children={props.element.children[0].children[0].text}/>
        </>
    }
  </Grid>
})
