/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RenderElementProps } from 'slate-react'

import { ErfassungsRules } from '../../../../infrastructure/slate/ErfassungsRules'
import { extractFirstText } from '../../../../infrastructure/slate/SlateBoundary'
import { selectBeschreibungsSubtype } from '../../../erfassung/ErfassungsState'
import {
  HSP_ID_DATA_TYPE,
  MXML_ID_DATA_TYPE,
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_ALT_IDENTIFIER,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_MSPART,
  VORBESITZER_DATA_TYPE,
} from '../../../erfassung/TEIConstants'
import { BaseElement } from '../../BaseElement'
import { IdnoSimpleInputField } from './IdnoSimpleInputField'
import { IdnoSimpleNotEditable } from './IdnoSimpleNotEditable'
import { IdnoSimpleWithLink } from './IdnoSimpleWithLink'
import { IdnoValidAndAlternativeSignatureAutocomplete } from './IdnoValidAndAlternativeSignatureAutocomplete'

interface Props extends RenderElementProps {}

export const Idno: FC<Props> = memo((props) => {
  const { children, attributes, element } = props
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  const { t } = useTranslation()
  const KOD_URL_PATH = '/kulturObjektDokument/kulturObjektDokument.xhtml?id='
  const { path = '', data_origin, region } = element as any

  if (
    path.includes(TEI_ELEMENT_MSPART) &&
    path.includes(TEI_ELEMENT_IDENTIFICATION)
  ) {
    const { required, empty } =
      ErfassungsRules[beschreibungSubtype].erfassungsElemente[data_origin]

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
    const { required, empty } =
      ErfassungsRules[beschreibungSubtype].erfassungsElemente?.[region]?.[
        data_origin
      ] || {}

    switch (region) {
      case TEI_ELEMENT_IDENTIFICATION:
        return <IdnoValidAndAlternativeSignatureAutocomplete {...props} />
      case TEI_ELEMENT_ALT_IDENTIFIER + SAMMLUNG_DATA_TYPE:
        return (
          <IdnoSimpleInputField
            props={props}
            title={t('editor.identifier')}
            empty={true}
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
            link={KOD_URL_PATH + extractFirstText(element)}
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
