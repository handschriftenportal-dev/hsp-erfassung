import 'hsp-fo-workspace/dist/hsp-fo-workspace.standalone'
import './assets/css/index.css'
import './infrastructure/i18n/i18n'

import { CssBaseline } from '@mui/material'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { createRoot } from 'react-dom/client'

import { HSP_ERFASSUNGS_EDITOR_ID } from './domain/editor/HSPEditor'
import { ErfassungsContext } from './domain/erfassung/ErfassungsContext'
import { extractConfiguration } from './infrastructure/html/ConfigurationExtractor'
import { SBBNormdatenServiceAdapter } from './infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { theme } from './theme'

const editor = document.getElementById(HSP_ERFASSUNGS_EDITOR_ID)
if (editor) {
  const root = createRoot(editor)
  const configuration = extractConfiguration(editor)
  SBBNormdatenServiceAdapter.updateConfiguration(configuration)
  root.render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErfassungsContext {...configuration} />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
