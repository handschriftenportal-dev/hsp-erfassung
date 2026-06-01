import { Sonderzeichen } from 'src/domain/sonderzeichen/Sonderzeichen'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import {
  insertTextAtSelection,
  insertTextIntoElement,
} from 'src/infrastructure/slate/SlateBoundary'

import type {
  EditorTarget,
  ElementTarget,
  GlobalerEinfuegeServiceAPI,
} from './GlobalerEinfuegeServiceAPI'

function insertString(into: string, at: number, char: string): string {
  return into.slice(0, at) + char + into.slice(at)
}

const intoElement =
  (target: ElementTarget) =>
  (sonderzeichen: Sonderzeichen): void => {
    const char = Sonderzeichen.toString(sonderzeichen)
    const { editor, element, input, selection } = target
    const value = HSPNode.extractText(element, { trim: false })
    const newSelection = selection + char.length
    const newValue = insertString(value, selection, char)
    insertTextIntoElement(editor, element, newValue)
    setTimeout(() => {
      input.focus()
      input.setSelectionRange(newSelection, newSelection, 'forward')
    }, 0)
  }

const intoEditor =
  (target: EditorTarget) =>
  (sonderzeichen: Sonderzeichen): void => {
    const char = Sonderzeichen.toString(sonderzeichen)
    const { editor, selection } = target
    insertTextAtSelection(editor, selection, char)
  }

const noop = (_: Sonderzeichen): void => undefined

function forTarget(
  target: GlobalerEinfuegeServiceAPI['target']
): (sonderzeichen: Sonderzeichen) => void {
  switch (target?.type) {
    case undefined:
      return noop
    case 'editor':
      return intoEditor(target)
    case 'element':
      return intoElement(target)
  }
}

export const EinfuegeLogik = Object.freeze({
  forTarget,
})
