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

/**
 * Author: Christoph Marten on 12.11.2021 at 11:23
 */
import { GNDEntity } from '../../../infrastructure/normdaten/GNDEntity'
import React, { useCallback, useEffect, useState } from 'react'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { useFindGNDEntitiesByNode } from '../normdaten/useNormdaten'
import { Path, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { makeStyles, TextField } from '@material-ui/core'
import { DNB_INFO_GND_URL } from '../normdaten/NormdatenForm'
import { updateComponentChangedHistory } from '../../erfassung/ErfassungsState'
import { ChangedComponent, EDIT_NODE } from '../../erfassung/ChangedComponent'
import { useDispatch } from 'react-redux'
import { SIDEBAR_TEXT_LENGTH } from '../../sidebar/HSPSidebar'

const useStyles = makeStyles({
  paper: {
    backgroundColor: '#F1F1F1'
  }
})

export function useTextelementChangedForSidebarEvent(children: Array<any>) {

  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')

  function isContentChangeRelevantForSidebar(changedElement: any) {
    return changedElement !== undefined && changedElement.props.children.props.element.data_origin === 'textelement' &&
        value.substr(0, SIDEBAR_TEXT_LENGTH) !== (changedElement.props.children.props.element.children[0].text.substr(0, SIDEBAR_TEXT_LENGTH))
  }

  useEffect(() => {
    const changedElement = children.find((element: any) => {
      return element.props.value === true
    })

    if (isContentChangeRelevantForSidebar(changedElement)) {
      setTimeout(() => {
        dispatch(updateComponentChangedHistory({
          dataOrigin: changedElement.props.children.props.element.data_origin,
          method: EDIT_NODE,
          id: changedElement.props.children.key
        } as ChangedComponent))
        setValue(changedElement.props.children.props.element.children[0].text)
      }, 1)
    }

  }, [children])
}

export function useNormdatenAutocompleteComponentForGNDEntity(gndOptions: GNDEntity[], gndOptionsSetter: React.Dispatch<React.SetStateAction<GNDEntity[]>>, origin: string, termElement: any, normdatenurl: string, editor: any, autoCompleteGndEntity: GNDEntity, setAutoCompleteGndEntity: any) {

  const styleSheet = useStyles()

  const insertTextAutoComplete = useCallback((event: any, value: any) => {
    event.preventDefault()
    const termElementTextPath: Path = ReactEditor.findPath(editor as ReactEditor, termElement)
    if (value) {
      Transforms.insertText(editor, value.gndIdentifier, { at: termElementTextPath })
    }
    setAutoCompleteGndEntity(value)
  }, [])

  const findGNDEntitiesByOrigin = useCallback((event: any, setGndEntities: React.Dispatch<React.SetStateAction<GNDEntity[]>>) => {
    event.preventDefault()
    if (event.target && event.target !== '') {
      useFindGNDEntitiesByNode(normdatenurl, origin, setGndEntities, '')
    }
  }, [])

  const getOptionLabelStr = useCallback((option: GNDEntity) => {

    if (option.error !== null && option.error !== undefined && option.error !== '') {
      return option.error
    }
    if (option.preferredName && option.gndIdentifier) {
      return option.preferredName + ' ' + option.gndIdentifier
    }
    if (option.gndIdentifier) {
      return option.gndIdentifier
    }
    if (option.preferredName) {
      return option.preferredName
    }
    return ''
  }, [])

  return <Autocomplete
      options={gndOptions.sort((a, b) => -b.preferredName.localeCompare(a.preferredName))}
      classes={{ paper: styleSheet.paper }}
      value={autoCompleteGndEntity}
      getOptionSelected={() => true}
      onOpen={(event) => findGNDEntitiesByOrigin(event, gndOptionsSetter)}
      getOptionLabel={(option: GNDEntity) => (option) ? getOptionLabelStr(option) : ''}
      onChange={(event, value) => insertTextAutoComplete(event, (value) || null)}
      filterOptions={createFilterOptions({ stringify: (option: GNDEntity) => option.preferredName })}
      renderInput={(params) => <TextField {...params} variant="filled" InputProps={{
        ...params.InputProps,
        className: 'input-fields-background-color'
      }}/>}
      renderOption={(option) => (
          <React.Fragment>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div>{option.preferredName}</div>
              <div>
                <a className={'hsp-link-color'} onClick={(event) => {
                  event.stopPropagation()
                  window.open(DNB_INFO_GND_URL + option.gndIdentifier, '_blank')
                }}>{option.gndIdentifier}</a>
              </div>
            </div>
          </React.Fragment>
      )}
  />
}

export function createElementWithRandomIds(template: any) {

  const newElement = JSON.parse(JSON.stringify(template))
  newElement.id = (Math.random() * 1000000).toString()

  return newElement
}

export function getChildrenElementByDataType(childrenArray: any, dataType: string, childPosForTemplate?: number) {
  for (const element of childrenArray) {
    if (element.data_type === dataType) {
      if (childPosForTemplate === 0 || (childPosForTemplate)) {
        return JSON.parse(JSON.stringify(element.children[childPosForTemplate]))
      }
      return JSON.parse(JSON.stringify(element))
    }
  }
  return null
}

export function setRandomIdsForTemplate(templateElement: any) {
  templateElement.id = (Math.random() * 1000000).toString()
  templateElement.children.forEach((term: any) => {
    term.id = (Math.random() * 1000000).toString()
  })
}

export function getOptionStr(option: string) {

  const EMPTY_VALUE = 'empty_value'

  const str = option.toString()
  if (str === '') return EMPTY_VALUE
  return str.replace(/ /g, '_')
}
