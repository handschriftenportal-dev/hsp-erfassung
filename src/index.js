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

import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { ErfassungsContext } from './domain/erfassung/ErfassungsContext'
import './infrastructure/i18n/i18n'

ReactDOM.render(
  <ErfassungsContext
    url={document.getElementById('hsp-erfassungseditor').getAttribute(
      'data-url')}
    workspaceUrl={document.getElementById('hsp-erfassungseditor').getAttribute(
      'data-workspace-url')}
    validationUrl={document.getElementById('hsp-erfassungseditor').getAttribute(
      'data-validation-url')}
    readonly={document.getElementById('hsp-erfassungseditor').getAttribute(
      'data-start-in-read-only')}
    enableHSPToolBar={document.getElementById(
      'hsp-erfassungseditor').getAttribute(
      'data-enable-hsp-tool-bar')}
    language={document.getElementById('hsp-erfassungseditor').getAttribute(
      'data-language')}
    standalone={document.getElementById('hsp-erfassungseditor').getAttribute(
      'data-standalone')}
    updatecallback={document.getElementById(
      'hsp-erfassungseditor').getAttribute(
      'data-update-callback')}
    normdatenurl={document.getElementById('hsp-erfassungseditor').getAttribute(
      'data-normdaten-url')}
  />
  , document.getElementById('hsp-erfassungseditor')
)
reportWebVitals()
