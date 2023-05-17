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

import {
  createComponents,
  createSubtitleForComponent,
  deserialize,
  findComponent,
  serialize,
  serializeAsText
} from '../../src/infrastructure/XMLConverter'
import { ReactEditor, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { BESCHREIBUNG_DEFAULT_SUBTYPE } from '../../src/domain/erfassung/Erfassung'

describe('XMLConverter', () => {
  it('xmlconverter deserialize test', () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString('<TEI><head>Test</head></TEI>', 'text/xml')
    const result = deserialize(doc, 'TEI', '', 'medieval')
    expect(JSON.stringify(result)).toContain('[{"data_origin":"TEI","region":"TEI","path":"#document-TEI","component":"","level":0,')
  })

  it('xmlconverter serialize test', () => {
    const slateState = JSON.parse('[{"data_origin":"TEI","region":"TEI","children":[{"data_origin":"text","region":"text","children":[{"data_origin":"textelement","region":"text","children":[{"region":"text","text":' +
        '"Test"}]}]}]}]')
    const result = serialize(slateState[0])
    expect(result.replace(/\s/g, '')).toEqual('<TEI><text>Test</text></TEI>'.replace(/\s/g, ''))
  })

  it('xmlconverter serialize text test', () => {
    const slateState = JSON.parse('[{"data_origin":"TEI","region":"TEI","children":[{"data_origin":"text","region":"text","children":[{"data_origin":"textelement","region":"text","children":[{"region":"text","text":' +
        '"Test"}]}]}]}]')
    const result = serializeAsText(slateState[0])
    expect(result.replace(/\s/g, '')).toEqual('Test'.replace(/\s/g, ''))
  })

  it('xmlconverter create inhalt text test', () => {
    const slateState = JSON.parse('[{"data_origin":"textelement","region":"text","children":[{"region":"text","text":' +
        '"1v-2r"}]}]')
    const result = createSubtitleForComponent({
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: 'notetext',
      wrapperID: '',
      xmlpath: ''
    }, { children: slateState }, 0)
    expect(result).toEqual('1v-2r…')
  })

  it('xmlconverter create fragment test', () => {
    const slateState = JSON.parse('[{"data_origin":"msIdentifier","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msPart-msPart-msIdentifier","component":"msIdentifier","level":3,"id":"37adf08c-e86d-4902-90b1-85d5c0992fed","children":[{"data_origin":"idno","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msPart-msPart-msIdentifier-idno","component":"","level":3,"id":"1a84390b-d95c-4d5c-a185-a834fe31f1b2","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"FragmentI"}]}]}]}]')
    const result = createSubtitleForComponent({
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: 'msPartfragment',
      wrapperID: '',
      xmlpath: ''
    }, { children: slateState }, 0)
    expect(result).toEqual('FragmentI')
  })

  it('Find Component', () => {
    expect(findComponent('history', '', '', 'history')).toEqual('history')
    expect(findComponent('head', '', '', 'head')).toEqual('head')
    expect(findComponent('msIdentifier', '', '', 'msIdentifier')).toEqual('msIdentifier')

    expect(findComponent('decoNote', '', 'content', 'decoNote')).toEqual('decoNotecontent')
    expect(findComponent('note', '', 'music', 'note')).toEqual('notemusic')
    expect(findComponent('msItem', '', '', 'msItem')).toEqual('msItem')

    expect(findComponent('additional', '', '', 'additional')).toEqual('additional')

    expect(findComponent('msPart', '', 'booklet', 'msPart')).toEqual('msPartbooklet')
    expect(findComponent('msPart', '', 'fragment', 'msPart')).toEqual('msPartfragment')
    expect(findComponent('msPart', '', 'accMat', 'msPart')).toEqual('msPartaccMat')
    expect(findComponent('msPart', '', 'binding', 'msPart')).toEqual('msPartbinding')
    expect(findComponent('msPart', '', 'other', 'msPart')).toEqual('msPartother')

    expect(findComponent('physDesc', '', '', 'physDesc')).toEqual('physDesc')

    expect(findComponent('decoNoteform', '', '', 'decoNoteform')).toEqual('decoNoteform')
  })

  it('Create Components For MSPart Other', () => {
    const komponenten: Array<any> = []
    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      'data_origin': 'msPart',
      'region': 'msPart',
      'component': 'msPartother',
      'data_type': 'other',
      'copied': false,
      'children': [{
        'data_origin': 'msIdentifier',
        'region': 'msIdentifier',
        'component': 'msIdentifier',
        'copied': false,
        'children': [{
          'data_origin': 'idno',
          'region': 'msIdentifier',
          'children': [
            {
              'data_origin': 'textelement',
              'region': 'msIdentifier',
              'children': [
                {
                  'text': ' ',
                  'region': 'msIdentifier'
                }
              ]
            }
          ]
        }]
      },
      {
        'data_origin': 'p',
        'region': 'msPart',
        'copied': false,
        'children': [
          {
            'data_origin': 'textelement',
            'region': 'msPart',
            'children': [
              {
                'text': ' ',
                'region': 'msPart'
              }
            ]
          }
        ]
      }]
    }]
    createComponents(slateValue, komponenten, editor, 0, 'root', 'root', BESCHREIBUNG_DEFAULT_SUBTYPE)
    expect(komponenten.length).toEqual(1)
    expect(komponenten[0].teiElement).toEqual('msPartother')
    expect(komponenten[0].children.length).toEqual(0)
  })
})
