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
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Element } from 'slate'

import { EditableTextfieldTwoColumnElement } from '../../../EditableTextfieldTwoColumnElement'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'

interface Props {
  element: Element
}

export const Measure: FC<Props> = memo(({ element }) => {
  const { t } = useTranslation()
  const [freeText, sheetCount] = element.children as Element[]
  const freeTextId = (freeText as any).id
  const sheetCountId = (sheetCount as any).id

  return (
    <Grid className={'big-top-gab'} container>
      <Grid item xs={12} className={'small-bottom-gab'}>
        <TitleTwoColumnElement
          element={element}
          title={t('editor.measure')}
          showDelete={false}
          helpText={t('editor.help_text.measure')}
        />
      </Grid>
      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
        <Grid key={freeTextId} className={'small-bottom-gab'} container>
          <EditableTextfieldTwoColumnElement
            label={t('editor.free_text')}
            element={freeText}
            deletable={false}
            error={false}
            paddingLeft={'24px'}
          />
        </Grid>
        <Grid key={sheetCountId} className={'small-bottom-gab'} container>
          <EditableTextfieldTwoColumnElement
            label={t('editor.sheet_count')}
            element={sheetCount}
            deletable={false}
            error={false}
            paddingLeft={'24px'}
          />
        </Grid>
      </Grid>
    </Grid>
  )
})
