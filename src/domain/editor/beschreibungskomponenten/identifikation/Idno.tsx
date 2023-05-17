/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React from 'react'
import {
  HSP_ID_DATA_TYPE,
  MXML_ID_DATA_TYPE,
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_ALT_IDENTIFIER,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_MSPART_IDENTIFICATION,
  VORBESITZER_DATA_TYPE
} from './BeschreibungsKomponenteIdentifikation'
import { BaseElement } from '../../BaseElement'
import i18next from 'i18next'
import { useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../erfassung/ErfassungsState'
import { ErfassungsRules } from '../../../erfassung/ErfassungRules'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../erfassung/Erfassung'
import { IdnoValidAndAlternativeSignatureAutocomplete } from './IdnoValidAndAlternativeSignatureAutocomplete'
import { IndoSimpleInputField } from './IndoSimpleInputField'
import { IndoSimpleWithLink } from './IndoSimpleWithLink'
import { IndoSimpleNotEditable } from './IndoSimpleNotEditable'

/**
 * Author: Christoph Marten on 28.12.2021 at 08:11
 */
export const Idno = React.memo((props: any) => {

  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const KOD_URL_PATH = '/kulturObjektDokument/kulturObjektDokument.xhtml?id='

  if (props.element && props.element.path && props.element.path.includes(TEI_ELEMENT_MSPART_IDENTIFICATION)) {
    const required = ErfassungsRules[beschreibungSubtype].erfassungsElemente[props.element.data_origin].required
    const empty = ErfassungsRules[beschreibungSubtype].erfassungsElemente[props.element.data_origin].empty

    return <IndoSimpleInputField props={props} title={i18next.t('editor.idno')} required={required}
                                 helpertext={i18next.t('editor.idno_not_empty')}
                                 empty={empty}></IndoSimpleInputField>

  }

  if (props.element && props.element.path && props.element.path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION)) {

    if (props.element.region === TEI_ELEMENT_IDENTIFICATION) {
      return <IdnoValidAndAlternativeSignatureAutocomplete {...props}/>
    }

    if (props.element.region === TEI_ELEMENT_ALT_IDENTIFIER + SAMMLUNG_DATA_TYPE) {
      const required = ErfassungsRules[beschreibungSubtype].erfassungsElemente[props.element.region][props.element.data_origin].required
      return <IndoSimpleInputField props={props} title={i18next.t('editor.identifier')} empty={true}
                                   required={required}></IndoSimpleInputField>
    }
    if (props.element.region === TEI_ELEMENT_ALT_IDENTIFIER + VORBESITZER_DATA_TYPE) {

      const required = ErfassungsRules[beschreibungSubtype].erfassungsElemente[props.element.region][props.element.data_origin].required
      const empty = ErfassungsRules[beschreibungSubtype].erfassungsElemente[props.element.region][props.element.data_origin].empty

      return <IndoSimpleInputField props={props} title={i18next.t('editor.idno')} required={required}
                                   helpertext={i18next.t('editor.idno_not_empty')}
                                   empty={empty}></IndoSimpleInputField>

    }

    if (props.element.region === TEI_ELEMENT_ALT_IDENTIFIER + HSP_ID_DATA_TYPE) {
      return <IndoSimpleWithLink props={props} title={i18next.t('editor.hsp_id')}
                                 link={KOD_URL_PATH + props.element.children[0].children[0].text}></IndoSimpleWithLink>
    }

    if (props.element.region === TEI_ELEMENT_ALT_IDENTIFIER + MXML_ID_DATA_TYPE) {

      return <IndoSimpleNotEditable props={props} title={i18next.t('editor.manu_id')}
                                    style={{}}></IndoSimpleNotEditable>
    }

    if (props.element.region.includes(TEI_ELEMENT_ALT_IDENTIFIER) && !(TEI_ELEMENT_ALT_IDENTIFIER + MXML_ID_DATA_TYPE)) {

      return <IndoSimpleNotEditable props={props} title={props.element.region.slice(13)} style={{
        marginTop: '40px'
      }}></IndoSimpleNotEditable>
    }
  }

  return <BaseElement children={props.children} attributes={props.attributes}/>
})
