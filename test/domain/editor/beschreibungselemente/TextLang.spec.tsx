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

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Slate } from 'slate-react'

import { TextLang } from '../../../../src/domain/editor/beschreibungselemente/TextLang'
import {
  readDocument,
  updateConfiguration,
  writeDocument,
} from '../../../../src/domain/erfassung/ErfassungsState'
import { createErfassungsEditor } from '../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { MockNormdatenService } from '../../../infrastructure/normdaten/MockNormdatenService'
import { configureTestStore, TestContext } from '../../../TestContext'

const slateValue = [
  {
    data_origin: 'paragraph',
    type: 'paragraph',
    istop: false,
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

describe('TextLang', () => {
  const attributes: any = {}
  const editor = createErfassungsEditor()
  it('has label in readonly mode', () => {
    const store = configureTestStore()
    store.dispatch(readDocument())
    const element = {
      data_origin: 'textLang',
      children: [
        {
          text: 'Deutsche',
        },
      ],
    }

    render(
      <TestContext store={store}>
        <Slate initialValue={slateValue} editor={editor}>
          <TextLang element={element} attributes={attributes}>
            Sprache
          </TextLang>
        </Slate>
      </TestContext>
    )

    expect(screen.getByLabelText('Schreibsprachen aller Texte')).toBeTruthy()
  })

  describe('with normdata server', () => {
    const service = MockNormdatenService('/normdaten')
    beforeAll(() => service.listen())
    afterEach(() => service.resetHandlers())
    afterAll(() => service.close())
    const store = configureTestStore()
    store.dispatch(writeDocument())
    store.dispatch(updateConfiguration({ normdatenUrl: '/normdaten' }))

    it('shows normdata when existing', async () => {
      const element = {
        data_origin: 'textLang',
        data_mainLang: 'de',
        data_otherLangs: '',
        children: [
          {
            text: 'Deutsche',
          },
        ],
      }
      render(
        <TestContext store={store}>
          <Slate initialValue={slateValue} editor={editor}>
            <TextLang attributes={attributes} element={element}>
              Sprache
            </TextLang>
          </Slate>
        </TestContext>
      )

      await act(() =>
        fireEvent.click(screen.getByRole('button', { name: 'Open' }))
      )

      await waitFor(() => {
        expect(screen.getByRole('listbox').textContent).toBe('deutsch4113292-0')
      })
    })

    it('shows error if normdata server request failed', async () => {
      const element = {
        data_origin: 'textLang',
        data_mainLang: 'unknown',
        data_otherLangs: '',
        children: [
          {
            text: 'Deutsche',
          },
        ],
      }
      render(
        <TestContext store={store}>
          <Slate initialValue={slateValue} editor={editor}>
            <TextLang attributes={attributes} element={element}>
              Sprache
            </TextLang>
          </Slate>
        </TestContext>
      )

      await act(() =>
        fireEvent.click(screen.getByRole('button', { name: 'Open' }))
      )

      await waitFor(() => {
        expect(store.getState().erfassung.alertMessage).toMatchObject({
          level: 'error',
          message: 'Nicht gefunden',
        })
      })
    })
  })
})
