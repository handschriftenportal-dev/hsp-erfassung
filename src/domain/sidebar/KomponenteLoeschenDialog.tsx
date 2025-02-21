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
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { FC, MouseEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from 'slate'

import { useGlobalModalContext } from '../../infrastructure/modal/GlobalModal'
import { ErfassungsRules } from '../../infrastructure/slate/ErfassungsRules'
import { deleteSlateNodeWithWrapper } from '../../infrastructure/slate/SlateBoundary'
import { HSP_ERFASSUNGS_EDITOR_ID } from '../editor/HSPEditor'
import { selectBeschreibungsSubtype } from '../erfassung/ErfassungsState'
import { SidebarEintragModel } from './SidebarEintragFactory'

interface Props {
  editor: Editor
  beschreibung: SidebarEintragModel
  callback: (input: any) => void
}

export const KomponenteLoeschenDialog: FC<Props> = ({
  beschreibung,
  editor,
  callback,
}) => {
  const { hideModal } = useGlobalModalContext()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)

  const handleDeleteElementAction = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const wrapper =
        ErfassungsRules[beschreibungSubtype]?.[beschreibung.teiElement]
          ?.wrapperElement?.data_origin || ''
      deleteSlateNodeWithWrapper(
        wrapper,
        beschreibung,
        editor,
        callback,
        dispatch
      )
      hideModal()
    },
    [beschreibung, beschreibungSubtype, callback, dispatch, editor, hideModal]
  )

  return (
    <Dialog
      open={true}
      container={document.getElementById(HSP_ERFASSUNGS_EDITOR_ID)}
    >
      <DialogTitle>{t('sidebar.delete')}</DialogTitle>
      <DialogContentText style={{ padding: '20px' }}>
        {t('sidebar.deletion_info', {
          label: t(beschreibung.label),
          childrenCount: beschreibung.children.length,
        })}
      </DialogContentText>
      <DialogActions>
        <Button onClick={hideModal} color="primary">
          {t('sidebar.cancel')}
        </Button>
        <Button autoFocus onClick={handleDeleteElementAction} color="primary">
          {t('sidebar.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
