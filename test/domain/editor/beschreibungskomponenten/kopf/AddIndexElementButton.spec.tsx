/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { act, render } from '@testing-library/react'
import { Editable, Slate } from 'slate-react'

import { AddIndexElementButton } from '../../../../../src/domain/editor/beschreibungskomponenten/kopf/AddIndexElementButton'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../../../TestContext'

const headElement = [
  {
    data_origin: 'head',
    region: 'head',
    path: '#document-TEI-text-body-msDesc-headElement',
    component: 'head',
    level: 1,
    id: '265ca970-5517-44ad-be05-7cb5999c3eda',
    children: [
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: '330646de-53ec-4913-b764-4b82e6fa577f',
        data_indexName: 'norm_title',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'b1020e32-1817-4eb5-91dd-a0c0031dd089',
            data_type: 'title',
            children: [
              {
                region: 'head',
                text: 'Catalogi bibliothecae Bordesholmensis, Bordesholmer\n                            Handschriften',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'title',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-title',
        component: '',
        level: 1,
        id: '8673fbd9-a18c-42d4-8281-ae70f2a07936',
        children: [
          {
            region: 'head',
            text: 'Catalogi bibliothecae Bordesholmensis',
          },
        ],
      },
      {
        data_origin: 'note',
        region: 'noteheadline',
        path: '#document-TEI-text-body-msDesc-headElement-note',
        component: '',
        level: 1,
        id: '77d18088-2573-443c-a04a-ae3fc010d808',
        data_type: 'headline',
        children: [
          {
            region: 'noteheadline',
            text: 'Lorem ipsum, dolor, dit, amet, 16 × 12, vor 1488, 103\n                        Bl.',
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: 'dea994dd-0be0-4141-9589-6f5885ee6f43',
        data_indexName: 'norm_material',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '64d8523f-2d85-48e4-ba20-851ff8d5f4cc',
            data_type: 'material',
            children: [
              {
                region: 'head',
                text: 'Mischung aus Papier und Leinen',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'c0fb8fe5-40c4-4be7-9dbe-d228432c511c',
            data_type: 'material_type',
            children: [
              {
                region: 'head',
                text: 'linen',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'fd0a048b-4a85-4662-af32-b41848df49f6',
            data_type: 'material_type',
            children: [
              {
                region: 'head',
                text: 'paper',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: 'ae4d2d8e-d7cc-4a11-b7fa-d5172b6e423c',
        data_indexName: 'norm_measure',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'bd6b7b6c-b0b2-42e2-8653-562379cb18ac',
            data_type: 'measure',
            children: [
              {
                region: 'head',
                text: '103 Bl. , aus zwei Teilen zusammengesetzt',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '904145f2-79ee-4303-bfce-12c9d0f36d4a',
            data_type: 'measure_noOfLeaves',
            children: [
              {
                region: 'head',
                text: '103',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: 'b580ba51-6df8-4182-bf52-56dafc64fef1',
        data_indexName: 'norm_dimensions',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '1ea4131c-710f-45dc-a7a0-bc633691c2df',
            data_type: 'dimensions',
            children: [
              {
                region: 'head',
                text: '16 × 12 (Teil I)',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'bd30ce94-ec4b-4d64-b59f-656ac66c7054',
            data_type: 'height',
            children: [
              {
                region: 'head',
                text: '16',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'f9ae1abf-84b4-4378-8b2e-caed5d8076ed',
            data_type: 'width',
            children: [
              {
                region: 'head',
                text: '12',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '9c34ddd0-fe71-43b1-a1a9-74a990b39db6',
            data_type: 'depth',
            children: [
              {
                region: 'head',
                text: '2',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '5ac08609-e1e1-45a0-befd-1c32c0b1d443',
            data_type: 'dimensions_typeOfInformation',
            children: [
              {
                region: 'head',
                text: 'factual',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: '2c06e1dc-cb3a-4635-828b-4ca405f5a372',
        data_indexName: 'norm_dimensions',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '48d0fab3-5d55-4e7f-9471-8fa219b6456d',
            data_type: 'dimensions',
            children: [
              {
                region: 'head',
                text: '12,5 × 15,5 (Teil II)',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '6ba2c389-6709-4162-a5fd-1b9aa0c84a17',
            data_type: 'height',
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
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '33a4961a-3a84-476f-8ffa-a02db2969365',
            data_type: 'width',
            children: [
              {
                region: 'head',
                text: '15,5',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '6676b5c6-da4a-435b-b2f8-b0856c59e352',
            data_type: 'depth',
            children: [
              {
                region: 'head',
                text: '1',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '7366d285-3e14-4dca-8264-63ad762a6167',
            data_type: 'dimensions_typeOfInformation',
            children: [
              {
                region: 'head',
                text: 'deduced',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: '30037479-e6e7-40dc-8f23-3ebbde6593c7',
        data_indexName: 'norm_format',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'dc1fe5a0-9a71-485e-aef3-ca6bb6cb26e7',
            data_type: 'format',
            children: [
              {
                region: 'head',
                text: 'folio',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'e3eb46e9-8898-4b4a-b662-8de425b938a2',
            data_type: 'format_typeOfInformation',
            children: [
              {
                region: 'head',
                text: 'factual',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: 'e9ff5ef7-7d35-4e46-be2d-c6f1ed4f7a4d',
        data_indexName: 'norm_format',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'a49f4e35-0a1a-4f14-9697-13b99f4cf9b7',
            data_type: 'format',
            children: [
              {
                region: 'head',
                text: 'oblong',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '4584806e-1174-4848-9629-ba3d2134c6b7',
            data_type: 'format_typeOfInformation',
            children: [
              {
                region: 'head',
                text: 'deduced',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: 'e142aabd-740b-42fe-bfab-06b61e4ff39f',
        data_indexName: 'norm_origPlace',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '2c1759f3-4a41-4669-b38c-e661db118fb9',
            data_type: 'origPlace',
            children: [
              {
                region: 'head',
                text: 'Bordesholm, Kiel',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '0e2e95f5-9b17-471b-9c48-667c51af04fa',
            data_type: 'origPlace_norm',
            children: [
              {
                region: 'head',
                text: '4007721-4',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '49b05483-046a-40ec-bc43-5fd6d2bf0d46',
            data_type: 'origPlace_norm',
            children: [
              {
                region: 'head',
                text: '4030481-4',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: '36eb2f70-b6fe-44bf-9ef1-52b318b436cb',
        data_indexName: 'norm_origDate',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '7da23833-894e-41c8-a4f2-81ba3e3bcf1d',
            data_type: 'origDate',
            children: [
              {
                region: 'head',
                text: '1488 (Teil I)',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'b663799a-faa2-4d34-841d-ef314dc31c34',
            data_type: 'origDate_notBefore',
            children: [
              {
                region: 'head',
                text: '1488',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '65ffcd68-088a-4c18-ba6e-8915cfc07135',
            data_type: 'origDate_notAfter',
            children: [
              {
                region: 'head',
                text: '1488',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'fbd3cf96-544c-48ef-a75b-5e1cf0ca0875',
            data_type: 'origDate_type',
            children: [
              {
                region: 'head',
                text: 'dated',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: 'a350558a-32b4-4b2f-bda4-aa104b6aa7d8',
        data_indexName: 'norm_origDate',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '62161c70-006a-4d90-9741-267f41e9d791',
            data_type: 'origDate',
            children: [
              {
                region: 'head',
                text: 'um 1665 (Teil II)',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '0e3c47f1-10a9-4fbc-8e3c-cd2297bb4a86',
            data_type: 'origDate_notBefore',
            children: [
              {
                region: 'head',
                text: '1651',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '26ad5629-62da-4560-ad12-7bff4cd60230',
            data_type: 'origDate_notAfter',
            children: [
              {
                region: 'head',
                text: '1680',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '97d6f856-9910-41cc-98c4-c692b36824d3',
            data_type: 'origDate_type',
            children: [
              {
                region: 'head',
                text: 'datable',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: 'af90587c-67e4-4bc0-a3f5-82382bccd066',
        data_indexName: 'norm_textLang',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '52e67556-dde0-4f5b-a2d1-ffb1036f8713',
            data_type: 'textLang',
            children: [
              {
                region: 'head',
                text: 'lateinisch, deutsch',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '674c10dc-4c01-4133-89e6-0512ac3d2083',
            data_type: 'textLang-ID',
            children: [
              {
                region: 'head',
                text: 'la',
              },
            ],
          },
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '2f984c10-689c-44f7-a70e-dfac869339e7',
            data_type: 'textLang-ID',
            children: [
              {
                region: 'head',
                text: 'de',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: '0dd191d4-18b2-4f1a-b19f-d40669bdd935',
        data_indexName: 'norm_form',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'b72b3df2-e582-4475-96a9-295e43705190',
            data_type: 'form',
            children: [
              {
                region: 'head',
                text: 'codex',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: '18ec0ca9-e27a-4815-a7c5-77344211ebad',
        data_indexName: 'norm_status',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: 'ad0be3cf-8d9e-44c9-a1f8-6122a6dad1b5',
            data_type: 'status',
            children: [
              {
                region: 'head',
                text: 'existent',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: 'eb372498-974e-4226-b3a1-3d2d8538207b',
        data_indexName: 'norm_decoration',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '700ad45f-d084-43ba-9495-d28bc5174971',
            data_type: 'decoration',
            children: [
              {
                region: 'head',
                text: 'yes',
              },
            ],
          },
        ],
      },
      {
        data_origin: 'index',
        region: 'head',
        path: '#document-TEI-text-body-msDesc-headElement-index',
        component: '',
        level: 1,
        id: '9c1ffd42-9286-4c3d-b2da-857c679e40b4',
        data_indexName: 'norm_musicNotation',
        children: [
          {
            data_origin: 'term',
            region: 'head',
            path: '#document-TEI-text-body-msDesc-headElement-index-term',
            component: '',
            level: 1,
            id: '1c7fa5e8-9e3b-4d61-99ee-d40cc0d21e98',
            data_type: 'musicNotation',
            children: [
              {
                region: 'head',
                text: 'yes',
              },
            ],
          },
        ],
      },
    ],
  },
]

const insertCustomHook = jest.fn()

describe('AddIndexElementButton', () => {
  const editor = createErfassungsEditor()
  it('AddIndexElementButton Dimension', () => {
    const store = configureTestStore()

    render(
      <TestContext store={store}>
        <Slate initialValue={headElement} editor={editor}>
          <Editable />
          <AddIndexElementButton
            element={headElement[0].children[6]}
            buttonLabel={'AddIndexElementButton'}
            insertNewErfassungsElementNode={insertCustomHook}
          />
        </Slate>
      </TestContext>
    )

    expect(document.body.innerHTML.includes('12,5 × 15,5')).toBeTruthy()

    act(() =>
      store.dispatch({
        type: 'erfassung/updateComponentChangedHistory',
        payload: { dataOrigin: 'dataOrigin', method: 'DELETE_NODE', id: 'id' },
      })
    )

    expect(
      document.body.innerHTML.includes('AddIndexElementButton')
    ).toBeTruthy()
  })

  it('false AddIndexElementButton Dimension', () => {
    const store = configureTestStore()
    render(
      <TestContext store={store}>
        <Slate initialValue={headElement} editor={editor}>
          <Editable />
          <AddIndexElementButton
            element={headElement[0].children[5]}
            buttonLabel={'AddIndexElementButton'}
            insertNewErfassungsElementNode={insertCustomHook}
          />
        </Slate>
      </TestContext>
    )

    expect(document.body.innerHTML.includes('12,5 × 15,5')).toBeTruthy()

    act(() =>
      store.dispatch({
        type: 'erfassung/updateComponentChangedHistory',
        payload: { dataOrigin: 'dataOrigin', method: 'DELETE_NODE', id: 'id' },
      })
    )

    expect(
      document.body.innerHTML.includes('AddIndexElementButton')
    ).toBeFalsy()
  })
})
