import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'

interface Props {
  helpText?: string
}

export const HilfeText: FC<Props> = memo(({ helpText }) => {
  return (
    <>
      {helpText && (
        <Grid item xs={12}>
          <span
            dangerouslySetInnerHTML={{ __html: helpText }}
            className="hilfe-text"
          />
        </Grid>
      )}
    </>
  )
})
