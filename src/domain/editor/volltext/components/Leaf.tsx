import type { FC } from 'react'
import type { RenderLeafProps } from 'slate-react'

interface Props extends RenderLeafProps {}

export const Leaf: FC<Props> = function VolltextLeaf({
  attributes,
  children,
  leaf,
}) {
  return leaf.superskript ? (
    <sup {...attributes}>{children}</sup>
  ) : (
    <span {...attributes}>{children}</span>
  )
}
