import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AlertMessage } from 'src/domain/erfassung/AlertMessage'
import { updateAlertMessage } from 'src/domain/erfassung/ErfassungsState'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('AlertMessage', () => {
  it('is not shown at first render', () => {
    const store = configureTestStore()
    render(
      <TestContext store={store}>
        <AlertMessage>Hi</AlertMessage>
      </TestContext>
    )
    expect(screen.queryAllByRole('alert').length).toEqual(0)
  })

  it('shows new alert message', () => {
    const store = configureTestStore()
    render(<TestContext store={store}>Hi</TestContext>)
    act(() => {
      store.dispatch(
        updateAlertMessage({ level: 'info', message: 'hello world' })
      )
    })
    expect(screen.getByRole('alert')).toBeDefined()
    expect(screen.getByText('hello world')).toBeDefined()
  })

  it('hides alert after given period', () => {
    const store = configureTestStore()
    render(<TestContext store={store}>Hi</TestContext>)
    act(() => {
      store.dispatch(
        updateAlertMessage({
          level: 'info',
          message: 'hello world',
          hideAfter: 10,
        })
      )
    })

    expect(screen.getByRole('alert')).toBeDefined()
    waitFor(() => {
      expect(screen.queryByRole('alert')).toBeNull()
    })
  })

  it('can be closed by pressing the close button', () => {
    const store = configureTestStore()
    render(<TestContext store={store}>Hi</TestContext>)
    act(() => {
      store.dispatch(
        updateAlertMessage({
          level: 'info',
          message: 'hello world',
        })
      )
    })

    expect(screen.getByRole('alert')).toBeDefined()
    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(screen.queryByRole('alert')).toBeNull()
  })
})
