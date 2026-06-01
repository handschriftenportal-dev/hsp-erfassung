import {
  Attribution,
  FormatQuote,
  FormatTextdirectionLToR,
  FormatTextdirectionRToL,
  TextFields,
} from '@mui/icons-material'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { Editor } from 'slate'
import type { VolltextFormatierung } from 'src/infrastructure/slate/volltext/VolltextElement'

import { useHandleFormatierungTagging } from './SelectionToolbarCustomHooks'

interface Props {
  editor: Editor
}

type MenuEntry = {
  type: VolltextFormatierung['data_origin']
  Icon: FC
}

const menuEntries: MenuEntry[] = [
  {
    type: 'autor',
    Icon: Attribution,
  },
  {
    type: 'werktitel',
    Icon: TextFields,
  },
  {
    type: 'incipit',
    Icon: FormatTextdirectionLToR,
  },
  {
    type: 'explicit',
    Icon: FormatTextdirectionRToL,
  },
  {
    type: 'zitat',
    Icon: FormatQuote,
  },
]

export const FormatierungAuszeichnungActions: FC<Props> = ({ editor }) => {
  const { t } = useTranslation()
  const handleClick = useHandleFormatierungTagging(editor)
  return (
    <List>
      {menuEntries.map(({ type, Icon }) => {
        return (
          <ListItemButton key={type} dense onClick={handleClick(type)}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={t(`text_tagging.formatierung.type.${type}`)}
            />
          </ListItemButton>
        )
      })}
    </List>
  )
}
