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

import React, { useCallback } from 'react'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { Transforms } from 'slate'
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core'
import i18next from 'i18next'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { AddIndexElementButton } from '../AddIndexElementButton'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../../erfassung/Erfassung'
import { useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../../erfassung/ErfassungsState'
import { ErfassungsRules } from '../../../../erfassung/ErfassungRules'
import { DeleteSlateNodeButton } from '../../../DeleteSlateNodeButton'
import { FixedValueListAutocomplete } from '../FixedValueListAutocomplete'
import { useInsertNewTEINodeForIndex } from '../HeadCustomHooks'

/**
 * Author: Christoph Marten on 28.01.2022 at 13:43
 */
interface FormatProps {
  element: any,
}

export const Format = React.memo(({
  element,
}: FormatProps) => {

  const editor = useSlateStatic()
  const termElements = element.children
  const useInsertNewFormatElement = useInsertNewTEINodeForIndex(element.data_indexName, editor, termElements[0])
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const repeatable = ErfassungsRules[beschreibungSubtype].erfassungsElemente['index' + element.data_indexName].repeatable

  const handleDimensionRadioEvent = useCallback((event: any) => {
    event.preventDefault()
    Transforms.insertText(
      editor, event.target.value,
      { at: ReactEditor.findPath(editor as ReactEditor, termElements[1]) }
    )
  }, [])

  return <div id={element.id} key={element.id} contentEditable={false}>
    <Grid className={'big-top-gab'} container>

      <Grid style={{ display: 'flex' }} item xs={12}>
        <Grid item xs={10}>
          <TitleTwoColumnElement element={element} title={i18next.t('editor.format')} showDelete={false} margin={true}
                                 bold={true}/>
        </Grid>
        <Grid item xs={1}>
          <DeleteSlateNodeButton node={element}/>
        </Grid>
      </Grid>

      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>

        <Grid style={{ display: 'flex' }} item xs={12}>
          <FixedValueListAutocomplete paddingLeft={'24px'} leftSidelabel={i18next.t('editor.format')}
                                      key={termElements[0].id} termElement={termElements[0]}
                                      optionsArray={ErfassungsRules[beschreibungSubtype].erfassungsElemente['term' + termElements[0].data_type].values}/>
        </Grid>
        <Grid container>
          <Grid item contentEditable={false} xs={3}/>
          <Grid item contentEditable={false} xs={7}>
            <FormControl style={{ display: 'flex' }} component="fieldset">
              <RadioGroup value={termElements[1].children[0].children[0].text} row
                          aria-label={i18next.t('editor.format')} name="row-radio-buttons-group">
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
        <AddIndexElementButton element={element} insertNewErfassungsElementNode={useInsertNewFormatElement}
                               buttonLabel={i18next.t('editor.format')}/>
      </Grid>}
    </Grid>
  </div>
})
