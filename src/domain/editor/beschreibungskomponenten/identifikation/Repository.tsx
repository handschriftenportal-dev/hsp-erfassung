import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { RenderElementProps } from 'slate-react'
import { BaseElement } from 'src/domain/editor/BaseElement'
import { NoneEditableTwoColumnElementJSX } from 'src/domain/editor/NoneEditableTwoColumnElementJSX'
import { NormdatenService } from 'src/domain/erfassung/NormdatenService'
import {
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_MSPART,
} from 'src/domain/erfassung/TEIConstants'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

import { NormdataWithAutocomplete } from './NormdataWithAutocomplete'

interface Props extends RenderElementProps {}

const MsDescAndMsIdentifier: FC<Props> = ({ element }) => {
  const { t } = useTranslation()
  const { data_origin } = element
  const { required } = ErfassungsRegeln.regionElementRegel(
    'msPart',
    data_origin
  )

  return (
    <NormdataWithAutocomplete
      element={element}
      title={t('editor.repository')}
      origin={NormdatenService.nodeLabel.koerperschaft}
      required={required}
    />
  )
}

const MsDescMsIdentifierAndMsIdentifierRepository: FC<Props> = ({
  element,
}) => {
  const { t } = useTranslation()
  return (
    <Grid container>
      <NoneEditableTwoColumnElementJSX label={t('editor.repository')}>
        {HSPNode.extractFirstText(element)}
      </NoneEditableTwoColumnElementJSX>
    </Grid>
  )
}

const MsDescMsIdentifierAndAltIdentifierRepository: FC<Props> = ({
  element,
}) => {
  const { t } = useTranslation()
  const { region = '', data_origin } = element
  const { required } = ErfassungsRegeln.regionElementRegel(region, data_origin)

  return (
    <NormdataWithAutocomplete
      element={element}
      title={t('editor.institution')}
      origin={NormdatenService.nodeLabel.koerperschaft}
      required={required}
    />
  )
}

export const Repository: FC<Props> = memo((props) => {
  const { path = '' } = props.element
  const MS_IDENTIFIER_REPOSITORY = '-msIdentifier-repository'
  const ALT_IDENTIFIER_REPOSITORY = '-altIdentifier-repository'

  if (
    path.includes(TEI_ELEMENT_MSPART) &&
    path.includes(TEI_ELEMENT_IDENTIFICATION)
  ) {
    return <MsDescAndMsIdentifier {...props} />
  } else if (
    path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) &&
    path.includes(MS_IDENTIFIER_REPOSITORY)
  ) {
    return <MsDescMsIdentifierAndMsIdentifierRepository {...props} />
  } else if (
    path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) &&
    path.includes(ALT_IDENTIFIER_REPOSITORY)
  ) {
    return <MsDescMsIdentifierAndAltIdentifierRepository {...props} />
  } else {
    return (
      <BaseElement attributes={props.attributes}>{props.children}</BaseElement>
    )
  }
})
