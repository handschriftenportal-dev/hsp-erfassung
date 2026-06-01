import type { FC } from 'react'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { InitiumAnlegenDialogBody } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogBody'
import { InitiumAnlegenDialogReducer } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogReducer'
import type { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'
import type { Initium } from 'src/domain/erfassung/Initium'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'
import {
  APICall,
  useAPICallTranslation,
} from 'src/infrastructure/normdaten/APICall'
import { SBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'

interface Props {
  initialState: InitiumAnlegenDialogState
  onSave: (initium: Initium) => void
  onCancel: () => void
}

export const InitiumAnlegenDialog: FC<Props> = ({
  initialState,
  onSave,
  onCancel,
}) => {
  const { t } = useTranslation()
  const [state, dispatch] = useReducer(
    InitiumAnlegenDialogReducer,
    initialState
  )
  const apiTranslation = useAPICallTranslation()

  useEffect(() => {
    switch (state.type) {
      case 'checking_for_duplicates': {
        const controller = new AbortController()
        SBBNormdatenServiceAdapter.findInitiumByText(
          state.text,
          controller.signal
        )
          .then((result) => {
            if (controller.signal.aborted) return
            if (APICall.isSuccess(result) && result.value.length > 0) {
              dispatch({ type: 'duplicates_found', duplicates: result.value })
            } else if (APICall.isFailed(result)) {
              dispatch({ type: 'show_error', message: apiTranslation(result) })
            } else {
              dispatch({ type: 'create_initium' })
            }
          })
          .catch((reason) => {
            if (controller.signal.aborted) return
            dispatch({
              type: 'show_error',
              message: reason instanceof Error ? reason.message : `${reason}`,
            })
          })
        return () => controller.abort()
      }
      case 'creating_initium': {
        const controller = new AbortController()
        SBBNormdatenServiceAdapter.putInitium(
          state.text,
          state.languages.map((language) => language.id),
          controller.signal
        )
          .then((result) => {
            if (controller.signal.aborted) return
            if (APICall.isSuccess(result)) {
              onSave(result.value)
            } else {
              dispatch({ type: 'show_error', message: apiTranslation(result) })
            }
          })
          .catch((reason) => {
            if (controller.signal.aborted) return
            dispatch({
              type: 'show_error',
              message: reason instanceof Error ? reason.message : `${reason}`,
            })
          })
        return () => controller.abort()
      }
      case 'apply_initium': {
        onSave(state.initium)
        return
      }
      case 'cancel': {
        onCancel()
        return
      }
    }
  }, [apiTranslation, onCancel, onSave, state])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      if (key === 'Escape') {
        event.preventDefault()
        onCancel()
      } else if (key === 'Enter') {
        event.preventDefault()
        dispatch({ type: 'submit' })
      }
    }
    document.addEventListener('keydown', handleKeyDown, {
      capture: true,
    })
    return () => {
      document.removeEventListener('keydown', handleKeyDown, {
        capture: true,
      })
    }
  }, [onCancel])

  return (
    <DraggableDialog
      maxWidth="md"
      title={t('initium_anlegen_dialog.title')}
      onClose={onCancel}
    >
      <InitiumAnlegenDialogBody state={state} dispatch={dispatch} />
    </DraggableDialog>
  )
}
