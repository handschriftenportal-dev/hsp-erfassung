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

import { Grid } from '@material-ui/core'
import i18next from 'i18next'
import React from 'react'
import { useSlateStatic } from 'slate-react'
import { EditableTextfieldTwoColumnElement } from '../../../EditableTextfieldTwoColumnElement'
import { useGetRuleForTerm, useInsertNewTEINodeForIndexNormData } from '../HeadCustomHooks'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { AddErfassungElementChildrenNodeButton } from '../../AddErfassungElementChildrenNodeButton'
import { FixedValueListAutocomplete } from '../FixedValueListAutocomplete'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../../erfassung/Erfassung'
import { useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../../erfassung/ErfassungsState'
import { ErfassungsRules } from '../../../../erfassung/ErfassungRules'
import { isNodeInComponent } from '../../../../../infrastructure/slate/SlateBoundary'
import { TEI_ELEMENT_PART_BINDING } from '../../BeschreibungsKomponenteEinband'

/**
 * Author: Christoph Marten on 26.01.2022 at 08:38
 */
interface MaterialProps {
  element: any,
}

export const Material = React.memo(({
  element,
}: MaterialProps) => {

  const editor = useSlateStatic()
  const termElements = element.children
  const insertNewMaterialTEINode = useInsertNewTEINodeForIndexNormData(element.data_indexName, editor, termElements[0], 'material_type', 1)
  const repeatableMaterialType = useGetRuleForTerm('repeatable', element.data_indexName, 'material_type')()
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  let optionsArray: string[]


  return <div id={termElements[0].id} key={termElements[0].id} contentEditable={false}>
    <Grid className={'big-top-gab'} container contentEditable={false}>
      <TitleTwoColumnElement element={element} title={i18next.t('editor.material')} showDelete={false} margin={true}
                             bold={true}/>

      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>

        <Grid key={termElements[0].id} contentEditable={false} className={'small-bottom-gab'} container>
          <EditableTextfieldTwoColumnElement title={i18next.t('editor.freetext')} element={termElements[0]}
                                             deleteParam={false} error={false} paddingLeft={'24px'}/>
        </Grid>
        {termElements.map((termElement: any) => {

          if (isNodeInComponent(editor, termElement, TEI_ELEMENT_PART_BINDING)) {
            optionsArray = ErfassungsRules[beschreibungSubtype].erfassungsElemente.msPartbinding_termmaterial_type.values
          } else {
            optionsArray = ErfassungsRules[beschreibungSubtype].erfassungsElemente.termmaterial_type.values
          }

          return <FixedValueListAutocomplete paddingLeft={'24px'} useDeleteButton={true}
                                             leftSidelabel={i18next.t('editor.material_type')}
                                             key={termElement.id}
                                             termElement={termElement}
                                             optionsArray={optionsArray}/>
        })}

        {repeatableMaterialType && <Grid item xs={10}>
          <AddErfassungElementChildrenNodeButton insertNewErfassungElementChildrenNode={insertNewMaterialTEINode}
                                                 buttonLabel={i18next.t('editor.material_type')}/>
        </Grid>}
      </Grid>
    </Grid>
  </div>
})
