import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import {
  updateApplicationBusy,
  updateConfiguration,
  updateMode,
  updateStandalone,
  writeDocument,
} from 'src/domain/erfassung/ErfassungsState'
import { HSPToolbar } from 'src/domain/toolbar/HSPToolbar'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from 'test/TestContext'

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

  it('has 10 buttons in edit and 6 in preview mode for editable description', async () => {
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
    await userEvent.click(
      screen.getByRole('button', { name: de.toolbar.finish_writing })
    )
    expect(screen.getAllByRole('button')).toHaveLength(6)
  })

  it('has always 6 buttons for non editable description', async () => {
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

    expect(screen.getAllByRole('button')).toHaveLength(6)
    expect(
      screen.getByRole('button', { name: de.toolbar.write })
    ).toBeDisabled()
  })

  it('pressing save button shows an alert message indication the saving success', async () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()
    store.dispatch(
      updateConfiguration({
        validationUrl: '/test',
        beschreibungsUrl: '/test',
        workspaceUrl: '/test',
        isEditable: true,
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
    await userEvent.click(screen.getByRole('button', { name: de.toolbar.save }))
    expect(screen.getByRole('alert')).toBeVisible()
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
