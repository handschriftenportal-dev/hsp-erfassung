import styled from '@emotion/styled'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  ListItemText,
  ListSubheader,
  Paper,
  Radio,
  RadioGroup,
} from '@mui/material'
import type { Dispatch, FC } from 'react'
import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import type { FachbegriffItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import type { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'

import { NotationChip } from './NotationChip'

interface Props {
  dispatch: Dispatch<ThemenbereichDialogAction>
  api: ThemenbereicheAPI
  item: FachbegriffItem
  begriffsMenge: {
    id: string
    elemente: readonly string[]
  }
}

const StyledRadio = styled(Radio)`
  margin-left: 24px;
  margin-right: 16px;
`

export const EinzelAuswahl: FC<Props> = ({
  api,
  dispatch,
  item,
  begriffsMenge,
}) => {
  const { t } = useTranslation()
  const { elemente, id } = begriffsMenge
  const errorId = useId()
  if (elemente.length === 0) {
    return undefined
  }
  const { auswahl } = item.beziehungen
  const error = elemente.filter((element) => auswahl.has(element)).length !== 1

  return (
    <Paper variant={'outlined'} sx={{ marginLeft: 8 }}>
      <FormControl
        error={error}
        fullWidth
        aria-invalid={error}
        aria-errormessage={error ? errorId : undefined}
      >
        <FormLabel component="legend" id={id}>
          <ListSubheader>
            {t('subject_area_dialog.single_concept_select')}
          </ListSubheader>
        </FormLabel>
        {error && (
          <FormHelperText id={errorId} role="status">
            {t('subject_area_dialog.single_concept_select_error')}
          </FormHelperText>
        )}
        <RadioGroup
          onChange={(_, id) =>
            dispatch({
              type: 'selectFromMenge',
              payload: {
                item,
                menge: begriffsMenge,
                value: id,
              },
            })
          }
          aria-labelledby={id}
        >
          {elemente.map((id) => {
            const {
              identifier: { notation, uri },
              label,
            } = api.begriff({ id })!
            return (
              <FormControlLabel
                className={'narrow-list-item'}
                key={id}
                checked={auswahl.has(id)}
                control={<StyledRadio />}
                slotProps={{
                  typography: {
                    flex: 'auto',
                  },
                }}
                label={
                  <ListItemText
                    primary={
                      <>
                        <NotationChip notation={notation} uri={uri} />
                        {label}
                      </>
                    }
                  />
                }
                value={id}
              />
            )
          })}
        </RadioGroup>
      </FormControl>
    </Paper>
  )
}
