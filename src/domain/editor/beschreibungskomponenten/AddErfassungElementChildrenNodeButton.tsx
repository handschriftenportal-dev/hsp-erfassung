import { Add } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'

interface Props {
  insertNewErfassungElementChildrenNode: () => void
  buttonLabel: string
}

export const AddErfassungElementChildrenNodeButton: FC<Props> = memo(
  ({ insertNewErfassungElementChildrenNode, buttonLabel }) => {
    return (
      <Grid
        className={'small-bottom-gab'}
        style={{ float: 'right' }}
        item
        xs={4}
      >
        <Button
          startIcon={<Add />}
          data-testid="addErfassungElementChildrenNodeButton"
          className={'grey-add-button-style'}
          onClick={insertNewErfassungElementChildrenNode}
          size="small"
          variant="text"
        >
          {buttonLabel}
        </Button>
      </Grid>
    )
  }
)
