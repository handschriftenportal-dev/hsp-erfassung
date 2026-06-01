import type { FC } from 'react'
import type { RenderElementProps } from 'slate-react'

interface Props extends RenderElementProps {}

export const LBElement: FC<Props> = ({ attributes, children }) => {
  return (
    <span {...attributes} contentEditable={false}>
      {children}
      <br />
    </span>
  )
}
