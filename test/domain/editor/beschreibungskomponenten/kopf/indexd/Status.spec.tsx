import { render } from '@testing-library/react'
import React from 'react'
import { Slate } from 'slate-react'
import { Status } from 'src/domain/editor/beschreibungskomponenten/kopf/indexd/Status'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

const indexElement = {
  data_origin: 'index',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index',
  component: '',
  level: 1,
  id: '3cbcd882-7a67-4f37-93d4-da02b3804ee8',
  data_indexName: 'norm',
  children: [
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'ea13e368-d4a1-49d9-90ed-08bc907870c6',
      data_type: 'status',
      children: [
        {
          region: 'head',
          text: '22 Bl.',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'f053cbf9-57fb-4a17-8bfc-336b34b8c37a',
      data_type: 'measure_noOfLeaves',
      children: [
        {
          region: 'head',
          text: '44',
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

describe('Index Status', () => {
  const editor = createErfassungsEditor()
  it('Index Status', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Status element={indexElement} />
        </Slate>
      </TestContext>
    )

    expect(document.body.innerHTML.includes('Status')).toBeTruthy()
  })
})
