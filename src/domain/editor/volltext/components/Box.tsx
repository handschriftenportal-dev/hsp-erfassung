import type { FC } from 'react'
import type { RenderElementProps } from 'slate-react'
import { useFocused, useSelected } from 'slate-react'
import type { VolltextBox } from 'src/infrastructure/slate/volltext/VolltextElement'

interface Props extends RenderElementProps {
  element: VolltextBox
}

export const Box: FC<Props> = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  const { content } = element
  const style = {
    padding: '1px 4px',
    borderRadius: 4,
    outline: selected && focused ? '1px solid black' : 'none',
    backgroundColor:
      selected && focused ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)',
  }

  return (
    <span {...attributes} style={style}>
      {children}
      {content}
    </span>
  )
}
