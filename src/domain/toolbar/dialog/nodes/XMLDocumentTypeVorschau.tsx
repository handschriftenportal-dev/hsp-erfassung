import type { FC } from 'react'
import type { XMLDocumentType } from 'src/infrastructure/slate/transformation/XMLNode'

import { VorschauUtility } from './VorschauUtility'

interface Props {
  node: XMLDocumentType
  level: number
}

export const XMLDocumentTypeVorschau: FC<Props> = ({ node, level = 0 }) => {
  const { publicId, systemId, name } = node.doctype
  const isSystemDocumentType = publicId === ''
  return (
    <span className="xml-preview-document-type">
      {VorschauUtility.indent(level)}
      <span className="xml-preview-element">{`<!DOCTYPE ${name} `}</span>
      {isSystemDocumentType ? (
        <>
          <span className="xml-preview-attribute-key">SYSTEM</span>
          <span className="xml-preview-element">{' "'}</span>
          <span className="xml-preview-attribute-value">{systemId}</span>
          <span className="xml-preview-element">{'">\n'}</span>
        </>
      ) : (
        <>
          <span className="xml-preview-attribute-key">PUBLIC</span>
          <span className="xml-preview-element">{' "'}</span>
          <span className="xml-preview-attribute-value">{publicId}</span>
          <span className="xml-preview-element">{'" "'}</span>
          <span className="xml-preview-attribute-value">{systemId}</span>
          <span className="xml-preview-element">{'">\n'}</span>
        </>
      )}
    </span>
  )
}
