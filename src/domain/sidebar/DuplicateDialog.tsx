import CloseIcon from '@mui/icons-material/Close'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from '@mui/material'
import { parseInt } from 'lodash'
import type { FC, MouseEventHandler } from 'react'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import type { Descendant, Editor, NodeEntry, Path } from 'slate'
import { updateAlertMessage } from 'src/domain/erfassung/ErfassungsState'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import {
  editorNode,
  insertSlateNodes,
} from 'src/infrastructure/slate/SlateBoundary'

import type { SidebarEintragModel } from './SidebarEintragFactory'

interface Props {
  beschreibung: SidebarEintragModel
  editor: Editor
}

export const DuplicateDialog: FC<Props> = memo(({ beschreibung, editor }) => {
  const { hideModal } = useGlobalModalContext()
  const [amount, setAmount] = useState('1')
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const duplicateBeschreibungskomponente =
    (amount: string, path: Path): MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event.preventDefault()
      const copyCount = parseInt(amount, 10)
      if (copyCount < 1 || !Number.isSafeInteger(copyCount)) {
        dispatch(
          updateAlertMessage({
            message: t('duplicate_dialog.amount_error', {
              amount,
            }),
            level: 'error',
          })
        )
        return
      }
      const [node] = editorNode(editor, path) as NodeEntry<Descendant>
      const copies = Array.from({ length: copyCount }, () => HSPNode.copy(node))
      insertSlateNodes(editor, copies, path, dispatch)
      hideModal()
    }

  return (
    <Dialog open>
      <DialogTitle style={{ width: '300px' }}>
        {t('duplicate_dialog.title')}
        <IconButton
          style={{ float: 'right' }}
          onClick={hideModal}
          title={t('duplicate_dialog.close_action')}
          size="large"
        >
          <CloseIcon fontSize={'small'} />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ height: '150px' }}>
        <DialogContentText>{t(beschreibung.label)}</DialogContentText>
        <DialogContentText style={{ marginBottom: '25px' }}>
          {t('duplicate_dialog.with_child_components')}
        </DialogContentText>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              type={'number'}
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              variant={'outlined'}
              style={{
                flexDirection: 'unset',
                height: '36.5px',
                width: '70px',
              }}
              slotProps={{
                htmlInput: { maxLength: 3 },
              }}
            />
            &times;
            <Button
              className={'override-duplicate-dialog-bottom-color'}
              style={{ width: '100px' }}
              autoFocus
              onClick={duplicateBeschreibungskomponente(
                amount,
                beschreibung.path
              )}
              color="primary"
            >
              {t('duplicate_dialog.create_action')}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
})
