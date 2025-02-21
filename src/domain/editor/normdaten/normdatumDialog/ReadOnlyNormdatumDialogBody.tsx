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

import { OpenInNew } from '@mui/icons-material'
import {
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
} from '@mui/material'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { useAPICallTranslation } from '../../../../infrastructure/normdaten/APICall'
import { GNDEntityFact } from '../../../erfassung/GNDEntityFact'
import { HSPRightButton } from '../../styles/HSPRightButton'
import { BeziehungsMehrfachAuswahl } from '../dialog/BeziehungsMehrfachAuswahl'
import { getUrlForGndId } from '../dialog/NormdatenDialogUtilities'
import { DialogUtilities } from '../DialogUtilities'
import { useFetchNormdaten } from '../useNormdaten'
import { ReadDialogState } from './NormdatumDialogState'

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

  const gndUrl = getUrlForGndId(identifier)

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
                  <span>
                    <a target="_blank" href={gndUrl}>
                      {identifier}
                    </a>
                  </span>
                </InputAdornment>
              ),
            },
          }}
        />
        <BeziehungsMehrfachAuswahl
          normdatum={type}
          value={rollen}
          readOnly={true}
        />
      </DialogContent>
      <DialogActions>
        <HSPRightButton
          aria-label={t('text_tagging.referenz.dialog.open_action')}
          onClick={() => DialogUtilities.openInNewTab(gndUrl)}
          disableTouchRipple={true}
          disabled={false}
          style={{ backgroundColor: 'white' }}
        >
          <OpenInNew />
        </HSPRightButton>
      </DialogActions>
    </>
  )
})
