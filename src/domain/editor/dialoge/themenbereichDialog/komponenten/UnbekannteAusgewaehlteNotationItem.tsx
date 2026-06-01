import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { NotationChip } from './NotationChip'

interface Props {
  readOnly: boolean
  notation: string
  onClick?: (notation: string) => void
}

export const UnbekannteAusgewaehlteNotationItem: FC<Props> = memo(
  ({ readOnly = false, notation, onClick }) => {
    const { t } = useTranslation()
    return (
      <ListItem secondaryAction={<NotationChip notation={notation} />}>
        {!readOnly && (
          <ListItemIcon>
            <Checkbox
              edge="end"
              checked
              onClick={() => {
                if (onClick) {
                  onClick(notation)
                }
              }}
            />
          </ListItemIcon>
        )}
        <ListItemText
          secondary={t('subject_area_dialog.unknown_selected_concept')}
        />
      </ListItem>
    )
  }
)
