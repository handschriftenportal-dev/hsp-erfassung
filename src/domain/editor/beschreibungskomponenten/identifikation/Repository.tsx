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

import {
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_MSPART_IDENTIFICATION
} from './BeschreibungsKomponenteIdentifikation'
import { BaseElement } from '../../BaseElement'
import { useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../erfassung/ErfassungsState'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../erfassung/Erfassung'
import { ErfassungsRules } from '../../../erfassung/ErfassungRules'
import { Grid } from '@material-ui/core'
import { NoneEditableTwoColumnElementJSX } from '../../NoneEditableTwoColumnElementJSX'
import i18next from 'i18next'
import React from 'react'
import { NormdataWithAutocomplete } from './NormdataWithAutocomplete'
import { tryToGetContent } from '../../../erfassung/ErfassungsGuidline'

/**
 * Author: Christoph Marten on 04.01.2022 at 14:14
 */
export const Repository = React.memo((props: any) => {

  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE

  if (props.element && props.element.path && props.element.path.includes(TEI_ELEMENT_MSPART_IDENTIFICATION)) {
    const required = ErfassungsRules[beschreibungSubtype].erfassungsElemente['mspart_' + props.element.data_origin].required

    return <NormdataWithAutocomplete props={props} title={i18next.t('editor.repository')}
                                     origin={'orgName'} required={required}></NormdataWithAutocomplete>
  }

  if (props.element && props.element.path && props.element.path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION)) {

    const MS_IDENTIFIER_REPOSITORY = '-msIdentifier-repository'
    const ALT_IDENTIFIER_REPOSITORY = '-altIdentifier-repository'

    if (props.element.path.includes(MS_IDENTIFIER_REPOSITORY)) {
      return <Grid container contentEditable={false}>
        <NoneEditableTwoColumnElementJSX title={i18next.t('editor.repository')} children={tryToGetContent(props)}/>
      </Grid>
    }

    if (props.element.path.includes(ALT_IDENTIFIER_REPOSITORY)) {

      const required = ErfassungsRules[beschreibungSubtype].erfassungsElemente[props.element.region][props.element.data_origin].required

      return <NormdataWithAutocomplete props={props} title={i18next.t('editor.institution')}
                                       origin={'orgName'} required={required}></NormdataWithAutocomplete>
    }
  }

  return <BaseElement children={props.children} attributes={props.attributes}/>
})
