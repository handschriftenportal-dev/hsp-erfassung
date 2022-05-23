/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import i18next from 'i18next'
import { FixedValueListAutocomplete } from '../FixedValueListAutocomplete'
import { ErfassungsRules } from '../../../../erfassung/ErfassungRules'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../../erfassung/Erfassung'
import { useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../../erfassung/ErfassungsState'
import { isNodeInComponent } from '../../../../../infrastructure/slate/SlateBoundary'
import { TEI_ELEMENT_PART_FRAGMENT } from '../../BeschreibungsKomponenteFragment'
import { TEI_ELEMENT_PART_BOOKLET } from '../../BeschreibungsKomponenteFaszikel'
import { TEI_ELEMENT_PART_BINDING } from '../../BeschreibungsKomponenteEinband'
import { TEI_ELEMENT_PART_ACCMAT } from '../../BeschreibungsKomponenteBeigabe'
import { useSlateStatic } from 'slate-react'

/**
 * Author: Christoph Marten on 28.01.2022 at 08:59
 */
interface FormProps {
  element: any,
}

export const Form = React.memo(({ element }: FormProps) => {

  const termElements = element.children
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const optionsArrayFormFilter: string [] = ['binding', 'booklet', 'loose insert']
  const msPartTypeList: string[] = [TEI_ELEMENT_PART_FRAGMENT, TEI_ELEMENT_PART_BOOKLET, TEI_ELEMENT_PART_BINDING, TEI_ELEMENT_PART_ACCMAT]
  const editor = useSlateStatic()
  const [useDeleteButton, setUseDeleteButton] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)

  useEffect(() => {
    msPartTypeList.forEach((value: string) => {
      if (isNodeInComponent(editor, termElements[0], value)) {
        setUseDeleteButton(false)
        setDisabled(true)
      }
    })
  })

  return <div id={termElements[0].id} key={termElements[0].id} contentEditable={false}>
    <Grid className={'big-top-gab'} container contentEditable={false}>
      <FixedValueListAutocomplete leftSidelabel={i18next.t('editor.form')} key={termElements[0].id}
                                  termElement={termElements[0]}
                                  useDeleteButton={useDeleteButton}
                                  disabled={disabled}
                                  optionsArray={ErfassungsRules[beschreibungSubtype].erfassungsElemente['term' + termElements[0].data_type].values.filter((o: string) => {
                                    return !optionsArrayFormFilter.includes(o)
                                  })}/>
    </Grid>
  </div>
})
