import { Grid } from '@mui/material'
import type { FC, ReactNode } from 'react'
import { memo, useId } from 'react'

export interface Props {
  label: string
  children: ReactNode
}

export const NoneEditableTwoColumnElement: FC<Props> = memo(
  ({ label, children }) => {
    const id = useId()
    return (
      <Grid container className="small-bottom-gab">
        <Grid className={'label-styles-preview-mode'} item xs={4}>
          <label id={id}>{label}</label>
        </Grid>
        <Grid item xs={8} aria-labelledby={id}>
          {children}
        </Grid>
      </Grid>
    )
  }
)
