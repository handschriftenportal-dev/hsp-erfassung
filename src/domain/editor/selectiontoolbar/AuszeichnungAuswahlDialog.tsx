import type { FC } from 'react'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Editor } from 'slate'
import { ReactEditor } from 'slate-react'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'

import { AndereAuszeichnungActions } from './AndereAuszeichnungActions'
import { FormatierungAuszeichnungActions } from './FormatierungAuszeichnungActions'
import { ReferenzAuszeichnungActions } from './ReferenzAuszeichnungActions'
import { SelectionToolbar } from './SelectionToolbar'

interface Props {
  editor: Editor
  type: 'referenz' | 'formatierung' | 'andere'
}

const ActionComponentLookup: Record<
  Props['type'],
  typeof ReferenzAuszeichnungActions
> = {
  referenz: ReferenzAuszeichnungActions,
  formatierung: FormatierungAuszeichnungActions,
  andere: AndereAuszeichnungActions,
}

export const AuszeichnungAuswahlDialog: FC<Props> = ({ editor, type }) => {
  const { t } = useTranslation()
  const ActionComponent = ActionComponentLookup[type]
  const { hideModal, showModal } = useGlobalModalContext()

  const handleClose = useCallback(() => {
    hideModal()
    setTimeout(() => {
      ReactEditor.focus(editor)
      showModal(<SelectionToolbar editor={editor} />)
    }, 0)
  }, [editor, hideModal, showModal])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      if (key === 'Escape') {
        event.preventDefault()
        handleClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose])

  return (
    <DraggableDialog
      title={t(`text_tagging.${type}.dialog.title`)}
      maxWidth="lg"
      onClose={handleClose}
      fullWidth={false}
    >
      <ActionComponent editor={editor} />
    </DraggableDialog>
  )
}
