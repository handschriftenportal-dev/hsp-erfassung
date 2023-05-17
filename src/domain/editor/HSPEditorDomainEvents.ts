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

export function sendDocumentSpeichernEvent() {
  const mouseEventSpeichern = document.createEvent('MouseEvents')
  mouseEventSpeichern.initEvent('mousedown', true, true)
  const button = window.document.getElementById('speichernButton')
  if (button !== null) {
    button.dispatchEvent(mouseEventSpeichern)
  }
}

export function sendValidateTEIEvent() {

  const mouseEventValidateTEI = document.createEvent('MouseEvents')
  mouseEventValidateTEI.initEvent('mousedown', true, true)
  const button = window.document.getElementById('validateTEIButton')
  if (button !== null) {
    console.log('sendValidateTEIEvent')
    button.dispatchEvent(mouseEventValidateTEI)
  }
}

export function sendReloadEvent() {
  console.log('Sending reload tei ...')
  const mouseEventReloadTEI = document.createEvent('MouseEvents')
  mouseEventReloadTEI.initEvent('mousedown', true, true)
  const button = window.document.getElementById('ladenButton')
  if (button !== null) {
    console.log('sendReloadTEIEvent')
    button.dispatchEvent(mouseEventReloadTEI)
  }
}
