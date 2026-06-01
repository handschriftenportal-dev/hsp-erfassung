import { IconButton, styled } from '@mui/material'
import { memo } from 'react'
import { colors } from 'src/theme'

const commonStyle = {
  width: '40px',
  height: '40px',
  boxShadow: '0 1px 2.5px 0 rgb(0 0 0 / 26%), 0 1px 5px 0 rgb(0 0 0 / 16%)',
}

const defaultStyle = {
  ...commonStyle,
  color: colors.greyscale.white,
  backgroundColor: colors.greyscale.liver,
  '&:hover': { backgroundColor: colors.greyscale.black },
  '&.Mui-disabled': { backgroundColor: colors.greyscale.neutral },
  '&:active': { backgroundColor: colors.greyscale.stone },
  '&.Mui-focusVisible': { backgroundColor: colors.greyscale.black },
}

const secondaryStyle = {
  ...commonStyle,
  color: colors.greyscale.black,
  backgroundColor: colors.greyscale.white,
  '&:hover': { backgroundColor: colors.greyscale.lightGrey },
  '&.Mui-disabled': { backgroundColor: colors.greyscale.platinum },
  '&:active': { backgroundColor: colors.greyscale.platinum },
  '&.Mui-focusVisible': { backgroundColor: colors.greyscale.black },
}

export const HSPToolbarButton = memo(
  styled(IconButton)(({ color }) =>
    color === 'secondary' ? secondaryStyle : defaultStyle
  )
)
