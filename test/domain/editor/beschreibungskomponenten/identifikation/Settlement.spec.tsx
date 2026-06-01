import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { Settlement } from 'src/domain/editor/beschreibungskomponenten/identifikation/Settlement'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Settlement Test', () => {
  const attributes = TestSlateAttributes.element
  it('View msIdentifier-settlement', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'settlement',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
      component: '',
      level: 1,
      id: '58179ce0-c53b-40ba-9e4e-ce964c02f343',
      data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
      children: [
        {
          region: 'msIdentifier',
          text: 'Berlin',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Settlement element={element} attributes={attributes} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Berlin')).toBeTruthy()
  })

  it('View -altIdentifier-settlement', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'settlement',
      region: 'altIdentifierformer',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-settlement',
      component: '',
      level: 1,
      id: 'f64b21d5-35cb-48a2-9e67-97013ed88148',
      data_key: '97a083ca-e383-3158-871c-fdbaefb52f4d',
      children: [
        {
          region: 'altIdentifierformer',
          text: 'Saarland',
        },
      ],
    }
    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Settlement element={element} attributes={attributes} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Saarland')).toBeTruthy()
  })

  it('View in mspart', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'settlement',
      region: 'msPartother',
      path: '#document-TEI-text-body-msDesc-msPart-msIdentifier-settlement',
      component: '',
      level: 1,
      id: 'f64b21d5-35cb-48a2-9e67-97013ed88148',
      data_key: '97a083ca-e383-3158-871c-fdbaefb52f4d',
      children: [
        {
          region: 'msPartother',
          text: 'Saarland',
        },
      ],
    }
    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Settlement element={element} attributes={attributes} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Saarland')).toBeTruthy()
  })
})
