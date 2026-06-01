import { render } from '@testing-library/react'
import { Slate } from 'slate-react'
import { AutocompleteNormdatenFromDataKey } from 'src/domain/editor/AutocompleteNormdatenFromDataKey'
import { NormdatenService } from 'src/domain/erfassung/NormdatenService'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('AutocompleteNormdatenFromDataKey Test', () => {
  it('View AutocompleteNormdatenFromDataKey', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'repository',
      region: 'altIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-repository',
      component: '',
      level: 1,
      id: 'b97a66ca-f494-46ad-8b13-527370fcdff7',
      data_key: '654a4abc-3191-3e68-995b-4fdbd157cf9d',
      children: [
        {
          region: 'altIdentifier',
          text: 'Sankt Emmeram',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <AutocompleteNormdatenFromDataKey
            title="title"
            origin={NormdatenService.nodeLabel.koerperschaft}
            required={false}
            element={element}
          />
        </Slate>
      </TestContext>
    )

    expect(
      document.body.innerHTML.includes('Verknüpftes Normdatum')
    ).toBeTruthy()
  })
})
