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

import { DeleteSlateNodeButton } from '../../DeleteSlateNodeButton'
import { useDispatch, useSelector } from 'react-redux'
import { Transforms } from 'slate'
import { Grid, TextField } from '@material-ui/core'
import { TEI_ELEMENT_ALT_IDENTIFIER } from './BeschreibungsKomponenteIdentifikation'
import { selectBeschreibung, selectReadOnly, updateSaveAllowed } from '../../../erfassung/ErfassungsState'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { NoneEditableTwoColumnElement } from '../../NoneEditableTwoColumnElement'
import { Autocomplete } from '@material-ui/lab'
import React, { useCallback, useEffect, useState } from 'react'
import { serializeAsText } from '../../../../infrastructure/XMLConverter'
import i18next from 'i18next'
import { BeschreibungsObject } from '../../../erfassung/Erfassung'
import { FullScreenPopper } from '../../../erfassung/FullScreenPopper'

export const IdnoValidAndAlternativeSignatureAutocomplete = React.memo((props: any) => {

  const readOnly = useSelector(selectReadOnly)
  const beschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const editor = useSlateStatic()
  const dispatch = useDispatch()
  const signaturen: Array<string> = !beschreibung.kodsignaturen || beschreibung.kodsignaturen.length > 0
    ? beschreibung.kodsignaturen
    : props.children
      ? [serializeAsText(props.element)]
      : [i18next.t('editor.nosignaturefound')]
  const [error, setError] = useState(!props.children || serializeAsText(props.element) === '')

  const insertValueAutocompleteForIdno = useCallback((event: any) => {
    event.preventDefault()
    if (event.target && event.target !== '') {
      Transforms.insertText(
        editor, event.target.outerText,
        { at: ReactEditor.findPath(editor as ReactEditor, props.element.children[0]) }
      )
    }

  }, [])

  const insertTextForIdno = useCallback((event: any) => {
    event.preventDefault()
    if (event.target && event.target.value !== '') {
      setError(false)
      Transforms.insertText(
        editor, event.target.value,
        { at: ReactEditor.findPath(editor as ReactEditor, props.element.children[0]) }
      )

    } else {
      setError(true)
    }

  }, [])

  useEffect(() => {

    if (error && !readOnly) {
      dispatch(updateSaveAllowed(false))
    } else {
      dispatch(updateSaveAllowed(true))
    }

  }, [error, readOnly])

  return (readOnly
    ? <NoneEditableTwoColumnElement title={i18next.t('editor.idno')} children={props.children}/>
    : <Grid container className={'small-bottom-gab'} contentEditable={false}>
        <Grid contentEditable={false} item xs={3} style={{ display: 'table' }}>
          <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>{i18next.t('editor.idno')}: </span>
        </Grid>
        <Grid item xs={7} contentEditable={false}>
          <Autocomplete
              PopperComponent={FullScreenPopper}
              onChange={insertValueAutocompleteForIdno}
              value={serializeAsText(props.element)}
              options={signaturen}
              freeSolo={!props.element.path || props.element.path.includes(TEI_ELEMENT_ALT_IDENTIFIER)}
              fullWidth={false}
              disableClearable={true}
              getOptionLabel={(option) => option}
              renderInput={(params) =>
                  <TextField autoFocus={true} {...params} id="signaturField"
                             error={error}
                             InputProps={{ ...params.InputProps, className: 'input-fields-background-color' }}
                             onChange={insertTextForIdno}
                             helperText={error ? i18next.t('editor.idno_not_empty') : ''}
                             variant="filled"/>}
          />
          <span style={{ display: 'none' }}>{props.children}</span>
        </Grid>
        <Grid item xs={2} contentEditable={false}>
          {!props.element.path || props.element.path.includes(TEI_ELEMENT_ALT_IDENTIFIER)
            ? <DeleteSlateNodeButton node={props.element}></DeleteSlateNodeButton>
            : ''}
        </Grid>
      </Grid>)
})
