import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Slate } from 'slate-react'
import { Dimensions } from 'src/domain/editor/beschreibungskomponenten/kopf/indexd/Dimensions'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

const indexDimension = {
  data_origin: 'index',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index',
  component: '',
  level: 1,
  id: 'd83996a3-be62-474d-a980-fbd2c08a4221',
  data_indexName: 'norm_dimensions',
  children: [
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'afd09fc3-4d6d-49f1-9566-8391dbfd7cfc',
      data_type: 'dimensions',
      children: [
        {
          region: 'head',
          text: '22 x 12,5 x 11',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'c149768f-cd3c-43d1-a531-4e4224d4dea5',
      data_type: 'height',
      children: [
        {
          region: 'head',
          text: '22',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: '5578eeff-23c3-42b5-b4be-559c5cade205',
      data_type: 'width',
      children: [
        {
          region: 'head',
          text: '12,5',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'd9167974-e111-470d-a648-638d959b088a',
      data_type: 'depth',
      children: [
        {
          region: 'head',
          text: '11',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: '3520377c-8728-4f76-9878-6f26483a7ce9',
      data_type: 'dimensions_typeOfInformation',
      children: [
        {
          region: 'head',
          text: 'deduced',
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

describe('Dimensions', () => {
  const editor = createErfassungsEditor()
  it('renders content of tei', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Dimensions element={indexDimension} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByDisplayValue('11')).toBeTruthy()
    expect(screen.getByDisplayValue('12,5')).toBeTruthy()
    expect(screen.getByDisplayValue('22')).toBeTruthy()
    expect(screen.getByDisplayValue('22 x 12,5 x 11')).toBeTruthy()
  })

  it('has select with three different options', async () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Dimensions element={indexDimension} />
        </Slate>
      </TestContext>
    )

    await userEvent.click(screen.getByRole('combobox'))
    expect(
      screen.getByRole('option', {
        name: de.editor.type_of_information.deduced,
      })
    ).toBeVisible()
    expect(
      screen.getByRole('option', {
        name: de.editor.type_of_information.factual,
      })
    ).toBeVisible()
    expect(
      screen.queryByRole('option', {
        name: de.editor.type_of_information.computed,
      })
    ).toBeNull()
    expect(
      screen.getByRole('option', { name: de.editor.type_of_information.none })
    ).toBeVisible()
  })
})
