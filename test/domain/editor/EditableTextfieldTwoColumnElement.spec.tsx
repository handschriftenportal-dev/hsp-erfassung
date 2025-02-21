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

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Editable, Slate } from 'slate-react'

import { EditableTextfieldTwoColumnElement } from '../../../src/domain/editor/EditableTextfieldTwoColumnElement'
import { selectRenderer } from '../../../src/domain/editor/TEIElementRenderer'
import {
  updateConfiguration,
  updateMode,
} from '../../../src/domain/erfassung/ErfassungsState'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../TestContext'

describe('EditableTextfieldTwoColumnElement', () => {
  const editor = createErfassungsEditor()
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
        region: 'altIdentifiercorpus',
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

  const slateValue = [
    {
      data_origin: 'paragraph',
      children: [element],
    },
  ]
  it('has accessible label', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <EditableTextfieldTwoColumnElement
            element={element}
            label={'Label'}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.getByLabelText('Label')).toBeVisible()
  })

  it('label points to textfield', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <EditableTextfieldTwoColumnElement
            element={element}
            label={'Label'}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.getByLabelText('Label')).toHaveTextContent('Sammlung XYZ')
  })

  it('shows helper text if error flag is set to true', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <EditableTextfieldTwoColumnElement
            error={true}
            helpertext={'Helper Text'}
            element={element}
            label={'Label'}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.getByText('Helper Text')).toBeVisible()
  })

  it('does not show helper text if error flag is set to false', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <EditableTextfieldTwoColumnElement
            error={false}
            helpertext={'Helper Text'}
            element={element}
            label={'Label'}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.queryByText('Helper Text')).toBeNull()
  })

  it('does show delete button if delete flag is set', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <EditableTextfieldTwoColumnElement
            deletable={true}
            element={element}
            label={'Label'}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.getByRole('button')).toBeVisible()
  })

  it('does not show delete button if delete flag is set', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <EditableTextfieldTwoColumnElement
            deletable={false}
            element={element}
            label={'Label'}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('typing in textfield changes state', async () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()
    act(() => {
      store.dispatch(updateMode('editMode'))
      store.dispatch(
        updateConfiguration({
          standalone: true,
        })
      )
    })
    render(
      <TestContext store={store}>
        <Slate initialValue={slateValue} editor={editor}>
          <Editable renderElement={selectRenderer('editMode')} />
        </Slate>
      </TestContext>
    )
    const input = screen.queryByLabelText('Corpus Name')!
    await userEvent.click(input)
    await userEvent.keyboard('{ArrowLeft}')
    await userEvent.keyboard('1')
    await userEvent.keyboard('2')
    expect(screen.getByLabelText('Corpus Name')).toHaveTextContent(
      'Sammlung XY12Z'
    )
  })
})
