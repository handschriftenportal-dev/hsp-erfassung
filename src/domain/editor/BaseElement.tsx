import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'

interface Props extends Pick<RenderElementProps, 'children' | 'attributes'> {}

export const BaseElement: FC<Props> = memo(({ children, attributes }) => {
  return (
    <span
      style={{
        marginRight: '2px',
        lineHeight: '20px',
        fontSize: '16px',
      }}
      {...attributes}
    >
      {children}
    </span>
  )
})
