import { IconButton, styled } from '@mui/material'

export const HSPRightButton = styled(IconButton)({
  float: 'right',
  backgroundColor: '#3e464c',
  marginLeft: '10px',
  padding: '6px',
  boxShadow: '0 1px 2.5px 0 rgb(0 0 0 / 26%), 0 1px 5px 0 rgb(0 0 0 / 16%)',
  '&:hover, &.Mui-focusVisible': { backgroundColor: 'black' },
})
