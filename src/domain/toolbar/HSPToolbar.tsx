/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { Grid, IconButton, Snackbar, Toolbar } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { TEISpeichernButton } from './TEISpeichernButton'
import { TEIDokumentLadenButton } from './TEIDokumentLadenButton'
import { TEIAnzeigenButton } from './TEIAnzeigenButton'
import { LesenBearbeitenButton } from './LesenBearbeitenButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoadSidebar, selectReadOnly, selectSaveAllowed, updateLoadSidebar } from '../erfassung/ErfassungsState'
import { useTranslation } from 'react-i18next'
import { NachweisErfassungResponse } from '../../infrastructure/nachweis/NachweisErfassungResponse'
import Alert from '@material-ui/lab/Alert'
import { ValidateTEIButton } from './ValidateTEIButton'
import { TEIAusblendenButton } from './TEIAusblendenButton'
import { TEIHeaderAnzeigenButton } from './TEIHeaderAnzeigenButton'
import { ToggleFullScreenButton } from './ToggleFullScreenButton'
import { ReactEditor } from 'slate-react'
import { TEIVorschauButton } from './TEIVorschauButton'
import { ExpandAllComponentsButton } from './ExpandAllComponentsButton'
import CloseIcon from '@material-ui/icons/Close'

/**
 * This Container Component represents the central toolbar with all global editor actions
 */
interface HSPToolbarProps {
  url: string
  validationUrl: string
  disabled: boolean
  editor: ReactEditor
  workspaceUrl: string
}

export const HSPToolbar = ({
  url,
  validationUrl,
  disabled,
  editor,
  workspaceUrl
}: HSPToolbarProps) => {

  const readOnly = useSelector(selectReadOnly)
  const saveAllowed = useSelector(selectSaveAllowed)
  const loadSidebar = useSelector(selectLoadSidebar)
  const [openMessage, setOpenMessage] = React.useState(false)
  const dispatch = useDispatch()
  const [nachweisResponse, setNachweisResponse] = useState<NachweisErfassungResponse>({
    success: true,
    message: '',
    level: 'info',
    content: {
      line: '',
      column: ''
    }
  })
  const { t } = useTranslation()

  const handleClose = useCallback((event: any) => {
    if (event) {
      event.preventDefault()
    }
    setOpenMessage(false)
  }, [])

  useEffect(() => {
    if (!saveAllowed) {
      setOpenMessage(true)
      setNachweisResponse({
        'success': false,
        'message': t('editor.invalid_fields'),
        'level': 'warning',
        'content': {
          'line': '',
          'column': ''
        }
      })
    } else {
      setOpenMessage(false)
    }
  }, [saveAllowed])

  const setLoadSidebar = useCallback((load: boolean) => {
    dispatch(updateLoadSidebar(load))
  }, [])

  return (
      <>
        {openMessage &&
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openMessage} autoHideDuration={6000}
                    onClose={handleClose}>
            <Alert severity={nachweisResponse.level}>
              <div>{nachweisResponse.message}</div>
              <div>{nachweisResponse.content ? nachweisResponse.content.line : ''}</div>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                title={t('toolbar.close')}
                onClick={handleClose}>
                <CloseIcon fontSize="inherit"/>
              </IconButton>
            </Alert>
          </Snackbar>}
        <Toolbar style={{ padding: '0px' }}>
          <Grid container>
            <Grid item xs={6}>
              <TEIAusblendenButton title={t('toolbar.hidetei')} editor={editor}/>
              <TEIAnzeigenButton title={t('toolbar.showtei')} editor={editor}/>
              <ExpandAllComponentsButton title={t('toolbar.collapse_all_components')}/>
              <TEIHeaderAnzeigenButton title={t('toolbar.showteiHeader')} editor={editor}/>
              <TEIVorschauButton title={t('toolbar.preview')} workspaceUrl={workspaceUrl}></TEIVorschauButton>
            </Grid>
            <Grid item xs={6}>
              <LesenBearbeitenButton titleRead={t('toolbar.write')} titleWrite={t('toolbar.closewrite')}
                                     disabled={disabled} setNachweisResponse={setNachweisResponse}
                                     setOpenMessage={setOpenMessage} url={url}/>
              {!readOnly
                ? <React.Fragment>
                    <TEISpeichernButton title={t('toolbar.save')} url={url}
                                        setNachweisResponse={setNachweisResponse}
                                        setOpenMessage={setOpenMessage}
                                        saveAllowed={saveAllowed}/>
                    <TEIDokumentLadenButton url={url} title={t('toolbar.reload')}
                                            setLoadSidebar={setLoadSidebar}
                                            loadSidebar={loadSidebar} editor={editor}/>
                    <ValidateTEIButton title={t('toolbar.validate')} validationUrl={validationUrl}
                                       setNachweisResponse={setNachweisResponse} setOpenMessage={setOpenMessage}
                                       withODD={false}/>
                    <ValidateTEIButton title={t('toolbar.validateodd')} validationUrl={validationUrl}
                                       setNachweisResponse={setNachweisResponse} setOpenMessage={setOpenMessage}
                                       withODD={true}/>
                    <ToggleFullScreenButton/>
                  </React.Fragment>
                : ''}
            </Grid>
          </Grid>
        </Toolbar>
      </>
  )
}
