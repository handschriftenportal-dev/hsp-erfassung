import type { FC } from 'react'
import type { RenderElementProps } from 'slate-react'
import type { VolltextBlock } from 'src/infrastructure/slate/volltext/VolltextElement'

interface Props extends RenderElementProps {
  element: VolltextBlock
}

export const Block: FC<Props> = ({ attributes, children }) => {
  return <div {...attributes}>{children}</div>
}
