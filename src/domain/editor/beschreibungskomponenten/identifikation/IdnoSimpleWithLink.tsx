import { Grid, Link } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import type { RenderElementProps } from 'slate-react'
import { NoneEditableTwoColumnElementJSX } from 'src/domain/editor/NoneEditableTwoColumnElementJSX'
import {
  selectConfiguration,
  selectReadOnly,
} from 'src/domain/erfassung/ErfassungsState'
import { HSPLink } from 'src/infrastructure/components/HSPLink'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { colors } from 'src/theme'

interface Props {
  props: RenderElementProps
  title: string
  link: string
}

export const IdnoSimpleWithLink: FC<Props> = memo(({ props, title, link }) => {
  const readOnly = useSelector(selectReadOnly)
  const { standalone } = useSelector(selectConfiguration)
  const { element } = props
  const text = HSPNode.extractFirstText(element)
  const hspId = standalone ? text : <HSPLink url={link}>{text}</HSPLink>

  return (
    <Grid container>
      {readOnly || standalone ? (
        <NoneEditableTwoColumnElementJSX label={title}>
          {hspId}
        </NoneEditableTwoColumnElementJSX>
      ) : (
        <Grid className={'small-bottom-gab'} container>
          <Grid item xs={3} style={{ display: 'table' }}>
            <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              {title}:
            </span>
          </Grid>
          <Grid item xs={8}>
            <Link
              style={{
                color: colors.special.linkBlue,
                display: 'flex',
                width: 'inherit',
                padding: '27px 12px 10px',
                backgroundColor: 'rgba(79, 77, 75, 0.04)',
              }}
              href={link}
              target={'_blank'}
              underline="hover"
            >
              {text}
            </Link>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
})
