/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React, { useCallback } from 'react'
import { Grid, makeStyles, TextField } from '@material-ui/core'
import { DeleteSlateNodeButton } from '../../DeleteSlateNodeButton'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { BaseEditor, Path } from 'slate'
import { findPath, insertSlateText } from '../../../../infrastructure/slate/SlateBoundary'
import i18next from 'i18next'
import { Autocomplete } from '@material-ui/lab'
import { getOptionStr } from '../BeschreibungsKomponentenCustomHooks'

/**
 * Author: Christoph Marten on 20.04.2022 at 11:00
 */

const useStyles = makeStyles({
  paper: {
    backgroundColor: '#F1F1F1'
  }
})

interface FixedValueListAutocompleteProps {
  termElement: any,
  leftSidelabel: string,
  optionsArray: string [],
  useDeleteButton?: boolean,
  paddingLeft?: string
  disabled?: boolean,
}

export const FixedValueListAutocomplete = React.memo(({
  termElement,
  leftSidelabel,
  optionsArray,
  useDeleteButton,
  paddingLeft,
  disabled
}: FixedValueListAutocompleteProps) => {

  const classes = useStyles()
  const internalLeftPadding = (paddingLeft) || '0px'

  const [termElementTEITextValue, setTermElementTEITextValue] = React.useState<string>(termElement && termElement.children && termElement.children[0].children ? termElement.children[0].children[0].text : '')
  const editor = useSlateStatic()
  const insertTextAutoComplete = useCallback((event: any, value: any, termElement: any, setAutoCompleteValue: any, editor: BaseEditor) => {
    if (event) {
      event.preventDefault()
    }

    const termElementTextPath: Path | null = findPath(editor as ReactEditor, termElement)
    if (value && termElementTextPath) {
      insertSlateText(editor, value, termElementTextPath)
      setAutoCompleteValue(value)
    }
  }, [])

  if (termElement.data_type === 'format' || termElement.data_type === 'material_type' || termElement.data_type === 'status' || termElement.data_type === 'form') {

    return <Grid className={'small-bottom-gab'} style={{ backgroundColor: 'inherit' }} container>
      <Grid contentEditable={false} item xs={3} style={{ display: 'table', paddingLeft: internalLeftPadding }}>
        <span className={'align-display-table-cell-vertical-align'}>{leftSidelabel}: </span>
      </Grid>
      <Grid style={{ backgroundColor: 'inherit' }} item xs={7}>
        {
          <Autocomplete
              options={optionsArray}
              classes={{ paper: classes.paper }}
              value={termElementTEITextValue}
              getOptionLabel={(option: string) => i18next.t(termElement.data_type + '.' + getOptionStr(option))}
              getOptionSelected={() => true}
              disabled={disabled}
              onChange={(event, value) => insertTextAutoComplete(event, (value) || null, termElement, setTermElementTEITextValue, editor)}
              renderInput={(params) => <TextField {...params} variant="filled" title={termElement.data_type}
                                                  InputProps={{
                                                    ...params.InputProps,
                                                    className: 'input-fields-background-color'
                                                  }}/>}
          />
        }
      </Grid>
      {useDeleteButton && <DeleteSlateNodeButton node={termElement}/>}
    </Grid>
  }
  return null
})
