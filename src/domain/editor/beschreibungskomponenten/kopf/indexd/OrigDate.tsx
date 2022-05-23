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

import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core'
import i18next from 'i18next'
import React, { useCallback } from 'react'
import { insertTextForChildren } from '../../../../../infrastructure/slate/SlateBoundary'
import { useInsertNewTEINodeForIndex } from '../HeadCustomHooks'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { EditableTextfieldTwoColumnElement } from '../../../EditableTextfieldTwoColumnElement'
import { AddIndexElementButton } from '../AddIndexElementButton'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../../erfassung/Erfassung'
import { useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../../erfassung/ErfassungsState'
import { ErfassungsRules } from '../../../../erfassung/ErfassungRules'
import { DeleteSlateNodeButton } from '../../../DeleteSlateNodeButton'

/**
 * Author: Christoph Marten on 28.01.2022 at 08:33
 */
interface OrigDateProps {
  element: any,
}

export const OrigDate = React.memo(({ element }: OrigDateProps) => {

  const editor = useSlateStatic()
  const termElements = element.children
  const useInsertNewOrigDateElement = useInsertNewTEINodeForIndex(element.data_indexName, editor, termElements[0])
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const repeatable = ErfassungsRules[beschreibungSubtype].erfassungsElemente['index' + element.data_indexName] ? ErfassungsRules[beschreibungSubtype].erfassungsElemente['index' + element.data_indexName].repeatable : false
  const notBeforeValue = termElements && (termElements[1]) && (termElements[1].children) && (termElements[1].children[0]) && (termElements[1].children[0].children) && (termElements[1].children[0].children[0]) ? termElements[1].children[0].children[0].text : ''
  const notAfterValue = termElements && (termElements[2]) && (termElements[2].children) && (termElements[2].children[0]) && (termElements[2].children[0].children) && (termElements[2].children[0].children[0]) ? termElements[2].children[0].children[0].text : ''
  const dateTypeValue = termElements && (termElements[3]) && (termElements[3].children) && (termElements[3].children[0]) && (termElements[3].children[0].children) && (termElements[3].children[0].children[0]) ? termElements[3].children[0].children[0].text : ''

  const handleOrigDateTypeEvent = useCallback((event: any) => {
    event.preventDefault()
    Transforms.insertText(
      editor, event.target.value,
      { at: ReactEditor.findPath(editor as ReactEditor, termElements[3]) }
    )
  }, [])

  return (
      <div id={termElements[0].id} key={termElements[0].id} contentEditable={false}>
        <Grid className={'big-top-gab'} container contentEditable={false}>

          <Grid style={{ display: 'flex' }} item xs={12}>
            <Grid item xs={10}>
              <TitleTwoColumnElement element={element} title={i18next.t('editor.origDate')} showDelete={false}
                                     margin={true} bold={true}/>
            </Grid>
            <Grid item xs={1}>
              <DeleteSlateNodeButton node={element}/>
            </Grid>
          </Grid>

          <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
            <Grid style={{ display: 'flex' }} item xs={12}>
              <EditableTextfieldTwoColumnElement marginBottom={'12px'} title={i18next.t('editor.freetext')}
                                                 paddingLeft={'24px'}
                                                 element={termElements[0]}/>
          </Grid>
          <Grid style={{ display: 'flex' }} item xs={12}>
            <Grid item contentEditable={false} xs={3}/>
            <Grid style={{ paddingRight: '2%' }} item contentEditable={false} xs={2}>
              <TextField
                  InputProps={{ className: 'input-fields-background-color' }}
                  label={i18next.t('editor.notBefore')}
                  onChange={(event) => insertTextForChildren(termElements[1], event, editor)}
                  defaultValue={notBeforeValue}
                  variant="filled"/></Grid>
            <Grid style={{ paddingRight: '2%' }} item contentEditable={false} xs={2}>
              <TextField
                  InputProps={{ className: 'input-fields-background-color' }}
                  label={i18next.t('editor.notAfter')}
                  onChange={(event) => insertTextForChildren(termElements[2], event, editor)}
                  defaultValue={notAfterValue} variant="filled"/></Grid>
          </Grid>
          <Grid container>
            <Grid item contentEditable={false} xs={3}/>
            <Grid item contentEditable={false} xs={7}>
              <FormControl style={{ display: 'flex' }} component="fieldset">
                <RadioGroup value={dateTypeValue} row
                            aria-label={i18next.t('editor.origTime')} name="orig-time-row-radio-buttons-group">
                  <FormControlLabel style={{ marginRight: '100px' }} value="datable"
                                    control={<Radio onChange={handleOrigDateTypeEvent}/>}
                                    label={i18next.t('editor.datable')}/>
                  <FormControlLabel value="dated" control={<Radio onChange={handleOrigDateTypeEvent}/>}
                                    label={i18next.t('editor.dated')}/>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {repeatable && <Grid item xs={10}>
          <AddIndexElementButton element={element} insertNewErfassungsElementNode={useInsertNewOrigDateElement}
                                 buttonLabel={i18next.t('editor.origDate')}/>
        </Grid>}
      </Grid>
    </div>
  )
})
