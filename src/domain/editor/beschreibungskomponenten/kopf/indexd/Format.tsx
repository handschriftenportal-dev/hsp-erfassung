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
import { FixedValueListAutocomplete } from '../FixedValueListAutocomplete'
import { useInsertNewTEINodeForIndex } from '../HeadCustomHooks'

interface Props {
  element: Element
}

export const Format: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic()
  const { t } = useTranslation()
  const { children, data_indexName, id } = element as any
  const termElements = children
  const [format, formatType] = termElements
  const useInsertNewFormatElement = useInsertNewTEINodeForIndex(
    data_indexName,
    editor,
    format
  )
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  const repeatable =
    ErfassungsRules[beschreibungSubtype].erfassungsElemente[
      'index' + data_indexName
    ].repeatable

  const [radioGroupValue, setRadioGroupValue] = useState(
    formatType ? extractFirstText(formatType) : ''
  )

  const handleClick = useCallback(
    (event: any) => {
      event.preventDefault()
      const at = findPath(editor, formatType)
      if (at) {
        const value =
          event.target.value === radioGroupValue ? '' : event.target.value
        setRadioGroupValue(value)
        insertSlateText(editor, value, at)
      }
    },
    [editor, formatType, radioGroupValue]
  )

  return (
    <div id={id} key={id}>
      <Grid className={'big-top-gab'} container>
        <Grid item xs={12} className={'small-bottom-gab'}>
          <TitleTwoColumnElement
            element={element}
            title={t('editor.format')}
            showDelete={true}
            helpText={t('editor.help_text.format')}
          />
        </Grid>

        <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
          <Grid style={{ display: 'flex' }} item xs={12}>
            <FixedValueListAutocomplete
              paddingLeft={'24px'}
              leftSidelabel={t('editor.format')}
              key={format.id}
              termElement={format}
              optionsArray={
                ErfassungsRules[beschreibungSubtype].erfassungsElemente[
                  'term' + format.data_type
                ].values
              }
            />
          </Grid>
          <Grid container>
            <Grid item xs={3} />
            <Grid item xs={8}>
              <FormControl
                variant="standard"
                style={{ display: 'flex' }}
                component="fieldset"
              >
                <RadioGroup
                  value={radioGroupValue}
                  row
                  aria-label={t('editor.format')}
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
              insertNewErfassungsElementNode={useInsertNewFormatElement}
              buttonLabel={t('editor.format')}
            />
          </Grid>
        )}
      </Grid>
    </div>
  )
})
