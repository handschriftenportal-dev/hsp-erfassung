import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import type { Dispatch, FC, ReactNode } from 'react'
import { memo } from 'react'
import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import type { Begriff } from 'src/domain/erfassung/ThemenbereicheAPI'

import { NotationChip } from './NotationChip'

interface Props {
  begriff: Begriff
  indent?: number
  checked?: boolean
  onChange?: Dispatch<ThemenbereichDialogAction>
  icon?: ReactNode
}

export const BegriffItem: FC<Props> = memo(
  ({ begriff, checked, indent = 0, onChange = undefined, icon }) => {
    const { notation, uri, id } = begriff.identifier
    const pl = indent * 5

    return (
      <ListItem>
        {icon && (
          <ListItemIcon className={'narrow-list-item'} sx={{ pl }}>
            {icon}
          </ListItemIcon>
        )}
        <ListItemIcon>
          {(checked !== undefined || onChange !== undefined) && (
            <Checkbox
              sx={{ p: 0 }}
              edge="end"
              disabled={onChange === undefined}
              checked={checked}
              onChange={() => {
                if (onChange) {
                  onChange(
                    checked
                      ? {
                          type: 'removeBegriff',
                          payload: id,
                        }
                      : {
                          type: 'addBegriffe',
                          payload: AuswahlItem.fromBegriff(begriff),
                        }
                  )
                }
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              <NotationChip notation={notation} uri={uri} />
              {begriff.label}
            </>
          }
        />
      </ListItem>
    )
  }
)
