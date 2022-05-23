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
import { Grid, TextField } from '@material-ui/core'
import { DeleteSlateNodeButton } from './DeleteSlateNodeButton'
import { useSlateStatic } from 'slate-react'
import { insertTextForChildren } from '../../infrastructure/slate/SlateBoundary'
import { updateComponentChangedHistory } from '../erfassung/ErfassungsState'
import { useDispatch } from 'react-redux'
import { ChangedComponent, EDIT_NODE } from '../erfassung/ChangedComponent'

/**
 * Author: Christoph Marten on 29.12.2021 at 07:59
 */
interface EditableTextfieldTwoColumnElementProps {
  marginBottom?: string,
  marginTop?: string,
  paddingLeft?: string,
  title?: string,
  helpertext?: string,
  error?: boolean,
  element: any,
  deleteParam?: boolean,
  label?: string
}

export const EditableTextfieldTwoColumnElement = React.memo(({
  marginBottom,
  marginTop,
  title,
  helpertext,
  error,
  element,
  deleteParam,
  label,
  paddingLeft
}: EditableTextfieldTwoColumnElementProps) => {

  const editor = useSlateStatic()
  const dispatch = useDispatch()

  const getTextContent = (element.children) && (element.children[0]) && (element.children[0].children) && (element.children[0].children[0]) ? element.children[0].children[0].text : ''

  const onChange = useCallback((event: any) => {
    insertTextForChildren(element, event, editor)
    setTimeout(() => {
      dispatch(updateComponentChangedHistory({
        dataOrigin: element.data_origin,
        method: EDIT_NODE,
        id: element.id
      } as ChangedComponent))
    }, 1)
  }, [])

  return <Grid style={{
    marginBottom: (marginBottom) || '0px',
    marginTop: (marginTop) || '0px'
  }} container>
    <Grid contentEditable={false} item xs={3} style={{ display: 'table', paddingLeft: (paddingLeft) || '0px' }}><span
        className={'align-display-table-cell-vertical-align'}>{title}: </span></Grid>
    <Grid item xs={7} contentEditable={false}>
      <TextField
          helperText={error ? helpertext : ''}
          label={label}
          error={error}
          role={'input'}
          InputProps={{ className: 'input-fields-background-color' }}
          onChange={onChange}
          defaultValue={getTextContent}
          fullWidth={true}
          variant="filled"/>
    </Grid>

    {deleteParam
      ? <>
          <DeleteSlateNodeButton node={element}/>
        </>
      : <></>}
  </Grid>
})
