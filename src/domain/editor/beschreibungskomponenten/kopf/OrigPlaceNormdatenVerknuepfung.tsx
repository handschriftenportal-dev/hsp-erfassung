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

import React from 'react'
import { GNDEntity } from '../../../../infrastructure/normdaten/GNDEntity'
import { Grid } from '@material-ui/core'
import { useNormdatenAutocompleteComponentForGNDEntity } from '../BeschreibungsKomponentenCustomHooks'
import { useNormdatenFindById } from '../../normdaten/useNormdaten'
import i18next from 'i18next'
import { DeleteSlateNodeButton } from '../../DeleteSlateNodeButton'

/**
 * Author: Christoph Marten on 12.11.2021 at 11:44
 */
export function OrigPlaceNormdatenVerknuepfung(props: any) {
  const [places, setPlaces] = React.useState<GNDEntity[]>([])

  if (props.termElement.data_type === 'origPlace_gnd-ID') {

    const [autoCompleteGndEntity, setAutoCompleteGndEntity] = React.useState<GNDEntity>({
      preferredName: '',
      gndIdentifier: props.termElement && props.termElement.children && props.termElement.children[0].children ? props.termElement.children[0].children[0].text : '',
      variantName: [],
      error: '',
      id: ''
    })

    if (props.termElement && props.termElement.children && props.termElement.children[0].children) {
      useNormdatenFindById(props.normdatenurl, props.termElement.children[0].children[0].text, setAutoCompleteGndEntity)
    }

    return <Grid className={'small-bottom-gab'} container contentEditable={false}>
      <Grid contentEditable={false} item xs={3} style={{ display: 'table', paddingLeft: '24px' }}>
        <span className={'align-display-table-cell-vertical-align'}>{i18next.t('editor.linked_normdata')}: </span>
      </Grid>
      <Grid item xs={7}>
        {
          useNormdatenAutocompleteComponentForGNDEntity(places, setPlaces, 'placeName', props.termElement, props.normdatenurl, props.editor, autoCompleteGndEntity, setAutoCompleteGndEntity)
        }
      </Grid>
      <DeleteSlateNodeButton node={props.termElement}/>
    </Grid>
  }
  return null
}
