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

import React, { useRef, useState } from 'react'
import { HSPLeftToolbarButton } from './styles/HSPLeftToolbarButton'
import { Visibility } from '@material-ui/icons'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { HspWorkspace } from 'hsp-fo-workspace/types'
import { BeschreibungsObject } from '../erfassung/Erfassung'
import { selectBeschreibung, selectReadOnly } from '../erfassung/ErfassungsState'
import { useSelector } from 'react-redux'
import fetch from 'isomorphic-unfetch'

interface TEIVorschauButtonProps {
  title: string
  workspaceUrl: string
}

export const TEIVorschauButton = React.memo(({ title, workspaceUrl }: TEIVorschauButtonProps) => {

  const [openDialog, setOpenDialog] = useState(false)
  const workspaceContainer: any = useRef()
  const beschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const readonly = useSelector(selectReadOnly)
  const { t } = useTranslation()

  const handleClose = () => {
    setOpenDialog(false)
  }

  const createAbsoluteURL = () => {
    return function ({ params, hash }: any) {
      const url = new URL('/workspace', location.origin)
      url.search = params.toString()
      url.hash = hash
      return url
    }
  }

  const loadViewer = async () => {

    // @ts-ignore
    const workspace: HspWorkspace = window.createHspWorkspace({
      customFetch: fetch,
      classNamePrefix: 'hsp-workspace',
      makeCreateAbsoluteURL: createAbsoluteURL,
      enableRouting: false,
      hspTeiEndpoint: workspaceUrl,
      theme: {},
    })

    if (workspace && workspaceContainer.current) {
      workspace.mount({ main: workspaceContainer.current as any }).then(() => {
        workspace.addResource({ id: beschreibung.id, type: 'hsp:description' })
      })
    }
  }

  const openPreview = async (event: any) => {
    event.preventDefault()
    setOpenDialog(true)
    setTimeout(loadViewer, 200)
  }

  return (
      <>
        <HSPLeftToolbarButton title={title} disabled={!readonly} style={{
          backgroundColor: !readonly ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255,255, 0.8)',
        }} onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => openPreview(event)}>
          {
            <Visibility style={{ color: 'black' }}/>
          }
        </HSPLeftToolbarButton>
        <div id='previewDialog'>
          <Dialog aria-labelledby="simple-dialog-title" open={openDialog} fullWidth={true} maxWidth={'xl'}>
            <DialogTitle id="simple-dialog-title">{t('toolbar.preview')}</DialogTitle>
            <DialogContent>
              {<div style={{ height: '100vh' }} ref={workspaceContainer}/>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {t('toolbar.close')}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
  )
})
