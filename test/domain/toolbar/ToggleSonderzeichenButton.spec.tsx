import { act, fireEvent, render, screen } from '@testing-library/react'
import { updateSidebarComponentType } from 'src/domain/erfassung/ErfassungsState'
import { SidebarComponentType } from 'src/domain/sidebar/SidebarComponentType'
import { ToggleSonderzeichenButton } from 'src/domain/toolbar/ToggleSonderzeichenButton'
import de from 'src/infrastructure/i18n/translation_de.json'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('ToggleSonderzeichenButton', () => {
  it('renders a button', () => {
    render(
      <TestContext>
        <ToggleSonderzeichenButton />
      </TestContext>
    )
    expect(screen.getByRole('button')).toBeVisible()
  })

  describe('while in structural view', () => {
    let store: ReturnType<typeof configureTestStore>

    beforeEach(() => {
      store = configureTestStore()
      store.dispatch(updateSidebarComponentType(SidebarComponentType.struktur))
      render(
        <TestContext store={store}>
          <ToggleSonderzeichenButton />
        </TestContext>
      )
    })

    it('has title to switch to special character selection', () => {
      expect(
        screen.getByRole('button', { name: de.toolbar.show_special_character })
      ).toBeVisible()
    })

    it('pressing the button switches to special character view', async () => {
      await act(async () => fireEvent.click(screen.getByRole('button')))
      expect(store.getState().erfassung.sidebarComponentType).toBe(
        SidebarComponentType.sonderzeichen
      )
    })
  })

  describe('while in special character selection', () => {
    let store: ReturnType<typeof configureTestStore>

    beforeEach(() => {
      store = configureTestStore()
      store.dispatch(
        updateSidebarComponentType(SidebarComponentType.sonderzeichen)
      )
      render(
        <TestContext store={store}>
          <ToggleSonderzeichenButton />
        </TestContext>
      )
    })

    it('has title to switch to special character selection', () => {
      expect(
        screen.getByRole('button', { name: de.toolbar.show_structural_view })
      ).toBeVisible()
    })

    it('pressing the button switches to structural view', async () => {
      await act(async () => fireEvent.click(screen.getByRole('button')))
      expect(store.getState().erfassung.sidebarComponentType).toBe(
        SidebarComponentType.struktur
      )
    })
  })
})
