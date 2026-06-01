import { act, render, screen } from '@testing-library/react'
import { HSP_ERFASSUNGS_EDITOR_ID } from 'src/domain/editor/HSPEditor'
import {
  selectIsFullscreen,
  updateIsFullscreen,
} from 'src/domain/erfassung/ErfassungsState'
import { FullscreenLogik } from 'src/domain/erfassung/FullscreenLogik'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('FullscreenLogik', () => {
  let requestFullscreen: typeof jest.fn
  let exitFullscreen: typeof jest.fn
  let store: ReturnType<typeof configureTestStore>
  const content = 'Dies soll Fullscreen werden'
  const testId = 'container'

  beforeEach(() => {
    store = configureTestStore()
    render(
      <TestContext store={store}>
        <FullscreenLogik>
          <div id={HSP_ERFASSUNGS_EDITOR_ID} data-testid={testId}>
            {content}
          </div>
        </FullscreenLogik>
      </TestContext>
    )
    requestFullscreen = jest.fn().mockImplementation(() => Promise.resolve())
    exitFullscreen = jest.fn().mockImplementation(() => Promise.resolve())
    Object.defineProperty(screen.getByTestId(testId), 'requestFullscreen', {
      value: requestFullscreen,
      configurable: true,
    })
    Object.defineProperty(global.document, 'exitFullscreen', {
      value: exitFullscreen,
      configurable: true,
    })
  })

  it('Renders children', () => {
    expect(screen.getByText(content)).toBeTruthy()
  })

  it('setting isFullscreen to true calls requestFullscreen', () => {
    act(() => {
      store.dispatch(updateIsFullscreen(true))
    })

    expect(requestFullscreen).toHaveBeenCalled()
  })

  it('setting isFullscreen to false in store calls exitFullscreen', () => {
    act(() => {
      store.dispatch(updateIsFullscreen(true))
    })
    Object.defineProperty(global.document, 'fullscreenElement', {
      value: true,
      configurable: true,
    })
    act(() => {
      store.dispatch(updateIsFullscreen(false))
    })

    expect(exitFullscreen).toHaveBeenCalled()
  })

  it('exiting fullscreen by event sets isFullscreen to false', () => {
    act(() => {
      store.dispatch(updateIsFullscreen(true))
    })
    Object.defineProperty(global.document, 'fullscreenElement', {
      value: null,
      configurable: true,
    })
    act(() => {
      const event = new CustomEvent('fullscreenchange', {
        detail: {
          target: screen.getByTestId(testId),
        },
      })
      document.dispatchEvent(event)
    })

    expect(selectIsFullscreen(store.getState())).toBe(false)
  })
})
