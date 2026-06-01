import CancelIcon from '@mui/icons-material/Cancel'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { InitiumDialogState } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogState'
import { NotationChip } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/NotationChip'
import type { Initium } from 'src/domain/erfassung/Initium'
import { TranslatedText } from 'src/domain/erfassung/TranslatedText'

interface Props {
  state: InitiumDialogState
}

const LoadingErrorDetail: FC<{ reason: string }> = ({ reason }) => {
  const { t } = useTranslation()
  return (
    <Paper variant="outlined" sx={{ mt: 3, p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CancelIcon sx={{ fontSize: 64, color: 'error.main' }} />
        <Typography variant="h6" color="error" align="center">
          {t('initium_dialog.detail_view.loading_error')}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ fontStyle: 'italic' }}
        >
          {reason}
        </Typography>
      </Box>
    </Paper>
  )
}

const LoadingFromUriDetail: FC<{ id: string; uri: string }> = ({ id, uri }) => {
  const { t } = useTranslation()
  return (
    <Paper variant="outlined" sx={{ mt: 3, p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="body1" color="text.secondary" align="center">
          {t('initium_dialog.detail_view.loading_initium')}
        </Typography>
        <NotationChip noFloat notation={id} uri={uri} />
      </Box>
    </Paper>
  )
}

const WithInitiumDetail: FC<{ initium: Initium }> = ({ initium }) => {
  const { i18n, t } = useTranslation()
  const { text, id, uri, alternativeText, languages } = initium
  return (
    <Paper variant="outlined" sx={{ mt: 3, p: 3 }}>
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell scope="row" component="td" variant="head">
                {t('initium_dialog.detail_view.selected_initium')}
              </TableCell>
              <TableCell align="left">
                <NotationChip noFloat notation={id} uri={uri} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row" component="td" variant="head">
                {t('initium_dialog.detail_view.initium_text')}
              </TableCell>
              <TableCell align="left">{text}</TableCell>
            </TableRow>
            {alternativeText.length > 0 && (
              <>
                <TableRow>
                  <TableCell
                    scope="row"
                    component="td"
                    variant="head"
                    rowSpan={alternativeText.length + 1}
                  >
                    {t('initium_dialog.detail_view.initium_alternative_text', {
                      count: alternativeText.length,
                    })}
                  </TableCell>
                </TableRow>
                {alternativeText.map((text, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{text}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
            <TableRow>
              <TableCell scope="row" component="td" variant="head">
                {t('initium_dialog.detail_view.initium_language', {
                  count: languages.length,
                })}
              </TableCell>
              <TableCell align="left">
                {languages.length === 0 ? (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontStyle: 'italic' }}
                  >
                    {t('initium_dialog.detail_view.no_language_provided')}
                  </Typography>
                ) : (
                  languages.map((language) => (
                    <Chip
                      key={language.id}
                      label={TranslatedText.forLanguage(
                        language.variantName,
                        i18n.language
                      )}
                      size="small"
                    />
                  ))
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

const WithoutInitiumDetail: FC = () => {
  const { t } = useTranslation()
  return (
    <Paper variant="outlined" sx={{ mt: 3, p: 3 }}>
      <Box sx={{ textAlign: 'center' }}>
        <SearchIcon
          sx={{
            fontSize: 64,
            color: 'text.secondary',
            opacity: 0.3,
          }}
        />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {t('initium_dialog.detail_view.no_initium_selected')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('initium_dialog.detail_view.how_to_search')}
        </Typography>
      </Box>
    </Paper>
  )
}

export const DetailView: FC<Props> = ({ state }) => {
  switch (state.status) {
    case InitiumDialogState.status.withInitium:
      return <WithInitiumDetail initium={state.initium} />
    case InitiumDialogState.status.withoutInitium:
      return <WithoutInitiumDetail />
    case InitiumDialogState.status.loadingError:
      return <LoadingErrorDetail reason={state.reason} />
    case InitiumDialogState.status.loadingFromTei:
      return <LoadingFromUriDetail id={state.id} uri={state.uri} />
  }
}
