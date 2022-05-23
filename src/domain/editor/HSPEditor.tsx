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
import { Editable } from 'slate-react'
import { render } from './TEIElementRenderer'
import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { selectPositionChanged, selectReadOnly, updatePosition } from '../erfassung/ErfassungsState'
import { sendDocumentSpeichernEvent, sendValidateTEIEvent } from './HSPEditorDomainEvents'
import { SelectionToolbar } from './normdaten/SelectionToolbar'

/**
 * Erfassungseditor component for manual descriptions of the Handschriftenportal based on Slate
 * This Component is the main part of the complex editor for xml based document.
 * @constructor
 */

export const HSP_EDITOR_ID = 'hspeditor'

export const useStyles = makeStyles({
  istop: {
    textDecoration: 'underline',
    textDecorationColor: '#89F9EE',
    textDecorationThickness: '0.3em',
    width: 'fit-content'
  },
  teiEnabled: {
    backgroundColor: 'white',
    color: '#0B31B9',
    fontFamily: 'Roboto',
    borderRadius: '.25em',
    padding: '.2em .6em .3em',
    textAlign: 'center',
    fontSize: '85%',
    userSelect: 'none',
    msUserSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    display: 'table',
    overflow: 'visible',
    margin: '5px',
  },
  teiDisabled: {
    userSelect: 'none',
    msUserSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    display: 'none',
    overflow: 'hidden'
  },
  xmlTag: {
    display: 'flex',
    float: 'left',
  },
  texteditor: {
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '10px'
  }
})

export function HSPEditor(props: any) {

  const styleSheet = useStyles()
  const readOnly = useSelector(selectReadOnly)
  const positionChanged = useSelector(selectPositionChanged)
  const dispatch = useDispatch()
  const normdatenurl = props.normdatenurl
  const renderElement = useCallback((props: any) => {
    return render(props, styleSheet, normdatenurl)
  }, [])

  const posChange = useCallback(() => {
    dispatch(updatePosition(!positionChanged))
  }, [])

  const onKeyDown = useCallback(
    event => {
      if (event.keyCode === 83 && event.ctrlKey) {
        event.preventDefault()
        sendDocumentSpeichernEvent()
      }
      if (event.keyCode === 86 && event.altKey) {
        console.log('Pressed Key TEI validation')
        event.preventDefault()
        sendValidateTEIEvent()
      }

    }, [])


  return (
      <>
        <SelectionToolbar normdatenurl={props.normdatenurl}/>
        <Editable id={HSP_EDITOR_ID} onKeyDown={onKeyDown} onScroll={posChange}
                  style={{ backgroundColor: readOnly ? 'transparent' : '#ffffff' }}
                  className={styleSheet.texteditor}
                  renderElement={renderElement}
                  readOnly={readOnly}>
        </Editable>
      </>
  )
}
