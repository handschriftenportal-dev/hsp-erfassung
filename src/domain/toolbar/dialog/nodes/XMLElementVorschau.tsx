import type { FC, PropsWithChildren } from 'react'
import { Fragment } from 'react'
import type { XMLElement } from 'src/infrastructure/slate/transformation/XMLNode'
import { XMLNode } from 'src/infrastructure/slate/transformation/XMLNode'

import { VorschauUtility } from './VorschauUtility'
import { XMLNodeVorschau } from './XMLNodeVorschau'

interface Props {
  node: XMLElement
  level: number
}

interface AttributeProp {
  entry: [string, string]
}

const Attribute: FC<AttributeProp> = ({ entry }) => {
  const [key, value] = entry
  return (
    <>
      <span className="xml-preview-attribute-key">{`${key}`}</span>
      <span className="xml-preview-element">="</span>
      <span className="xml-preview-attribute-value">{value}</span>
      <span className="xml-preview-element">"</span>
    </>
  )
}

const EmptyElement: FC<Props> = ({ node, level }) => {
  const { attributes, tag } = node
  const entries = Object.entries(attributes)
  const indent = VorschauUtility.indent(level)
  if (entries.length === 0) {
    return (
      <span className="xml-preview-element">{`${indent}<${tag} />\n`}</span>
    )
  } else if (entries.length === 1) {
    return (
      <>
        <span className="xml-preview-element">{`${indent}<${tag} `}</span>
        <Attribute entry={entries[0]} />
        <span className="xml-preview-element">{` />\n`}</span>
      </>
    )
  }
  const attributeIndent = VorschauUtility.indent(level + 1)
  return (
    <>
      <span className="xml-preview-element">{`${indent}<${tag}\n`}</span>
      {entries.map((entry, idx) => (
        <Fragment key={idx}>
          {attributeIndent}
          <Attribute key={idx} entry={entry} />
          {'\n'}
        </Fragment>
      ))}
      <span className="xml-preview-element">{`${indent}/>\n`}</span>
    </>
  )
}

const OpenTag: FC<Props> = ({ level, node }) => {
  const { tag, attributes } = node
  const entries = Object.entries(attributes)
  const indent = VorschauUtility.indent(level)
  if (entries.length === 0) {
    return <span className="xml-preview-element">{`${indent}<${tag}>\n`}</span>
  } else if (entries.length === 1) {
    return (
      <>
        <span className="xml-preview-element">{`${indent}<${tag} `}</span>
        <Attribute entry={entries[0]} />
        <span className="xml-preview-element">{`>\n`}</span>
      </>
    )
  }

  const attributeIndent = VorschauUtility.indent(level + 1)

  return (
    <>
      <span className="xml-preview-element">{`${indent}<${tag}\n`}</span>
      {entries.map((entry, idx) => (
        <Fragment key={idx}>
          {attributeIndent}
          <Attribute key={idx} entry={entry} />
          {'\n'}
        </Fragment>
      ))}
      <span className="xml-preview-element">{`${indent}>\n`}</span>
    </>
  )
}

const CloseTag: FC<Props> = ({ level, node }) => {
  const { tag } = node
  return (
    <span className="xml-preview-element">{`${VorschauUtility.indent(level)}</${tag}>\n`}</span>
  )
}

const FilledElement: FC<PropsWithChildren<Props>> = ({
  node,
  level,
  children,
}) => {
  return (
    <>
      <OpenTag node={node} level={level} />
      {children}
      <CloseTag node={node} level={level} />
    </>
  )
}

export const XMLElementVorschau: FC<Props> = ({ node, level }) => {
  const { children } = node
  return XMLNode.isEmptyElement(node) ? (
    <EmptyElement node={node} level={level} />
  ) : (
    <FilledElement node={node} level={level}>
      {children.map((child, idx) => (
        <XMLNodeVorschau key={idx} node={child} level={level + 1} />
      ))}
    </FilledElement>
  )
}
