import {
  Box,
  Button,
  createFilterOptions,
  InputAdornment,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImportiereNormdatumDialog } from 'src/domain/editor/dialoge/ImportiereNormdatumDialog'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { HSPLink } from 'src/infrastructure/components/HSPLink'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { APICall } from 'src/infrastructure/normdaten/APICall'
import { SBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { colors } from 'src/theme'

import type { Normdatum, NormdatumDialogState } from './NormdatumDialogState'

interface Props {
  afterImport: (fact?: GNDEntityFact) => void
  onSearchChange: (value: string) => void
  onChange: (entity: Normdatum | null) => void
  state: NormdatumDialogState
  label?: string
}

const DEBOUNCE_TIME_MS = 1000
const MIN_SEARCH_TERM_LENGTH = 3
const NO_VALUE = {
  preferredName: '',
  gndIdentifier: '',
}

const GND_TAB_TARGET = 'gnd-target'

export const NormdatumAutocompleteSearch: FC<Props> = ({
  afterImport,
  onChange,
  onSearchChange,
  state,
  label,
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
        state.search.length >= MIN_SEARCH_TERM_LENGTH &&
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
                        gndIdentifier: gndIdentifier ?? identifier,
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
    <TranslatedAutocomplete
      fullWidth
      noOptionsText={t('text_tagging.referenz.dialog.no_options')}
      options={normdaten}
      value={normdatum}
      isOptionEqualToValue={() => true}
      clearOnBlur={false}
      onBlurCapture={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
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
        <ListItem
          {...props}
          key={option.gndIdentifier}
          secondaryAction={
            <HSPLink
              url={NormdatenUtilities.idToUrl(option.gndIdentifier)}
              target={GND_TAB_TARGET}
            >
              {option.gndIdentifier}
            </HSPLink>
          }
        >
          <ListItemText>{option.preferredName}</ListItemText>
        </ListItem>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label ?? t('text_tagging.referenz.dialog.normdata_link')}
          placeholder={t(
            'text_tagging.referenz.dialog.normdata_link_placeholder'
          )}
          fullWidth
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {'normdatum' in state && (
                    <InputAdornment position="end">
                      <HSPLink
                        url={NormdatenUtilities.idToUrl(
                          normdatum.gndIdentifier
                        )}
                        target={GND_TAB_TARGET}
                      >
                        {normdatum.gndIdentifier}
                      </HSPLink>
                    </InputAdornment>
                  )}
                </>
              ),
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
