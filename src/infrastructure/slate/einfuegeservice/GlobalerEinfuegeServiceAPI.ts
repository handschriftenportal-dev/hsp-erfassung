import type { Editor, Element, Range } from 'slate'
import type { Sonderzeichen } from 'src/domain/sonderzeichen/Sonderzeichen'

export type EditorTarget = {
  type: 'editor'
  editor: Editor
  selection: Range
}
export type ElementTarget = {
  type: 'element'
  editor: Editor
  element: Element
  input: HTMLInputElement
  selection: number
}

export type GlobalerEinfuegeServiceAPI = {
  target: EditorTarget | ElementTarget | undefined
  setTargetToEditor: (editor: Editor) => void
  setTargetToElement: (
    editor: Editor,
    element: Element,
    input: HTMLInputElement
  ) => void
  clearTarget: () => void
  insertCharacter: (sonderzeichen: Sonderzeichen) => void
}
