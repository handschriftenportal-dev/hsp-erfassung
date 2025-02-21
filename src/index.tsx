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
