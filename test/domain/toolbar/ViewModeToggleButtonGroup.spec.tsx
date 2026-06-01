import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { updateMode } from 'src/domain/erfassung/ErfassungsState'
import { ViewModeToggleButtonGroup } from 'src/domain/toolbar/ViewModeToggleButtonGroup'
import de from 'src/infrastructure/i18n/translation_de.json'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('ViewModeToggleButtonGroup', () => {
  it('shows two buttons', () => {
    render(
      <TestContext>
        <ViewModeToggleButtonGroup />
      </TestContext>
    )
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('selects description button if in previewMode', () => {
    const store = configureTestStore()
    store.dispatch(updateMode('previewMode'))
    render(
      <TestContext store={store}>
        <ViewModeToggleButtonGroup />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.toolbar.show_description })
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByRole('button', { name: de.toolbar.show_normdata_view })
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('selects normdata button if in normdataMode', () => {
    const store = configureTestStore()
    store.dispatch(updateMode('normdataMode'))
    render(
      <TestContext store={store}>
        <ViewModeToggleButtonGroup />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.toolbar.show_normdata_view })
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByRole('button', { name: de.toolbar.show_description })
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('can change mode from description to normdata mode', async () => {
    const store = configureTestStore()
    store.dispatch(updateMode('previewMode'))
    render(
      <TestContext store={store}>
        <ViewModeToggleButtonGroup />
      </TestContext>
    )
    await userEvent.click(
      screen.getByRole('button', { name: de.toolbar.show_normdata_view })
    )
    expect(store.getState().erfassung.mode).toBe('normdataMode')
  })

  it('can change mode from normdata to description mode', async () => {
    const store = configureTestStore()
    store.dispatch(updateMode('normdataMode'))
    render(
      <TestContext store={store}>
        <ViewModeToggleButtonGroup />
      </TestContext>
    )
    await userEvent.click(
      screen.getByRole('button', { name: de.toolbar.show_description })
    )
    expect(store.getState().erfassung.mode).toBe('previewMode')
  })
})
