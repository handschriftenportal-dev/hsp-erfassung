/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 *
 */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { HspWorkspace } from 'hsp-fo-workspace/declaration/types'
import { memo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { BeschreibungsObject } from '../erfassung/Erfassung'
import {
  selectBeschreibung,
  selectConfiguration,
} from '../erfassung/ErfassungsState'
import { VisibilityNew24db2 } from './icons/VisibilityNew24db2'
import { HSPToolbarButton } from './styles/HSPToolbarButton'

declare global {
  interface Window {
    createHspWorkspace: any
  }
}

export const WorkspaceVorschauButton = memo(() => {
  const [openDialog, setOpenDialog] = useState(false)
  const workspaceContainer = useRef<HTMLDivElement | null>(null)
  const beschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const { workspaceUrl } = useSelector(selectConfiguration)
  const { t } = useTranslation()
  const handleClose = () => {
    setOpenDialog(false)
  }

  const createAbsoluteURL = () => {
    return function ({ params, hash }: any): URL {
      const url = new URL('/workspace', location.origin)
      url.search = params.toString()
      url.hash = hash
      return url
    }
  }

  const loadViewer = () => {
    const workspace: HspWorkspace = window.createHspWorkspace({
      classNamePrefix: 'hsp-workspace',
      makeCreateAbsoluteURL: createAbsoluteURL,
      enableRouting: false,
      hspTeiEndpoint: workspaceUrl,
      theme: {},
    })
    if (workspace && workspaceContainer.current) {
      workspace.mount({ main: workspaceContainer.current as any }).then(() => {
        workspace.addResource({
          id: beschreibung.id,
          type: beschreibung.type,
        })
      })
    }
  }

  const openPreview = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setOpenDialog(true)
    setTimeout(loadViewer, 0)
  }

  return (
    <>
      <HSPToolbarButton
        title={t('toolbar.preview')}
        onClick={openPreview}
        color="secondary"
      >
        {<VisibilityNew24db2 />}
      </HSPToolbarButton>
      <Dialog open={openDialog} fullWidth={true} maxWidth={'xl'}>
        <Grid
          size={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <DialogTitle>{t('toolbar.preview')}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t('toolbar.close')}
            </Button>
          </DialogActions>
        </Grid>
        <DialogContent>
          {<div style={{ height: '100vh' }} ref={workspaceContainer} />}
        </DialogContent>
      </Dialog>
    </>
  )
})
