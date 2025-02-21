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
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import {
  updateApplicationBusy,
  updateConfiguration,
  updateMode,
  updateStandalone,
  writeDocument,
} from '../../../src/domain/erfassung/ErfassungsState'
import { HSPToolbar } from '../../../src/domain/toolbar/HSPToolbar'
import de from '../../../src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../TestContext'

declare global {
  interface Window {
    createHspWorkspace: any
  }
}

const server = setupServer(
  http.post('/test', () => {
    return HttpResponse.json({
      success: true,
      message: 'Speichern wurde erfolgreich durchgeführt.',
      level: 'info',
    })
  })
)

beforeAll(() => {
  global.window.createHspWorkspace = jest.fn()
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('HSPToolbar', () => {
  const editor = createErfassungsEditor()

  it('has 10 buttons in edit and 5 in preview mode for editable description', async () => {
    const store = configureTestStore()
    store.dispatch(
      updateConfiguration({
        validationUrl: '/test',
        beschreibungsUrl: '/test',
        workspaceUrl: '/test',
        isEditable: true,
      })
    )
    store.dispatch(updateMode('editMode'))
    render(
      <TestContext store={store}>
        <HSPToolbar editor={editor} />
      </TestContext>
    )

    expect(screen.getAllByRole('button')).toHaveLength(9)
    await act(async () =>
      fireEvent.mouseDown(
        screen.getByRole('button', { name: de.toolbar.finish_writing })
      )
    )
    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(5)
    })
  })

  it('has always 5 buttons for non editable description', async () => {
    const store = configureTestStore()
    store.dispatch(
      updateConfiguration({
        validationUrl: '/test',
        beschreibungsUrl: '/test',
        workspaceUrl: '/test',
        isEditable: false,
      })
    )
    store.dispatch(updateMode('previewMode'))
    render(
      <TestContext store={store}>
        <HSPToolbar editor={editor} />
      </TestContext>
    )

    expect(screen.getAllByRole('button')).toHaveLength(5)
    await act(async () =>
      fireEvent.mouseDown(
        screen.getByRole('button', { name: de.toolbar.write })
      )
    )
    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(5)
    })
  })

  it('pressing save button shows an alert message indication the saving success', async () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()
    store.dispatch(
      updateConfiguration({
        validationUrl: '/test',
        beschreibungsUrl: '/test',
        workspaceUrl: '/test',
        isEditable: false,
      })
    )
    store.dispatch(updateStandalone(false))
    store.dispatch(writeDocument())
    render(
      <TestContext store={store}>
        <HSPToolbar editor={editor} />
      </TestContext>
    )

    expect(screen.queryAllByRole('alert')).toHaveLength(0)
    await act(async () =>
      fireEvent.mouseDown(screen.getByRole('button', { name: de.toolbar.save }))
    )
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeVisible()
    })
  })

  it('has button to show as tei serialized description', async () => {
    render(
      <TestContext>
        <HSPToolbar editor={editor} />
      </TestContext>
    )

    expect(
      screen.getByRole('button', { name: de.toolbar.show_tei })
    ).toBeVisible()
  })

  it('can indicate that the application is busy with a loading circle', async () => {
    const store = configureTestStore()
    store.dispatch(updateApplicationBusy(true))

    render(
      <TestContext store={store}>
        <HSPToolbar editor={editor} />
      </TestContext>
    )
    expect(screen.getByTestId('loadingCircle')).toBeVisible()
  })
})
