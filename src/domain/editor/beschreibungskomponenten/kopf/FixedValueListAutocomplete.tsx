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
import { FC, memo, SyntheticEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Element as ScrollAnchor } from 'react-scroll'
import { Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import {
  extractFirstText,
  findPath,
  insertSlateText,
} from '../../../../infrastructure/slate/SlateBoundary'
import { FullscreenPopper } from '../../../erfassung/FullscreenPopper'
import { DeleteSlateNodeButton } from '../../DeleteSlateNodeButton'
import { getOptionStr } from '../BeschreibungsKomponentenCustomHooks'
import { HilfeButton, HilfeText } from '../hilfetexte'

interface Props {
  termElement: Element
  leftSidelabel: string
  optionsArray: string[]
  useDeleteButton?: boolean
  paddingLeft?: string
  disabled?: boolean
  helpText?: string
  helpTextContainer?: string
}

export const FixedValueListAutocomplete: FC<Props> = memo(
  ({
    termElement,
    leftSidelabel,
    optionsArray,
    useDeleteButton,
    paddingLeft,
    disabled,
    helpText,
  }) => {
    const [showHelpText, setShowHelpText] = useState(false)
    const { t } = useTranslation()
    const { error, id, data_type } = termElement as any

    const [termElementTEITextValue, setTermElementTEITextValue] = useState(
      extractFirstText(termElement)
    )
    const editor = useSlateStatic()

    const insertTextAutoComplete = useCallback(
      (event: SyntheticEvent, value: any) => {
        event.preventDefault()
        value = value || ''

        const path = findPath(editor, termElement)
        if (path) {
          insertSlateText(editor, value, path)
          setTermElementTEITextValue(value)
        }
      },
      [editor, setTermElementTEITextValue, termElement]
    )

    const handleClick = useCallback(
      (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        setShowHelpText(!showHelpText)
      },
      [showHelpText]
    )

    if (
      data_type === 'format' ||
      data_type === 'material_type' ||
      data_type === 'status' ||
      data_type === 'form'
    ) {
      return (
        <Grid container className={'small-bottom-gab'}>
          <Grid
            item
            xs={3}
            style={{
              display: 'table',
              paddingLeft: paddingLeft ?? 0,
            }}
          >
            <span
              className={
                !showHelpText
                  ? 'align-display-table-cell-vertical-align'
                  : undefined
              }
              style={{
                color: !error ? 'inherit' : '#aa2e25',
              }}
            >
              <ScrollAnchor name={id}>
                {leftSidelabel}:{' '}
                {helpText && (
                  <HilfeButton onClick={handleClick} activated={showHelpText} />
                )}
              </ScrollAnchor>
            </span>
          </Grid>
          <Grid item xs={8}>
            {showHelpText && <HilfeText helpText={helpText} />}
            {
              <Autocomplete
                options={optionsArray}
                classes={{
                  option: 'autocomplete-option-style',
                  paper: 'autocomplete-paper-style',
                }}
                value={termElementTEITextValue}
                getOptionLabel={(option: string) =>
                  t(data_type + '.' + getOptionStr(option))
                }
                isOptionEqualToValue={() => true}
                disabled={disabled}
                onChange={insertTextAutoComplete}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    variant="filled"
                    title={data_type}
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
            }
          </Grid>
          <Grid item xs={1}>
            {useDeleteButton && <DeleteSlateNodeButton element={termElement} />}
          </Grid>
        </Grid>
      )
    }
    return null
  }
)
