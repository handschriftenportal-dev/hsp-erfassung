/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Select } from '@material-ui/core'
import i18next from 'i18next'
import React, { useCallback } from 'react'
import { BeschreibungsKomponente } from './BeschreibungsKomponenteFactory'
import { BeschreibungsKomponenteOption } from '../erfassung/ErfassungsGuidline'
import { HSP_EDITOR_ID } from '../editor/HSPEditor'
import { PopupState } from 'material-ui-popup-state/core'

interface KomponentenAuswahlDialogProps {
  open: boolean,
  title: string,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  popupState: PopupState,
  value: string,
  beschreibung: BeschreibungsKomponente,
  komponentOptions: Array<BeschreibungsKomponenteOption>,
  insert: (beschreibung: BeschreibungsKomponente, popupState: PopupState, element: string) => void,
  setKomponent: React.Dispatch<React.SetStateAction<string>>,
  type: string
}

export const KomponentenAuswahlDialog = React.memo(({
  open, title, setOpen, popupState, value, beschreibung,
  komponentOptions, insert, setKomponent, type
}: KomponentenAuswahlDialogProps) => {

  const setSelectionKomponent = (event: any) => {
    setKomponent((event.target.value))
  }

  const handleCancelAction = useCallback(() => {
    setOpen(false)
    setKomponent('')
    popupState.close()
  }, [])

  const handleAddAction = useCallback((event: any, valueCallBack: string) => {
    event.preventDefault()
    insert(beschreibung, popupState, valueCallBack)
    setOpen(false)
    setKomponent('')
    popupState.close()
  }, [beschreibung])

  return (<Dialog aria-labelledby="simple-dialog-title" open={open}
                  container={document.getElementById(HSP_EDITOR_ID)}>
    <DialogTitle contentEditable={false}>
      {title}
    </DialogTitle>
    <DialogContent>
      <form>
        <FormControl>
          <Select
              contentEditable={false}
              native
              value={value}
              onChange={setSelectionKomponent}>
            <option contentEditable={false} disabled={true} key={'none'} aria-label="None"
                    value="">{i18next.t('sidebar.selection')}</option>
            {komponentOptions?.map(o => <option contentEditable={false} key={o.element + type}
                                                value={o.element}>{o.label}</option>)}
          </Select>
        </FormControl>
      </form>
    </DialogContent>
    <DialogActions>
      <Button contentEditable={false} onClick={handleCancelAction} color="primary">
        {i18next.t('sidebar.cancel')}
      </Button>
      <Button contentEditable={false} autoFocus onClick={(event) => handleAddAction(event, value)} color="primary">
        {i18next.t('sidebar.add')}
      </Button>
    </DialogActions>
  </Dialog>)
})
