import type { FC } from 'react'
import { useCallback } from 'react'
import type { Descendant } from 'slate'
import { Transforms } from 'slate'
import type { RenderElementProps } from 'slate-react'
import { useSlateStatic } from 'slate-react'
import { findPath } from 'src/infrastructure/slate/SlateBoundary'
import type { VolltextEditorElement } from 'src/infrastructure/slate/volltext/VolltextEditorElement'
import type { VolltextBlock } from 'src/infrastructure/slate/volltext/VolltextElement'

import { VolltextEditor } from './VolltextEditor'

interface Props extends RenderElementProps {}

export const Volltext: FC<Props> = ({ element, children, attributes }) => {
  const { content } = element as VolltextEditorElement
  const editor = useSlateStatic()

  const handleChange = useCallback(
    (content: Descendant[]) => {
      const at = findPath(editor, element)
      if (at) {
        Transforms.setNodes<VolltextEditorElement>(
          editor,
          { content: content as VolltextBlock[] },
          { at }
        )
      }
    },
    [editor, element]
  )

  return (
    <>
      <span {...attributes}>{children}</span>
      <VolltextEditor onChange={handleChange} initialValue={content} />
    </>
  )
}
