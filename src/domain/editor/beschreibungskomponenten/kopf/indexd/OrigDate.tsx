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
  TextField,
} from '@mui/material'
import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import { ErfassungsRules } from '../../../../../infrastructure/slate/ErfassungsRules'
import {
  createInsertTextChangeEventHandler,
  extractFirstText,
} from '../../../../../infrastructure/slate/SlateBoundary'
import { selectBeschreibungsSubtype } from '../../../../erfassung/ErfassungsState'
import { EditableTextfieldTwoColumnElement } from '../../../EditableTextfieldTwoColumnElement'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { AddIndexElementButton } from '../AddIndexElementButton'
import { useInsertNewTEINodeForIndex } from '../HeadCustomHooks'

interface Props {
  element: Element
}

export const OrigDate: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic()
  const { t } = useTranslation()
  const { data_indexName } = element as any
  const [origDate, notBefore, notAfter, dateType] =
    element.children as Element[]
  const { id } = origDate as any
  const useInsertNewOrigDateElement = useInsertNewTEINodeForIndex(
    data_indexName,
    editor,
    origDate
  )
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  const repeatable =
    ErfassungsRules[beschreibungSubtype]?.erfassungsElemente?.[
      'index' + data_indexName
    ]?.repeatable || false
  const notBeforeValue = extractFirstText(notBefore)
  const notAfterValue = extractFirstText(notAfter)
  const dateTypeValue = extractFirstText(dateType)

  const handleOrigDateTypeEvent = useCallback(
    createInsertTextChangeEventHandler(editor, dateType),
    [dateType, editor]
  )

  return (
    <div id={id} key={id}>
      <Grid className={'big-top-gab'} container>
        <Grid item xs={12} className={'small-bottom-gab'}>
          <TitleTwoColumnElement
            element={element}
            title={t('editor.orig_date')}
            showDelete={true}
            helpText={t('editor.help_text.orig_date')}
          />
        </Grid>

        <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
          <Grid style={{ display: 'flex' }} item xs={12}>
            <EditableTextfieldTwoColumnElement
              marginBottom={'12px'}
              label={t('editor.free_text')}
              paddingLeft={'24px'}
              element={origDate}
            />
          </Grid>
          <Grid style={{ display: 'flex' }} item xs={12}>
            <Grid item xs={3} />
            <Grid style={{ paddingRight: '2%' }} item xs={2}>
              <TextField
                label={t('editor.not_before')}
                onChange={createInsertTextChangeEventHandler(editor, notBefore)}
                defaultValue={notBeforeValue}
                size="small"
                variant="filled"
                slotProps={{
                  input: { className: 'text-field-input-style' },

                  inputLabel: {
                    className: 'label-styles-text-field-input-label',
                  },
                }}
              />
            </Grid>
            <Grid style={{ paddingRight: '2%' }} item xs={2}>
              <TextField
                label={t('editor.not_after')}
                onChange={createInsertTextChangeEventHandler(editor, notAfter)}
                defaultValue={notAfterValue}
                size="small"
                variant="filled"
                slotProps={{
                  input: { className: 'text-field-input-style' },

                  inputLabel: {
                    className: 'label-styles-text-field-input-label',
                  },
                }}
              />
            </Grid>
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
                  value={dateTypeValue}
                  row
                  aria-label={t('editor.origTime')}
                  name="orig-time-row-radio-buttons-group"
                >
                  <FormControlLabel
                    style={{ marginRight: '100px' }}
                    value="datable"
                    control={<Radio onChange={handleOrigDateTypeEvent} />}
                    label={t('editor.datable')}
                  />
                  <FormControlLabel
                    value="dated"
                    control={<Radio onChange={handleOrigDateTypeEvent} />}
                    label={t('editor.dated')}
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
              insertNewErfassungsElementNode={useInsertNewOrigDateElement}
              buttonLabel={t('editor.orig_date')}
            />
          </Grid>
        )}
      </Grid>
    </div>
  )
})
