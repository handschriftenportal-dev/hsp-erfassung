/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * Author: Christoph Marten on 02.02.2022 at 08:31
 */
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestContext } from '../../../TestContext'
import React from 'react'
import { Material } from '../../../../src/domain/editor/beschreibungskomponenten/kopf/indexd/Material'
import { Format } from '../../../../src/domain/editor/beschreibungskomponenten/kopf/indexd/Format'

const materialIndexElement = [{
  'data_origin': 'index',
  'region': 'head',
  'path': '#document-TEI-text-body-msDesc-msPart-head-index',
  'component': '',
  'level': 2,
  'id': 'd71cb514-3ed8-4fa6-b0f4-8c894fc12b60',
  'data_indexName': 'norm_material',
  'children': [
    {
      'data_origin': 'term',
      'region': 'head',
      'path': '#document-TEI-text-body-msDesc-msPart-head-index-term',
      'component': '',
      'level': 2,
      'id': 'ff16e685-8fc7-4870-9893-44f232a27d32',
      'data_type': 'material',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'head',
          'children': [
            {
              'region': 'head',
              'text': 'Pergament'
            }
          ]
        }
      ]
    },
    {
      'data_origin': 'term',
      'region': 'head',
      'path': '#document-TEI-text-body-msDesc-msPart-head-index-term',
      'component': '',
      'level': 2,
      'id': 'c429e76d-6640-482f-a986-b4d5b03587ab',
      'data_type': 'material_type',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'head',
          'children': [
            {
              'region': 'head',
              'text': 'parchment'
            }
          ]
        }
      ]
    }
  ]
}]

const formatIndexElement = [{
  'data_origin': 'index',
  'region': 'head',
  'path': '#document-TEI-text-body-msDesc-msPart-msPart-head-index',
  'component': '',
  'level': 3,
  'id': '31330e0a-9faa-42bc-8b1c-850956b83a4a',
  'data_indexName': 'norm_format',
  'children': [
    {
      'data_origin': 'term',
      'region': 'head',
      'path': '#document-TEI-text-body-msDesc-msPart-msPart-head-index-term',
      'component': '',
      'level': 3,
      'id': 'bfa5375c-596e-45f9-8c88-a17aa128bede',
      'data_type': 'format',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'head',
          'children': [
            {
              'region': 'head',
              'text': ''
            }
          ]
        }
      ]
    },
    {
      'data_origin': 'term',
      'region': 'head',
      'path': '#document-TEI-text-body-msDesc-msPart-msPart-head-index-term',
      'component': '',
      'level': 3,
      'id': 'c6636b5d-8a9c-4159-bb9a-8b7e0cd5c069',
      'data_type': 'format_typeOfInformation',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'head',
          'children': [
            {
              'region': 'head',
              'text': ''
            }
          ]
        }
      ]
    }
  ]
}]

describe('BeschreibungsKomponentenCustomHook', () => {
  const editor = withReact(createEditor() as ReactEditor)

  it('useInsertNewTEINodeForHeadIndex MaterialType', () => {
    render(
      <TestContext>
        <Slate value={materialIndexElement} onChange={() => {
        }} editor={editor}>
          <Editable>
          </Editable>
          <Material element={materialIndexElement[0]} /></Slate>
      </TestContext>
    )

    // @ts-ignore
    expect(editor.children[0].children.length).toEqual(2)

    fireEvent.click(screen.getByRole('InsertNewLinkedNormdataNode'))

    // @ts-ignore
    expect(editor.children[0].children.length).toEqual(3)

    // @ts-ignore
    expect(editor.children[0].children[2].data_type).toEqual('material_type')
  })

  it('useInsertNewTEINodeForHeadIndex Format', () => {
    render(
      <TestContext>
        <Slate value={formatIndexElement} onChange={() => {
        }} editor={editor}>
          <Editable>
          </Editable>
          <Format element={formatIndexElement[0]} /></Slate>
      </TestContext>
    )

    // @ts-ignore
    expect(editor.children.length).toEqual(1)

    fireEvent.click(screen.getByRole('insertNewErfassungsElementNode'))

    // @ts-ignore
    expect(editor.children.length).toEqual(2)

    // @ts-ignore
    expect(editor.children[1].data_indexName).toEqual('norm_format')
    // @ts-ignore
    expect(editor.children[0].data_indexName).toEqual('norm_format')
  })
})
