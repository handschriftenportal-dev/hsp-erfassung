import { ListItemText, MenuItem, MenuList } from '@mui/material'
import type { FC } from 'react'

import type { ImportiereNormdatumDialogState } from './ImportiereNormdatumDialogState'

interface Props {
  state: ImportiereNormdatumDialogState
  setSelected: (index: number) => void
}

export const ImportiereNormdatumDialogItemsList: FC<Props> = ({
  state,
  setSelected,
}) => {
  return (
    <MenuList sx={{ margin: 0, padding: 0 }}>
      {state.items.map((value, index) => (
        <MenuItem
          key={`${index}-${value.gndIdentifier}`}
          onClick={() => setSelected(index)}
          selected={state.selected === index}
          style={{ overflow: 'hidden' }}
        >
          <ListItemText
            primary={value.preferredName}
            secondary={value.subtitle}
          />
        </MenuItem>
      ))}
    </MenuList>
  )
}
