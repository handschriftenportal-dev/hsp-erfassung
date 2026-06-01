import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { NormdataWithAutocomplete } from 'src/domain/editor/beschreibungskomponenten/identifikation/NormdataWithAutocomplete'
import { NormdatenService } from 'src/domain/erfassung/NormdatenService'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('Repository Test', () => {
  it('View NormdatenAutocomplete', () => {
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
      data_origin: 'repository',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
      component: '',
      level: 1,
      id: '956eb237-7c68-4651-bf39-f2097315f6af',
      data_key: '6790851b-9519-3874-a9fd-0839d494a3c9',
      children: [
        {
          region: 'msIdentifier',
          text: 'Staatsbibliothek zu Berlin',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <NormdataWithAutocomplete
            element={element}
            origin={NormdatenService.nodeLabel.koerperschaft}
            title={'Normdatendialog'}
            required={false}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Staatsbibliothek zu Berlin')).toBeTruthy()
  })
})
