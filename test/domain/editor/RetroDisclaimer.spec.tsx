import { render, screen } from '@testing-library/react'
import { RetroDisclaimer } from 'src/domain/editor/RetroDisclaimer'
import { updateBeschreibung } from 'src/domain/erfassung/ErfassungsState'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('Retro disclaimer', () => {
  it('does not render heading for description of type hsp:description', () => {
    const store = configureTestStore()
    store.dispatch(updateBeschreibung({ type: 'hsp:description' }))
    render(
      <TestContext store={store}>
        <RetroDisclaimer />
      </TestContext>
    )
    expect(screen.queryByRole('heading')).toBeNull()
  })

  it('does render heading for description of type hsp:description_retro', () => {
    const store = configureTestStore()
    store.dispatch(updateBeschreibung({ type: 'hsp:description_retro' }))
    render(
      <TestContext store={store}>
        <RetroDisclaimer />
      </TestContext>
    )
    expect(screen.getByRole('heading')).toBeVisible()
  })
})
