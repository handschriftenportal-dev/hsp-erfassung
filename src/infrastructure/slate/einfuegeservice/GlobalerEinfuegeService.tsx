/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import {
  createContext,
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import { Editor, Element } from 'slate'

import { EinfuegeLogik } from './EinfuegeLogik'
import { GlobalerEinfuegeServiceAPI } from './GlobalerEinfuegeServiceAPI'

const initialState: GlobalerEinfuegeServiceAPI = {
  target: undefined,
  setTargetToEditor: () => undefined,
  setTargetToElement: () => undefined,
  insertCharacter: () => undefined,
  clearTarget: () => undefined,
}

const GlobalerEinfuegeContext = createContext(initialState)
export const useGlobalerEinfuegeContext = () =>
  useContext(GlobalerEinfuegeContext)

export const GlobalerEinfuegeService: FC<PropsWithChildren> = memo(
  function GlobalInsert({ children }) {
    const [target, setTarget] = useState<GlobalerEinfuegeServiceAPI['target']>()

    const setTargetToEditor = useCallback(
      (editor: Editor) => {
        const selection = editor.selection
        if (selection !== null) {
          setTarget({
            type: 'editor',
            editor: editor,
            selection,
          })
        }
      },
      [setTarget]
    )

    const setTargetToElement = useCallback(
      (editor: Editor, element: Element, input: HTMLInputElement) => {
        setTarget({
          type: 'element',
          editor,
          element,
          input,
          selection: input.selectionStart ?? 0,
        })
      },
      [setTarget]
    )

    const clearTarget = useCallback(() => {
      setTarget(undefined)
    }, [setTarget])

    const insertCharacter = EinfuegeLogik.forTarget(target)

    return (
      <GlobalerEinfuegeContext.Provider
        value={{
          target,
          setTargetToEditor,
          setTargetToElement,
          insertCharacter,
          clearTarget,
        }}
      >
        {children}
      </GlobalerEinfuegeContext.Provider>
    )
  }
)
