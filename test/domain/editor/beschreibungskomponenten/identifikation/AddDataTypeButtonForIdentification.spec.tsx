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

import { act, fireEvent, render, screen } from '@testing-library/react'
import { Editable, Slate } from 'slate-react'

import { AddElementButtonForIdentification } from '../../../../../src/domain/editor/beschreibungskomponenten/identifikation/AddElementButtonForIdentification'
import { TEI_ELEMENT_ALT_IDENTIFIER } from '../../../../../src/domain/erfassung/TEIConstants'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../../../TestContext'

describe('AddDataType Test', () => {
  it('Add Corpus and former without hsp-id and without corpus and former', () => {
    const editor = createErfassungsEditor() as any
    const store = configureTestStore()
    const slateValue = [
      {
        data_origin: 'paragraph',
        type: 'paragraph',
        istop: false,
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
    const element = {
      data_origin: 'msIdentifier',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier',
      component: 'msIdentifier',
      level: 1,
      id: '72bf694e-e16b-45aa-9f0e-ae7706234583',
      children: [
        {
          data_origin: 'settlement',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
          component: '',
          level: 1,
          id: 'e6616b7b-bc08-462b-831f-03306883a717',
          data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
          children: [
            {
              region: 'msIdentifier',
              text: 'Berlin',
            },
          ],
        },
        {
          data_origin: 'repository',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
          component: '',
          level: 1,
          id: '956eb237-7c68-4651-bf39-f2097315f6af',
          data_key: '6790851b-9519-3874-a9fd-0839d494a3c9',
          children: [
            {
              region: 'msIdentifier',
              text: 'Staatsbibliothek zu Berlin',
            },
          ],
        },
        {
          data_origin: 'idno',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
          component: '',
          level: 1,
          id: 'ee1524af-0f0b-4eae-91a3-36d23da9991c',
          children: [
            {
              region: 'msIdentifier',
              text: 'dolor sit amet',
            },
          ],
        },
      ],
    }

    act(() =>
      store.dispatch({
        type: 'erfassung/writeDocument',
        payload: true,
      })
    )

    render(
      <TestContext store={store}>
        <Slate initialValue={slateValue} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            dataOrigin={TEI_ELEMENT_ALT_IDENTIFIER}
            path={'msIdentifier'}
            msIdentifierChildren={element.children}
            dataTypeToAdd={'former'}
            isAltIdentifier={true}
            buttonLabel={'Vorbesitzersignatur'}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Vorbesitzersignatur')).toBeTruthy()
  })

  it('Add Corpus and former with hsp-id and without corpus and former', async () => {
    const editor = createErfassungsEditor() as any
    const store = configureTestStore()
    const element = {
      data_origin: 'msIdentifier',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier',
      component: 'msIdentifier',
      level: 1,
      id: 'c6fa173f-dcf2-4ce0-ad1f-1f4c74bd0bf9',
      children: [
        {
          data_origin: 'settlement',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
          component: '',
          level: 1,
          id: 'd3b60e07-47d9-4005-9ae1-e406ac55c7dd',
          data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
          children: [
            {
              region: 'msIdentifier',
              text: 'Berlin',
            },
          ],
        },
        {
          data_origin: 'repository',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
          component: '',
          level: 1,
          id: 'ba18e596-36cd-4492-bf67-7f22c8c4e789',
          data_key: '6790851b-9519-3874-a9fd-0839d494a3c9',
          children: [
            {
              region: 'msIdentifier',
              text: 'Staatsbibliothek zu\n            Berlin',
            },
          ],
        },
        {
          data_origin: 'idno',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
          component: '',
          level: 1,
          id: '65e26a8f-3d81-439a-b2de-a0b1c108740c',
          children: [
            {
              region: 'msIdentifier',
              text: 'dolor sit amet',
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifierhsp-ID',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: 'f5e1b31d-92f3-4f3e-8170-118a5086e69a',
          data_type: 'hsp-ID',
          children: [
            {
              data_origin: 'collection',
              region: 'altIdentifierhsp-ID',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              component: '',
              level: 1,
              id: 'abb718fc-4e0b-43b0-976e-ce33cb90a8fe',
              children: [
                {
                  region: 'altIdentifierhsp-ID',
                  text: 'Handschriftenportal Kulturobjektdokument-ID',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifierhsp-ID',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: '0303635c-6f64-46d1-8ba0-f420ecf876cd',
              children: [
                {
                  region: 'altIdentifierhsp-ID',
                  text: 'HSP_123456-a7891234-a56789',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifiercorpus',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: 'c1cc36b1-74ab-4cc5-8d0f-1a9c7404a22d',
          data_type: 'corpus',
          children: [
            {
              data_origin: 'collection',
              region: 'altIdentifiercorpus',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              component: '',
              level: 1,
              id: 'a3157a25-8ec5-47e6-bee2-05e172fc2ea2',
              children: [
                {
                  region: 'altIdentifiercorpus',
                  text: 'Sammlung lorem Ipsum',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifiercorpus',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: 'b91a1104-c1c4-4abd-b77d-c435676c0922',
              children: [
                {
                  region: 'altIdentifiercorpus',
                  text: 'dolor sit amet',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifierformer',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: '7a65a55a-e8dd-4e22-99e8-d364be754f9b',
          data_type: 'former',
          children: [
            {
              data_origin: 'settlement',
              region: 'altIdentifierformer',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-settlement',
              component: '',
              level: 1,
              id: '020a9c09-7144-4d09-9d36-e1afe890de4b',
              data_key: '26cf9267-82fe-3bf1-a37-c9960658499f',
              children: [
                {
                  region: 'altIdentifierformer',
                  text: 'Regensburg',
                },
              ],
            },
            {
              data_origin: 'repository',
              region: 'altIdentifierformer',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-repository',
              component: '',
              level: 1,
              id: '911284ee-bfa5-4be9-930b-c4e2f78b8352',
              data_key: '654a4abc-3191-3e68-995b-4fdbd157cf9d',
              children: [
                {
                  region: 'altIdentifierformer',
                  text: 'Sankt Emmeran',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifierformer',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: '8f0d0e20-d376-41fe-a51c-a734176bd3cd',
              children: [
                {
                  region: 'altIdentifierformer',
                  text: 'St. Emm 57',
                },
              ],
            },
          ],
        },
      ],
    }

    await act(async () =>
      store.dispatch({
        type: 'erfassung/writeDocument',
        payload: true,
      })
    )

    render(
      <TestContext store={store}>
        <Slate initialValue={[element]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            msIdentifierChildren={element.children}
            dataTypeToAdd={'former'}
            dataOrigin={TEI_ELEMENT_ALT_IDENTIFIER}
            path={'msIdentifier'}
            isAltIdentifier={true}
            buttonLabel={'Vorbesitzersignatur'}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Vorbesitzersignatur')).toBeTruthy()

    expect(editor.children[0].children.length).toBe(6)

    await act(async () =>
      fireEvent.click(screen.getByText('Vorbesitzersignatur'))
    )

    expect(editor.children[0].children.length).toBe(7)

    expect(editor.children[0].children[6].data_type).toBe('former')
  })

  it('Add new Former with corpus without Former', async () => {
    const editor = createErfassungsEditor() as any
    const store = configureTestStore()
    const element = {
      data_origin: 'msIdentifier',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier',
      component: 'msIdentifier',
      level: 1,
      id: 'c6fa173f-dcf2-4ce0-ad1f-1f4c74bd0bf9',
      children: [
        {
          data_origin: 'settlement',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
          component: '',
          level: 1,
          id: 'd3b60e07-47d9-4005-9ae1-e406ac55c7dd',
          data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
          children: [
            {
              region: 'msIdentifier',
              text: 'Berlin',
            },
          ],
        },
        {
          data_origin: 'repository',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
          component: '',
          level: 1,
          id: 'ba18e596-36cd-4492-bf67-7f22c8c4e789',
          data_key: '6790851b-9519-3874-a9fd-0839d494a3c9',
          children: [
            {
              region: 'msIdentifier',
              text: 'Staatsbibliothek zu\n            Berlin',
            },
          ],
        },
        {
          data_origin: 'idno',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
          component: '',
          level: 1,
          id: '65e26a8f-3d81-439a-b2de-a0b1c108740c',
          children: [
            {
              region: 'msIdentifier',
              text: 'dolor sit amet',
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifierhsp-ID',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: 'f5e1b31d-92f3-4f3e-8170-118a5086e69a',
          data_type: 'hsp-ID',
          children: [
            {
              data_origin: 'collection',
              region: 'altIdentifierhsp-ID',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              component: '',
              level: 1,
              id: 'abb718fc-4e0b-43b0-976e-ce33cb90a8fe',
              children: [
                {
                  region: 'altIdentifierhsp-ID',
                  text: 'Handschriftenportal Kulturobjektdokument-ID',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifierhsp-ID',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: '0303635c-6f64-46d1-8ba0-f420ecf876cd',
              children: [
                {
                  region: 'altIdentifierhsp-ID',
                  text: 'HSP_123456-a7891234-a56789',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifiercorpus',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: 'c1cc36b1-74ab-4cc5-8d0f-1a9c7404a22d',
          data_type: 'corpus',
          children: [
            {
              data_origin: 'collection',
              region: 'altIdentifiercorpus',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              component: '',
              level: 1,
              id: 'a3157a25-8ec5-47e6-bee2-05e172fc2ea2',
              children: [
                {
                  region: 'altIdentifiercorpus',
                  text: 'Sammlung lorem Ipsum',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifiercorpus',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: 'b91a1104-c1c4-4abd-b77d-c435676c0922',
              children: [
                {
                  region: 'altIdentifiercorpus',
                  text: 'dolor sit amet',
                },
              ],
            },
          ],
        },
      ],
    }

    act(() =>
      store.dispatch({
        type: 'erfassung/writeDocument',
        payload: true,
      })
    )

    render(
      <TestContext store={store}>
        <Slate initialValue={[element]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            msIdentifierChildren={element.children}
            dataTypeToAdd={'former'}
            dataOrigin={TEI_ELEMENT_ALT_IDENTIFIER}
            path={'msIdentifier'}
            isAltIdentifier={true}
            buttonLabel={'Vorbesitzersignatur'}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Vorbesitzersignatur')).toBeTruthy()
    expect(editor.children[0].children.length).toBe(5)

    await act(async () =>
      fireEvent.click(screen.getByText('Vorbesitzersignatur'))
    )

    expect(editor.children[0].children.length).toBe(6)
    expect(editor.children[0].children[5].data_type).toBe('corpus')
  })

  it('Add new corpus with Former with corpus', async () => {
    const editor = createErfassungsEditor() as any
    const store = configureTestStore()
    const element = {
      data_origin: 'msIdentifier',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier',
      component: 'msIdentifier',
      level: 1,
      id: 'c6fa173f-dcf2-4ce0-ad1f-1f4c74bd0bf9',
      children: [
        {
          data_origin: 'settlement',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
          component: '',
          level: 1,
          id: 'd3b60e07-47d9-4005-9ae1-e406ac55c7dd',
          data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
          children: [
            {
              region: 'msIdentifier',
              text: 'Berlin',
            },
          ],
        },
        {
          data_origin: 'repository',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
          component: '',
          level: 1,
          id: 'ba18e596-36cd-4492-bf67-7f22c8c4e789',
          data_key: '6790851b-9519-3874-a9fd-0839d494a3c9',
          children: [
            {
              region: 'msIdentifier',
              text: 'Staatsbibliothek zu\n            Berlin',
            },
          ],
        },
        {
          data_origin: 'idno',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
          component: '',
          level: 1,
          id: '65e26a8f-3d81-439a-b2de-a0b1c108740c',
          children: [
            {
              region: 'msIdentifier',
              text: 'dolor sit amet',
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifierhsp-ID',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: 'f5e1b31d-92f3-4f3e-8170-118a5086e69a',
          data_type: 'hsp-ID',
          children: [
            {
              data_origin: 'collection',
              region: 'altIdentifierhsp-ID',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              component: '',
              level: 1,
              id: 'abb718fc-4e0b-43b0-976e-ce33cb90a8fe',
              children: [
                {
                  region: 'altIdentifierhsp-ID',
                  text: 'Handschriftenportal Kulturobjektdokument-ID',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifierhsp-ID',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: '0303635c-6f64-46d1-8ba0-f420ecf876cd',
              children: [
                {
                  region: 'altIdentifierhsp-ID',
                  text: 'HSP_123456-a7891234-a56789',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifiercorpus',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: 'c1cc36b1-74ab-4cc5-8d0f-1a9c7404a22d',
          data_type: 'corpus',
          children: [
            {
              data_origin: 'collection',
              region: 'altIdentifiercorpus',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              component: '',
              level: 1,
              id: 'a3157a25-8ec5-47e6-bee2-05e172fc2ea2',
              children: [
                {
                  region: 'altIdentifiercorpus',
                  text: 'Sammlung lorem Ipsum',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifiercorpus',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: 'b91a1104-c1c4-4abd-b77d-c435676c0922',
              children: [
                {
                  region: 'altIdentifiercorpus',
                  text: 'dolor sit amet',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifierformer',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: '7a65a55a-e8dd-4e22-99e8-d364be754f9b',
          data_type: 'former',
          children: [
            {
              data_origin: 'settlement',
              region: 'altIdentifierformer',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-settlement',
              component: '',
              level: 1,
              id: '020a9c09-7144-4d09-9d36-e1afe890de4b',
              data_key: '26cf9267-82fe-3bf1-a37-c9960658499f',
              children: [
                {
                  region: 'altIdentifierformer',
                  text: 'Regensburg',
                },
              ],
            },
            {
              data_origin: 'repository',
              region: 'altIdentifierformer',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-repository',
              component: '',
              level: 1,
              id: '911284ee-bfa5-4be9-930b-c4e2f78b8352',
              data_key: '654a4abc-3191-3e68-995b-4fdbd157cf9d',
              children: [
                {
                  region: 'altIdentifierformer',
                  text: 'Sankt Emmeran',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifierformer',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: '8f0d0e20-d376-41fe-a51c-a734176bd3cd',
              children: [
                {
                  region: 'altIdentifierformer',
                  text: 'St. Emm 57',
                },
              ],
            },
          ],
        },
      ],
    }

    act(() =>
      store.dispatch({
        type: 'erfassung/writeDocument',
        payload: true,
      })
    )

    render(
      <TestContext>
        <Slate initialValue={[element]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            msIdentifierChildren={element.children}
            dataTypeToAdd={'corpus'}
            dataOrigin={TEI_ELEMENT_ALT_IDENTIFIER}
            path={'msIdentifier'}
            isAltIdentifier={true}
            buttonLabel={'Corpus'}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Corpus')).toBeTruthy()
    expect(editor.children[0].children.length).toBe(6)

    await act(async () => fireEvent.click(screen.getByText('Corpus')))

    expect(editor.children[0].children.length).toBe(7)
    expect(editor.children[0].children[4].data_type).toBe('corpus')
    expect(editor.children[0].children[5].data_type).toBe('corpus')
  })

  it('Add new Former without any Altidentifier', async () => {
    const editor = createErfassungsEditor() as any
    const store = configureTestStore()
    const element = {
      data_origin: 'msIdentifier',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier',
      component: 'msIdentifier',
      level: 1,
      id: 'c6fa173f-dcf2-4ce0-ad1f-1f4c74bd0bf9',
      children: [
        {
          data_origin: 'settlement',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
          component: '',
          level: 1,
          id: 'd3b60e07-47d9-4005-9ae1-e406ac55c7dd',
          data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
          children: [
            {
              region: 'msIdentifier',
              text: 'Berlin',
            },
          ],
        },
        {
          data_origin: 'repository',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
          component: '',
          level: 1,
          id: 'ba18e596-36cd-4492-bf67-7f22c8c4e789',
          data_key: '6790851b-9519-3874-a9fd-0839d494a3c9',
          children: [
            {
              region: 'msIdentifier',
              text: 'Staatsbibliothek zu\n            Berlin',
            },
          ],
        },
        {
          data_origin: 'idno',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
          component: '',
          level: 1,
          id: '65e26a8f-3d81-439a-b2de-a0b1c108740c',
          children: [
            {
              region: 'msIdentifier',
              text: 'dolor sit amet',
            },
          ],
        },
      ],
    }

    act(() =>
      store.dispatch({
        type: 'erfassung/writeDocument',
        payload: true,
      })
    )

    render(
      <TestContext>
        <Slate initialValue={[element]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            msIdentifierChildren={element.children}
            dataTypeToAdd={'former'}
            dataOrigin={TEI_ELEMENT_ALT_IDENTIFIER}
            path={'msIdentifier'}
            isAltIdentifier={true}
            buttonLabel={'Vorbesitzersignatur'}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Vorbesitzersignatur')).toBeTruthy()
    expect(editor.children[0].children.length).toBe(3)

    await act(async () =>
      fireEvent.click(screen.getByText('Vorbesitzersignatur'))
    )

    expect(editor.children[0].children.length).toBe(4)
    expect(editor.children[0].children[3].data_type).toBe('former')
  })

  it('Add new Corpus without any Altidentifier', async () => {
    const editor = createErfassungsEditor() as any
    const store = configureTestStore()
    const element = {
      data_origin: 'msIdentifier',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier',
      component: 'msIdentifier',
      level: 1,
      id: 'c6fa173f-dcf2-4ce0-ad1f-1f4c74bd0bf9',
      children: [
        {
          data_origin: 'settlement',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
          component: '',
          level: 1,
          id: 'd3b60e07-47d9-4005-9ae1-e406ac55c7dd',
          data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
          children: [
            {
              region: 'msIdentifier',
              text: 'Berlin',
            },
          ],
        },
        {
          data_origin: 'repository',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
          component: '',
          level: 1,
          id: 'ba18e596-36cd-4492-bf67-7f22c8c4e789',
          data_key: '6790851b-9519-3874-a9fd-0839d494a3c9',
          children: [
            {
              region: 'msIdentifier',
              text: 'Staatsbibliothek zu\n            Berlin',
            },
          ],
        },
        {
          data_origin: 'idno',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
          component: '',
          level: 1,
          id: '65e26a8f-3d81-439a-b2de-a0b1c108740c',
          children: [
            {
              region: 'msIdentifier',
              text: 'dolor sit amet',
            },
          ],
        },
      ],
    }

    act(() =>
      store.dispatch({
        type: 'erfassung/writeDocument',
        payload: true,
      })
    )

    render(
      <TestContext>
        <Slate initialValue={[element]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            msIdentifierChildren={element.children}
            dataTypeToAdd={'corpus'}
            dataOrigin={TEI_ELEMENT_ALT_IDENTIFIER}
            path={'msIdentifier'}
            isAltIdentifier={true}
            buttonLabel={'Corpus'}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Corpus')).toBeTruthy()
    expect(editor.children[0].children.length).toBe(3)

    await act(async () => fireEvent.click(screen.getByText('Corpus')))

    expect(editor.children[0].children.length).toBe(4)
    expect(editor.children[0].children[3].data_type).toBe('corpus')
  })
})
