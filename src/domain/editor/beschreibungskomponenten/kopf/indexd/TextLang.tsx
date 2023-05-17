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
import { useSlateStatic } from 'slate-react'
import { Grid } from '@material-ui/core'
import i18next from 'i18next'
import { LanguagesNormdatenVerknuepfung } from '../LanguagesNormdatenVerknuepfung'
import { EditableTextfieldTwoColumnElement } from '../../../EditableTextfieldTwoColumnElement'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { AddErfassungElementChildrenNodeButton } from '../../AddErfassungElementChildrenNodeButton'
import { useGetRuleForTerm, useInsertNewTEINodeForIndexNormData } from '../HeadCustomHooks'

/**
 * Author: Christoph Marten on 28.01.2022 at 08:50
 */
interface TextLangProps {
  element: any,
  normdatenurl: string
}

export const TextLang = React.memo(({
  element,
  normdatenurl
}: TextLangProps) => {

  const editor = useSlateStatic()

  const termElements = element.children
  const insertNewtextLangID = useInsertNewTEINodeForIndexNormData(element.data_indexName, editor, termElements[0], 'textLang-ID', 1)
  const repeatableTextLangID = useGetRuleForTerm('repeatable', element.data_indexName, 'textLang-ID')()

  return <div id={termElements[0].id} key={termElements[0].id} contentEditable={false}>
    <Grid className={'big-top-gab'} container contentEditable={false}>
      <TitleTwoColumnElement element={element} title={i18next.t('editor.textLang')} showDelete={false} margin={true} bold={true}/>

      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
        <Grid key={termElements[0].id} contentEditable={false} className={'small-bottom-gab'} container>
          <EditableTextfieldTwoColumnElement title={i18next.t('editor.freetext')} element={termElements[0]} paddingLeft={'24px'}/>
        </Grid>
        {termElements.map((termElement: any) => <LanguagesNormdatenVerknuepfung key={termElement.id}
                                                                                normdatenurl={normdatenurl}
                                                                                termElement={termElement}
                                                                                termElements={termElements}
                                                                                dataIndexName={element.data_indexName}
                                                                                editor={editor}/>)
        }
        {repeatableTextLangID && <Grid item xs={10}>
          <AddErfassungElementChildrenNodeButton insertNewErfassungElementChildrenNode={insertNewtextLangID} buttonLabel={i18next.t('editor.linked_normdata')}/>
        </Grid>}
      </Grid>
    </Grid>
  </div>
})
