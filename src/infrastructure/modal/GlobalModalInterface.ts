import type { ReactNode } from 'react'

export type GlobalModalInterface = {
  showModal: (modal: ReactNode) => void
  hideModal: () => void
  modal: ReactNode
}
