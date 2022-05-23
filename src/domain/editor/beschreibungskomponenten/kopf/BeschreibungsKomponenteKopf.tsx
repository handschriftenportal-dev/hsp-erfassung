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

import i18next from 'i18next'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectReadOnly } from '../../../erfassung/ErfassungsState'
import { SimpleAccordion } from '../../SimpleAccordion'

export const TEI_ELEMENT_HEAD = 'head'
export const TEI_ELEMENT_TITLE = 'title'
export const TEI_ELEMENT_NOTE = 'note'
export const TEI_ELEMENT_INDEX = 'index'

interface BeschreibungsKomponenteKopfProps {
  element: any
  children: Array<any>
  attributes: Array<any>
  cls: any
}

export const BeschreibungsKomponenteKopf = React.memo(({
  element,
  children,
  attributes,
  cls
}: BeschreibungsKomponenteKopfProps) => {

  const readOnly = useSelector(selectReadOnly)

  const header = <div className={element && element.istop ? cls.istop : ''} contentEditable={false}>
    <h3>{i18next.t('sidebar.head')}</h3></div>

  const content = <span style={{ userSelect: 'none' }} contentEditable={false} {...attributes}>{children}</span>

  return (<section id={element.id}>
      <div style={{ userSelect: 'none' }} contentEditable={false}>
        <hr/>
      </div>
      {!readOnly
        ? <>
          <SimpleAccordion node={element} summaryContent={header} detailsContent={content}/>
        </>
        : <>
          {header}
          {content}
        </>}
    </section>
  )
})
