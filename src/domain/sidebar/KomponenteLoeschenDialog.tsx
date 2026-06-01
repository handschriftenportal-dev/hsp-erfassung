import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import type { FC, MouseEvent } from 'react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import type { Descendant, Editor } from 'slate'
import { HSP_ERFASSUNGS_EDITOR_ID } from 'src/domain/editor/HSPEditor'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { deleteSlateNodeWithWrapper } from 'src/infrastructure/slate/SlateBoundary'

import type { SidebarEintragModel } from './SidebarEintragFactory'

interface Props {
  editor: Editor
  beschreibung: SidebarEintragModel
  callback: (input: Descendant[]) => void
}

export const KomponenteLoeschenDialog: FC<Props> = ({
  beschreibung,
  editor,
  callback,
}) => {
  const { hideModal } = useGlobalModalContext()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleDeleteElementAction = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const wrapper =
        ErfassungsRegeln.komponentenRegel(beschreibung.teiElement)
          .wrapperElement?.data_origin ?? ''
      deleteSlateNodeWithWrapper(
        editor,
        wrapper,
        beschreibung,
        callback,
        dispatch
      )
      hideModal()
    },
    [beschreibung, callback, dispatch, editor, hideModal]
  )

  return (
    <Dialog open container={document.getElementById(HSP_ERFASSUNGS_EDITOR_ID)}>
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
