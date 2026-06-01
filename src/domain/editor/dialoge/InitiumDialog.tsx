import { OpenInNew } from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  DialogActions,
  DialogContent,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import { useCallback } from 'react'
import { memo } from 'react'
import { useReducer } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { DialogUtilities } from 'src/domain/editor/dialoge/DialogUtilities'
import { InitiumAnlegenDialog } from 'src/domain/editor/dialoge/InitiumAnlegenDialog'
import { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'
import { DetailView } from 'src/domain/editor/dialoge/initiumDialog/DetailView'
import { InitiumDialogReducer } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogReducer'
import { InitiumDialogState } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogState'
import { NotationChip } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/NotationChip'
import { DeleteWhiteIcon } from 'src/domain/editor/icons/DeleteWhiteIcon'
import {
  ActionCancelButton,
  ActionDetermineButton,
} from 'src/domain/editor/normdaten/styles/NormdatenStyle'
import { HSPRightButton } from 'src/domain/editor/styles/HSPRightButton'
import { selectUnbekannteSprache } from 'src/domain/erfassung/ErfassungsState'
import type { Initium } from 'src/domain/erfassung/Initium'
import { TranslatedText } from 'src/domain/erfassung/TranslatedText'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { APICall } from 'src/infrastructure/normdaten/APICall'
import { SBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { colors } from 'src/theme'

interface Props {
  initialState: InitiumDialogState
  onSave?: (text: string, initium: Initium) => void
  onDelete?: () => void
}

const DEBOUNCE_MS = 300

export const InitiumDialog: FC<Props> = memo(
  ({ initialState, onSave = console.warn, onDelete }) => {
    const { hideModal, showModal } = useGlobalModalContext()
    const { i18n, t } = useTranslation()

    const [state, dispatch] = useReducer(InitiumDialogReducer, initialState)

    const [options, setOptions] = useState<Initium[]>([])
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState(initialState.text)
    const [error, setError] = useState<string | null>(null)
    const abortControllerRef = useRef<AbortController | null>(null)
    const unbekannteSprache = useSelector(selectUnbekannteSprache)

    useEffect(() => {
      if (!InitiumDialogState.is.loadingFromTeiState(state)) {
        return
      }

      setLoading(true)
      SBBNormdatenServiceAdapter.findInitiumById(state.id)
        .then((result) => {
          if (APICall.isSuccess(result)) {
            dispatch({ type: 'set_initium', initium: result.value })
          } else {
            dispatch({ type: 'clear_initium' })
          }
        })
        .catch((error) => {
          dispatch({ type: 'set_error', reason: error.reason })
        })
        .finally(() => setLoading(false))
      // Handle the loadingFromIdState only during the first render
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      if (inputValue === '') {
        setOptions([])
        setError(null)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      abortControllerRef.current = new AbortController()
      const fetchData = () => {
        SBBNormdatenServiceAdapter.findInitiumByText(
          inputValue,
          abortControllerRef.current?.signal
        )
          .then((result) => {
            if (APICall.isSuccess(result)) {
              setOptions(result.value)
            } else if (APICall.isNotFound(result)) {
              setOptions([])
              setError(t('initium_dialog.not_found_error'))
            } else if (APICall.isFailed(result)) {
              setOptions([])
              setError(result.reason.error)
            }
          })
          .catch((error) => {
            if (error.name !== 'CanceledError' && error.name !== 'AbortError') {
              console.error('Error fetching data', error)
              setOptions([])
              setError(t('initium_dialog.network_error'))
              dispatch({ type: 'set_error', reason: error.reason })
            }
          })
          .finally(() => setLoading(false))
      }
      const timeoutId = setTimeout(fetchData, DEBOUNCE_MS)

      return () => {
        clearTimeout(timeoutId)
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }
      }
    }, [inputValue, t])

    const handleSave = useCallback(() => {
      if (InitiumDialogState.is.withInitiumState(state)) {
        onSave(state.text, state.initium)
        hideModal()
      }
    }, [hideModal, onSave, state])

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        const { key } = event
        if (key === 'Escape') {
          event.preventDefault()
          hideModal()
        } else if (key === 'Enter' && !state.readOnly) {
          event.preventDefault()
          handleSave()
        }
      }
      document.addEventListener('keydown', handleKeyDown, {
        capture: true,
      })
      return () => {
        document.removeEventListener('keydown', handleKeyDown, {
          capture: true,
        })
      }
    }, [state.readOnly, hideModal, handleSave])

    return (
      <DraggableDialog
        maxWidth={'md'}
        title={t('initium_dialog.title')}
        onClose={hideModal}
      >
        <DialogContent>
          <TextField
            variant="standard"
            autoFocus
            fullWidth
            label={t('initium_dialog.linked_text')}
            onChange={(event) =>
              dispatch({ type: 'set_text', text: event.target.value })
            }
            slotProps={{
              input: {
                readOnly: state.readOnly,
              },
            }}
            defaultValue={state.text}
          />
          {!state.readOnly && (
            <TranslatedAutocomplete
              value={InitiumDialogState.initium(state)}
              onChange={(_, initium) =>
                initium === null
                  ? dispatch({ type: 'clear_initium' })
                  : dispatch({ type: 'set_initium', initium })
              }
              inputValue={inputValue}
              onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.text}
              options={options}
              loading={loading}
              disabled={InitiumDialogState.is.loadingErrorState(state)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={t('initium_dialog.search_initium')}
                  error={!!error}
                  helperText={error}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading && (
                            <CircularProgress color="inherit" size={20} />
                          )}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id}>
                  <Box sx={{ width: '100%' }}>
                    <NotationChip notation={option.id} uri={option.uri} />
                    <Typography variant="body2" sx={{ fontWeight: 400 }}>
                      {option.text}
                    </Typography>
                    {option.alternativeText.length > 0 && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 0.5 }}
                      >
                        {t(
                          'initium_dialog.detail_view.initium_alternative_text',
                          { count: option.alternativeText.length }
                        )}
                        : {option.alternativeText.join(', ')}
                      </Typography>
                    )}
                    {option.languages.length > 0 &&
                      option.languages.map((language) => (
                        <Chip
                          key={language.id}
                          label={TranslatedText.forLanguage(
                            language.variantName,
                            i18n.language
                          )}
                          size="small"
                        />
                      ))}
                  </Box>
                </Box>
              )}
              slots={{
                paper: ({ children, ...paperProps }) => (
                  <Paper {...paperProps}>
                    {children}
                    {unbekannteSprache !== undefined && (
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
                          {t('initium_dialog.not_found_text')}
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => {
                            showModal(
                              <InitiumAnlegenDialog
                                initialState={InitiumAnlegenDialogState.initialState(
                                  state.text,
                                  unbekannteSprache
                                )}
                                onSave={(initium) => {
                                  const initialState = InitiumDialogReducer(
                                    state,
                                    { type: 'set_initium', initium }
                                  )
                                  showModal(
                                    <InitiumDialog
                                      initialState={initialState}
                                      onSave={onSave}
                                      onDelete={onDelete}
                                    />
                                  )
                                }}
                                onCancel={() => {
                                  showModal(
                                    <InitiumDialog
                                      initialState={state}
                                      onSave={onSave}
                                      onDelete={onDelete}
                                    />
                                  )
                                }}
                              />
                            )
                          }}
                          style={{
                            color: colors.greyscale.white,
                            backgroundColor: colors.primary.darkTerraCotta,
                          }}
                          size="small"
                        >
                          {t('initium_dialog.create_new_action')}
                        </Button>
                      </Box>
                    )}
                  </Paper>
                ),
              }}
            />
          )}
          <DetailView state={state} />
        </DialogContent>
        <DialogActions>
          {state.readOnly ? (
            <HSPRightButton
              aria-label={t('externer_link_dialog.open_link')}
              onClick={() =>
                InitiumDialogState.is.withInitiumState(state) &&
                DialogUtilities.openInNewTab(state.initium.uri)
              }
              disableTouchRipple
              disabled={!InitiumDialogState.is.withInitiumState(state)}
              style={{ backgroundColor: 'white' }}
            >
              <OpenInNew />
            </HSPRightButton>
          ) : (
            <>
              <ActionCancelButton
                disableTouchRipple
                onClick={handleSave}
                className={'black-add-button-style'}
                disabled={!InitiumDialogState.is.submittable(state)}
              >
                {t('initium_dialog.save_action')}
              </ActionCancelButton>
              <ActionDetermineButton
                disableTouchRipple
                onClick={hideModal}
                className={'grey-add-button-style'}
              >
                {t('initium_dialog.cancel_action')}
              </ActionDetermineButton>
              {onDelete && (
                <HSPRightButton
                  title={t('initium_dialog.delete_action')}
                  disableTouchRipple
                  onClick={() => {
                    onDelete()
                    hideModal()
                  }}
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  <DeleteWhiteIcon />
                </HSPRightButton>
              )}
            </>
          )}
        </DialogActions>
      </DraggableDialog>
    )
  }
)
