import { render, screen } from '@testing-library/react'
import { isEmpty } from 'lodash'
import React from 'react'
import { Slate } from 'slate-react'
import { Index } from 'src/domain/editor/beschreibungskomponenten/kopf/indexd/Index'
import { updateMode } from 'src/domain/erfassung/ErfassungsState'
import ConfigureStore from 'src/infrastructure/ConfigureReduxStore'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

const indexNormElement = {
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
      data_type: 'measure',
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

function createIndexElement(data_type: string, textContent = '') {
  return {
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
        data_type,
        id: '3cbcd882-7a67-4f37-93d4-da02b3804ee7',
        children: [
          {
            text: textContent,
          },
        ],
      },
    ],
  }
}

const slateValue = [
  {
    data_origin: 'paragraph',
    type: 'paragraph',
    istop: false,
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

describe('Index Kopf', () => {
  const editor = createErfassungsEditor()
  const attributes = TestSlateAttributes.element
  it('Index', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Index
            element={indexNormElement}
            attributes={attributes}
            children={[]}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.getByText('22 Bl.')).toBeTruthy()
  })

  test.each([
    ['invalid', 'content', false],
    ['invalid', '', false],
    ['title', '', true],
    ['title', 'content', true],
    ['musicNotation', 'yes', true],
    ['musicNotation', '', false],
  ])(
    'In read mode Index of type %s with text "%s" gets rendered: %p',
    (type, text, getsRendered) => {
      ConfigureStore.dispatch(updateMode('previewMode'))
      const { container } = render(
        <TestContext>
          <Slate initialValue={slateValue} editor={editor}>
            <Index
              attributes={attributes}
              children={[]}
              element={createIndexElement(type, text)}
            />
          </Slate>
        </TestContext>
      )
      expect(!isEmpty(container.textContent)).toBe(getsRendered)
    }
  )
})
