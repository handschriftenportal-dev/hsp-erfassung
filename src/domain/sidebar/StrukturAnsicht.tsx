import { List } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { Editor } from 'slate'
import { selectSidebarState } from 'src/domain/erfassung/ErfassungsState'

import { SidebarEintrag } from './SidebarEintrag'
import type { SidebarEintragModel } from './SidebarEintragFactory'

interface Props {
  editor: Editor
}

export const StrukturAnsicht: FC<Props> = memo(({ editor }) => {
  const sidebarValue = useSelector(selectSidebarState)
  const { t } = useTranslation()

  return (
    <List
      sx={{
        backgroundColor: 'white',
      }}
    >
      {sidebarValue.length > 0
        ? sidebarValue.map(
            (beschreibung: SidebarEintragModel, index: number) => (
              <SidebarEintrag
                key={beschreibung.id}
                index={index}
                beschreibung={beschreibung}
                editor={editor}
              />
            )
          )
        : t('sidebar.components_not_found')}
    </List>
  )
})
