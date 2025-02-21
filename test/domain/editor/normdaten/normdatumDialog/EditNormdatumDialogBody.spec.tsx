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

import { render, screen } from '@testing-library/react'

import { EditNormdatumDialogBody } from '../../../../../src/domain/editor/normdaten/normdatumDialog/EditNormdatumDialogBody'
import { NormdatumDialogState } from '../../../../../src/domain/editor/normdaten/normdatumDialog/NormdatumDialogState'
import de from '../../../../../src/infrastructure/i18n/translation_de.json'
import { TestContext } from '../../../../TestContext'

describe('EditNormdatumDialogBody', () => {
  const createEmpty = NormdatumDialogState.new.create('person')
  const createSearch = NormdatumDialogState.new.create('person', 'Text')
  const createFilled: NormdatumDialogState = {
    ...createEmpty,
    status: 'filled',
    rollen: ['author'],
    normdatum: {
      preferredName: 'Found',
      gndIdentifier: '1234',
      identifier: 'NORM-5678',
    },
  }
  const editIdle: NormdatumDialogState = {
    view: 'edit',
    status: 'idle',
    type: 'person',
    text: 'Pytagoras',
    normdatum: {
      gndIdentifier: '123',
      preferredName: 'Pythagoras',
    },
    rollen: ['author'],
  }
  const testCases = [createEmpty, createSearch, createFilled, editIdle]

  describe.each(testCases)(
    'has translated labelled element',
    (initialState) => {
      beforeEach(() => {
        render(
          <TestContext>
            <EditNormdatumDialogBody
              initialState={initialState}
              onAction={jest.fn()}
            />
          </TestContext>
        )
      })

      it(`"normdata_text" for status "${initialState.status}"`, () => {
        expect(
          screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_text)
        ).toHaveValue(initialState.text)
      })

      it(`"normdata_link" for status "${initialState.status}"`, () => {
        expect(
          screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_link)
        ).toBeVisible()
      })

      it(`"role" for status "${initialState.status}"`, () => {
        expect(
          screen.getByLabelText(de.text_tagging.referenz.dialog.role)
        ).toBeVisible()
      })

      it(`button to submit on for status "${initialState.status}"`, () => {
        expect(
          screen.getByRole('button', { name: de.editor.determine })
        ).toBeVisible()
      })

      it(`button to cancel on for status "${initialState.status}"`, () => {
        expect(
          screen.getByRole('button', { name: de.editor.cancellation })
        ).toBeVisible()
      })

      const deletable = NormdatumDialogState.is.deletable(initialState)

      it(`button to delete is ${deletable ? '' : 'visible'} for status "${initialState.status}"`, () => {
        expect(
          screen.queryByRole('button', {
            name: de.editor.remove_normdata_reference,
          }) !== null
        ).toBe(deletable)
      })
    }
  )
})
