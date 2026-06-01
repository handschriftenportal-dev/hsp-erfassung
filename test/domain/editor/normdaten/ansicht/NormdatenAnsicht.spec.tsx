import { render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { NormdatenAnsicht } from 'src/domain/editor/normdaten/ansicht/NormdatenAnsicht'
import de from 'src/infrastructure/i18n/translation_de.json'
import { InlineTransformation } from 'src/infrastructure/slate/transformation/volltext/InlineTransformation'
import { VolltextEditorElement } from 'src/infrastructure/slate/volltext/VolltextEditorElement'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

const server = setupServer(
  http.post('*', () =>
    HttpResponse.json({
      data: {
        findGNDEntityFactsByIds: [],
      },
    })
  )
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function normdatum(
  data_origin: string,
  text: string,
  data_role: string,
  data_ref: string
) {
  const tei = {
    data_origin,
    children: [
      {
        text,
      },
    ],
    data_role,
    data_ref,
  }
  return InlineTransformation.transform({ data: tei }).data
}

describe('NormdatenAnsicht', () => {
  const person = normdatum(
    'persName',
    'Aaron',
    'commissionedBy',
    'http://d-nb.info/gnd/10241787'
  )
  const org = normdatum(
    'orgName',
    'Adelhaus',
    'mentionedIn',
    'http://d-nb.info/gnd/4005728-8'
  )
  const place = normdatum(
    'placeName',
    'Berlin',
    'mentionedIn',
    'http://d-nb.info/gnd/2086132-1'
  )
  const attributes = TestSlateAttributes.element

  it('without normdata links does not contain table', () => {
    const element = VolltextEditorElement.emptyVolltext()
    render(
      <TestContext>
        <NormdatenAnsicht element={element} attributes={attributes}>
          {''}
        </NormdatenAnsicht>
      </TestContext>
    )
    expect(screen.queryByRole('table')).toBeFalsy()
  })

  it('with normdata Links contains table', () => {
    const element = VolltextEditorElement.emptyVolltext()
    element.content[0].children = [person]
    render(
      <TestContext>
        <NormdatenAnsicht element={element} attributes={attributes}>
          {''}
        </NormdatenAnsicht>
      </TestContext>
    )
    expect(screen.getByRole('table')).toBeTruthy()
  })

  it('with one normdatum Link contains two rows, header and normdatum link', () => {
    const element = VolltextEditorElement.emptyVolltext()
    element.content[0].children = [person]
    const { container } = render(
      <TestContext>
        <NormdatenAnsicht element={element} attributes={attributes}>
          {''}
        </NormdatenAnsicht>
      </TestContext>
    )
    expect(container.querySelectorAll('tr')).toHaveLength(2)
  })

  it.each([
    [de.text_tagging.referenz.type.person, person],
    [de.text_tagging.referenz.type.koerperschaft, org],
    [de.text_tagging.referenz.type.ort, place],
  ])('normdatum type "%s" get\'s translated', (name, normdatum) => {
    const element = VolltextEditorElement.emptyVolltext()
    element.content[0].children = [normdatum]
    render(
      <TestContext>
        <NormdatenAnsicht element={element} attributes={attributes}>
          {''}
        </NormdatenAnsicht>
      </TestContext>
    )
    expect(screen.getByRole('cell', { name })).toBeTruthy()
  })
})
