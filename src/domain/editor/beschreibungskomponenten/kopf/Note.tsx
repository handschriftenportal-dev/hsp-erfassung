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
import { isEmpty } from 'lodash'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RenderElementProps } from 'slate-react'

import { extractFirstText } from '../../../../infrastructure/slate/SlateBoundary'
import { selectReadOnly } from '../../../erfassung/ErfassungsState'
import { TEI_ELEMENT_HEAD } from '../../../erfassung/TEIConstants'
import { BaseElement } from '../../BaseElement'
import { EditableTextfieldTwoColumnElement } from '../../EditableTextfieldTwoColumnElement'
import { NoneEditableTwoColumnElement } from '../../NoneEditableTwoColumnElement'

interface Props extends RenderElementProps {}

export const Note: FC<Props> = memo(({ element, children, attributes }) => {
  const readOnly = useSelector(selectReadOnly)
  const { t } = useTranslation()
  const { path = '', data_type } = element as any

  if (!path.includes(TEI_ELEMENT_HEAD)) {
    return <BaseElement attributes={attributes}>{children}</BaseElement>
  }
  if (data_type !== 'headline') {
    return null
  }

  if (readOnly) {
    const content = extractFirstText(element)
    if (isEmpty(content.trim())) {
      return null
    }
    return (
      <NoneEditableTwoColumnElement label={t('editor.headline')}>
        {children}
      </NoneEditableTwoColumnElement>
    )
  }

  return (
    <Grid container>
      <EditableTextfieldTwoColumnElement
        label={t('editor.headline')}
        element={element}
        deletable={false}
        error={false}
        marginBottom={'12px'}
        marginTop={''}
      />
    </Grid>
  )
})
