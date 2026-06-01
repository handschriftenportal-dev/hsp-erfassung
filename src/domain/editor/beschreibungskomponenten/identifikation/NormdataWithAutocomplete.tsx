import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import type { Element } from 'slate'
import { AutocompleteNormdatenFromDataKey } from 'src/domain/editor/AutocompleteNormdatenFromDataKey'
import { NoneEditableTwoColumnElementJSX } from 'src/domain/editor/NoneEditableTwoColumnElementJSX'
import { selectReadOnly } from 'src/domain/erfassung/ErfassungsState'
import type { NodeLabel } from 'src/domain/erfassung/NormdatenService'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

interface Props {
  element: Element
  title: string
  origin: NodeLabel
  required: boolean
}

export const NormdataWithAutocomplete: FC<Props> = memo(
  ({ element, title, origin, required }) => {
    const readOnly = useSelector(selectReadOnly)

    return !readOnly ? (
      <Grid className={'small-bottom-gab'} container>
        <AutocompleteNormdatenFromDataKey
          origin={origin}
          element={element}
          title={title}
          required={required}
        />
      </Grid>
    ) : (
      <Grid container>
        <NoneEditableTwoColumnElementJSX label={title}>
          {HSPNode.extractFirstText(element)}
        </NoneEditableTwoColumnElementJSX>
      </Grid>
    )
  }
)
