import type { FC } from 'react'
import { XMLNode } from 'src/infrastructure/slate/transformation/XMLNode'

import { XMLCharacterDataVorschau } from './XMLCharacterDataVorschau'
import { XMLCommentVorschau } from './XMLCommentVorschau'
import { XMLDocumentTypeVorschau } from './XMLDocumentTypeVorschau'
import { XMLElementVorschau } from './XMLElementVorschau'
import { XMLTextVorschau } from './XMLTextVorschau'

export interface Props {
  node: XMLNode
  level: number
}

export const XMLNodeVorschau: FC<Props> = ({ node, level = 0 }) => {
  switch (true) {
    case XMLNode.isText(node):
      return <XMLTextVorschau node={node} level={level} />
    case XMLNode.isElement(node):
      return <XMLElementVorschau node={node} level={level} />
    case XMLNode.isComment(node):
      return <XMLCommentVorschau node={node} level={level} />
    case XMLNode.isCharacterData(node):
      return <XMLCharacterDataVorschau node={node} level={level} />
    case XMLNode.isDocumentType(node):
      return <XMLDocumentTypeVorschau node={node} level={level} />
  }
}
