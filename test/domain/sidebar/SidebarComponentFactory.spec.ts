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

import { BESCHREIBUNG_DEFAULT_SUBTYPE } from '../../../src/domain/erfassung/Erfassung'
import { SidebarComponentFactory } from '../../../src/domain/sidebar/SidebarComponentFactory'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'

describe('Sidebar Component Factory', () => {
  const { createSubtitleForComponent, createComponents } =
    SidebarComponentFactory
  it('can create component for Beschreibungskomponente Andere', () => {
    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'msPart',
        region: 'msPart',
        component: 'msPartother',
        data_type: 'other',
        children: [
          {
            data_origin: 'msIdentifier',
            region: 'msIdentifier',
            component: 'msIdentifier',
            children: [
              {
                data_origin: 'idno',
                region: 'msIdentifier',
                children: [
                  {
                    text: ' ',
                    region: 'msIdentifier',
                  },
                ],
              },
            ],
          },
          {
            data_origin: 'p',
            region: 'msPart',
            children: [
              {
                text: ' ',
                region: 'msPart',
              },
            ],
          },
        ],
      },
    ]
    editor.children = slateValue
    const komponenten = createComponents(editor, BESCHREIBUNG_DEFAULT_SUBTYPE)
    expect(komponenten.length).toEqual(1)
    expect(komponenten[0].teiElement).toEqual('msPartother')
    expect(komponenten[0].children.length).toEqual(0)
  })

  describe('component subtitle', () => {
    const sidebarEintrag = {
      children: [],
      id: '',
      label: '',
      level: 0,
      parentId: '',
      path: [],
      teiElement: 'notetext',
      wrapperId: '',
      xmlpath: '',
    }
    const newNoteText = (text: string, node?: any) => {
      const children = node ? [{ text }, node, { text: '' }] : [{ text }]
      return {
        data_origin: 'notetext',
        children: [
          {
            data_origin: 'volltext',
            children: [{ text: '' }],
            content: [
              {
                data_origin: 'paragraph',
                children,
              },
            ],
          },
        ],
      }
    }
    it('short text should not end with ellipsis', () => {
      expect(
        createSubtitleForComponent(sidebarEintrag, newNoteText('1v-2r'), 0)
      ).toEqual('1v-2r')
    })

    it('whitespace text should become empty text', () => {
      const result = createSubtitleForComponent(
        sidebarEintrag,
        newNoteText('       '),
        0
      )
      expect(result).toEqual('')
    })

    it('whitespace should be trimmed', () => {
      const result = createSubtitleForComponent(
        sidebarEintrag,
        newNoteText('Start               End   '),
        0
      )
      expect(result).toEqual('Start End')
    })

    it('long text should end with ellipsis', () => {
      const result = createSubtitleForComponent(
        sidebarEintrag,
        newNoteText(
          'A text which exceeds the size of HSPSidebar.HSP_SIDEBAR_TEXT_LENGTH should be capped and end with ellipsis'
        ),
        0
      )
      expect(result.slice(-1)).toEqual('…')
    })

    it('text from normdatum is inside subtitle', () => {
      const result = createSubtitleForComponent(
        sidebarEintrag,
        newNoteText('Autor: ', {
          data_origin: 'person',
          children: [{ text: '' }],
          content: 'Martin Luther',
        }),
        0
      )
      expect(result).toEqual('Autor: Martin Luther')
    })

    it('linebreak cuts further text', () => {
      const node = {
        data_origin: 'notetext',
        children: [
          {
            data_origin: 'volltext',
            children: [{ text: '' }],
            content: [
              {
                data_origin: 'paragraph',
                children: [{ text: 'Show me' }],
              },
              {
                data_origin: 'paragraph',
                children: [{ text: 'but not me' }],
              },
            ],
          },
        ],
      }
      const result = createSubtitleForComponent(sidebarEintrag, node, 0)
      expect(result).toEqual('Show me…')
    })
  })
})
