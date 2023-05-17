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

import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { TestContext } from '../../TestContext'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { TEISpeichernButton } from '../../../src/domain/toolbar/TEISpeichernButton'
import { createEditor } from 'slate'
import ConfigureStore from '../../../src/infrastructure/ConfigureReduxStore'
import { sendDocumentSpeichernEvent, sendValidateTEIEvent } from '../../../src/domain/editor/HSPEditorDomainEvents'
import { ValidateTEIButton } from '../../../src/domain/toolbar/ValidateTEIButton'

test('HSP Editor Domain Event Speichern', async () => {

  const editor = withReact(createEditor() as ReactEditor)
  const setNachweisResponse = jest.fn()
  const store = ConfigureStore
  const slateValue = [{
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }]

  store.dispatch({ type: 'erfassung/disableStandalone', payload: true })
  const setOpenMessage = jest.fn()

  render(<TestContext><Slate value={slateValue}
                             onChange={() => {
                             }}
                             editor={editor}> <TEISpeichernButton title={'Speichern'}
                                                                  url={'/test'}
                                                                  setNachweisResponse={setNachweisResponse}
                                                                  setOpenMessage={setOpenMessage}
                                                                  saveAllowed={true}></TEISpeichernButton></
          Slate>
      </TestContext>
  )

  expect(screen.getByTitle('Speichern')).toBeVisible()
  sendDocumentSpeichernEvent()
  await waitFor(() => {
    expect(setNachweisResponse.mock.calls.length).toBe(1)
  })
})

test('Validate TEI Domain Event', async () => {

  const editor = withReact(createEditor() as ReactEditor)
  const setOpenMessage = jest.fn()
  const setNachweisResponse = jest.fn()
  const slateValue = [{
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }]

  render(<TestContext><Slate value={slateValue}
                             onChange={() => {
                             }}
                             editor={editor}> <ValidateTEIButton title={'validierenTitle'}
                                                                 validationUrl={'/validate'}
                                                                 withODD={false}
                                                                 setNachweisResponse={setNachweisResponse}
                                                                 setOpenMessage={setOpenMessage}/>
      </Slate>
      </TestContext>
  )

  expect(screen.getByTitle('validierenTitle')).toBeVisible()
  sendValidateTEIEvent()
  await waitFor(() => {
    expect(setNachweisResponse.mock.calls.length).toBe(1)
  })
})
