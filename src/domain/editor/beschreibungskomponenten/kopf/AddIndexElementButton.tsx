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
 * Author: Christoph Marten on 04.03.2022 at 08:03
 */
import React, { useCallback, useEffect } from 'react'
import { Button, Grid } from '@material-ui/core'
import { getParentNodeSlate } from '../../../../infrastructure/slate/SlateBoundary'
import { useSlateStatic } from 'slate-react'
import { useSelector } from 'react-redux'
import { selectComponentChangedHistory } from '../../../erfassung/ErfassungsState'

interface AddErfassungsElementButtonProps{
  insertNewErfassungsElementNode:any,
  buttonLabel:string,
  element:any
}

export const AddIndexElementButton = React.memo(({ insertNewErfassungsElementNode, buttonLabel, element }: AddErfassungsElementButtonProps) => {

  const [showAddButton, setShowAddButton] = React.useState(false)
  const editor = useSlateStatic()
  const componentChangedHistory = useSelector(selectComponentChangedHistory)

  const showAddButtonForIndexName = useCallback(() => {
    const parentNodeSlate: any = getParentNodeSlate(editor, element)
    if (parentNodeSlate === null) return false
    const indexNameChilds = parentNodeSlate.children.filter((child: any) => child.data_origin === 'index').filter((indexChild: any) => indexChild.data_indexName === element.data_indexName)
    return (indexNameChilds[indexNameChilds.length - 1].id === element.id)
  }, [editor, element])

  useEffect(() => {
    if (showAddButtonForIndexName() !== showAddButton) {
      setShowAddButton(showAddButtonForIndexName)
    }
  }, [showAddButton, componentChangedHistory, showAddButtonForIndexName])

  const handleOnClick = useCallback(() => {
    setShowAddButton(false)
    insertNewErfassungsElementNode()
  }, [insertNewErfassungsElementNode])

  return <>
    {showAddButton && <Grid className={'small-bottom-gab'} style={{ float: 'right' }} item xs={4}>
    <Button role={'insertNewErfassungsElementNode'} className={'override-bottom-color'} style={{
      width: 'fit-content',
      textTransform: 'none',
      color: 'white'
    }} onClick={handleOnClick}
            variant="text">+ {buttonLabel}</Button>
  </Grid>}
    {!showAddButton && null}
  </>
})
