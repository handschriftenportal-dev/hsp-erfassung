import { useSelector } from 'react-redux'
import type { Editor } from 'slate'
import { InitiumDialogStrategy } from 'src/domain/editor/dialoge/InitiumDialogStrategy'
import { LiteraturDialogStrategy } from 'src/domain/editor/dialoge/LiteraturDialogStrategy'
import { NormdatumDialogStrategy } from 'src/domain/editor/dialoge/NormdatumDialogStrategy'
import { ThemenbereichDialogStrategy } from 'src/domain/editor/dialoge/ThemenbereichDialogStrategy'
import { selectReadOnly } from 'src/domain/erfassung/ErfassungsState'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { useThemenbereich } from 'src/infrastructure/normdaten/ThemenbereichService'
import type { VolltextReferenz } from 'src/infrastructure/slate/volltext/VolltextElement'

import { ExternerLinkDialogStrategy } from './ExternerLinkDialogStrategy'

type UseDialog = (editor: Editor) => {
  openEditDialogHandler: (element: VolltextReferenz) => () => void
  openCreateDialogHandler: (type: VolltextSemantik) => () => void
}

export const useDialog: UseDialog = (editor: Editor) => {
  const context = {
    editor,
    modalContext: useGlobalModalContext(),
    readOnly: useSelector(selectReadOnly),
    themenbereiche: useThemenbereich(),
  }
  return {
    openCreateDialogHandler(type) {
      return () => {
        switch (type) {
          case 'person':
          case 'koerperschaft':
          case 'ort':
            NormdatumDialogStrategy.createDialog(type, context)
            return
          case 'externerLink':
            ExternerLinkDialogStrategy.createDialog(type, context)
            return
          case 'literatur':
            LiteraturDialogStrategy.createDialog(type, context)
            return
          case 'buchkunde':
          case 'buchschmuck':
          case 'einband':
          case 'musiknotation':
          case 'schreibsprache':
          case 'schriftart':
          case 'textgattung':
          case 'ueberlieferungsform':
            ThemenbereichDialogStrategy.createDialog(type, context)
            return
          case 'initium':
            InitiumDialogStrategy.createDialog(type, context)
            return
          default:
            throw new Error(`No dialog for ${type} implemented`)
        }
      }
    },
    openEditDialogHandler(element: VolltextReferenz) {
      return () => {
        const { data_origin } = element
        switch (data_origin) {
          case 'person':
          case 'koerperschaft':
          case 'ort':
            NormdatumDialogStrategy.editDialog(element, context)
            return
          case 'externerLink':
            ExternerLinkDialogStrategy.editDialog(element, context)
            return
          case 'literatur':
            LiteraturDialogStrategy.editDialog(element, context)
            return
          case 'buchkunde':
          case 'buchschmuck':
          case 'einband':
          case 'musiknotation':
          case 'schreibsprache':
          case 'schriftart':
          case 'textgattung':
          case 'ueberlieferungsform':
            ThemenbereichDialogStrategy.editDialog(element, context)
            return
          case 'initium':
            InitiumDialogStrategy.editDialog(element, context)
            return
          default:
            throw new Error(`Cannot open dialog for element ${data_origin}`)
        }
      }
    },
  }
}
