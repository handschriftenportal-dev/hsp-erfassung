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

import React, { useCallback } from 'react'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { GNDEntity } from '../../infrastructure/normdaten/GNDEntity'
import { useFindGNDEntitiesByNode, useNormdatenFindById } from './normdaten/useNormdaten'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { DeleteSlateNodeButton } from './DeleteSlateNodeButton'
import { deleteSlate, insertSlateNodes } from '../../infrastructure/slate/SlateBoundary'
import { Grid, makeStyles, TextField } from '@material-ui/core'
import i18next from 'i18next'
import { Path } from 'slate'
import { FullScreenPopper } from '../erfassung/FullScreenPopper'
import { useDispatch } from 'react-redux'
import { DNB_INFO_GND_URL } from './normdaten/NormdatenForm'

/**
 * Author: Christoph Marten on 12.11.2021 at 11:44
 */

const useStyles = makeStyles({
  paper: {
    backgroundColor: '#F1F1F1'
  }
})

export function AutocompleteNormdatenFromDataKey(props: any) {
  const [gndEntities, setGndEntities] = React.useState<GNDEntity[]>([])
  const editor = useSlateStatic()
  const styleSheet = useStyles()
  const dispatch = useDispatch()

  const [autoCompleteGndEntity, setAutoCompleteGndEntity] = React.useState<GNDEntity>({
    preferredName: '',
    gndIdentifier: '',
    variantName: [],
    id: props.element && props.element.children ? props.element.data_key : '',
    error: ''
  })

  if (props.element.children) {
    useNormdatenFindById(props.normdatenurl, props.element.data_key, setAutoCompleteGndEntity)
  }

  const findGNDEntitiesByOrigin = useCallback((event: any, setGndEntities: React.Dispatch<React.SetStateAction<GNDEntity[]>>,
    url: string, origin: string) => {
    if (autoCompleteGndEntity !== null && autoCompleteGndEntity.preferredName !== '') {
      setGndEntities([autoCompleteGndEntity])
    } else {
      useFindGNDEntitiesByNode(url, origin, setGndEntities, '')
    }
  }, [autoCompleteGndEntity])

  function getOptionLabelStr(option: GNDEntity) {

    if (option.error !== null && option.error !== undefined && option.error !== '') {
      return option.error
    }
    if (option.preferredName) {
      return option.preferredName
    }
    return ''
  }

  function createAdjustedElement(dataKey: string, prefferedName: string, dataRef: string) {

    const newElement = JSON.parse(JSON.stringify(props.element))
    newElement.data_key = dataKey
    if (dataRef) {
      newElement.data_ref = DNB_INFO_GND_URL + dataRef
    }
    newElement.children[0].children[0].text = prefferedName

    return newElement
  }

  function insertTextAutoComplete(event: any, value: any) {
    const elementPath: Path = ReactEditor.findPath(editor as ReactEditor, props.element)
    useFindGNDEntitiesByNode(props.normdatenurl, props.origin, setGndEntities, '')
    if (value) {
      const adjustedElement = createAdjustedElement(value.id, value.preferredName, value.gndIdentifier)
      deleteSlate(editor, elementPath, adjustedElement.id, adjustedElement.data_origin, dispatch)
      insertSlateNodes(editor, adjustedElement, elementPath, dispatch)
    }

    setAutoCompleteGndEntity(value)
  }

  return <Grid container contentEditable={false}>
    <Grid contentEditable={false} item xs={3} style={{ display: 'table', paddingLeft: '24px' }}>
      <span className={'align-display-table-cell-vertical-align'}>{props.title}: </span>
    </Grid>
    <Grid item xs={7}>
      {
        <Autocomplete
            PopperComponent={FullScreenPopper}
            options={gndEntities}
            classes={{ paper: styleSheet.paper }}
            value={autoCompleteGndEntity}
            getOptionSelected={() => true}
            onOpen={(event) => findGNDEntitiesByOrigin(event, setGndEntities, props.normdatenurl, props.origin)}
            disablePortal={true}
            getOptionLabel={(option: GNDEntity) => (option) ? getOptionLabelStr(option) : ''}
            onChange={(event, value) => insertTextAutoComplete(event, (value) || null)}
            filterOptions={createFilterOptions({
              ignoreCase: true,
              trim: true,
              stringify: (option: GNDEntity) => option.preferredName
            })}
            renderInput={(params) => <TextField {...params} variant="filled" InputProps={{
              ...params.InputProps,
              className: 'input-fields-background-color'
            }}
                                                label={i18next.t('normdatenDialog.normdaten_verknüfpung')}/>}/>
      }
    </Grid>
    {!props.required &&
      <DeleteSlateNodeButton node={props.element}/>
    }
  </Grid>
}
