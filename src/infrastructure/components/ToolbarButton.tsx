import { IconButton, styled } from '@mui/material'
import { memo } from 'react'
import { colors } from 'src/theme'

export const ToolbarButton = memo(
  styled(IconButton)({
    width: '40px',
    height: '40px',
    color: 'white',
    backgroundColor: colors.greyscale.liver,
    '&:hover': { backgroundColor: 'black' },
    '&.Mui-disabled': {
      backgroundColor: colors.greyscale.neutral,
      color: colors.greyscale.whiteSmoke,
    },
    '&:active': { backgroundColor: colors.greyscale.stone },
    '&.Mui-focusVisible': { backgroundColor: 'black' },
    boxShadow: '0 1px 2.5px 0 rgb(0 0 0 / 26%), 0 1px 5px 0 rgb(0 0 0 / 16%)',
  })
)
