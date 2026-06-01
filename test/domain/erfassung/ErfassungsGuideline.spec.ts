import {
  allowedChildComponentOptions,
  allowedFollowerComponentOptions,
  calculateNextNumberOfComponentsOnSameLevel,
  createBeschreibungsComponents,
  existingComponentsRemover,
  filterSortTranslate,
  findComponentById,
  findComponentPosition,
  findFollowingComponentById,
  firstValidPosition,
  uniqueSiblingComponents,
} from 'src/domain/erfassung/ErfassungsGuideline'
import { TEI_ELEMENT_ITEM } from 'src/domain/erfassung/TEIConstants'
import type { SidebarEintragModel } from 'src/domain/sidebar/SidebarEintragFactory'
import type { Komponente } from 'src/infrastructure/slate/ErfassungsRegeln'
import { v4 as uuid } from 'uuid'

const createUUID = () => uuid().toString()

type BeschreibungsKomponenteGenerator =
  | Komponente
  | [Komponente, BeschreibungsKomponenteGenerator[]]

function generiereKomponente(
  k: BeschreibungsKomponenteGenerator,
  parentId = 'root',
  idGenerator = createUUID
): SidebarEintragModel {
  const id = idGenerator()
  const base = {
    id,
    parentId,
    label: '',
    path: [],
    xmlpath: '',
    level: 0,
    wrapperId: '',
  }
  if (typeof k === 'string') {
    return Object.assign({ teiElement: k, children: [] }, base)
  }
  const [teiElement, children] = k
  return Object.assign(
    {
      teiElement,
      children: children.map((child) =>
        generiereKomponente(child, id, idGenerator)
      ),
    },
    base
  )
}

function generiereIdCreator(seed: number) {
  return function createId() {
    const result = `${seed}`
    seed = seed + 1
    return result
  }
}

describe('Testing setup functions', () => {
  it('Generate sibling Komponenten', () => {
    const sidebar = generiereKomponente(
      ['msIdentifier', ['head', 'msIdentifier', 'history']],
      'mockRoot'
    )
    expect(sidebar).toBeTruthy()
    expect(sidebar.parentId).toBe('mockRoot')
    expect(sidebar.children.length).toBe(3)
  })
  it('allows custom id generator to ensure determinism', () => {
    const idGen = generiereIdCreator(42)
    const mock: BeschreibungsKomponenteGenerator[] = [
      'head',
      'msIdentifier',
      ['msPartbooklet', ['head', 'msIdentifier', 'history']],
    ]
    const sidebar = mock.map((komponente) =>
      generiereKomponente(komponente, 'root', idGen)
    )

    expect(sidebar.map((k) => k.id)).toEqual(['42', '43', '44'])
    expect(sidebar[2].children.map((k) => k.id)).toEqual(['45', '46', '47'])
  })
})

