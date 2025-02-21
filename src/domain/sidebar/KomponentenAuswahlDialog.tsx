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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
} from '@mui/material'
import { FC, memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobalModalContext } from '../../infrastructure/modal/GlobalModal'
import { HSP_ERFASSUNGS_EDITOR_ID } from '../editor/HSPEditor'
import { BeschreibungsKomponenteOption } from '../erfassung/ErfassungsGuideline'
import { SidebarEintragModel } from './SidebarEintragFactory'

interface Props {
  type: 'child' | 'component'
  beschreibung: SidebarEintragModel
  komponentOptions: BeschreibungsKomponenteOption[]
  insert: (beschreibung: SidebarEintragModel, element: string) => void
}

export const KomponentenAuswahlDialog: FC<Props> = memo(
  ({ type, beschreibung, komponentOptions, insert }) => {
    const { hideModal } = useGlobalModalContext()
    const { t } = useTranslation()
    const title =
      type === 'child'
        ? t('sidebar.add_new_child_component')
        : t('sidebar.add_new_component')
    const [komponente, setKomponente] = useState('')

    const handleAddAction = useCallback(
      (event: any, valueCallBack: string) => {
        event.preventDefault()
        insert(beschreibung, valueCallBack)
        hideModal()
      },
      [beschreibung, hideModal, insert]
    )

    return (
      <Dialog
        open={true}
        sx={{
          minHeight: '50vh',
          minWidth: '50vw',
        }}
        container={document.getElementById(HSP_ERFASSUNGS_EDITOR_ID)}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <form>
            <FormControl variant="standard">
              <Select
                variant="standard"
                native
                value={komponente}
                onChange={(event) => setKomponente(event.target.value)}
              >
                <option disabled={true} key={'none'} aria-label="None" value="">
                  {t('sidebar.selection')}
                </option>
                {komponentOptions?.map(({ element, label }) => (
                  <option key={element + type} value={element}>
                    {t(label)}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideModal} color="primary">
            {t('sidebar.cancel')}
          </Button>
          <Button
            autoFocus
            onClick={(event) => handleAddAction(event, komponente)}
            color="primary"
          >
            {t('sidebar.add')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)
