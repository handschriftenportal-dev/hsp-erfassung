import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { Collection } from 'src/domain/editor/beschreibungskomponenten/identifikation/Collection'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Collection Test', () => {
  const attributes = TestSlateAttributes.element
  const editor = createErfassungsEditor()
  const text = {
    region: 'altIdentifier',
    text: 'Sammlung XYZ',
  }

  it('valid collection: altIdentifier-corpus', () => {
    const element = {
      data_origin: 'collection' as const,
      region: 'altIdentifiercorpus',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
      component: '',
      level: 1,
      id: '194fef8e-89af-420f-8456-43ac1f91caf5',
      children: [text],
    }

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Collection element={element} attributes={attributes}>
            child
          </Collection>
        </Slate>
      </TestContext>
    )

    expect(screen.getByText(text.text)).toBeTruthy()
  })

  it('invalid collection: wrong path', () => {
    const element = {
      data_origin: 'collection' as const,
      region: 'altIdentifiercorpus',
      path: '#document-TEI-text-body--collection',
      component: '',
      level: 1,
      id: '194fef8e-89af-420f-8456-43ac1f91caf5',
      children: [text],
    }

    render(
      <Collection element={element} attributes={attributes}>
        BaseElement
      </Collection>
    )

    expect(screen.getByText('BaseElement')).toBeTruthy()
  })

  it('unknown collection: region is not alt identifier corpus', () => {
    const element = {
      data_origin: 'collection' as const,
      region: 'INVALID_REGION',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
      component: '',
      level: 1,
      id: '194fef8e-89af-420f-8456-43ac1f91caf5',
      children: [text],
    }

    render(
      <Collection element={element} attributes={attributes}>
        BaseElement
      </Collection>
    )

    expect(document.body.textContent).toBe('')
  })
})
