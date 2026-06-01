import { render, screen } from '@testing-library/react'
import React from 'react'
import { Slate } from 'slate-react'
import { FixedValueListAutocomplete } from 'src/domain/editor/beschreibungskomponenten/kopf/FixedValueListAutocomplete'
import ConfigureStore from 'src/infrastructure/ConfigureReduxStore'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

const slateValue = [
  {
    data_origin: 'paragraph',
    type: 'paragraph',
    istop: false,
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const materialType = {
  data_origin: 'term',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index-term',
  component: '',
  level: 1,
  id: 'a5bfe3c7-4b80-4f68-a4ac-ba5c0b1846a5',
  data_type: 'material_type',
  children: [
    {
      region: 'head',
      text: 'chart',
    },
  ],
}

describe('FixedValueListAutocomplete Test', () => {
  const editor = createErfassungsEditor()

  it('materialType', () => {
    const store = ConfigureStore
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true,
    })
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <FixedValueListAutocomplete
            leftSidelabel={'MaterialType'}
            termElement={materialType}
            optionsArray={[]}
            useDeleteButton
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('MaterialType', { exact: false })).toBeTruthy()
    expect(screen.getByTitle('Löschen')).toBeVisible()
  })
})
