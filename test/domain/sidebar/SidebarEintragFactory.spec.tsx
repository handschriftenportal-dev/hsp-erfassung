import SidebarEintragFactory from 'src/domain/sidebar/SidebarEintragFactory'

describe('SidebarEintragFactory', () => {
  test('yields plain js-object', () => {
    const beschreibungskomponente = SidebarEintragFactory(
      '1',
      'msIdentifier',
      [0, 0, 0],
      'TEI-text',
      0,
      'msDesc',
      'wrapper'
    )

    expect(beschreibungskomponente).toMatchObject({
      id: '1',
      teiElement: 'msIdentifier',
      path: [0, 0, 0],
      xmlpath: 'TEI-text',
      level: 0,
      parentId: 'msDesc',
      wrapperId: 'wrapper',
    })
  })
})
