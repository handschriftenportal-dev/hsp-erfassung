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

/**
 * Author: Christoph Marten on 28.01.2022 at 08:23
 */
import React from 'react'
import { Grid } from '@material-ui/core'
import i18next from 'i18next'
import { OrigPlaceNormdatenVerknuepfung } from '../OrigPlaceNormdatenVerknuepfung'
import { useSlateStatic } from 'slate-react'
import { EditableTextfieldTwoColumnElement } from '../../../EditableTextfieldTwoColumnElement'
import { useGetRuleForTerm, useInsertNewTEINodeForIndexNormData } from '../HeadCustomHooks'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { AddErfassungElementChildrenNodeButton } from '../../AddErfassungElementChildrenNodeButton'

interface OrigPlaceProps {
  element: any,
  normdatenurl: string
}

export const OrigPlace = React.memo(({
  element,
  normdatenurl
}: OrigPlaceProps) => {

  const editor = useSlateStatic()

  const termElements = element.children
  const insertNewOrigPlaceGndID = useInsertNewTEINodeForIndexNormData(element.data_indexName, editor, termElements[0], 'origPlace_gnd-ID', 1)
  const repeatableOrigPlaceGndID = useGetRuleForTerm('repeatable', element.data_indexName, 'origPlace_gnd-ID')()

  return <React.Fragment>

    <Grid className={'big-top-gab'} container contentEditable={false}>
      <TitleTwoColumnElement element={element} title={i18next.t('editor.origPlace')} showDelete={false} margin={true} bold={true}/>

      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>

        <Grid key={termElements[0].id} contentEditable={false} className={'small-bottom-gab'} container>
          <EditableTextfieldTwoColumnElement title={i18next.t('editor.freetext')} element={termElements[0]} paddingLeft={'24px'}/>
        </Grid>

        {termElements.map((termElement: any) => <OrigPlaceNormdatenVerknuepfung key={termElement.id}
                                                                                normdatenurl={normdatenurl}
                                                                                termElement={termElement}
                                                                                termElements={termElements}
                                                                                dataIndexName={element.data_indexName}
                                                                                editor={editor}/>)
        }
        {repeatableOrigPlaceGndID && <Grid item xs={10}>
          <AddErfassungElementChildrenNodeButton insertNewErfassungElementChildrenNode={insertNewOrigPlaceGndID} buttonLabel={i18next.t('editor.linked_normdata')}/>
        </Grid>}
      </Grid>
    </Grid>
  </React.Fragment>
})
