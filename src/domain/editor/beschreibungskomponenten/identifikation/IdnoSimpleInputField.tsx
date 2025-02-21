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

import { Grid } from '@mui/material'
import { FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { extractFirstText } from '../../../../infrastructure/slate/SlateBoundary'
import {
  selectReadOnly,
  updateSaveAllowed,
} from '../../../erfassung/ErfassungsState'
import { EditableTextfieldTwoColumnElement } from '../../EditableTextfieldTwoColumnElement'
import { NoneEditableTwoColumnElementJSX } from '../../NoneEditableTwoColumnElementJSX'

interface Props {
  props: any
  title: string
  required: boolean
  helpertext?: string
  empty?: boolean
}

export const IdnoSimpleInputField: FC<Props> = memo(
  ({ props, title, required, helpertext, empty }) => {
    const { t } = useTranslation()
    const readOnly = useSelector(selectReadOnly)
    const dispatch = useDispatch()
    const textContent = extractFirstText(props.element)
    const error = textContent === '' && !empty

    useEffect(() => {
      if (error) {
        const stringPath: string = props.element.path
        const stringToCut = '#document-TEI-text-body-'
        dispatch(
          updateSaveAllowed({
            allowed: false,
            errorMessage: t('editor.invalid_fields', {
              path: stringPath.slice(stringToCut.length),
            }),
          })
        )
      } else {
        dispatch(updateSaveAllowed({ allowed: true, errorMessage: '' }))
      }
    }, [error])

    return !readOnly ? (
      <Grid className={'small-bottom-gab'} container>
        <EditableTextfieldTwoColumnElement
          helpertext={helpertext}
          error={error}
          label={title}
          element={props.element}
          marginTop={''}
          deletable={!required}
          paddingLeft={'24px'}
        />
      </Grid>
    ) : (
      <Grid container>
        <NoneEditableTwoColumnElementJSX label={title}>
          {textContent}
        </NoneEditableTwoColumnElementJSX>
      </Grid>
    )
  }
)
