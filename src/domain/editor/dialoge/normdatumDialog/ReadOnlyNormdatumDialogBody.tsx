import { OpenInNew } from '@mui/icons-material'
import {
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
} from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { DialogUtilities } from 'src/domain/editor/dialoge/DialogUtilities'
import { BeziehungsMehrfachAuswahl } from 'src/domain/editor/dialoge/normdatumDialog/BeziehungsMehrfachAuswahl'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import { useFetchNormdaten } from 'src/domain/editor/normdaten/useNormdaten'
import { HSPRightButton } from 'src/domain/editor/styles/HSPRightButton'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { HSPLink } from 'src/infrastructure/components/HSPLink'
import { useAPICallTranslation } from 'src/infrastructure/normdaten/APICall'

import type { ReadDialogState } from './NormdatumDialogState'

interface Props {
  state: ReadDialogState
}

export const ReadOnlyNormdatumDialogBody: FC<Props> = memo(({ state }) => {
  const { t } = useTranslation()
  const { text, identifier, type, rollen } = state
  const apiCall = useFetchNormdaten(identifier)
  const preferredName = useAPICallTranslation<GNDEntityFact>()(
    apiCall,
    (value) => value.preferredName
  )

  const gndUrl = NormdatenUtilities.idToUrl(identifier)

  return (
    <>
      <DialogContent>
        <TextField
          variant="standard"
          fullWidth
          label={t('text_tagging.referenz.dialog.normdata_text')}
          defaultValue={text}
          slotProps={{
            htmlInput: { readOnly: true },
          }}
        />
        <TextField
          variant="standard"
          fullWidth
          label={t('text_tagging.referenz.dialog.normdata_link')}
          value={preferredName}
          slotProps={{
            input: {
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <HSPLink url={gndUrl}>{identifier}</HSPLink>
                </InputAdornment>
              ),
            },
          }}
        />
        <BeziehungsMehrfachAuswahl normdatum={type} value={rollen} readOnly />
      </DialogContent>
      <DialogActions>
        <HSPRightButton
          aria-label={t('text_tagging.referenz.dialog.open_action')}
          onClick={() => DialogUtilities.openInNewTab(gndUrl)}
          disableTouchRipple
          disabled={false}
          style={{ backgroundColor: 'white' }}
        >
          <OpenInNew />
        </HSPRightButton>
      </DialogActions>
    </>
  )
})
