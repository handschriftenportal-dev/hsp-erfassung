import { Editor } from 'slate'

function isInSuperskript(editor: Editor): boolean {
  return Editor.marks(editor)?.superskript === true
}

function removeSuperskript(editor: Editor): void {
  Editor.removeMark(editor, 'superskript')
}

function toggleSuperskript(editor: Editor): void {
  if (isInSuperskript(editor)) {
    Editor.removeMark(editor, 'superskript')
  } else {
    Editor.addMark(editor, 'superskript', true)
  }
}

export const HSPEditor = Object.freeze({
  ...Editor,
  isInSuperskript,
  toggleSuperskript,
  removeSuperskript,
})
