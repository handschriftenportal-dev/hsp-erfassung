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
import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from '@material-ui/core'
import { XMLTagIcon } from './icons/XMLTagIcon'
import { useTranslation } from 'react-i18next'
import { Editor } from 'slate'
import { serializeAsText } from '../../infrastructure/XMLConverter'
import { HSPLeftToolbarButton } from './styles/HSPLeftToolbarButton'
import { ReactEditor } from 'slate-react'

interface TEIHeaderAnzeigenButtonProps {
  title: string
  editor: ReactEditor
}

export const TEIHeaderAnzeigenButton = React.memo(({ title, editor }: TEIHeaderAnzeigenButtonProps) => {

  const [openDialog, setOpenDialog] = useState(false)
  const [content, setContent] = useState('')
  const { t } = useTranslation()

  const handleClose = useCallback((event: any) => {
    setOpenDialog(false)
  }, [])

  const showTEIHeader = useCallback((event: any) => {
    event.preventDefault()
    setOpenDialog(!openDialog)
    const nodes = Array.from(Editor.nodes(editor, { at: [0], reverse: true }))
    nodes.forEach(element => {
      if ((element[0] as any).data_origin === 'teiHeader') {
        setContent(serializeAsText(element[0]))
      }
    })
  }, [openDialog])

  return (
      <>
        <HSPLeftToolbarButton title={title} onMouseDown={showTEIHeader} style={{
          backgroundColor: openDialog ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255,255, 0.8)',
        }}>
          {
            <XMLTagIcon/>
          }
        </HSPLeftToolbarButton>
        <span id='saveDialog'>
          <Dialog aria-labelledby="simple-dialog-title" open={openDialog}>
            <DialogTitle id="simple-dialog-title">TEI Header</DialogTitle>
            <DialogContentText style={{ padding: '20px' }}>
              {
                content
              }
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {t('toolbar.close')}
              </Button>
            </DialogActions>
          </Dialog>
        </span>
      </>
  )
})
