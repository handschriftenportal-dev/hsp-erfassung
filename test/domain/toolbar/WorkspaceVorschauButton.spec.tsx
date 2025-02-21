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

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { BeschreibungsObject } from '../../../src/domain/erfassung/Erfassung'
import {
  updateBeschreibung,
  updateConfiguration,
} from '../../../src/domain/erfassung/ErfassungsState'
import { WorkspaceVorschauButton } from '../../../src/domain/toolbar/WorkspaceVorschauButton'
import de from '../../../src/infrastructure/i18n/translation_de.json'
import { configureTestStore, TestContext } from '../../TestContext'

declare global {
  interface Window {
    createHspWorkspace: any
  }
}

function mockCreateHspWorkspace(_setup: any) {
  const resources: any[] = []
  const result = {
    async mount(_: any) {
      return result
    },
    addResource(resource: any) {
      resources.push(resource)
    },
    getResources() {
      return resources
    },
  }
  return result
}

describe('WorkspaceVorschauButton', () => {
  let createHspWorkspace: jest.Mock
  beforeEach(() => {
    createHspWorkspace = jest.fn(mockCreateHspWorkspace)
    global.window.createHspWorkspace = createHspWorkspace
  })

  it('renders a button', () => {
    render(
      <TestContext>
        <WorkspaceVorschauButton />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.toolbar.preview })
    ).toBeVisible()
  })

  it('clicking the button calls the workspace', async () => {
    const hspTeiEndpoint = 'workspace'
    const beschreibung: Partial<BeschreibungsObject> = {
      id: '123456',
      type: 'hsp:description',
    }
    const store = configureTestStore()
    store.dispatch(updateConfiguration({ workspaceUrl: hspTeiEndpoint }))
    store.dispatch(updateBeschreibung(beschreibung))
    render(
      <TestContext store={store}>
        <WorkspaceVorschauButton />
      </TestContext>
    )
    await userEvent.click(
      screen.getByRole('button', { name: de.toolbar.preview })
    )

    expect(createHspWorkspace).toHaveBeenCalled()

    const [[call]] = createHspWorkspace.mock.calls
    expect(call).toMatchObject({ hspTeiEndpoint })
    const [{ value: workspace }] = createHspWorkspace.mock.results
    expect(workspace.getResources()).toMatchObject([beschreibung])
  })

  it('clicking the button opens a dialog', async () => {
    const store = configureTestStore()
    store.dispatch(updateConfiguration({ workspaceUrl: 'workspace' }))
    render(
      <TestContext store={store}>
        <WorkspaceVorschauButton />
      </TestContext>
    )

    await userEvent.click(
      screen.getByRole('button', { name: de.toolbar.preview })
    )

    expect(screen.getByRole('dialog')).toBeVisible()
  })
})
