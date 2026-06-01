import type { FC } from 'react'
import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Editor } from 'slate'
import {
  selectComponentChangedHistory,
  selectSidebarComponentType,
  updateSidebar,
  updateSidebarComponentType,
} from 'src/domain/erfassung/ErfassungsState'
import { ScrollContainer } from 'src/domain/erfassung/ScrollContainer'
import { SonderzeichenAuswahl } from 'src/domain/sonderzeichen/SonderzeichenAuswahl'
import { useGlobalerEinfuegeContext } from 'src/infrastructure/slate/einfuegeservice/GlobalerEinfuegeService'

import { SidebarComponentFactory } from './SidebarComponentFactory'
import { SidebarComponentType } from './SidebarComponentType'
import { StrukturAnsicht } from './StrukturAnsicht'

export interface Props {
  editor: Editor
}

export const HSPSidebar: FC<Props> = memo(({ editor }) => {
  const dispatch = useDispatch()
  const { insertCharacter } = useGlobalerEinfuegeContext()
  const sidebarComponentType = useSelector(selectSidebarComponentType)
  const componentChangedHistory = useSelector(selectComponentChangedHistory)

  useEffect(() => {
    const beschreibungsKomponenten =
      SidebarComponentFactory.createComponents(editor)
    dispatch(updateSidebar(beschreibungsKomponenten))
  }, [componentChangedHistory, dispatch, editor])

  return sidebarComponentType === SidebarComponentType.struktur ? (
    <ScrollContainer>
      <StrukturAnsicht editor={editor} />
    </ScrollContainer>
  ) : (
    <SonderzeichenAuswahl
      onSubmit={insertCharacter}
      onClose={() =>
        dispatch(updateSidebarComponentType(SidebarComponentType.struktur))
      }
    />
  )
})
