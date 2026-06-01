import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo, useId } from 'react'
import type { Element } from 'slate'
import { BeschreibungsTextField } from 'src/domain/editor/BeschreibungsTextField'

import { DeleteSlateNodeButton } from './DeleteSlateNodeButton'

interface Props {
  element: Element
  label: string
  marginBottom?: string
  marginTop?: string
  paddingLeft?: string
  helpertext?: string
  error?: boolean
  deletable?: boolean
}

export const LabelledTextField: FC<Props> = memo(
  ({
    element,
    label,
    marginBottom,
    marginTop,
    helpertext,
    error,
    deletable,
    paddingLeft,
  }) => {
    const id = useId()
    return (
      <Grid
        style={{
          marginBottom: marginBottom ?? 0,
          marginTop: marginTop ?? 0,
        }}
        container
      >
        <Grid
          item
          xs={3}
          style={{
            display: 'table',
            paddingLeft: paddingLeft ?? 0,
          }}
        >
          <span className={'align-display-table-cell-vertical-align'}>
            <label id={id}>{label}</label>:
          </span>
        </Grid>
        <Grid item xs={8}>
          <BeschreibungsTextField
            element={element}
            labelledBy={id}
            maxRows={4}
            showError={error}
            helperText={error ? helpertext : ''}
          />
        </Grid>
        <Grid item xs={1}>
          {deletable && <DeleteSlateNodeButton element={element} />}
        </Grid>
      </Grid>
    )
  }
)
