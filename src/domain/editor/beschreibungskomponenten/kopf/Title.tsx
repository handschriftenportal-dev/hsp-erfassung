import { Grid } from '@mui/material'
import { isEmpty } from 'lodash'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RenderElementProps } from 'slate-react'
import { BaseElement } from 'src/domain/editor/BaseElement'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { NoneEditableTwoColumnElement } from 'src/domain/editor/NoneEditableTwoColumnElement'
import { selectReadOnly } from 'src/domain/erfassung/ErfassungsState'
import { TEI_ELEMENT_HEAD } from 'src/domain/erfassung/TEIConstants'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

interface Props extends RenderElementProps {}

export const Title: FC<Props> = memo(({ element, children, attributes }) => {
  const readOnly = useSelector(selectReadOnly)
  const { t } = useTranslation()
  const { path = '' } = element

  if (!path.includes(TEI_ELEMENT_HEAD)) {
    return <BaseElement attributes={attributes}>{children}</BaseElement>
  }

  if (readOnly) {
    const content = HSPNode.extractFirstText(element)

    if (isEmpty(content.trim())) {
      return null
    }
    return (
      <NoneEditableTwoColumnElement label={t('editor.title')}>
        {children}
      </NoneEditableTwoColumnElement>
    )
  } else {
    return (
      <Grid container>
        <LabelledTextField
          label={t('editor.title')}
          element={element}
          deletable={false}
          error={false}
          helpertext={''}
          marginTop={''}
          marginBottom={'12px'}
        />
      </Grid>
    )
  }
})
