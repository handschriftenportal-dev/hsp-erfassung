import { pipe } from 'lodash/fp'
import type { Editor, Element } from 'slate'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'

import type { VolltextElementTyp } from './VolltextElement'
import { VolltextElement } from './VolltextElement'

type CreateErfassungsEditor = () => Editor
type Decorator<T = Editor> = (toBeDecorated: T) => T
type Predicate<T = Element> = (x: T) => boolean

const extendPredicate =
  (
    lookup: Record<VolltextElementTyp, boolean>,
    fallback: Predicate
  ): Predicate =>
  (element) => {
    const typ = VolltextElement.typ(element)
    return typ === undefined ? fallback(element) : lookup[typ]
  }

const withMarkableVoid: Decorator = (editor) => {
  const { isVoid, markableVoid } = editor
  const lookup = {
    box: true,
    block: false,
    referenz: true,
    formatierung: false,
  }
  editor.isVoid = extendPredicate(lookup, isVoid)
  editor.markableVoid = extendPredicate(lookup, markableVoid)
  return editor
}

const withInline: Decorator = (editor) => {
  const { isInline } = editor
  const lookup = {
    box: true,
    block: false,
    referenz: true,
    formatierung: true,
  }
  editor.isInline = extendPredicate(lookup, isInline)
  return editor
}

export const createVolltextEditor: CreateErfassungsEditor = () =>
  pipe(withMarkableVoid, withInline, withHistory, withReact)(createEditor())
