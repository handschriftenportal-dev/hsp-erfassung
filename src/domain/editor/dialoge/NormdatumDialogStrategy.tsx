import type { Editor, Element } from 'slate'
import { ReactEditor } from 'slate-react'
import type { DialogStrategy } from 'src/domain/editor/dialoge/DialogStrategy'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import { SelectionToolbar } from 'src/domain/editor/selectiontoolbar/SelectionToolbar'
import type { GlobalModalInterface } from 'src/infrastructure/modal/GlobalModalInterface'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import {
  deleteReferenz,
  findPath,
  insertSlateNodes,
  selectedText,
  updateNodes,
} from 'src/infrastructure/slate/SlateBoundary'
import type { VolltextNormdatum } from 'src/infrastructure/slate/volltext/VolltextElement'

import { NormdatumDialog } from './NormdatumDialog'
import type { NormdatumDialogAction } from './normdatumDialog/NormdatumDialogAction'
import { NormdatumDialogState } from './normdatumDialog/NormdatumDialogState'

type ActionLookup = Partial<
  Record<NormdatumDialogAction, (state: NormdatumDialogState) => void>
>

function createOnAction(lookup: ActionLookup) {
  return function onAction(
    actionType: NormdatumDialogAction,
    state: NormdatumDialogState
  ): void {
    const action = lookup[actionType]
    if (action) {
      action(state)
    }
  }
}

function createSubmitAction(
  type: NormdatumDialogState['type'],
  editor: Editor,
  { hideModal }: GlobalModalInterface
) {
  return (state: NormdatumDialogState) => {
    const { selection } = editor
    if (selection && 'normdatum' in state) {
      const { gndIdentifier, identifier } = state.normdatum!
      const normdatumElement = ErfassungsRegeln.normdatumElement(type, {
        gndIdentifierOption: gndIdentifier,
        normdatenText: state.text,
        identifier: identifier ?? '',
        role: state.rollen.join(' '),
      })
      if (normdatumElement) {
        insertSlateNodes(editor, normdatumElement, selection)
      }
    }
    hideModal()
  }
}

function createNormdatumDialogActionLookup(
  type: NormdatumDialogState['type'],
  editor: Editor,
  modalInterface: GlobalModalInterface
): ActionLookup {
  const { showModal, hideModal } = modalInterface
  return {
    cancel: (_state) => {
      hideModal()
    },
    back: (_state) => {
      hideModal()
      setTimeout(() => {
        ReactEditor.focus(editor)
        showModal(<SelectionToolbar editor={editor} />)
      }, 0)
    },
    submit: createSubmitAction(type, editor, modalInterface),
  }
}

function setupCreateNormdatumDialog(
  editor: Editor,
  modalInterface: GlobalModalInterface,
  type: NormdatumDialogState['type']
): NormdatumDialogProps {
  return {
    initialState: NormdatumDialogState.new.create(type, selectedText(editor)),
    onAction: createOnAction(
      createNormdatumDialogActionLookup(type, editor, modalInterface)
    ),
  }
}

interface NormdatumDialogProps {
  initialState: NormdatumDialogState
  onAction: (action: NormdatumDialogAction, state: NormdatumDialogState) => void
}

function setupReadOnlyNormdatumDialog(
  editor: Editor,
  element: VolltextNormdatum,
  { hideModal }: GlobalModalInterface
): NormdatumDialogProps {
  const actionLookup: ActionLookup = {
    cancel: (_state) => {
      hideModal()
    },
    back: (_state) => {
      hideModal()
      setTimeout(() => {
        ReactEditor.focus(editor)
      }, 0)
    },
  }
  return {
    initialState: NormdatumDialogState.new.read(element),
    onAction: createOnAction(actionLookup),
  }
}

function editDialogSubmitAction(
  editor: Editor,
  element: VolltextNormdatum,
  { hideModal }: GlobalModalInterface
) {
  const path = findPath(editor, element)
  return (state: NormdatumDialogState) => {
    hideModal()
    if (path && 'normdatum' in state) {
      const { box } = element
      const { gndIdentifier, identifier } = state.normdatum!
      const attributes: Record<string, string> = {
        data_role: state.rollen.join(' '),
        data_ref: NormdatenUtilities.idToUrl(gndIdentifier),
      }
      if (identifier) {
        attributes.data_key = identifier
      }
      updateNodes(
        editor,
        {
          content: state.text,
          box: {
            ...box,
            ...attributes,
          },
        } as Partial<Element>,
        path
      )
    }
  }
}

function editDialogActionLookup(
  editor: Editor,
  element: VolltextNormdatum,
  modalInterface: GlobalModalInterface
): ActionLookup {
  const { hideModal } = modalInterface
  return {
    cancel: hideModal,
    back: (_) => {
      hideModal()
      setTimeout(() => {
        ReactEditor.focus(editor)
      }, 0)
    },
    delete: (_) => {
      deleteReferenz(editor, element)
      hideModal()
    },
    submit: editDialogSubmitAction(editor, element, modalInterface),
  }
}

function setupEditNormdatumDialog(
  editor: Editor,
  element: VolltextNormdatum,
  modalInterface: GlobalModalInterface
): NormdatumDialogProps {
  return {
    initialState: NormdatumDialogState.new.edit(element),
    onAction: createOnAction(
      editDialogActionLookup(editor, element, modalInterface)
    ),
  }
}

const createDialog: DialogStrategy<VolltextNormdatum>['createDialog'] = (
  type,
  { editor, modalContext }
) => {
  const { initialState, onAction } = setupCreateNormdatumDialog(
    editor,
    modalContext,
    // We assume, that the type checking is done in useDialog
    type as NormdatumDialogState['type']
  )
  modalContext.showModal(
    <NormdatumDialog initialState={initialState} onAction={onAction} />
  )
}

const editDialog: DialogStrategy<VolltextNormdatum>['editDialog'] = (
  element,
  { editor, modalContext, readOnly }
) => {
  ReactEditor.blur(editor)
  const { initialState, onAction } = readOnly
    ? setupReadOnlyNormdatumDialog(editor, element, modalContext)
    : setupEditNormdatumDialog(editor, element, modalContext)
  modalContext.showModal(
    <NormdatumDialog initialState={initialState} onAction={onAction} />
  )
}

export const NormdatumDialogStrategy = Object.freeze({
  createDialog,
  editDialog,
})
