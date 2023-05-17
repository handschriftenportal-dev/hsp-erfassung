/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { jsx } from 'slate-hyperscript'
import { Node, Text } from 'slate'
import escapeHtml from 'escape-html'
import BeschreibungsKomponenteFactory, { BeschreibungsKomponente } from '../domain/sidebar/BeschreibungsKomponenteFactory'
import {
  SLATE_NODE_CHILDREN,
  SLATE_NODE_TEXTELEMENT,
  XML_ATTRIBUTE_PREFIX,
  XML_TAG_COMPONENT,
  XML_TAG_ORIGIN
} from './Constants'
import { APPLICATION_XML } from './MimeTypes'
import {
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_IDNO
} from '../domain/editor/beschreibungskomponenten/identifikation/BeschreibungsKomponenteIdentifikation'
import { TEI_ELEMENT_HEAD } from '../domain/editor/beschreibungskomponenten/kopf/BeschreibungsKomponenteKopf'
import {
  TEI_ELEMENT_DECONOTE_CONTENT
} from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteInhaltKunst'
import { TEI_ELEMENT_NOTE_MUSIC } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteInhaltMusik'
import { TEI_ELEMENT_PART_FRAGMENT } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteFragment'
import { TEI_ELEMENT_PART_BOOKLET } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteFaszikel'
import { TEI_ELEMENT_HISTORY } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteGeschichte'
import { TEI_ELEMENT_PHYSICAL } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteAeusseres'
import { TEI_ELEMENT_PART_BINDING } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteEinband'
import {
  TEI_ELEMENT_DECONOTE_FORM
} from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteAeusseresKunst'
import { TEI_ELEMENT_PART_ACCMAT } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteBeigabe'
import { TEI_ELEMENT_ADDITIONAL, } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteLiteratur'
import { updateBeschreibung } from '../domain/erfassung/ErfassungsState'
import { ErfassungsRules } from '../domain/erfassung/ErfassungRules'
import { BESCHREIBUNG_DEFAULT_SUBTYPE } from '../domain/erfassung/Erfassung'
import { TEI_ELEMENT_ITEM } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteAbschnitt'
import { TEI_ELEMENT_NOTE_TEXT } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteInhaltText'
import { TEI_ELEMENT_MSCONTENTS } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteInhalt'
import { TEI_ELEMENT_PART_OTHER } from '../domain/editor/beschreibungskomponenten/BeschreibungsKomponenteSonstiges'
import { findSlatePath } from './slate/SlateBoundary'
import { SIDEBAR_TEXT_LENGTH } from '../domain/sidebar/HSPSidebar'

const components: Array<string> = [TEI_ELEMENT_IDENTIFICATION, TEI_ELEMENT_HEAD, TEI_ELEMENT_NOTE_TEXT, TEI_ELEMENT_ITEM, TEI_ELEMENT_DECONOTE_CONTENT,
  TEI_ELEMENT_NOTE_MUSIC, TEI_ELEMENT_PART_FRAGMENT, TEI_ELEMENT_PART_BOOKLET, TEI_ELEMENT_PART_OTHER, TEI_ELEMENT_HISTORY, TEI_ELEMENT_PHYSICAL, TEI_ELEMENT_PART_BINDING,
  TEI_ELEMENT_DECONOTE_FORM, TEI_ELEMENT_PART_ACCMAT, TEI_ELEMENT_ADDITIONAL, TEI_ELEMENT_MSCONTENTS]

export function createBeschreibung(node: any, dispatch: any) {
  node.forEach((element: any) => {
    if (element.data_origin === 'msDesc') {
      dispatch(updateBeschreibung({
        'id': element.data_xml_id,
        'subtype': element.data_subtype ? element.data_subtype : BESCHREIBUNG_DEFAULT_SUBTYPE,
        'type': element.data_type
      }))
      return
    }

    if (SLATE_NODE_CHILDREN in element) {
      createBeschreibung(element.children, dispatch)
    }
  })
}

