import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { Title } from 'src/domain/editor/beschreibungskomponenten/kopf/Title'
import { updateMode, writeDocument } from 'src/domain/erfassung/ErfassungsState'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

const titleElement = {
  data_origin: 'title',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-title',
  component: '',
  level: 1,
  id: 'a857aeee-b583-4656-9c1e-415741d481b1',
  children: [
    {
      region: 'head',
      text: 'Lorem ipsum',
    },
  ],
}

const emptyTitleElement = {
  data_origin: 'title',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-title',
  component: '',
  level: 1,
  id: 'a857aeee-b583-4656-9c1e-415741d481b1',
  children: [
    {
      text: '',
    },
  ],
}

describe('Titel Kopf', () => {
  const editor = createErfassungsEditor()
  const attributes = TestSlateAttributes.element

  it('Title musty', () => {
    const store = configureTestStore()
    store.dispatch(writeDocument())

    render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <Title
            attributes={attributes}
            children={[]}
            element={emptyTitleElement}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByDisplayValue('')).toBeTruthy()
  })

  it('Title contains label "Titel andere Publikation"', () => {
    const { container } = render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Title attributes={attributes} children={[]} element={titleElement} />
        </Slate>
      </TestContext>
    )

    const textContent = container.textContent || ''
    expect(textContent.includes('Titel andere Publikation')).toBeTruthy()
  })

  it('Empty title is not shown in read mode', () => {
    const store = configureTestStore()
    store.dispatch(updateMode('previewMode'))

    const { container } = render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <Title
            attributes={attributes}
            children={[]}
            element={emptyTitleElement}
          />
        </Slate>
      </TestContext>
    )

    const textContent = container.textContent || ''
    expect(textContent).toBe('')
  })
})
