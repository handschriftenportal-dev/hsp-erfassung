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
  erfassungsState,
  updateSlate,
} from '../../../src/domain/erfassung/ErfassungsState'

const previousState = {
  beschreibung: {
    id: '',
    kodid: '',
    kodsignaturen: [],
    subtype: '',
  },
  loadSidebar: false,
  positionChanged: false,
  readOnly: false,
  saveAllowed: true,
  sidebarValue: [
    {
      children: [],
      id: '',
      label: 'Kopf',
      path: [0, 0],
      teiElement: 'head',
    },
  ],
  slateValue: [
    {
      data_origin: 'TEI',
      children: [],
    },
  ],
  standalone: true,
  unsavedDocument: false,
  validationState: {
    errorMessage: 'No Error',
    valid: true,
  },
  contentChanged: true,
}

describe('ErfassungsState Update Value', () => {
  it('ErfassungsState Test Slate Valued Update', () => {
    expect(
      erfassungsState.reducer(undefined, updateSlate([])).slateValue
    ).toEqual([])
    expect(
      erfassungsState.reducer(undefined, updateSlate([])).unsavedDocument
    ).toEqual(false)
    expect(
      erfassungsState.reducer(
        undefined,
        updateSlate([
          {
            data_origin: 'TEI',
            children: [],
          },
        ])
      ).slateValue
    ).toEqual([
      {
        data_origin: 'TEI',
        children: [],
      },
    ])

    expect(
      erfassungsState.reducer(
        previousState as any,
        updateSlate([
          {
            data_origin: 'TEI',
            children: [{ text: 'Erste Änderung' }],
          },
        ])
      ).unsavedDocument
    ).toEqual(true)
  })
})
