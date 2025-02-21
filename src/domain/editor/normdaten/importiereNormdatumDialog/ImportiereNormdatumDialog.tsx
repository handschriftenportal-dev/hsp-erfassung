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

import { Search } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  LinearProgress,
  TablePagination,
  TextField,
} from '@mui/material'
import { FC, useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'

import { GNDEntityFact } from '../../../erfassung/GNDEntityFact'
import { ImportiereNormdatumDialogItemsList } from './ImportiereNormdatumDialogItemsList'
import { ImportiereNormdatumDialogReducer } from './ImportiereNormdatumDialogReducer'
import { ImportiereNormdatumDialogState } from './ImportiereNormdatumDialogState'
import { ImportiereNormdatumDialogUtility } from './ImportiereNormdatumDialogUtility'
import { ImportiereNormdatumItemDetail } from './ImportiereNormdatumItemDetail'

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
    <Dialog open={true} fullWidth maxWidth={'lg'}>
      <DialogTitle>{t('import_normdata_dialog.title')}</DialogTitle>
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
    </Dialog>
  )
}
