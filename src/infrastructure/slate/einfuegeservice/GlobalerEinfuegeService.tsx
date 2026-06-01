import type { FC, PropsWithChildren } from 'react'
import { createContext, memo, useCallback, useContext, useState } from 'react'
import type { Editor, Element } from 'slate'

import { EinfuegeLogik } from './EinfuegeLogik'
import type { GlobalerEinfuegeServiceAPI } from './GlobalerEinfuegeServiceAPI'

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
