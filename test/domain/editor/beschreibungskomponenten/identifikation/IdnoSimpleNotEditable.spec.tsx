import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { IdnoSimpleNotEditable } from 'src/domain/editor/beschreibungskomponenten/identifikation/IdnoSimpleNotEditable'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('IdnoSimpleNotEditable Test', () => {
  it('View IdnoSimpleNotEditable', () => {
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
    const props = {
      element,
      attributes: TestSlateAttributes.element,
      children: [],
    }

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <IdnoSimpleNotEditable props={props} title={'Title'} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Signatur 123')).toBeTruthy()
  })
})
