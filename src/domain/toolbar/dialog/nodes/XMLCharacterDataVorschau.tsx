import type { FC } from 'react'
import type { XMLCharacterData } from 'src/infrastructure/slate/transformation/XMLNode'

import { VorschauUtility } from './VorschauUtility'

interface Props {
  node: XMLCharacterData
  level: number
}

export const XMLCharacterDataVorschau: FC<Props> = ({ node, level = 0 }) => {
  return (
    <>
      <span className="xml-preview-character-data">{`${VorschauUtility.indent(level)}<![CDATA[`}</span>
      {node.data}
      <span className="xml-preview-character-data">{`]]>\n`}</span>
    </>
  )
}
