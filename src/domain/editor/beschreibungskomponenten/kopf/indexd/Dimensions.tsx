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

import i18next from 'i18next'
import React from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core'
import { useInsertNewTEINodeForIndex } from '../HeadCustomHooks'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { AddIndexElementButton } from '../AddIndexElementButton'
import { ErfassungsRules } from '../../../../erfassung/ErfassungRules'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../../erfassung/Erfassung'
import { useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../../erfassung/ErfassungsState'
import { DeleteSlateNodeButton } from '../../../DeleteSlateNodeButton'
import { SimpleTextField } from './SimpleTextField'

/**
 * Author: Christoph Marten on 26.01.2022 at 11:10
 */

interface DimensionsProps {
  element: any
}

export const Dimensions = React.memo(({ element }: DimensionsProps) => {
  const editor = useSlateStatic()
  const termElements = element.children
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const repeatable = ErfassungsRules[beschreibungSubtype].erfassungsElemente['index' + element.data_indexName] ? ErfassungsRules[beschreibungSubtype].erfassungsElemente['index' + element.data_indexName].repeatable : false

  const handleDimensionRadioEvent = (event: any) => {
    event.preventDefault()
    Transforms.insertText(
      editor, event.target.value,
      { at: ReactEditor.findPath(editor as ReactEditor, termElements[4]) }
    )
  }


  const useAddNewDimensionIndexElement = useInsertNewTEINodeForIndex(element.data_indexName, editor, termElements[0])

  return (
      <React.Fragment>
        <Grid className={'big-top-gab'} container contentEditable={false}>

          <Grid style={{ display: 'flex' }} item xs={12}>
            <Grid item xs={10}>
              <TitleTwoColumnElement element={element} title={i18next.t('editor.dimension')} showDelete={false}
                                     margin={true} bold={true}/>
            </Grid>
            <Grid item xs={1}>
              <DeleteSlateNodeButton node={element}/>
            </Grid>
          </Grid>
          <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
            <Grid style={{ display: 'flex' }} item xs={12}>
              <Grid className={'align-display-flex-align-items-center-with-padding-left'} item contentEditable={false}
                    xs={3}><span>{i18next.t('editor.dimensions')}:</span></Grid>
              <Grid style={{ paddingRight: '2%' }} item contentEditable={false} xs={4}>
                <SimpleTextField termElement={termElements[0]} label={i18next.t('editor.dimensions')}/>
              </Grid>
              <Grid style={{ paddingRight: '2%' }} item contentEditable={false} xs={1}>
                <SimpleTextField termElement={termElements[1]} label={i18next.t('editor.height')}/>
              </Grid>
              <Grid style={{ paddingRight: '2%' }} item contentEditable={false} xs={1}>
                <SimpleTextField termElement={termElements[2]} label={i18next.t('editor.width')}/>
              </Grid>
              <Grid item contentEditable={false} xs={1}>
                <SimpleTextField termElement={termElements[3]} label={i18next.t('editor.depth')}/>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item contentEditable={false} xs={3}/>
              <Grid item contentEditable={false} xs={6}>
                <FormControl style={{ display: 'flex' }} component="fieldset">
                  <RadioGroup
                      value={termElements[4] && termElements[4].children && termElements[4].children[0].children ? termElements[4].children[0].children[0].text : ''}
                      row
                      aria-label={i18next.t('editor.dimensions')} name="row-radio-buttons-group">
                    <FormControlLabel style={{ marginRight: '100px' }} value="factual"
                                      control={<Radio onChange={handleDimensionRadioEvent}/>}
                                      label={i18next.t('editor.factual')}/>
                    <FormControlLabel value="deduced" control={<Radio onChange={handleDimensionRadioEvent}/>}
                                      label={i18next.t('editor.deduced')}/>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          {repeatable && <Grid item xs={10}>
            <AddIndexElementButton element={element} insertNewErfassungsElementNode={useAddNewDimensionIndexElement}
                                   buttonLabel={i18next.t('editor.dimension')}/>
          </Grid>}
        </Grid>
      </React.Fragment>
  )
})
