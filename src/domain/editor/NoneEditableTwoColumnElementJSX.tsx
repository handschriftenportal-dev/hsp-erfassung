import { Grid, TextField } from '@mui/material'
import type { FC, PropsWithChildren } from 'react'
import { memo, useId } from 'react'
import { useSelector } from 'react-redux'
import { selectReadOnly } from 'src/domain/erfassung/ErfassungsState'

interface Props {
  label: string
}

export const NoneEditableTwoColumnElementJSX: FC<PropsWithChildren<Props>> =
  memo(({ label, children }) => {
    const id = useId()
    const readOnly = useSelector(selectReadOnly)

    return (
      <Grid container className="small-bottom-gab">
        {!readOnly ? (
          <>
            <Grid item xs={3} style={{ display: 'table' }}>
              <span
                style={{
                  display: 'table-cell',
                  verticalAlign: 'middle',
                }}
              >
                <label id={id}>{label}</label>:
              </span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                aria-labelledby={id}
                defaultValue={children}
                fullWidth
                size="small"
                variant="filled"
                slotProps={{
                  input: {
                    className: 'text-field-input-style',
                    readOnly: true,
                  },
                }}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid
              item
              xs={4}
              style={{ display: 'table' }}
              className={'label-styles-preview-mode'}
            >
              <span
                style={{
                  display: 'table-cell',
                  verticalAlign: 'middle',
                }}
              >
                <label id={id}>{label}</label>:
              </span>
            </Grid>
            <Grid item xs={6} aria-labelledby={id}>
              {children}
            </Grid>
          </>
        )}
      </Grid>
    )
  })
