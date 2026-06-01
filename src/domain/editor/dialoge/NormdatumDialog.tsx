import type { FC } from 'react'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'

import { EditNormdatumDialogBody } from './normdatumDialog/EditNormdatumDialogBody'
import type { NormdatumDialogAction } from './normdatumDialog/NormdatumDialogAction'
import type { NormdatumDialogState } from './normdatumDialog/NormdatumDialogState'
import { ReadOnlyNormdatumDialogBody } from './normdatumDialog/ReadOnlyNormdatumDialogBody'

interface Props {
  initialState: NormdatumDialogState
  onAction: (action: NormdatumDialogAction, state: NormdatumDialogState) => void
}

export const NormdatumDialog: FC<Props> = memo(({ initialState, onAction }) => {
  const { t } = useTranslation()
  const { view, type } = initialState

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      if (key === 'Escape') {
        event.preventDefault()
        onAction('cancel', initialState)
      }
    }
    document.addEventListener('keydown', handleKeyDown, {
      capture: true,
      once: true,
    })
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onAction, initialState])

  return (
    <DraggableDialog
      title={t(`text_tagging.referenz.type.${type}`)}
      onClose={() => onAction('back', initialState)}
    >
      {view === 'read' ? (
        <ReadOnlyNormdatumDialogBody state={initialState} />
      ) : (
        <EditNormdatumDialogBody
          initialState={initialState}
          onAction={onAction}
        />
      )}
    </DraggableDialog>
  )
})
