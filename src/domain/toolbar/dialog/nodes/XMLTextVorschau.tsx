import type { FC } from 'react'
import type { XMLText } from 'src/infrastructure/slate/transformation/XMLNode'

import { VorschauUtility } from './VorschauUtility'

interface Props {
  node: XMLText
  level: number
}
export const XMLTextVorschau: FC<Props> = ({ node, level }) => {
  const { text } = node
  return text.trim() === ''
    ? null
    : `${VorschauUtility.formatText(level, text)}\n`
}
