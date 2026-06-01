import type { FC, PropsWithChildren, ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

import type { GlobalModalInterface } from './GlobalModalInterface'

const initalState: GlobalModalInterface = {
  showModal: () => undefined,
  hideModal: () => undefined,
  modal: null,
}

const GlobalModalContext = createContext(initalState)
export const useGlobalModalContext = () => useContext(GlobalModalContext)

export const GlobalModal: FC<PropsWithChildren> = ({ children }) => {
  const [modal, setModal] = useState<ReactNode>()

  const showModal = (modal?: ReactNode) => {
    setModal(modal ?? null)
  }

  const hideModal = () => {
    setModal(null)
  }

  return (
    <GlobalModalContext.Provider value={{ modal, showModal, hideModal }}>
      {modal}
      {children}
    </GlobalModalContext.Provider>
  )
}
