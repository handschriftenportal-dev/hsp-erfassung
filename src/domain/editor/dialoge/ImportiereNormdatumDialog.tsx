import { Search } from '@mui/icons-material'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  InputAdornment,
  LinearProgress,
  TablePagination,
  TextField,
} from '@mui/material'
import type { FC } from 'react'
import { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'

import { ImportiereNormdatumDialogItemsList } from './importiereNormdatumDialog/ImportiereNormdatumDialogItemsList'
import { ImportiereNormdatumDialogReducer } from './importiereNormdatumDialog/ImportiereNormdatumDialogReducer'
import { ImportiereNormdatumDialogState } from './importiereNormdatumDialog/ImportiereNormdatumDialogState'
import { ImportiereNormdatumDialogUtility } from './importiereNormdatumDialog/ImportiereNormdatumDialogUtility'
import { ImportiereNormdatumItemDetail } from './importiereNormdatumDialog/ImportiereNormdatumItemDetail'

interface Props {
  back?: (fact?: GNDEntityFact) => void
  normdatumTyp: 'person' | 'ort' | 'koerperschaft'
  initialSearchTerm?: string
}

const DEBOUNCE_TIME_MS = 1000

export const ImportiereNormdatumDialog: FC<Props> = ({
  back = () => undefined,
  normdatumTyp,
  initialSearchTerm = '',
}) => {
  const { t } = useTranslation()
  const [state, dispatch] = useReducer(ImportiereNormdatumDialogReducer, {
    searchTerm: initialSearchTerm,
    page: 0,
    rowsPerPage: 10,
    items: [],
    status: ImportiereNormdatumDialogState.status.loading,
    selected: 0,
    total: 0,
  })

  useEffect(() => {
    const getData = setTimeout(() => {
      ImportiereNormdatumDialogUtility.search(state, normdatumTyp)
        .then((result) => {
          dispatch({ type: 'set_api_result', result })
        })
        .catch(() => undefined)
    }, DEBOUNCE_TIME_MS)

    return () => clearTimeout(getData)
  }, [dispatch, normdatumTyp, state])

  const onSubmit = useCallback(() => {
    if (!ImportiereNormdatumDialogUtility.canSubmit(state)) {
      return
    }
    const item = state.items[state.selected]
    ImportiereNormdatumDialogUtility.submit(item)
      .then(back)
      .catch((error) => dispatch({ type: 'set_import_failed', error }))
  }, [dispatch, back, state])

  return (
    <DraggableDialog title={t('import_normdata_dialog.title')} maxWidth={'lg'}>
      <DialogContent className="importiere-normdatum-dialog-layout">
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          className="importiere-normdatum-dialog-suche"
          value={state.searchTerm}
          onChange={(event) =>
            dispatch({
              type: 'set_search_term',
              searchTerm: event.target.value,
            })
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box className="importiere-normdatum-dialog-liste">
          {state.status === 'loading' && <LinearProgress />}
          {state.items.length === 0 ? (
            t('import_normdata_dialog.no_result')
          ) : (
            <ImportiereNormdatumDialogItemsList
              state={state}
              setSelected={(selected) =>
                dispatch({ type: 'set_selected', selected })
              }
            />
          )}
        </Box>
        <Box className="importiere-normdatum-dialog-details">
          {state.status === 'import_failed' ? (
            `${t('import_normdata_dialog.import_failed')}: ${state.error ?? '-'}`
          ) : state.items[state.selected] ? (
            <ImportiereNormdatumItemDetail item={state.items[state.selected]} />
          ) : (
            t('import_normdata_dialog.no_selection')
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {state.items.length > 0 && (
          <TablePagination
            component="div"
            page={state.page}
            count={state.total}
            rowsPerPage={state.rowsPerPage}
            labelRowsPerPage={t('import_normdata_dialog.label_rows_per_page')}
            labelDisplayedRows={({ from, to, count }) =>
              t('import_normdata_dialog.label_displayed_rows', {
                from,
                to,
                count,
              })
            }
            onRowsPerPageChange={(event) => {
              dispatch({
                type: 'set_rows_per_page',
                rowsPerPage: parseInt(event.target.value, 10),
              })
            }}
            onPageChange={(_, page) => {
              dispatch({ type: 'set_page', page })
            }}
          />
        )}
        <Button onClick={() => back()}>
          {t('import_normdata_dialog.button_cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!ImportiereNormdatumDialogUtility.canSubmit(state)}
        >
          {t('import_normdata_dialog.button_submit')}
        </Button>
      </DialogActions>
    </DraggableDialog>
  )
}
