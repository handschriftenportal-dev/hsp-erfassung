import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { BeschreibungsObject } from 'src/domain/erfassung/Erfassung'
import {
  updateBeschreibung,
  updateConfiguration,
} from 'src/domain/erfassung/ErfassungsState'
import { WorkspaceVorschauButton } from 'src/domain/toolbar/WorkspaceVorschauButton'
import de from 'src/infrastructure/i18n/translation_de.json'
import { configureTestStore, TestContext } from 'test/TestContext'

function mockCreateHspWorkspace(_setup: unknown) {
  const resources: unknown[] = []
  const result = {
    async mount(_: unknown) {
      return result
    },
    addResource(resource: unknown) {
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
