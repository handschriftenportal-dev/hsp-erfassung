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

import { Grid } from '@mui/material'
import { attempt, isError } from 'lodash'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RenderElementProps } from 'slate-react'

import { ErfassungsRules } from '../../../../infrastructure/slate/ErfassungsRules'
import { extractFirstText } from '../../../../infrastructure/slate/SlateBoundary'
import { selectBeschreibungsSubtype } from '../../../erfassung/ErfassungsState'
import {
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_MSPART,
} from '../../../erfassung/TEIConstants'
import { BaseElement } from '../../BaseElement'
import { NoneEditableTwoColumnElementJSX } from '../../NoneEditableTwoColumnElementJSX'
import { NormdataWithAutocomplete } from './NormdataWithAutocomplete'

interface Props extends RenderElementProps {}

const MsPartAndMsIdentifier: FC<Props> = ({ element }) => {
  const beschreibungsSubtype = useSelector(selectBeschreibungsSubtype)
  const { t } = useTranslation()
  const { data_origin } = element
  const required = attempt(
    () =>
      ErfassungsRules[beschreibungsSubtype].erfassungsElemente.msPart[
        data_origin
      ].required
  )

  if (isError(required)) {
    throw new Error(
      `Unknown ErfassungsRule: ErfassungsRules[${beschreibungsSubtype}].erfassungsElemente.msPart[${data_origin}].required`,
      { cause: required }
    )
  }

  return (
    <NormdataWithAutocomplete
      element={element}
      title={t('editor.settlement')}
      origin={'placeName'}
      required={required}
    />
  )
}

const MsDescMsIdentifierAndMSIdentifierSettlement: FC<Props> = ({
  element,
  attributes,
}) => {
  const { t } = useTranslation()
  return (
    <Grid container {...attributes}>
      <NoneEditableTwoColumnElementJSX label={t('editor.settlement')}>
        {extractFirstText(element)}
      </NoneEditableTwoColumnElementJSX>
    </Grid>
  )
}

const MsDescMsIdentifierAndAltIdentifierSettlement: FC<Props> = ({
  element,
}) => {
  const { t } = useTranslation()
  const beschreibungsSubtype = useSelector(selectBeschreibungsSubtype)
  const { region, data_origin } = element as any
  const required = attempt(
    () =>
      ErfassungsRules[beschreibungsSubtype].erfassungsElemente[region][
        data_origin
      ].required
  )

  if (isError(required)) {
    throw new Error(
      `Unknown ErfassungsRule: ErfassungsRules[${beschreibungsSubtype}].erfassungsElemente[${region}][${data_origin}].required`,
      { cause: required }
    )
  }

  return (
    <NormdataWithAutocomplete
      element={element}
      title={t('editor.place')}
      origin={'placeName'}
      required={required}
    />
  )
}

const selectSettlementComponent = (path: string): FC<Props> => {
  const MS_IDENTIFIER_SETTLEMENT = 'msIdentifier-settlement'
  const ALT_IDENTIFIER_SETTLEMENT = 'altIdentifier-settlement'
  if (
    path.includes(TEI_ELEMENT_MSPART) &&
    path.includes(TEI_ELEMENT_IDENTIFICATION)
  ) {
    return MsPartAndMsIdentifier
  } else if (
    path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) &&
    path.includes(MS_IDENTIFIER_SETTLEMENT)
  ) {
    return MsDescMsIdentifierAndMSIdentifierSettlement
  } else if (
    path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) &&
    path.includes(ALT_IDENTIFIER_SETTLEMENT)
  ) {
    return MsDescMsIdentifierAndAltIdentifierSettlement
  } else {
    return BaseElement
  }
}

export const Settlement: FC<Props> = memo(
  ({ element, attributes, children }) => {
    const { path } = element as any
    const SettlementComponent = selectSettlementComponent(path)

    return (
      <SettlementComponent attributes={attributes} element={element}>
        {children}
      </SettlementComponent>
    )
  }
)
