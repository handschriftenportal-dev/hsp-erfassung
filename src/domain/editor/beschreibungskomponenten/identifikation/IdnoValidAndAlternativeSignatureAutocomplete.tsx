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

import { Autocomplete, Grid, TextField } from '@mui/material'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RenderElementProps, useSlateStatic } from 'slate-react'

import {
  extractText,
  findPath,
  insertSlateText,
} from '../../../../infrastructure/slate/SlateBoundary'
import { BeschreibungsObject } from '../../../erfassung/Erfassung'
import {
  selectBeschreibung,
  selectReadOnly,
  updateSaveAllowed,
} from '../../../erfassung/ErfassungsState'
import { FullscreenPopper } from '../../../erfassung/FullscreenPopper'
import { TEI_ELEMENT_ALT_IDENTIFIER } from '../../../erfassung/TEIConstants'
import { DeleteSlateNodeButton } from '../../DeleteSlateNodeButton'
import { NoneEditableTwoColumnElement } from '../../NoneEditableTwoColumnElement'

interface Props extends RenderElementProps {}

export const IdnoValidAndAlternativeSignatureAutocomplete: FC<Props> = memo(
  ({ children, element }) => {
    const { path } = element as any
    const [firstChild] = element.children
    const { t } = useTranslation()
    const readOnly = useSelector(selectReadOnly)
    const beschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
    const editor = useSlateStatic()
    const dispatch = useDispatch()
    const text = extractText(element)
    const signaturen: string[] =
      !beschreibung.kodsignaturen || beschreibung.kodsignaturen.length > 0
        ? beschreibung.kodsignaturen
        : children
          ? [text]
          : [t('editor.signature_not_found')]
    const [error, setError] = useState(!children || text === '')

    const insertValueAutocompleteForIdno = useCallback((event: any) => {
      event.preventDefault()
      const at = findPath(editor, firstChild)
      if (at && event.target && event.target !== '') {
        insertSlateText(editor, event.target.outerText, at)
      }
    }, [])

    const insertTextForIdno = useCallback((event: any) => {
      event.preventDefault()
      const at = findPath(editor, firstChild)
      if (event.target && event.target.value !== '' && at) {
        setError(false)
        insertSlateText(editor, event.target.value, at)
      } else {
        setError(true)
      }
    }, [])

    useEffect(() => {
      if (error && !readOnly) {
        const stringToCut = '#document-TEI-text-body-'
        dispatch(
          updateSaveAllowed({
            allowed: false,
            errorMessage: t('editor.invalid_fields', {
              path: path.slice(stringToCut.length),
            }),
          })
        )
      } else {
        dispatch(updateSaveAllowed({ allowed: true, errorMessage: '' }))
      }
    }, [error, readOnly])

    return readOnly ? (
      <NoneEditableTwoColumnElement label={t('editor.idno')}>
        {children}
      </NoneEditableTwoColumnElement>
    ) : (
      <Grid container className={'small-bottom-gab'}>
        <Grid item xs={3} style={{ display: 'table' }}>
          <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            {t('editor.idno')}:{' '}
          </span>
        </Grid>
        <Grid item xs={8}>
          <Autocomplete
            onChange={insertValueAutocompleteForIdno}
            value={extractText(element)}
            options={signaturen}
            freeSolo={!path || path.includes(TEI_ELEMENT_ALT_IDENTIFIER)}
            fullWidth={false}
            disableClearable={true}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                autoFocus={true}
                {...params}
                error={error}
                onChange={insertTextForIdno}
                helperText={error ? t('editor.idno_not_empty') : ''}
                variant="filled"
                size="small"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    className: 'autocomplete-input-style',
                  },

                  inputLabel: {
                    className: 'label-styles-text-field-input-label',
                  },
                }}
              />
            )}
            slots={{
              popper: FullscreenPopper,
            }}
          />
          <span style={{ display: 'none' }}>{children}</span>
        </Grid>
        <Grid item xs={1}>
          {!path || path.includes(TEI_ELEMENT_ALT_IDENTIFIER) ? (
            <DeleteSlateNodeButton element={element} />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    )
  }
)
