import { TextField } from '@mui/material'
import { createFilterOptions } from '@mui/material/useAutocomplete'
import type { Dispatch, FC, SetStateAction, SyntheticEvent } from 'react'
import { useCallback } from 'react'
import type { Editor, Element } from 'slate'
import { createOptionLabel } from 'src/domain/editor/beschreibungskomponenten/BeschreibungsKomponentenCustomHooks'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import { FullscreenPopper } from 'src/domain/erfassung/FullscreenPopper'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import type { NodeLabel } from 'src/domain/erfassung/NormdatenService'
import { GRUNDSPRACHE_NORMDATUM } from 'src/domain/erfassung/TEIConstants'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'
import {
  findPath,
  insertSlateText,
  updateNodes,
} from 'src/infrastructure/slate/SlateBoundary'

import { fetchGNDEntitiesByNode } from './useNormdaten'

interface Props {
  gndOptions: GNDEntityFact[]
  gndOptionsSetter: Dispatch<SetStateAction<GNDEntityFact[]>>
  origin: NodeLabel
  termElement: Element
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
      if (path === undefined) {
        return
      }
      const { gndIdentifier, id, preferredName } = gndEntity
      const { data_type } = termElement
      const text =
        data_type === GRUNDSPRACHE_NORMDATUM
          ? (gndIdentifier ?? id)
          : preferredName
      updateNodes(
        editor,
        {
          data_ref: NormdatenUtilities.idToUrl(gndIdentifier ?? id),
          data_key: id,
        },
        path
      )
      insertSlateText(editor, text, path)
      setAutoCompleteGndEntity(gndEntity)
    },
    [editor, setAutoCompleteGndEntity, termElement]
  )

  return (
    <TranslatedAutocomplete
      options={gndOptions.sort(
        (a, b) => -b.preferredName.localeCompare(a.preferredName)
      )}
      classes={{
        option: 'autocomplete-option-style',
        paper: 'autocomplete-paper-style',
      }}
      value={autoCompleteGndEntity}
      isOptionEqualToValue={() => true}
      onOpen={(event) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement
        if (target && target.value !== '') {
          fetchGNDEntitiesByNode({ nodeLabel: origin }).then(gndOptionsSetter)
        }
      }}
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
              window.open(
                NormdatenUtilities.idToUrl(option.gndIdentifier ?? option.id),
                '_blank'
              )
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
