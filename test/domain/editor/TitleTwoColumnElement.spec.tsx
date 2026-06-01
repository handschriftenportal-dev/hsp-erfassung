import { render, screen } from '@testing-library/react'
import i18next from 'i18next'
import React from 'react'
import { Slate } from 'slate-react'
import { TitleTwoColumnElement } from 'src/domain/editor/TitleTwoColumnElement'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('TitleTwoColumnElement', () => {
  const editor = createErfassungsEditor()

  const slateValue = [
    {
      data_origin: 'paragraph',
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]

  const element = {
    data_origin: 'altIdentifier',
    region: 'altIdentifier',
    path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
    component: '',
    level: 1,
    id: '5276f915-5da8-450b-8235-b5618fa7c7b3',
    data_type: 'corpus',
    children: [
      {
        data_origin: 'collection',
        region: 'altIdentifier',
        path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
        component: '',
        level: 1,
        id: '194fef8e-89af-420f-8456-43ac1f91caf5',
        children: [
          {
            region: 'altIdentifier',
            text: 'Sammlung XYZ',
          },
        ],
      },
      {
        data_origin: 'idno',
        region: 'altIdentifier',
        path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
        component: '',
        level: 1,
        id: 'b5b63b39-092b-425d-a8d5-7a8b0a4505bc',
        children: [
          {
            region: 'altIdentifier',
            text: '123',
          },
        ],
      },
    ],
  }

  it('TitleTwoColumnElement', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <TitleTwoColumnElement
            title={i18next.t('editor.corpus')}
            element={element}
            showDelete
            helpText={undefined}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Corpus')).toBeTruthy()
  })
})
