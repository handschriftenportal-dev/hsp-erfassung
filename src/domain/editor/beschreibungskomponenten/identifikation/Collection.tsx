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

import { TEI_ELEMENT_MSDESC_IDENTIFICATION } from './BeschreibungsKomponenteIdentifikation'
import { BaseElement } from '../../BaseElement'
import { useDispatch, useSelector } from 'react-redux'
import { selectBeschreibung, selectReadOnly, updateSaveAllowed } from '../../../erfassung/ErfassungsState'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../erfassung/Erfassung'
import { ErfassungsRules } from '../../../erfassung/ErfassungRules'
import { Grid } from '@material-ui/core'
import { NoneEditableTwoColumnElementJSX } from '../../NoneEditableTwoColumnElementJSX'
import i18next from 'i18next'
import React, { useCallback, useEffect } from 'react'
import { EditableTextfieldTwoColumnElement } from '../../EditableTextfieldTwoColumnElement'

/**
 * Author: Christoph Marten on 04.01.2022 at 14:21
 */
export const Collection = React.memo((props: any) => {

  if (props.element && props.element.path && !props.element.path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION)) {
    return <BaseElement children={props.children} attributes={props.attributes}/>
  }
  const ALT_IDENTIFIER = 'altIdentifiercorpus'
  const dispatch = useDispatch()

  const readOnly = useSelector(selectReadOnly)

  const initErrorValue = useCallback(() => {
    try {
      return props.element.children[0].children[0].text === ''
    } catch (catchedError) {
      return false
    }
  }, [props.element])

  if (props.element.region === ALT_IDENTIFIER) {
    const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
    const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
    const emptyCorpusName = ErfassungsRules[beschreibungSubtype].erfassungsElemente[props.element.region][props.element.data_origin].empty
    const requiredCorpusName = ErfassungsRules[beschreibungSubtype].erfassungsElemente[props.element.region][props.element.data_origin].required
    const error = initErrorValue()

    useEffect(() => {
      if (error) {
        dispatch(updateSaveAllowed(false))
      } else {
        dispatch(updateSaveAllowed(true))
      }
    }, [error])

    return <Grid className={'small-bottom-gab'} container contentEditable={false}>
          {!readOnly
            ? <>
                <EditableTextfieldTwoColumnElement helpertext={i18next.t('editor.corpus_name_not_empty')}
                                                   error={error && !emptyCorpusName}
                                                   title={i18next.t('editor.corpus_name')} element={props.element}
                                                   marginTop={''} deleteParam={!requiredCorpusName} paddingLeft={'24px'}/>
              </>
            : <>
                <NoneEditableTwoColumnElementJSX title={i18next.t('editor.corpus_name')}
                                                 children={props.element.children[0].children[0].text}/>
              </>
          }
        </Grid>
  }

  return null
}
)
