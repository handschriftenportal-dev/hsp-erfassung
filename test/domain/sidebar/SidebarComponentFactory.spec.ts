import type { Descendant } from 'slate'
import { SidebarComponentFactory } from 'src/domain/sidebar/SidebarComponentFactory'
import type { SidebarEintragModel } from 'src/domain/sidebar/SidebarEintragFactory'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'

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
    const komponenten = createComponents(editor)
    expect(komponenten.length).toEqual(1)
    expect(komponenten[0].teiElement).toEqual('msPartother')
    expect(komponenten[0].children.length).toEqual(0)
  })

  describe('component subtitle', () => {
    const sidebarEintrag: SidebarEintragModel = {
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
    function newNoteText<T extends Descendant>(text: string, node?: T) {
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
