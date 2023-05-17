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
import { useSelector } from 'react-redux'
import { selectReadOnly } from '../../erfassung/ErfassungsState'
import { SimpleAccordion } from '../SimpleAccordion'

export const TEI_ELEMENT_PART_FRAGMENT = 'msPartfragment'

interface BeschreibungsKomponenteFragmentProps {
  element: any
  children: Array<any>
  attributes: Array<any>
  cls: any
}

export const BeschreibungsKomponenteFragment = React.memo(({
  element,
  children,
  attributes,
  cls
}: BeschreibungsKomponenteFragmentProps) => {

  const readOnly = useSelector(selectReadOnly)

  const header = <div contentEditable={false}>
    <h3 className={element && element.istop ? cls.istop : ''}>{i18next.t('sidebar.part')}</h3>
  </div>

  const content = <span {...attributes}>{children}</span>

  return (<section id={element.id}>
        <div contentEditable={false}>
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
