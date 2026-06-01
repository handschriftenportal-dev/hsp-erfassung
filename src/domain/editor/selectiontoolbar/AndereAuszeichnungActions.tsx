import { Link, LocalLibrary, Superscript } from '@mui/icons-material'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { Editor } from 'slate'
import { useDialog } from 'src/domain/editor/dialoge/useDialog'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { HSPEditor } from 'src/infrastructure/slate/HSPEditor'

interface Props {
  editor: Editor
}

export const AndereAuszeichnungActions: FC<Props> = ({ editor }) => {
  const { t } = useTranslation()
  const { hideModal } = useGlobalModalContext()
  const { openCreateDialogHandler } = useDialog(editor)

  return (
    <List>
      <ListItemButton dense onClick={openCreateDialogHandler('literatur')}>
        <ListItemIcon>
          <LocalLibrary />
        </ListItemIcon>
        <ListItemText primary={t(`text_tagging.andere.type.literatur`)} />
      </ListItemButton>
      <ListItemButton dense onClick={openCreateDialogHandler('externerLink')}>
        <ListItemIcon>
          <Link />
        </ListItemIcon>
        <ListItemText primary={t(`text_tagging.andere.type.externer_link`)} />
      </ListItemButton>
      <ListItemButton
        dense
        onClick={() => {
          HSPEditor.toggleSuperskript(editor)
          hideModal()
        }}
        selected={HSPEditor.isInSuperskript(editor)}
      >
        <ListItemIcon>
          <Superscript />
        </ListItemIcon>
        <ListItemText primary={t(`text_tagging.andere.type.superskript`)} />
      </ListItemButton>
    </List>
  )
}
