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

import { Grid } from '@material-ui/core'
import i18next from 'i18next'
import React from 'react'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { EditableTextfieldTwoColumnElement } from '../../../EditableTextfieldTwoColumnElement'

/**
 * Author: Christoph Marten on 26.01.2022 at 07:33
 */
interface MeasureProps {
  element: any,
}

export const Measure = React.memo(({ element }: MeasureProps) => {

  const termElements = element.children

  return <React.Fragment>
    <Grid className={'big-top-gab'} container contentEditable={false}>
      <TitleTwoColumnElement element={element} title={i18next.t('editor.measure')} showDelete={false} margin={true} bold={true}/>

      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>

        <Grid key={termElements[0].id} contentEditable={false} className={'small-bottom-gab'} container>
          <EditableTextfieldTwoColumnElement title={i18next.t('editor.freetext')} element={termElements[0]}
                                             deleteParam={false} error={false} paddingLeft={'24px'}/>
        </Grid>
        <Grid key={termElements[1].id} contentEditable={false} className={'small-bottom-gab'} container>
          <EditableTextfieldTwoColumnElement title={i18next.t('editor.sheet_count')} element={termElements[1]}
                                             deleteParam={false} error={false} paddingLeft={'24px'}/>
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment>
})