describe('ErfassungsGuideline', () => {
  describe('allowed follower and child components', () => {
    const mock: BeschreibungsKomponenteGenerator[] = [
      'msIdentifier',
      'head',
      [
        'msPartbinding',
        [
          'msIdentifier',
          'head',
          ['physDesc', ['decoNoteform']],
          'history',
          'msPartfragment',
        ],
      ],
      ['msContents', [['msItem', ['notetext']]]],
      'msPartbooklet',
    ]
    const idGen = generiereIdCreator(0)
    const sidebar = mock.map((komponente) =>
      generiereKomponente(komponente, 'root', idGen)
    )
    const [ident, kopf, einband, inhalt, faszikel] = sidebar
    const [einbandIdent, einbandKopf, auesseres, geschichte] = einband.children
    const [abschnitt] = inhalt.children
    const [text] = abschnitt.children

    it('Identifier, Kopf, Geschichte, Inhalt (Text) should not have child components', () => {
      expect(allowedChildComponentOptions(sidebar, ident)).toEqual([])
      expect(allowedChildComponentOptions(sidebar, kopf)).toEqual([])
      expect(allowedChildComponentOptions(sidebar, einbandIdent)).toEqual([])
      expect(allowedChildComponentOptions(sidebar, einbandKopf)).toEqual([])
      expect(allowedChildComponentOptions(sidebar, geschichte)).toEqual([])
      expect(allowedChildComponentOptions(sidebar, text)).toEqual([])
    })

    it('Äußeres can have children', () => {
      expect(allowedChildComponentOptions(sidebar, auesseres)).toContainEqual({
        element: 'decoNoteform',
        label: 'sidebar.physical_art',
      })
    })

    it('Einband can have more than one Fragment', () => {
      expect(allowedChildComponentOptions(sidebar, einband)).toContainEqual({
        element: 'msPartfragment',
        label: 'sidebar.part',
      })
    })

    it('empty Faszikel can contain Identifier, Kopf, Äußeres, Geschichte, Inhalt, Fragment', () => {
      expect(allowedChildComponentOptions(sidebar, faszikel)).toEqual([
        { element: 'msIdentifier', label: 'sidebar.identification' },
        { element: 'head', label: 'sidebar.head' },
        { element: 'physDesc', label: 'sidebar.physical' },
        { element: 'history', label: 'sidebar.history' },
        { element: 'msContents', label: 'sidebar.content' },
        { element: 'msPartfragment', label: 'sidebar.part' },
      ])
    })

    it('Kopf may have follower Äußeres, Einband, Geschichte, Literatur, Inhalt, Faszikel, Beigabe, Sonstiges', () => {
      expect(
        allowedFollowerComponentOptions(sidebar.slice(0, 2), kopf)
      ).toEqual([
        { element: 'physDesc', label: 'sidebar.physical' },
        { element: 'msPartbinding', label: 'sidebar.binding' },
        { element: 'history', label: 'sidebar.history' },
        { element: 'additional', label: 'sidebar.literature' },
        { element: 'msContents', label: 'sidebar.content' },
        { element: 'msPartbooklet', label: 'sidebar.booklet' },
        { element: 'msPartaccMat', label: 'sidebar.accompanying_material' },
        { element: 'msPartother', label: 'sidebar.other' },
      ])
    })

    it('Kopf in example may have restricted follower', () => {
      expect(allowedFollowerComponentOptions(sidebar, kopf)).toEqual([
        { element: 'physDesc', label: 'sidebar.physical' },
        { element: 'msPartbinding', label: 'sidebar.binding' },
      ])
    })

    it('Abschnitt may have Abschnitt, Inhalt Kunst, Inhalt Text, Äußeres Kunst, Äußeres Text', () => {
      expect(allowedChildComponentOptions(sidebar, abschnitt)).toEqual([
        { element: 'msItem', label: 'sidebar.section' },
        { element: 'decoNoteform', label: 'sidebar.physical_art' },
        { element: 'notetext', label: 'sidebar.content_text' },
        { element: 'decoNotecontent', label: 'sidebar.iconography' },
        { element: 'notemusic', label: 'sidebar.music' },
      ])
    })

    it('between Einband and Inhalt may be', () => {
      expect(allowedFollowerComponentOptions(sidebar, einband)).toEqual([
        { element: 'msPartbinding', label: 'sidebar.binding' },
        { element: 'history', label: 'sidebar.history' },
        { element: 'additional', label: 'sidebar.literature' },
      ])
    })

    it('Check msContents is in allowedPredecessor for msPartbinding', () => {
      expect(allowedFollowerComponentOptions([ident, einband], ident)).toEqual([
        { element: 'head', label: 'sidebar.head' },
        { element: 'physDesc', label: 'sidebar.physical' },
        { element: 'msPartbinding', label: 'sidebar.binding' },
      ])
    })
  })

  describe('can find', () => {
    const mock: BeschreibungsKomponenteGenerator[] = [
      'msIdentifier',
      'head',
      [
        'msPartbinding',
        [
          'msIdentifier',
          'head',
          'notetext',
          'decoNoteform',
          'notemusic',
          ['physDesc', ['decoNotecontent']],
          'history',
        ],
      ],
    ]
    const idGen = generiereIdCreator(0)
    const sidebar = mock.map((komponente) =>
      generiereKomponente(komponente, 'root', idGen)
    )

    it('unique sibling components in Sidebar', () => {
      const einbandHistory = sidebar[2].children[6]

      expect(uniqueSiblingComponents(sidebar, einbandHistory)).toEqual([
        'msIdentifier',
        'head',
        'notetext',
        'decoNoteform',
        'notemusic',
        'physDesc',
        'history',
      ])
    })

    it('component by ID', () => {
      const result = findComponentById(sidebar, '0')
      expect(result).toEqual(sidebar[0])
    })

    it('follower component by ID', () => {
      expect(findFollowingComponentById(sidebar, sidebar[1])).toEqual(
        sidebar[2]
      )
      const headInBinding = findComponentById(sidebar, '4')
      expect(findFollowingComponentById(sidebar, headInBinding)).toEqual(
        sidebar[2].children[2]
      )
    })

    it("component's position between sibling components", () => {
      const msContentsMock: BeschreibungsKomponenteGenerator[] = [
        'msIdentifier',
        'head',
        [
          'msContents',
          [
            ['msItem', []],
            ['msItem', []],
            ['msItem', []],
          ],
        ],
      ]
      const sidebar = msContentsMock.map((komponente) =>
        generiereKomponente(komponente)
      )
      expect(
        findComponentPosition(sidebar, sidebar[2].children[2], TEI_ELEMENT_ITEM)
      ).toEqual(3)
    })

    it('calculateNextNumberOfComponentsOnSameLevel in Sidebar', () => {
      const beschreibung = generiereKomponente([
        'msPartfragment',
        ['msIdentifier', 'head'],
      ])

      expect(
        calculateNextNumberOfComponentsOnSameLevel(
          sidebar,
          beschreibung,
          'head',
          true
        )
      ).toEqual(2)
    })
  })

  describe('create component', () => {
    const mock: BeschreibungsKomponenteGenerator[] = [
      'msIdentifier',
      'head',
      'physDesc',
      ['msPartbinding', ['msIdentifier', 'head', 'history', 'msContents']],
    ]
    const sidebar = mock.map((komponente) =>
      generiereKomponente(komponente, 'root')
    )
    const [_ident, kopf, aeusseres, einband] = sidebar

    it('Geschichte auf Äußeres', () => {
      const { children, ...component } = createBeschreibungsComponents(
        aeusseres,

        'history',
        false,
        false,
        sidebar
      )
      expect(component).toMatchObject({
        data_origin: 'history',
        component: 'history',
        region: 'history',
      })
      expect(children).toMatchObject([
        {
          data_origin: 'p',
          children: [
            {
              data_origin: 'volltext',
              children: [{ text: '' }],
            },
          ],
        },
      ])
    })

    it('with Children and Wrapper Check for physDesc', () => {
      const komponente = createBeschreibungsComponents(
        kopf,
        'physDesc',
        false,
        false,
        sidebar
      )

      expect(komponente).toMatchObject({
        data_origin: 'physDesc',
        region: 'physDesc',
      })
    })
    it('valid position for second Einband is before first one', () => {
      expect(firstValidPosition(sidebar, 'msPartbinding')).toBe(3)
    })

    it('valid position for Äußeres in Einband is after Kopf and before Geschichte', () => {
      expect(firstValidPosition(einband.children, 'physDesc')).toBe(2)
    })

    it('valid position for Fragment in Einband is after Inhalt', () => {
      expect(firstValidPosition(einband.children, 'msPartfragment')).toBe(4)
    })
  })
})

describe('internal utility functions', () => {
  describe('filterSortTransform', () => {
    const kopf: Komponente = 'head'
    const ident: Komponente = 'msIdentifier'
    const components = [kopf, ident]

    it('filters elements', () => {
      expect(filterSortTranslate(components, () => false)).toEqual([])
      expect(filterSortTranslate(components, () => true)).not.toEqual([])
    })

    it('sorts elements', () => {
      expect(filterSortTranslate(components)).toEqual([
        { element: ident, label: 'sidebar.identification' },
        { element: kopf, label: 'sidebar.head' },
      ])
    })

    it('translate elements', () => {
      expect(
        filterSortTranslate(components).map((option) => option.label)
      ).toEqual(['sidebar.identification', 'sidebar.head'])
    })
  })

  describe('existingComponentsRemover', () => {
    const keep = existingComponentsRemover(['msIdentifier', 'notetext'])

    it('removes components, if they have cardinality 1', () => {
      expect(keep('msIdentifier')).toBe(false)
    })

    it('keep components, if the are not in existing components', () => {
      expect(keep('msContents')).toBe(true)
    })

    it('keeps components, if they have cardinality multi', () => {
      expect(keep('notetext')).toBe(true)
    })
  })
})
