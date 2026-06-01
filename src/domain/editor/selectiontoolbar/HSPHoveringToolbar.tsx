import { styled } from '@mui/material'
import type { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  children: ReactNode
}

const HSPHoveringToolbarContainer = styled('div')({
  minWidth: '50px',
  padding: '13px',
  color: '#000001',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  zIndex: 1,
  boxSizing: 'border-box',
  boxShadow: '0px 0px 30px 6px rgba(0,0,0,0.35)',
  WebkitBoxShadow: '0px 0px 30px 6px rgba(0,0,0,0.35)',
})

const HSPHoveringToolbarArrow = styled('i')({
  position: 'absolute',
  top: '100%',
  left: '50%',
  width: '12px',
  height: '12px',
  overflow: 'hidden',
  transform: 'translate(-50%,-50%) rotate(45deg)',
  backgroundColor: '#ffffff',
})

export const HSPHoveringToolbar: FC<Props> = ({ children }) => {
  const { t } = useTranslation()
  return (
    <HSPHoveringToolbarContainer
      role="menu"
      aria-label={t('selection_toolbar.label')}
    >
      {children}
      <HSPHoveringToolbarArrow />
    </HSPHoveringToolbarContainer>
  )
}
