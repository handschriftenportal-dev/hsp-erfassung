import type { FC } from 'react'
import type { XMLComment } from 'src/infrastructure/slate/transformation/XMLNode'

import { VorschauUtility } from './VorschauUtility'

interface Props {
  node: XMLComment
  level: number
}

export const XMLCommentVorschau: FC<Props> = ({ node, level }) => {
  const { comment } = node
  return (
    <span className="xml-preview-comment">{`${VorschauUtility.indent(level)}<!--${comment}-->\n`}</span>
  )
}
