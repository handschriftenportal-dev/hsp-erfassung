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

import styled from '@emotion/styled'
import { HelpRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { colors } from '../../../../theme'

interface Props {
  className?: string
  onClick?: any
  activated?: boolean
}

export const HilfeButtonUnstyled: FC<Props> = memo(
  ({ className, onClick }: Props) => {
    const { t } = useTranslation()

    return (
      <IconButton
        size={'small'}
        data-title={t('editor.show_help')}
        onClick={onClick}
        disableRipple={true}
        className={className}
      >
        <HelpRounded />
      </IconButton>
    )
  }
)

export const HilfeButton = styled(HilfeButtonUnstyled)(({ activated }) => ({
  color: activated ? colors.primary.darkTerraCotta : colors.greyscale.black,
  ':hover': {
    color: colors.primary.darkTerraCotta,
  },
  ':focus': {
    color: colors.primary.darkTerraCotta,
  },
}))
