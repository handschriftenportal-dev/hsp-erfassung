import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { RenderElementProps } from 'slate-react'
import { BaseElement } from 'src/domain/editor/BaseElement'
import {
  HSP_ID_DATA_TYPE,
  MXML_ID_DATA_TYPE,
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_ALT_IDENTIFIER,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_MSPART,
  VORBESITZER_DATA_TYPE,
} from 'src/domain/erfassung/TEIConstants'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

import { IdnoSimpleInputField } from './IdnoSimpleInputField'
import { IdnoSimpleNotEditable } from './IdnoSimpleNotEditable'
import { IdnoSimpleWithLink } from './IdnoSimpleWithLink'
import { IdnoValidAndAlternativeSignatureAutocomplete } from './IdnoValidAndAlternativeSignatureAutocomplete'

interface Props extends RenderElementProps {}

export const Idno: FC<Props> = memo((props) => {
  const { children, attributes, element } = props
  const { t } = useTranslation()
  const KOD_URL_PATH = '/kulturObjektDokument/kulturObjektDokument.xhtml?id='
  const { path = '', data_origin, region } = element

  if (
    path.includes(TEI_ELEMENT_MSPART) &&
    path.includes(TEI_ELEMENT_IDENTIFICATION)
  ) {
    const { required, empty } = ErfassungsRegeln.regionRegel(data_origin)

    return (
      <IdnoSimpleInputField
        props={props}
        title={t('editor.idno')}
        required={required}
        helpertext={t('editor.idno_not_empty')}
        empty={empty}
      />
    )
  }

  if (path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION)) {
    const { required, empty } = ErfassungsRegeln.regionElementRegel(
      region ?? '',
      data_origin
    )

    switch (region) {
      case TEI_ELEMENT_IDENTIFICATION:
        return <IdnoValidAndAlternativeSignatureAutocomplete {...props} />
      case TEI_ELEMENT_ALT_IDENTIFIER + SAMMLUNG_DATA_TYPE:
        return (
          <IdnoSimpleInputField
            props={props}
            title={t('editor.identifier')}
            empty
            required={required}
          />
        )
      case TEI_ELEMENT_ALT_IDENTIFIER + VORBESITZER_DATA_TYPE:
        return (
          <IdnoSimpleInputField
            props={props}
            title={t('editor.idno')}
            required={required}
            helpertext={t('editor.idno_not_empty')}
            empty={empty}
          />
        )
      case TEI_ELEMENT_ALT_IDENTIFIER + HSP_ID_DATA_TYPE:
        return (
          <IdnoSimpleWithLink
            props={props}
            title={t('editor.hsp_id')}
            link={KOD_URL_PATH + HSPNode.extractFirstText(element)}
          />
        )
      case TEI_ELEMENT_ALT_IDENTIFIER + MXML_ID_DATA_TYPE:
        return (
          <IdnoSimpleNotEditable props={props} title={t('editor.manu_id')} />
        )
    }
  }

  return <BaseElement attributes={attributes}>{children}</BaseElement>
})