export function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
    const random = Math.random() * 16 | 0
    const value = character === 'x' ? random : (random & 0x3 | 0x8)
    return value.toString(16)
  })
}

export function createComponents(node: any, komponenten: Array<any>, editor: any, level: number, parent: string, wrapperid: string, beschreibungsType: string) {

  if (node) {
    node.forEach((element: any) => {

      let komponente: any

      if (element) {

        if (ErfassungsRules[beschreibungsType].wrapperElements.includes(element.data_origin)) {
          wrapperid = element.id
        }

        if (XML_TAG_COMPONENT in element && components.includes(element.component)) {

          if (ErfassungsRules[beschreibungsType][element.component].wrapperElement) {
            komponente = BeschreibungsKomponenteFactory(element.id, element.component as string, findSlatePath(editor, element), element.copied, element.path, element.level, parent, wrapperid)
          } else {
            komponente = BeschreibungsKomponenteFactory(element.id, element.component as string, findSlatePath(editor, element), element.copied, element.path, element.level, parent, '')
          }
        }

        if (SLATE_NODE_CHILDREN in element) {
          if (komponente) {
            createComponents(element.children, komponente.teiElement !== TEI_ELEMENT_PART_OTHER ? komponente.children : [], editor, level, komponente.id, wrapperid, beschreibungsType)
            komponenten.push(komponente)
          } else {
            createComponents(element.children, komponenten, editor, level, parent, wrapperid, beschreibungsType)
          }
        }
      }
    })

  }
}

export function downloadBlob(blob: any, name: any) {
  if (
    window.navigator &&
      window.navigator.msSaveOrOpenBlob
  ) return window.navigator.msSaveOrOpenBlob(blob)

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.

  const data = window.URL.createObjectURL(new Blob([blob], { type: APPLICATION_XML }))

  const link = document.createElement('a')
  link.href = data
  link.download = name

  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  )

  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data)
    link.remove()
  }, 100)
}


/**
 * Function to write TEI XML based on Internal Slate Value
 *
 * @param node
 */

export function serializeAsText(node: any) {
  if (Text.isText(node)) {
    return escapeHtml(node.text)
  }

  if (node && node.children) {
    const children = node.children.map((child: any) => serializeAsText(child)).join('')

    if (Node.isNode(node)) {
      if ((node as any).data_origin !== SLATE_NODE_TEXTELEMENT) {
        if (children !== undefined && children.length > 0) {
          return `${children}`
        }
      }
    }


    return children
  }
  return ''
}

export function createSubtitleForComponent(beschreibung: BeschreibungsKomponente, node: any, index: number) {

  let result = ''

  if (beschreibung.teiElement === TEI_ELEMENT_NOTE_TEXT || beschreibung.teiElement === TEI_ELEMENT_NOTE_MUSIC || beschreibung.teiElement === TEI_ELEMENT_DECONOTE_CONTENT ||
      beschreibung.teiElement === TEI_ELEMENT_DECONOTE_FORM) {
    if (node.children) {
      node.children.forEach((element: any) => {
        if (element.data_origin === 'textelement') {
          result = result.concat(serializeAsText(element))
        }
      })
    }

    result = result.length !== 0 ? result.substr(0, SIDEBAR_TEXT_LENGTH) + '\u2026' : ''
  }

  if (beschreibung.teiElement === TEI_ELEMENT_PART_FRAGMENT || beschreibung.teiElement === TEI_ELEMENT_PART_BOOKLET) {
    if (node.children) {
      node.children.forEach((element: any) => {
        if (element.data_origin === TEI_ELEMENT_IDENTIFICATION) {
          if (element.children) {
            element.children.forEach((child: any) => {
              if (child.data_origin === TEI_ELEMENT_IDNO) {
                result = result.concat(serializeAsText(element))
              }
            })
          }
        }
      })
    }
  }

  if (beschreibung.teiElement === TEI_ELEMENT_ITEM) {
    result = index ? '( ' + index + ' )' : ''
  }


  return result
}

