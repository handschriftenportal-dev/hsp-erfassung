import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { Idno } from 'src/domain/editor/beschreibungskomponenten/identifikation/Idno'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Idno Test', () => {
  const attributes = TestSlateAttributes.element
  it('View altIdentifier-copus', () => {
    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        type: 'paragraph',
        istop: false,
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
    const element = {
      data_origin: 'idno',
      region: 'altIdentifiercorpus',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      component: '',
      level: 1,
      id: 'XXXX',
      children: [
        {
          region: 'altIdentifiercorpus',
          text: 'Signatur 123',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Idno element={element} attributes={attributes} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Signatur 123')).toBeTruthy()
  })

  it('View -altIdentifier-former', () => {
    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        type: 'paragraph',
        istop: false,
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
    const element = {
      data_origin: 'idno',
      region: 'altIdentifierformer',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      component: '',
      level: 1,
      id: 'XXXX',
      children: [
        {
          region: 'altIdentifierformer',
          text: 'Saarland Sig',
        },
      ],
    }
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Idno element={element} attributes={attributes} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Saarland Sig')).toBeTruthy()
  })
  it('View altIdentifier-hsp-ID', () => {
    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        type: 'paragraph',
        istop: false,
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
    const element = {
      data_origin: 'idno',
      region: 'altIdentifierhsp-ID',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      component: '',
      level: 1,
      id: 'XXXX',
      children: [
        {
          region: 'altIdentifierhsp-ID',
          text: 'Saarland Sig12',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Idno element={element} attributes={attributes} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Saarland Sig12')).toBeTruthy()
  })
  it('View altIdentifier-mxml-ID', () => {
    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        type: 'paragraph',
        istop: false,
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
    const element = {
      data_origin: 'idno',
      region: 'altIdentifiermxml-ID',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      component: '',
      level: 1,
      id: 'XXXX',
      children: [
        {
          region: 'altIdentifiermxml-ID',
          text: 'MXML ID 123',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Idno element={element} attributes={attributes} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('MXML ID 123')).toBeTruthy()
  })
})
