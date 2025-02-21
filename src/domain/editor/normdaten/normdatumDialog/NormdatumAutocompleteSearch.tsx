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
  Autocomplete,
  Box,
  Button,
  createFilterOptions,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobalModalContext } from '../../../../infrastructure/modal/GlobalModal'
import { APICall } from '../../../../infrastructure/normdaten/APICall'
import { SBBNormdatenServiceAdapter } from '../../../../infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { colors } from '../../../../theme'
import { GNDEntityFact } from '../../../erfassung/GNDEntityFact'
import { getUrlForGndId } from '../dialog/NormdatenDialogUtilities'
import { ImportiereNormdatumDialog } from '../importiereNormdatumDialog/ImportiereNormdatumDialog'
import { Normdatum, NormdatumDialogState } from './NormdatumDialogState'

interface Props {
  afterImport: (fact?: GNDEntityFact) => void
  onSearchChange: (value: string) => void
  onChange: (entity: Normdatum | null) => void
  state: NormdatumDialogState
}

const DEBOUNCE_TIME_MS = 1000
const MIN_SEARCH_TERM_LENGTH = 3
const NO_VALUE = {
  preferredName: '',
  gndIdentifier: '',
}

export const NormdatumAutocompleteSearch: FC<Props> = ({
  afterImport,
  onChange,
  onSearchChange,
  state,
}) => {
  const { t } = useTranslation()
  const { showModal } = useGlobalModalContext()
  const [normdaten, setNormdaten] = useState<Normdatum[]>([])
  const [lastSearch, setLastSearch] = useState('')

  const normdatum =
    'normdatum' in state ? (state.normdatum ?? NO_VALUE) : NO_VALUE

  useEffect(() => {
    const getEntities = setTimeout(() => {
      if (
        state.status === 'search' &&
        state.search.length > MIN_SEARCH_TERM_LENGTH &&
        state.search !== lastSearch
      ) {
        SBBNormdatenServiceAdapter.findGNDEntity(state.type, state.search)
          .then((response) => {
            setNormdaten(
              APICall.isSuccess(response)
                ? response.value
                    .map(
                      ({ id: identifier, preferredName, gndIdentifier }) => ({
                        identifier,
                        preferredName,
                        gndIdentifier,
                      })
                    )
                    .sort((a, b) =>
                      a.preferredName.localeCompare(b.preferredName)
                    )
                : []
            )
            setLastSearch(state.search)
          })
          .catch((error) => {
            console.error(error)
            setNormdaten([])
          })
      }
    }, DEBOUNCE_TIME_MS)

    return () => clearTimeout(getEntities)
  }, [state, setNormdaten, lastSearch])

  return (
    <Autocomplete
      fullWidth
      noOptionsText={t('text_tagging.referenz.dialog.no_options')}
      options={normdaten}
      value={normdatum}
      isOptionEqualToValue={() => true}
      clearOnBlur={false}
      getOptionLabel={(normdatum) => normdatum?.preferredName ?? ''}
      onInputChange={(event, value) => {
        if (event) {
          onSearchChange(value)
        }
      }}
      onChange={(event, value) => {
        event.preventDefault()
        onChange(value)
      }}
      filterOptions={createFilterOptions({
        matchFrom: 'any',
        stringify: (option) => option.preferredName,
      })}
      renderOption={(props: object, option: Normdatum) => (
        <li {...props} key={option.gndIdentifier}>
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
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={t('text_tagging.referenz.dialog.normdata_link')}
          fullWidth
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {'normdatum' in state && (
                    <InputAdornment position="end">
                      <span>
                        <a
                          target="_blank"
                          href={getUrlForGndId(normdatum.gndIdentifier)}
                        >
                          {normdatum.gndIdentifier}
                        </a>
                      </span>
                    </InputAdornment>
                  )}
                </>
              ),
            },

            inputLabel: {
              className: 'label-styles-text-field-input-label',
            },
          }}
        />
      )}
      slots={{
        paper: ({ children, ...paperProps }) => (
          <Paper {...paperProps}>
            {children}

            <Box
              onMouseDown={(e) => e.preventDefault()}
              px={1.5}
              py={0.5}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.greyscale.lightGrey,
              }}
            >
              <Typography sx={{ fontSize: 16 }} color="text.primary">
                {t('text_tagging.referenz.dialog.add_normdatum_text')}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  showModal(
                    <ImportiereNormdatumDialog
                      back={afterImport}
                      normdatumTyp={state.type}
                      initialSearchTerm={
                        'search' in state ? state.search : state.text
                      }
                    />
                  )
                }}
                style={{
                  color: colors.greyscale.white,
                  backgroundColor: colors.primary.darkTerraCotta,
                }}
                size="small"
              >
                {t('text_tagging.referenz.dialog.add_normdatum_button')}
              </Button>
            </Box>
          </Paper>
        ),
      }}
    />
  )
}
