import { render, screen } from '@testing-library/react'
import type { RenderElementProps } from 'slate-react'
import { Slate } from 'slate-react'
import { IdnoSimpleInputField } from 'src/domain/editor/beschreibungskomponenten/identifikation/IdnoSimpleInputField'
import ConfigureStore from 'src/infrastructure/ConfigureReduxStore'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('IdnoSimpleNotEmpty Test', () => {
  it('View IdnoSimpleNotEmpty', () => {
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
          text: '',
        },
      ],
    }

    const store = ConfigureStore
    store.dispatch({ type: 'erfassung/writeDocument', payload: true })

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <IdnoSimpleInputField
            props={{ element: element } as unknown as RenderElementProps}
            empty={false}
            required={false}
            helpertext={'Help'}
            title={'Title'}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Help')).toBeTruthy()
  })
})
