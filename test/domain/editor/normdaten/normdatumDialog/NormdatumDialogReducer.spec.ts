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

import { NormdatumDialogReducer } from '../../../../../src/domain/editor/normdaten/normdatumDialog/NormdatumDialogReducer'

describe('Normdatum Dialog Reducer', () => {
  describe('set text', () => {
    it('does not change text in read mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'read',
            type: 'person',
            status: 'idle',
            text: 'old text',
            rollen: [],
            identifier: '123',
          },
          { type: 'set_text', text: 'new text' }
        )
      ).toMatchObject({ text: 'old text' })
    })

    it('does change text in edit mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'edit',
            type: 'person',
            status: 'idle',
            text: 'old text',
            rollen: [],
            normdatum: {
              gndIdentifier: '123',
              preferredName: 'Pythagoras',
            },
          },
          { type: 'set_text', text: 'new text' }
        )
      ).toMatchObject({ text: 'new text' })
    })
    it('does change text in create mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'create',
            type: 'person',
            status: 'filled',
            text: 'old text',
            rollen: [],
            normdatum: {
              gndIdentifier: '123',
              preferredName: 'Pythagoras',
            },
          },
          { type: 'set_text', text: 'new text' }
        )
      ).toMatchObject({ text: 'new text' })
    })
  })

  describe('set rollen', () => {
    const rollen = ['alpha', 'beta', 'gamma']

    it('does not change rollen in read mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'read',
            type: 'person',
            status: 'idle',
            text: 'old text',
            rollen: [],
            identifier: '123',
          },
          { type: 'set_rollen', rollen }
        )
      ).toMatchObject({
        rollen: [],
      })
    })
    it('does change change in edit mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'edit',
            type: 'person',
            status: 'idle',
            text: 'old text',
            rollen: [],
            normdatum: {
              gndIdentifier: '123',
              preferredName: 'Pythagoras',
            },
          },
          { type: 'set_rollen', rollen }
        )
      ).toMatchObject({ rollen })
    })
    it('does not change rollen in create mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'create',
            type: 'person',
            status: 'filled',
            text: 'old text',
            rollen: [],
            normdatum: {
              gndIdentifier: '123',
              preferredName: 'Pythagoras',
            },
          },
          { type: 'set_rollen', rollen }
        )
      ).toMatchObject({ rollen })
    })
  })
})
