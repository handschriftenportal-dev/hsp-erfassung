import { Grid, TextField } from '@mui/material'
import { createFilterOptions } from '@mui/material/useAutocomplete'
import { cloneDeep } from 'lodash'
import type { Dispatch, FC, SetStateAction, SyntheticEvent } from 'react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import type { Element } from 'slate'
import { Text } from 'slate'
import { useSlateStatic } from 'slate-react'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import { FullscreenPopper } from 'src/domain/erfassung/FullscreenPopper'
import { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import type { NodeLabel } from 'src/domain/erfassung/NormdatenService'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'
import {
  deleteSlate,
  findPath,
  insertSlateNodes,
} from 'src/infrastructure/slate/SlateBoundary'

import { DeleteSlateNodeButton } from './DeleteSlateNodeButton'
import {
  fetchGNDEntitiesByNode,
  useNormdatenFindById,
} from './normdaten/useNormdaten'

interface Props {
  element: Element
  title: string
  origin: NodeLabel
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
  const { data_key } = element

  const [autoCompleteGndEntity, setAutoCompleteGndEntity] =
    useState<GNDEntityFact>(GNDEntityFact.new({ id: data_key || '' }))

  useNormdatenFindById(data_key || 'missing_datakey', setAutoCompleteGndEntity)

  const findGNDEntitiesByOrigin = useCallback(
    (
      _event: SyntheticEvent,
      setGndEntities: Dispatch<SetStateAction<GNDEntityFact[]>>,
      origin: NodeLabel
    ) => {
      if (
        autoCompleteGndEntity !== null &&
        autoCompleteGndEntity.preferredName !== ''
      ) {
        setGndEntities([autoCompleteGndEntity])
      } else {
        fetchGNDEntitiesByNode({ nodeLabel: origin }).then(setGndEntities)
      }
    },
    [autoCompleteGndEntity]
  )

  function getOptionLabelStr({ preferredName }: GNDEntityFact): string {
    return preferredName
  }

  function createAdjustedElement(value: GNDEntityFact): Element {
    const { id, preferredName, gndIdentifier } = value
    const newElement = cloneDeep(element)
    newElement.data_key = id
    if (gndIdentifier) {
      newElement.data_ref = NormdatenUtilities.idToUrl(gndIdentifier)
    }
    if (Text.isText(newElement.children[0])) {
      newElement.children[0].text = preferredName
    }

    return newElement as unknown as Element
  }

  function insertTextAutoComplete(
    _event: SyntheticEvent,
    value: GNDEntityFact
  ): void {
    const elementPath = findPath(editor, element)
    if (elementPath && value) {
      fetchGNDEntitiesByNode({ nodeLabel: origin }).then(setGndEntities)
      const adjustedElement = createAdjustedElement(value)
      const { id, data_origin } = adjustedElement
      if (id) {
        deleteSlate(editor, elementPath, id, data_origin, dispatch)
      }
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
          <TranslatedAutocomplete
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
            disablePortal
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
