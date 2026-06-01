import { Link } from '@mui/material'
import type { FC, PropsWithChildren } from 'react'

interface Props {
  url: string
  target?: string
}

export const HSPLink: FC<PropsWithChildren<Props>> = ({
  children,
  url,
  target = '_blank',
}) => {
  return (
    <Link
      underline="hover"
      href={url}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      target={target}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      {children}
    </Link>
  )
}
