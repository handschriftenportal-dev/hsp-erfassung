import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import type { TFunction } from 'i18next'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { Editor } from 'slate'
import { useDialog } from 'src/domain/editor/dialoge/useDialog'
import { NormdatenIconFactory } from 'src/domain/editor/icons/NormdatenIcons'
import { selectTaggableNormdaten } from 'src/domain/erfassung/ErfassungsState'
import type { Normdatum } from 'src/domain/erfassung/Normdatum'

interface Props {
  editor: Editor
}

type Uebersetzung = {
  header: string
  items: Array<{
    normdatum: Normdatum
    label: string
  }>
}

function translateAndSort(
  normdaten: Normdatum[],
  t: TFunction
): Uebersetzung['items'] {
  return normdaten
    .map((normdatum) => ({
      normdatum,
      label: t(`text_tagging.referenz.type.${normdatum}`),
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

export const ReferenzAuszeichnungActions: FC<Props> = ({ editor }) => {
  const taggableNormdaten = useSelector(selectTaggableNormdaten)
  const { t } = useTranslation()
  const { openCreateDialogHandler } = useDialog(editor)
  const referenzGruppen = useMemo((): Uebersetzung[] => {
    return [
      {
        header: t(`text_tagging.referenz.type_header.gnd`),
        items: translateAndSort(['person', 'koerperschaft', 'ort'], t),
      },
      {
        header: t(`text_tagging.referenz.type_header.subject_area`),
        items: translateAndSort(
          [
            'buchkunde',
            'buchschmuck',
            'einband',
            'musiknotation',
            'ueberlieferungsform',
            'schriftart',
            'schreibsprache',
            'textgattung',
          ],
          t
        ),
      },
      {
        header: t(`text_tagging.referenz.type_header.other`),
        items: translateAndSort(['initium'], t),
      },
    ]
  }, [t])

  return (
    <List subheader={<li />}>
      {referenzGruppen.map((gruppe) => (
        <li key={gruppe.header}>
          <ul style={{ padding: 0 }}>
            <ListSubheader
              component="h3"
              aria-level={3}
              sx={{ lineHeight: 'inherit' }}
            >
              {gruppe.header}
            </ListSubheader>
            {gruppe.items.map(({ normdatum, label }) => (
              <ListItemButton
                key={normdatum}
                dense
                onClick={openCreateDialogHandler(normdatum)}
                disabled={!taggableNormdaten[normdatum]}
              >
                <ListItemIcon>
                  <NormdatenIconFactory type={normdatum} />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </ul>
        </li>
      ))}
    </List>
  )
}
