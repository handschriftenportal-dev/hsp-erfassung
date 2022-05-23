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

import { useSelector } from 'react-redux'
import { selectReadOnly } from '../../../../erfassung/ErfassungsState'
import { BaseElement } from '../../../BaseElement'
import i18next from 'i18next'
import { erfassungNormdatenTEIElement } from '../../../../erfassung/ErfassungTermType'
import { NoneEditableTwoColumnElement } from '../../../NoneEditableTwoColumnElement'
import { TEI_ELEMENT_HEAD } from '../BeschreibungsKomponenteKopf'
import { Measure } from './Measure'
import { Material } from './Material'
import { TitleIndex } from './TitleIndex'
import { Dimensions } from './Dimensions'
import { OrigPlace } from './OrigPlace'
import { OrigDate } from './OrigDate'
import { TextLang } from './TextLang'
import { Form } from './Form'
import { Status } from './Status'
import { Decoration } from './Decoration'
import { MusicNotation } from './MusicNotation'
import { Format } from './Format'
import React from 'react'
import { getOptionStr } from '../../BeschreibungsKomponentenCustomHooks'

interface IndexProps {
  element: any,
  normdatenurl: string
  children: Array<any>,
  attributes: Array<any>
}

/**
 * Author: Christoph Marten on 12.11.2021 at 10:54
 */
export const Index = React.memo(({
  element,
  normdatenurl,
  children,
  attributes
}: IndexProps) => {
  const readOnly = useSelector(selectReadOnly)
  const termElements = element.children

  if (element && element.path && !element.path.includes(TEI_ELEMENT_HEAD)) {
    return <BaseElement children={children} attributes={attributes}/>
  }

  function termReadOnly(termElement: any) {

    if (termElement.data_type === 'decoration' || termElement.data_type === 'musicNotation') {
      const content = termElement.children[0].children[0].text
      let childrenValue: any

      if (content === 'not specified') {
        childrenValue = i18next.t('editor.not_specified')
      }
      if (content === 'yes') {
        childrenValue = i18next.t('editor.yes')
      }
      if (content === 'no') {
        childrenValue = i18next.t('editor.no')
      }
      const i18TextSuffix = (termElement.data_type === 'decoration') ? 'decoration' : 'musicNotation'

      return (<NoneEditableTwoColumnElement title={i18next.t('editor.' + i18TextSuffix)}
                                            children={childrenValue}/>)
    }

    for (const termType of erfassungNormdatenTEIElement.Types) {

      let childrenText = termElement && termElement.children && termElement.children[0].children ? termElement.children[0].children[0].text : ''

      if (termType === 'format' || termType === 'form' || termType === 'status')
      {
        childrenText = i18next.t(termElement.data_type + '.' + getOptionStr(childrenText))
      }

      if (termElement.data_type === termType) {
        return (<NoneEditableTwoColumnElement
          title={i18next.t('editor.' + (termType !== 'title' ? termType : 'norm' + termType))}
          children={childrenText}/>)
      }
    }
    return null
  }

  try {
    if (readOnly) { return termReadOnly(termElements[0]) }
    else {
      if (termElements[0].data_type === 'measure') {
        return <Measure element={element}/>
      }
      if (termElements[0].data_type === 'format') {
        return <Format element={element}/>
      }
      if (termElements[0].data_type === 'origPlace') {
        return <OrigPlace element={element} normdatenurl={normdatenurl}/>
      }
      if (termElements[0].data_type === 'origDate') {
        return <OrigDate element={element}/>
      }
      if (termElements[0].data_type === 'textLang') {
        return <TextLang element={element} normdatenurl={normdatenurl}/>
      }
      if (termElements[0].data_type === 'form') {
        return <Form element={element}/>
      }
      if (termElements[0].data_type === 'status') {
        return <Status element={element}/>
      }
      if (termElements[0].data_type === 'decoration') {
        return <Decoration element={element}/>
      }
      if (termElements[0].data_type === 'musicNotation') {
        return <MusicNotation element={element}/>
      }
      if (termElements[0].data_type === 'dimensions') {
        return <Dimensions element={element}/>
      }
      if (termElements[0].data_type === 'material') {
        return <Material element={element}/>
      }
      if (termElements[0].data_type === 'title') {
        return <TitleIndex element={element}/>
      }
    }
  } catch (error) {
    console.warn(error, termElements)
    return null
  }
  return null
})
