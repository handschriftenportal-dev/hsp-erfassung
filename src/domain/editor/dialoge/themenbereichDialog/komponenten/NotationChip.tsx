import { Chip } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { DialogUtilities } from 'src/domain/editor/dialoge/DialogUtilities'

interface Props {
  notation: string
  uri?: string
  noFloat?: boolean
}

export const NotationChip: FC<Props> = memo(
  ({ notation, uri, noFloat = false }) => {
    return uri ? (
      <Chip
        label={notation}
        variant="outlined"
        color="primary"
        size="smaller"
        onClick={() => DialogUtilities.openInNewTab(uri)}
        sx={{ float: noFloat ? 'none' : 'right', cursor: 'alias' }}
      />
    ) : (
      <Chip
        variant="filled"
        size="smaller"
        color="warning"
        label={notation}
        sx={{ float: noFloat ? 'none' : 'right' }}
      />
    )
  }
)
