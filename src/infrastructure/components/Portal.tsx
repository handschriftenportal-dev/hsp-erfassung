import type { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  return typeof document === 'object'
    ? createPortal(children, document.fullscreenElement ?? document.body)
    : null
}
