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
import { Grid } from '@material-ui/core'
import i18next from 'i18next'
import { FixedValueListAutocomplete } from '../FixedValueListAutocomplete'
import { ErfassungsRules } from '../../../../erfassung/ErfassungRules'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../../erfassung/Erfassung'
import { useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../../erfassung/ErfassungsState'

/**
 * Author: Christoph Marten on 28.01.2022 at 08:59
 */
interface StatusProps {
  element: any,
}

export const Status = React.memo(({
  element,
}: StatusProps) => {
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const termElements = element.children

  return <div id={termElements[0].id} key={termElements[0].id} contentEditable={false}>
    <Grid className={'big-top-gab'} container contentEditable={false}>
      <FixedValueListAutocomplete leftSidelabel={i18next.t('editor.status')} key={termElements[0].id}
                                  termElement={termElements[0]}
                                  optionsArray={ErfassungsRules[beschreibungSubtype].erfassungsElemente['term' + termElements[0].data_type].values}/>
    </Grid>
  </div>
})
