/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { FC, Fragment, PropsWithChildren } from 'react'

import {
  XMLElement,
  XMLNode,
} from '../../../../infrastructure/slate/transformation/XMLNode'
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
