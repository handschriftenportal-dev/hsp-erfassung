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

import { act, fireEvent, render, screen } from '@testing-library/react'

import { ImportiereNormdatumDialog } from '../../../../../src/domain/editor/normdaten/importiereNormdatumDialog/ImportiereNormdatumDialog'
import de from '../../../../../src/infrastructure/i18n/translation_de.json'
import { TestContext } from '../../../../TestContext'

describe('Importiere Normdaten Dialog', () => {
  describe('has roles', () => {
    beforeEach(() => {
      render(
        <TestContext>
          <ImportiereNormdatumDialog normdatumTyp="person" />
        </TestContext>
      )
    })

    it('heading', () => {
      expect(screen.getByRole('heading')).toBeTruthy()
    })

    it('button to cancel', () => {
      expect(
        screen.getByRole('button', {
          name: de.import_normdata_dialog.button_cancel,
        })
      ).toBeTruthy()
    })

    it('button to submit', () => {
      expect(
        screen.getByRole('button', {
          name: de.import_normdata_dialog.button_submit,
        })
      ).toBeTruthy()
    })
  })

  describe('actions call back', () => {
    let back: typeof jest.fn
    beforeEach(() => {
      back = jest.fn()
      render(
        <TestContext>
          <ImportiereNormdatumDialog back={back} normdatumTyp="person" />
        </TestContext>
      )
    })

    it('with empty normdatum when canceled', () => {
      act(() =>
        fireEvent.click(screen.getByRole('button', { name: 'Abbrechen' }))
      )
      expect(back).toHaveBeenCalledWith()
    })
  })
})
