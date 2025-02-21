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

import { act, fireEvent, render, screen } from '@testing-library/react'
import { FC, PropsWithChildren } from 'react'

import {
  GlobalModal,
  useGlobalModalContext,
} from '../../../src/infrastructure/modal/GlobalModal'

describe('Testing global modal', () => {
  it('can show and hide a modal', () => {
    const ShowHideButtons: FC = () => {
      const { hideModal, showModal } = useGlobalModalContext()
      return (
        <>
          <button onClick={() => showModal(<h1>Modal</h1>)}>Show me</button>
          <button onClick={() => hideModal()}>Hide me</button>
        </>
      )
    }

    render(
      <GlobalModal>
        <ShowHideButtons />
      </GlobalModal>
    )
    const showMe = screen.getByRole('button', { name: 'Show me' })
    const hideMe = screen.getByRole('button', { name: 'Hide me' })

    expect(screen.queryByRole('heading')).toEqual(null)
    act(() => {
      fireEvent.click(showMe)
    })
    expect(screen.queryByRole('heading')).not.toEqual(null)
    act(() => {
      fireEvent.click(hideMe)
    })
    expect(screen.queryByRole('heading')).toEqual(null)
  })

  it('can switch to different modals', () => {
    const MultipleModals: FC = () => {
      const { showModal } = useGlobalModalContext()
      return (
        <>
          <button onClick={() => showModal(<h1>Modal 1</h1>)}>First</button>
          <button onClick={() => showModal(<h1>Modal 2</h1>)}>Second</button>
        </>
      )
    }

    render(
      <GlobalModal>
        <MultipleModals />
      </GlobalModal>
    )
    const firstBtn = screen.getByRole('button', { name: 'First' })
    const secondBtn = screen.getByRole('button', { name: 'Second' })

    expect(screen.queryByRole('heading')).toEqual(null)
    act(() => {
      fireEvent.click(firstBtn)
    })
    expect(screen.getByRole('heading')).toHaveTextContent('Modal 1')
    act(() => {
      fireEvent.click(secondBtn)
    })
    expect(screen.getByRole('heading')).toHaveTextContent('Modal 2')
  })

  it('works with multiple components', () => {
    const ModalButton: FC<PropsWithChildren<{ heading: string }>> = ({
      children,
      heading,
    }) => {
      const { showModal } = useGlobalModalContext()
      return (
        <button onClick={() => showModal(<h1>{heading}</h1>)}>
          {children}
        </button>
      )
    }

    render(
      <GlobalModal>
        <ModalButton heading={'Modal 1'}>First</ModalButton>
        <ModalButton heading={'Modal 2'}>Second</ModalButton>
      </GlobalModal>
    )
    const firstBtn = screen.getByRole('button', { name: 'First' })
    const secondBtn = screen.getByRole('button', { name: 'Second' })

    expect(screen.queryByRole('heading')).toEqual(null)
    act(() => {
      fireEvent.click(firstBtn)
    })
    expect(screen.getByRole('heading')).toHaveTextContent('Modal 1')
    act(() => {
      fireEvent.click(secondBtn)
    })
    expect(screen.getByRole('heading')).toHaveTextContent('Modal 2')
    act(() => {
      fireEvent.click(firstBtn)
    })
    expect(screen.getByRole('heading')).toHaveTextContent('Modal 1')
  })
})
