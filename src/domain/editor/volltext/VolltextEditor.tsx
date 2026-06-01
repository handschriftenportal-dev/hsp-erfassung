import type { FC, KeyboardEventHandler } from 'react'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { Descendant } from 'slate'
import { Editor, Range } from 'slate'
import { Editable, ReactEditor, Slate } from 'slate-react'
import { useDialog } from 'src/domain/editor/dialoge/useDialog'
import { useSelectionToolbar } from 'src/domain/editor/selectiontoolbar/SelectionToolbarCustomHooks'
import { Renderer } from 'src/domain/editor/volltext/Renderer'
import { selectReadOnly } from 'src/domain/erfassung/ErfassungsState'
import { Portal } from 'src/infrastructure/components/Portal'
import { LiteraturService } from 'src/infrastructure/literatur/LiteraturService'
import { useGlobalerEinfuegeContext } from 'src/infrastructure/slate/einfuegeservice/GlobalerEinfuegeService'
import { HSPEditor } from 'src/infrastructure/slate/HSPEditor'
import { insertLiteratur } from 'src/infrastructure/slate/SlateBoundary'
import { createVolltextEditor } from 'src/infrastructure/slate/volltext/VolltextEditorFactory'
import type { VolltextBlock } from 'src/infrastructure/slate/volltext/VolltextElement'
import { VolltextElement } from 'src/infrastructure/slate/volltext/VolltextElement'

interface Props {
  initialValue: VolltextBlock[]
  onChange?: (content: Descendant[]) => void
}

export const VolltextEditor: FC<Props> = ({
  initialValue,
  onChange = console.log,
}) => {
  const readOnly = useSelector(selectReadOnly)
  const editor = useMemo(() => createVolltextEditor(), [])
  const { openEditDialogHandler } = useDialog(editor)

  const ref = useRef<HTMLDivElement | null>(null)
  const [target, setTarget] = useState<Range | null>(null)
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')

  const literature = LiteraturService.findByTitle(search).slice(0, 10)

  const { handleSelection, handleBlur } = useSelectionToolbar(editor)
  const { setTargetToEditor } = useGlobalerEinfuegeContext()

  const handleKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      const entry = Editor.above(editor)
      if (!entry) {
        return
      }
      if (target && literature.length > 0) {
        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault()
            const prevIndex = index >= literature.length - 1 ? 0 : index + 1
            setIndex(prevIndex)
            return
          }
          case 'ArrowUp': {
            event.preventDefault()
            const nextIndex = index <= 0 ? literature.length - 1 : index - 1
            setIndex(nextIndex)
            return
          }
          case 'Tab':
          case 'Enter': {
            event.preventDefault()
            insertLiteratur(editor, target, literature[index])
            setTarget(null)
            return
          }
          case 'Escape': {
            event.preventDefault()
            setTarget(null)
            return
          }
        }
      }

      const [node, _] = entry
      if (event.key === 'Enter' && VolltextElement.isVolltextReferenz(node)) {
        event.preventDefault()
        openEditDialogHandler(node)()
        return
      }
      if (!VolltextElement.isVolltextBlock(node)) {
        return
      }
      if (event.key === '+' && event.ctrlKey) {
        HSPEditor.toggleSuperskript(editor)
        event.preventDefault()
      }
      if (event.key === 'Escape' || event.key === 'Enter') {
        HSPEditor.removeSuperskript(editor)
      }
    },
    [editor, index, literature, openEditDialogHandler, target]
  )

  const handleChange = useCallback(
    (value: Descendant[]) => {
      onChange(value)
      const { selection } = editor
      if (selection && Range.isCollapsed(selection)) {
        const [start] = Range.edges(selection)
        const wordBefore = Editor.before(editor, start, { unit: 'word' })
        const before = wordBefore && Editor.before(editor, wordBefore)
        const beforeRange = before && Editor.range(editor, before, start)
        const beforeText = beforeRange && Editor.string(editor, beforeRange)
        const beforeMatch = beforeText?.match(/^@(\w+)$/)
        const after = Editor.after(editor, start)
        const afterRange = Editor.range(editor, start, after)
        const afterText = Editor.string(editor, afterRange)
        const afterMatch = afterText.match(/^(\s|$)/)

        if (beforeMatch && afterMatch) {
          setTarget(beforeRange!)
          setSearch(beforeMatch[1])
          setIndex(0)
          return
        }
      }
      setTarget(null)
    },
    [editor, onChange]
  )

  useEffect(() => {
    if (target && literature.length > 0 && ref.current) {
      const el = ref.current
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [literature.length, editor, index, search, target])

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={handleChange}
      onSelectionChange={handleSelection}
    >
      <Editable
        onKeyDown={handleKeyDown}
        renderElement={Renderer.element}
        renderLeaf={Renderer.leaf}
        readOnly={readOnly}
        className={'rich-text-editor'}
        onBlur={(event) => {
          handleBlur(event)
          setTargetToEditor(editor)
        }}
      />
      {target && literature.length > 0 && (
        <Portal>
          <div
            ref={ref}
            style={{
              top: '-9999px',
              left: '-9999px',
              position: 'absolute',
              zIndex: 1,
              padding: '3px',
              background: 'white',
              borderRadius: '4px',
              boxShadow: '0 1px 5px rgba(0,0,0,.2)',
            }}
            data-cy="mentions-portal"
          >
            {literature.map((lit, i) => (
              <div
                key={lit.uri}
                onClick={() => {
                  insertLiteratur(editor, target, literature[index])
                  setTarget(null)
                }}
                style={{
                  padding: '1px 3px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  background: i === index ? '#B4D5FF' : 'transparent',
                }}
              >
                {lit.title}
              </div>
            ))}
          </div>
        </Portal>
      )}
    </Slate>
  )
}
