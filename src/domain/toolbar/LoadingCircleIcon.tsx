import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectApplicationBusy } from 'src/domain/erfassung/ErfassungsState'

export const LoadingCircleIcon = () => {
  const busy = useSelector(selectApplicationBusy)
  return (
    <>
      {busy && (
        <Box>
          <div data-testid="loadingCircle" className="loading-circle-icon" />
        </Box>
      )}
    </>
  )
}
