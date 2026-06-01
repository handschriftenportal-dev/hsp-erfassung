import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'
import { useFocused, useSelected, useSlateStatic } from 'slate-react'
import { useDialog } from 'src/domain/editor/dialoge/useDialog'
import type { VolltextReferenz } from 'src/infrastructure/slate/volltext/VolltextElement'
import { VolltextElement } from 'src/infrastructure/slate/volltext/VolltextElement'

interface Props extends RenderElementProps {
  element: VolltextReferenz
}

export const Referenz: FC<Props> = memo(({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  const { content } = element
  const editor = useSlateStatic()
  const { openEditDialogHandler } = useDialog(editor)

  return (
    <span
      {...attributes}
      style={{
        ...VolltextElement.style(element),
        outline: selected && focused ? '1px solid black' : 'none',
      }}
      contentEditable={false}
      onClick={openEditDialogHandler(element)}
    >
      {children}
      {content}
    </span>
  )
})
