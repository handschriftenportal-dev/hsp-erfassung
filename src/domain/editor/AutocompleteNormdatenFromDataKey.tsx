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
import { createFilterOptions } from '@mui/material/useAutocomplete'
import { cloneDeep } from 'lodash'
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Element, Text } from 'slate'
import { useSlateStatic } from 'slate-react'

import {
  deleteSlate,
  findPath,
  insertSlateNodes,
} from '../../infrastructure/slate/SlateBoundary'
import { FullscreenPopper } from '../erfassung/FullscreenPopper'
import { GNDEntityFact } from '../erfassung/GNDEntityFact'
import { DeleteSlateNodeButton } from './DeleteSlateNodeButton'
import { getUrlForGndId } from './normdaten/dialog/NormdatenDialogUtilities'
import {
  fetchGNDEntitiesByNode,
  useNormdatenFindById,
} from './normdaten/useNormdaten'

interface Props {
  element: Element
  title: string
  origin: string
  required: boolean
}

export const AutocompleteNormdatenFromDataKey: FC<Props> = ({
  element,
  origin,
  title,
  required,
}) => {
  const [gndEntities, setGndEntities] = useState<GNDEntityFact[]>([])
  const { t } = useTranslation()
  const editor = useSlateStatic()
  const dispatch = useDispatch()
  const { data_key } = element as any

  const [autoCompleteGndEntity, setAutoCompleteGndEntity] =
    useState<GNDEntityFact>(GNDEntityFact.new({ id: data_key || '' }))

  useNormdatenFindById(data_key || 'missing_datakey', setAutoCompleteGndEntity)

  const findGNDEntitiesByOrigin = useCallback(
    (
      _event: any,
      setGndEntities: Dispatch<SetStateAction<GNDEntityFact[]>>,
      origin: string
    ) => {
      if (
        autoCompleteGndEntity !== null &&
        autoCompleteGndEntity.preferredName !== ''
      ) {
        setGndEntities([autoCompleteGndEntity])
      } else {
        fetchGNDEntitiesByNode(origin, setGndEntities, '')
      }
    },
    [autoCompleteGndEntity]
  )

  function getOptionLabelStr({ preferredName }: GNDEntityFact): string {
    return preferredName
  }

  function createAdjustedElement(value: GNDEntityFact): Element {
    const { id, preferredName, gndIdentifier } = value
    const newElement: any = cloneDeep(element)
    newElement.data_key = id
    if (gndIdentifier) {
      newElement.data_ref = getUrlForGndId(gndIdentifier)
    }
    if (Text.isText(newElement.children[0])) {
      newElement.children[0].text = preferredName
    }

    return newElement
  }

  function insertTextAutoComplete(_event: any, value: GNDEntityFact): void {
    const elementPath = findPath(editor, element)
    if (elementPath && value) {
      fetchGNDEntitiesByNode(origin, setGndEntities, '')
      const adjustedElement = createAdjustedElement(value)
      const { id, data_origin } = adjustedElement as any
      deleteSlate(editor, elementPath, id, data_origin, dispatch)
      insertSlateNodes(editor, adjustedElement, elementPath, dispatch)
    }

    setAutoCompleteGndEntity(value)
  }

  return (
    <Grid container>
      <Grid item xs={3} style={{ display: 'table', paddingLeft: '24px' }}>
        <span className={'align-display-table-cell-vertical-align'}>
          {title}:{' '}
        </span>
      </Grid>
      <Grid item xs={8}>
        {
          <Autocomplete
            options={gndEntities}
            classes={{
              option: 'autocomplete-option-style',
              paper: 'autocomplete-paper-style',
            }}
            value={autoCompleteGndEntity}
            isOptionEqualToValue={() => true}
            onOpen={(event) =>
              findGNDEntitiesByOrigin(event, setGndEntities, origin)
            }
            disablePortal={true}
            getOptionLabel={(option: GNDEntityFact) =>
              option ? getOptionLabelStr(option) : ''
            }
            onChange={(event, value) =>
              insertTextAutoComplete(event, value || GNDEntityFact.new())
            }
            filterOptions={createFilterOptions({
              ignoreCase: true,
              trim: true,
              stringify: (option: GNDEntityFact) => option.preferredName,
            })}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="filled"
                label={t('text_tagging.referenz.dialog.normdata_link')}
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
        {!required && <DeleteSlateNodeButton element={element} />}
      </Grid>
    </Grid>
  )
}
