import { act, fireEvent, render, screen } from '@testing-library/react'
import type { FC, PropsWithChildren } from 'react'
import {
  GlobalModal,
  useGlobalModalContext,
} from 'src/infrastructure/modal/GlobalModal'

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
