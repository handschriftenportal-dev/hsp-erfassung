import { render, screen } from '@testing-library/react'
import { BearbeitungsStatus } from 'src/domain/erfassung/BearbeitungsStatus'
import {
  updateBeschreibung,
  updateConfiguration,
  updateIsFullscreen,
  updateMode,
} from 'src/domain/erfassung/ErfassungsState'
import type { ViewMode } from 'src/domain/erfassung/ViewMode'
import de from 'src/infrastructure/i18n/translation_de.json'
import { configureTestStore, TestContext } from 'test/TestContext'

const beschreibung = {
  id: '1',
  kodid: '2',
  kodsignaturen: ['3', '4'],
  signature: 'hello world',
  subtype: 'medieval',
}

function storeSetup(mode: string) {
  const store = configureTestStore()
  store.dispatch(updateConfiguration({ isEditable: true }))
  store.dispatch(updateBeschreibung(beschreibung))
  store.dispatch(updateMode(mode as ViewMode))
  return store
}

describe('BearbeitungsStatus', () => {
  test.each([
    ['previewMode', de.editing_status.read_heading],
    ['normdataMode', de.editing_status.read_heading],
    ['editMode', de.editing_status.edit_heading],
  ])('contains heading in %s', (mode, name) => {
    const store = storeSetup(mode)
    render(
      <TestContext store={store}>
        <BearbeitungsStatus />
      </TestContext>
    )
    expect(screen.queryByRole('heading', { name })).toBeVisible()
  })

  test.each([
    ['previewMode', de.editing_status.read_help_anchor_text],
    ['normdataMode', de.editing_status.read_help_anchor_text],
    ['editMode', de.editing_status.edit_help_anchor_text],
  ])('contains anchor in %s', (mode, name) => {
    const store = storeSetup(mode)
    render(
      <TestContext store={store}>
        <BearbeitungsStatus />
      </TestContext>
    )
    expect(screen.queryByRole('link', { name })).toBeVisible()
  })

  test.each([
    ['previewMode', de.editing_status.read_help_anchor_text],
    ['editMode', de.editing_status.edit_help_anchor_text],
  ])('in %s mode anchor %s has a non-special target', (mode, name) => {
    const store = storeSetup(mode)
    render(
      <TestContext store={store}>
        <BearbeitungsStatus />
      </TestContext>
    )
    expect(screen.getByRole('link', { name })).toHaveAttribute(
      'target',
      expect.stringMatching(/^[^_].*$/)
    )
  })

  test.each([['editMode'], ['previewMode']])(
    'Contains Signature in full screen mode of %s',
    (mode) => {
      const store = storeSetup(mode)
      store.dispatch(updateIsFullscreen(true))
      render(
        <TestContext store={store}>
          <BearbeitungsStatus />
        </TestContext>
      )
      expect(screen.getByRole('heading')).toHaveTextContent(
        beschreibung.signature
      )
    }
  )
})
