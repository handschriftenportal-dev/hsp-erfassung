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

import { css } from '@emotion/react'
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import { FC, memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import { ErfassungsRules } from '../../../../../infrastructure/slate/ErfassungsRules'
import {
  extractFirstText,
  findPath,
  insertSlateText,
} from '../../../../../infrastructure/slate/SlateBoundary'
import { selectBeschreibungsSubtype } from '../../../../erfassung/ErfassungsState'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { AddIndexElementButton } from '../AddIndexElementButton'
import { useInsertNewTEINodeForIndex } from '../HeadCustomHooks'
import { SimpleTextField } from './SimpleTextField'

interface Props {
  element: Element
}

const labelStyle = css({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '24px',
})

export const Dimensions: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic()
  const { t } = useTranslation()
  const { data_indexName } = element as any
  const termElements = element.children
  const [
    termDimensions,
    termHeight,
    termWidth,
    termDepth,
    termInformationType,
  ] = termElements as Element[]
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  const repeatable =
    ErfassungsRules?.[beschreibungSubtype]?.erfassungsElemente[
      'index' + data_indexName
    ]?.repeatable || false

  const useAddNewDimensionIndexElement = useInsertNewTEINodeForIndex(
    data_indexName,
    editor,
    termDimensions
  )

  const [radioGroupValue, setRadioGroupValue] = useState(
    termInformationType ? extractFirstText(termInformationType) : ''
  )

  const handleClick = useCallback(
    (event: any) => {
      event.preventDefault()
      const at = findPath(editor, termInformationType)
      if (at) {
        const value =
          event.target.value === radioGroupValue ? '' : event.target.value
        setRadioGroupValue(value)
        insertSlateText(editor, value, at)
      }
    },
    [editor, termInformationType, radioGroupValue]
  )

  return (
    <Grid className={'big-top-gab'} container>
      <Grid item xs={12} className={'small-bottom-gab'}>
        <TitleTwoColumnElement
          element={element}
          title={t('editor.dimensions')}
          showDelete={true}
          helpText={t('editor.help_text.dimension')}
        />
      </Grid>
      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
        <Grid style={{ display: 'flex' }} item xs={12}>
          <Grid css={labelStyle} item xs={3}>
            {t('editor.dimensions_label')}:
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <SimpleTextField
                  termElement={termDimensions}
                  label={t('editor.free_text')}
                />
              </Grid>
              <Grid item xs={2}>
                <SimpleTextField
                  termElement={termHeight}
                  label={t('editor.height')}
                />
              </Grid>
              <Grid item xs={2}>
                <SimpleTextField
                  termElement={termWidth}
                  label={t('editor.width')}
                />
              </Grid>
              <Grid item xs={2}>
                <SimpleTextField
                  termElement={termDepth}
                  label={t('editor.depth')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={9}>
            <FormControl
              variant="standard"
              style={{ display: 'flex' }}
              component="fieldset"
            >
              <RadioGroup
                value={radioGroupValue}
                row
                aria-label={t('editor.dimensions')}
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  style={{ marginRight: '100px' }}
                  value="factual"
                  control={<Radio onClick={handleClick} />}
                  label={t('editor.factual')}
                />
                <FormControlLabel
                  value="deduced"
                  control={<Radio onClick={handleClick} />}
                  label={t('editor.deduced')}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {repeatable && (
        <Grid item xs={11}>
          <AddIndexElementButton
            element={element}
            insertNewErfassungsElementNode={useAddNewDimensionIndexElement}
            buttonLabel={t('editor.dimensions')}
          />
        </Grid>
      )}
    </Grid>
  )
})
