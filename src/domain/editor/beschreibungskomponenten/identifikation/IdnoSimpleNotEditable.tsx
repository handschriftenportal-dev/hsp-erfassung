import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'
import { NoneEditableTwoColumnElementJSX } from 'src/domain/editor/NoneEditableTwoColumnElementJSX'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

interface Props {
  props: RenderElementProps
  title: string
}

export const IdnoSimpleNotEditable: FC<Props> = memo(({ props, title }) => {
  const content = HSPNode.extractFirstText(props.element)
  return content ? (
    <Grid container>
      <NoneEditableTwoColumnElementJSX label={title}>
        {content}
      </NoneEditableTwoColumnElementJSX>
    </Grid>
  ) : (
    <></>
  )
})
