import { render, screen } from '@testing-library/react'
import React from 'react'
import { Slate } from 'slate-react'
import { Decoration } from 'src/domain/editor/beschreibungskomponenten/kopf/indexd/Decoration'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

const indexDecoration = {
  data_origin: 'index',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index',
  component: '',
  level: 1,
  id: 'e19c3a42-ea7e-45dc-9200-6114e140932c',
  data_indexName: 'norm',
  children: [
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'b6960da7-9cba-4056-b59f-13231b1c7fff',
      data_type: 'decoration',
      children: [
        {
          region: 'head',
          text: 'ja',
        },
      ],
    },
  ],
}

const slateValue = [
  {
    data_origin: 'paragraph',
    type: 'paragraph',
    istop: false,
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

describe('Index Decoration', () => {
  const editor = createErfassungsEditor()
  it('Index Decoration', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Decoration element={indexDecoration} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByDisplayValue('')).toBeTruthy()
    expect(screen.getByDisplayValue('yes')).toBeTruthy()
    expect(screen.getByDisplayValue('no')).toBeTruthy()
  })
})
