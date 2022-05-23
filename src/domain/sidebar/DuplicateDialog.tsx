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

import React, { useCallback, useState } from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField } from '@material-ui/core'
import i18next from 'i18next'
import { HSP_EDITOR_ID } from '../editor/HSPEditor'
import CloseIcon from '@material-ui/icons/Close'
import { editorNode, insertSlateNodes } from '../../infrastructure/slate/SlateBoundary'
import { BeschreibungsKomponente } from './BeschreibungsKomponenteFactory'
import { PopupState } from 'material-ui-popup-state/core'
import { BaseEditor } from 'slate'
import { useDispatch } from 'react-redux'

/**
 * Author: Christoph Marten on 11.01.2022 at 14:21
 */

interface DuplicateDialogProps {
  beschreibung: BeschreibungsKomponente,
  popupState: PopupState,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  open: boolean,
  editor: BaseEditor
}

export const DuplicateDialog = React.memo(({
  beschreibung,
  popupState,
  setOpen,
  open,
  editor
}: DuplicateDialogProps) => {
  const [amount, setAmount] = useState(1)
  const dispatch = useDispatch()

  const duplicateBeschreibungskomponente = useCallback((event: any, path: number[]) => {
    if (event) {
      event.preventDefault()
    }

    function createNewIDsForNodeCopy(nodeCopy: any) {
      if (nodeCopy.id) {
        nodeCopy.id = (Math.random() * 1000000).toString()
      }
      if (nodeCopy.children) {
        for (const child of nodeCopy.children) {
          createNewIDsForNodeCopy(child)
        }
      }
    }

    try {
      const node: any = editorNode(editor, path)

      for (let i = 0; i < amount; i++) {
        const nodeCopy: any = JSON.parse(JSON.stringify(node))
        createNewIDsForNodeCopy(nodeCopy)
        nodeCopy.id = (Math.random() * 1000000).toString()
        insertSlateNodes(editor, nodeCopy, path, dispatch)
      }
    } catch (error) {
      console.log(error)
    }

    if (setOpen) {
      setOpen(!open)
    }
    if (popupState) {
      popupState.close()
    }
  }, [amount, editor])

  const closeDialog = useCallback((event: any) => {
    event.preventDefault()
    setOpen(!open)
    popupState.close()
  }, [open, popupState])

  const setTextfielAmount = useCallback((event: any) => {
    event.preventDefault()
    setAmount(event.target.value)
  }, [])

  return <Dialog contentEditable={false} container={document.getElementById(HSP_EDITOR_ID)}
                 aria-labelledby="duplicate-dialog-title"
                 open={open}>
    <DialogTitle style={{ width: '300px' }} id="duplicate-dialog-title">{i18next.t('sidebar.duplicate_Dialog')}
      <IconButton style={{ float: 'right' }}
                  onClick={(event: any) => closeDialog(event)}
                  title={'Close'}>
        <CloseIcon fontSize={'small'}/>
      </IconButton>
    </DialogTitle>
    <DialogContent style={{ height: '150px' }}>
      <DialogContentText>{beschreibung.label}</DialogContentText>
      <DialogContentText style={{ marginBottom: '25px' }}>{i18next.t('sidebar.duplicate_With_Childs')}</DialogContentText>
      <Grid container>
        <Grid item xs={12}>
          <TextField inputProps={{
            maxLength: 1,
          }} onChange={(event: any) => setTextfielAmount(event)} variant={'outlined'} style={{
            flexDirection: 'unset',
            height: '36.5px',
            width: '50px'
          }}>1</TextField>{'  X  '}
          <Button role={'duplicate'} className={'override-duplicate-dialog-bottom-color'} style={{ width: '100px' }}
                  autoFocus onClick={(event: any) =>
                    duplicateBeschreibungskomponente(event, beschreibung.path)
          } color="primary">
            {i18next.t('sidebar.create')}
          </Button>
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
})
