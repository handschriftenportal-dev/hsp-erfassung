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

import { BaseElement } from '../../BaseElement'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectReadOnly } from '../../../erfassung/ErfassungsState'
import { NoneEditableTwoColumnElement } from '../../NoneEditableTwoColumnElement'
import i18next from 'i18next'
import { Grid } from '@material-ui/core'
import { TEI_ELEMENT_HEAD } from './BeschreibungsKomponenteKopf'
import { EditableTextfieldTwoColumnElement } from '../../EditableTextfieldTwoColumnElement'

/**
 * Author: Christoph Marten on 12.11.2021 at 10:35
 */

interface TitleProps {
  element: any,
  children: Array<any>,
  attributes: Array<any>,
}

export const Title = React.memo(({
  element,
  children,
  attributes
}: TitleProps) => {
  if (element && element.path && !element.path.includes(TEI_ELEMENT_HEAD)) {
    return <BaseElement children={children} attributes={attributes}/>
  }

  const readOnly = useSelector(selectReadOnly)

  try {
    if (readOnly) {
      return <NoneEditableTwoColumnElement title={i18next.t('editor.title')} children={children}/>
    } else {
      return (
          <span contentEditable={false}>
        <Grid contentEditable={false} container>
          <EditableTextfieldTwoColumnElement title={i18next.t('editor.title')} element={element}
                                             deleteParam={false} error={false} helpertext={''} marginTop={''}
                                             marginBottom={'12px'}/>
        </Grid>
       </span>
      )
    }
  } catch (error) {
    console.warn(error, element)
    return null
  }
})
