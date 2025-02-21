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

import { styled } from '@mui/material'
import { FC, ReactNode } from 'react'
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
