import { Button, IconButton, styled } from '@mui/material'

export const NormdataBaseStyle = {
  backgroundColor: '#FFDF6B',
  cursor: 'pointer',
}

export const CloseIconButtonStyled = styled(IconButton)({
  float: 'right',
})

export const ActionDetermineButton = styled(Button)({
  float: 'left',
  color: 'white',
})

export const ActionCancelButton = styled(Button)({
  float: 'left',
  color: 'black',
})
