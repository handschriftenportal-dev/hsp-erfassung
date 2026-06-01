import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'

interface Props extends RenderElementProps {}

export const HiddenElement: FC<Props> = memo(({ attributes, children }) => {
  return (
    <span {...attributes} style={{ display: 'none' }}>
      {children}
    </span>
  )
})