export function serialize(node: any) {

  if (Text.isText(node)) {
    return escapeHtml(node.text)
  }

  const children = node.children.map((child: any) => serialize(child)).join('')

  if (Node.isNode(node)) {

    const attributes = []

    for (const nodeKey in node) {
      if (Object.prototype.hasOwnProperty.call(node, nodeKey) && nodeKey.startsWith(XML_ATTRIBUTE_PREFIX)) {
        if (nodeKey !== XML_TAG_ORIGIN && (node as any)[nodeKey] !== SLATE_NODE_TEXTELEMENT) {
          attributes.push(nodeKey.replaceAll(XML_ATTRIBUTE_PREFIX, '').replaceAll('_', ':') + '=' + '"' + (node as any)[nodeKey] + '"')
        }
      }
    }

    if ((node as any).data_origin !== SLATE_NODE_TEXTELEMENT) {
      if (attributes.length > 0) {
        return `<${(node as any).data_origin} ${attributes.join(' ')}>${children}</${(node as any).data_origin}>\n`
      } else {
        return `<${(node as any).data_origin}>${children}</${(node as any).data_origin}>\n`
      }
    }
  }

  return children
}

/**
 *
 * Function to convert TEI to internal Slate JSON Value
 *
 * @param el TEI XML Node
 */

const convertArrayToObject = (array: any, initialValue: any) => {
  return array.reduce((obj: any, node: Element) => {
    return {
      ...obj,
      [XML_ATTRIBUTE_PREFIX + node.nodeName.replaceAll(':', '_')]: escapeHtml(node.nodeValue as string),
    }
  }, initialValue)
}

export function findComponent(element: string, classAttribut: string, typeAttribut: string, region: string) {

  /* console.log('Finding component with element ' + element + ' classattribute ' + classAttribut + ' typeAttribut ' + typeAttribut + ' region' +
      region) */

  if (classAttribut !== '' && components.includes(element + classAttribut)) {
    return components[components.indexOf(element + classAttribut)]
  }

  if (typeAttribut !== '' && components.includes(element + typeAttribut)) {
    return components[components.indexOf(element + typeAttribut)]
  }

  if (components.includes(element)) {
    return components[components.indexOf(element)]
  }

  return ''
}

/**
 * Function to convert XML to Slate Value
 * @param element
 * @param region
 * @param path
 * @param beschreibungsType
 */
export function deserialize(element: any, region: string, path: string, beschreibungsType: string) {
  let level = 0

  const classAttribute = element.attributes && element.attributes.getNamedItem('class') ? element.attributes.getNamedItem('class').nodeValue : ''
  const typeAttribute = element.attributes && element.attributes.getNamedItem('type') ? element.attributes.getNamedItem('type').nodeValue : ''

  if (ErfassungsRules[beschreibungsType].regionsSet.includes(element.nodeName)) {

    region = element.nodeName + typeAttribute
  }

  if (element.nodeType === 3) {
    return jsx('element', {
      data_origin: SLATE_NODE_TEXTELEMENT,
      region: region
    }, [{
      region: region,
      text: element.textContent.trim()
    }])
  }

  const parent: any = element
  path = path === '' ? path.concat(element.nodeName) : path.concat('-' + element.nodeName)

  const children: any = Array.from(parent.childNodes).map(function (n) {
    return deserialize(n, region, path, beschreibungsType)
  }).flat()

  if (children.length === 0) {
    const emptyTextElement = jsx('element', {
      data_origin: SLATE_NODE_TEXTELEMENT,
      region: region
    }, [{
      region: region,
      text: ''
    }])
    children.push(emptyTextElement)
  }

  if (element.nodeType === 1) {

    // eslint-disable-next-line prefer-regex-literals
    level = (path.match(new RegExp('msDesc|msPart|msItem|msContents', 'g')) || []).length

    return jsx('element', (convertArrayToObject(Array.from(element.attributes), {
      data_origin: element.nodeName,
      region: region,
      path: path,
      component: findComponent(element.nodeName, classAttribute, typeAttribute, region),
      level: level,
      id: createUUID()
    })),
    children
    )
  }

  return children
}

