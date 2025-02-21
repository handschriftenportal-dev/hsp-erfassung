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

import { act, render, screen } from '@testing-library/react'

import { HSP_ERFASSUNGS_EDITOR_ID } from '../../../src/domain/editor/HSPEditor'
import {
  selectIsFullscreen,
  updateIsFullscreen,
} from '../../../src/domain/erfassung/ErfassungsState'
import { FullscreenLogik } from '../../../src/domain/erfassung/FullscreenLogik'
import { configureTestStore, TestContext } from '../../TestContext'

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
