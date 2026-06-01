import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import type { HspWorkspace } from 'hsp-fo-workspace/declaration/types'
import type { MouseEvent } from 'react'
import { memo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { BeschreibungsObject } from 'src/domain/erfassung/Erfassung'
import {
  selectBeschreibung,
  selectConfiguration,
} from 'src/domain/erfassung/ErfassungsState'

import { VisibilityNew24db2 } from './icons/VisibilityNew24db2'
import { HSPToolbarButton } from './styles/HSPToolbarButton'

export const WorkspaceVorschauButton = memo(() => {
  const [openDialog, setOpenDialog] = useState(false)
  const workspaceContainer = useRef<HTMLDivElement | null>(null)
  const beschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const { workspaceUrl } = useSelector(selectConfiguration)
  const { t } = useTranslation()
  const handleClose = () => {
    setOpenDialog(false)
  }

  const loadViewer = () => {
    const workspace: HspWorkspace = window.createHspWorkspace({
      classNamePrefix: 'hsp-workspace',
      enableRouting: false,
      hspTeiEndpoint: workspaceUrl,
      theme: {},
      manifestEndpoint: '',
      kodEndpoint: '',
      persistStore: false,
    })
    if (workspace && workspaceContainer.current) {
      workspace.mount({ main: workspaceContainer.current }).then(() => {
        workspace.addResource({
          id: beschreibung.id,
          type: beschreibung.type,
        })
      })
    }
  }

  const openPreview = async (event: MouseEvent<HTMLButtonElement>) => {
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
      <Dialog open={openDialog} fullWidth maxWidth={'xl'}>
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
