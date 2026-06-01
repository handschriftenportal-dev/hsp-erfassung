import type { FC, PropsWithChildren, ReactNode } from 'react'
import { createContext, useContext } from 'react'

type GlobalModalContext = {
  showModal: (modal: ReactNode) => void
  hideModal: () => void
  modal: ReactNode
}

const initalState: GlobalModalContext = {
  showModal: (modal) => {
    console.log(modal)
  },
  hideModal: () => undefined,
  modal: null,
}

const GlobalModalContext = createContext(initalState)
export const useGlobalModalContext = () => useContext(GlobalModalContext)

export const GlobalDisabledModal: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GlobalModalContext.Provider value={initalState}>
      {children}
    </GlobalModalContext.Provider>
  )
}
