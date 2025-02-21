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

import { Autocomplete, TextField } from '@mui/material'
import { createFilterOptions } from '@mui/material/useAutocomplete'
import {
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useCallback,
} from 'react'
import { BaseElement, Editor } from 'slate'

import {
  findPath,
  insertSlateText,
  updateNodes,
} from '../../../infrastructure/slate/SlateBoundary'
import { FullscreenPopper } from '../../erfassung/FullscreenPopper'
import { GNDEntityFact } from '../../erfassung/GNDEntityFact'
import { createOptionLabel } from '../beschreibungskomponenten/BeschreibungsKomponentenCustomHooks'
import { ORIG_PLACE_DATA_TYPE } from '../beschreibungskomponenten/kopf/indexd/OrigPlace'
import { getUrlForGndId } from './dialog/NormdatenDialogUtilities'
import { fetchGNDEntitiesByNode } from './useNormdaten'

interface Props {
  gndOptions: GNDEntityFact[]
  gndOptionsSetter: Dispatch<SetStateAction<GNDEntityFact[]>>
  origin: string
  termElement: any
  editor: Editor
  autoCompleteGndEntity: GNDEntityFact
  setAutoCompleteGndEntity: Dispatch<SetStateAction<GNDEntityFact>>
}

export const NormdatenAutocomplete: FC<Props> = ({
  gndOptions,
  gndOptionsSetter,
  origin,
  termElement,
  editor,
  autoCompleteGndEntity,
  setAutoCompleteGndEntity,
}) => {
  const insertGNDEntityInSlate = useCallback(
    (event: SyntheticEvent, gndEntity: GNDEntityFact | null): void => {
      event.preventDefault()

      if (gndEntity === null) {
        return
      }
      const path = findPath(editor, termElement)
      if (path === null) {
        return
      }

      const { gndIdentifier, id, preferredName } = gndEntity

      if (termElement.data_type === ORIG_PLACE_DATA_TYPE) {
        updateNodes(
          editor,
          {
            data_ref: getUrlForGndId(gndIdentifier),
            data_key: id,
          } as Partial<BaseElement>,
          path
        )
        insertSlateText(editor, preferredName, path)
      } else {
        insertSlateText(editor, gndIdentifier, path)
      }
      setAutoCompleteGndEntity(gndEntity)
    },
    []
  )

  const findGNDEntitiesByOrigin = useCallback(
    (event: any, setGndEntities: Dispatch<SetStateAction<GNDEntityFact[]>>) => {
      event.preventDefault()
      if (event.target && event.target !== '') {
        fetchGNDEntitiesByNode(origin, setGndEntities, '')
      }
    },
    []
  )

  return (
    <Autocomplete
      options={gndOptions.sort(
        (a, b) => -b.preferredName.localeCompare(a.preferredName)
      )}
      classes={{
        option: 'autocomplete-option-style',
        paper: 'autocomplete-paper-style',
      }}
      value={autoCompleteGndEntity}
      isOptionEqualToValue={() => true}
      onOpen={(event) => findGNDEntitiesByOrigin(event, gndOptionsSetter)}
      getOptionLabel={(option: GNDEntityFact) =>
        option ? createOptionLabel(option) : ''
      }
      onChange={insertGNDEntityInSlate}
      filterOptions={createFilterOptions({
        stringify: (option: GNDEntityFact) => option.preferredName,
      })}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="filled"
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
      renderOption={(props: object, option: GNDEntityFact) => (
        <li {...props}>
          {option.preferredName}
          <a
            className={'hsp-autocomplete-link-color'}
            onClick={(event) => {
              event.stopPropagation()
              window.open(getUrlForGndId(option.gndIdentifier), '_blank')
            }}
          >
            {option.gndIdentifier}
          </a>
        </li>
      )}
      slots={{
        popper: FullscreenPopper,
      }}
    />
  )
}
