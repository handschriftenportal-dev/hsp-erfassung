import { render, screen } from '@testing-library/react'
import React from 'react'
import { SelectionToolbar } from 'src/domain/editor/selectiontoolbar/SelectionToolbar'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('SelectionToolbar', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined)

    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        path: '#document-msItem',
        component: 'msItemmusic',
        data_class: 'music',
        children: [
          {
            data_origin: 'note',
            region: 'msItem',
            path: '#document-msItem-note',
            component: '',
            children: [
              {
                region: 'msItem',
                text: 'et dolore magna',
              },
            ],
          },
        ],
      },
    ]
    editor.children = slateValue

    render(
      <TestContext>
        <SelectionToolbar editor={editor} />
      </TestContext>
    )
  })

  it('contains button to reference normdata', () => {
    expect(
      screen.getByRole('button', { name: 'Normdaten verknüpfen' })
    ).toBeTruthy()
  })
})
