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

import { NormdatumDialogState } from '../../../../../src/domain/editor/normdaten/normdatumDialog/NormdatumDialogState'
import { ReadOnlyNormdatumDialogBody } from '../../../../../src/domain/editor/normdaten/normdatumDialog/ReadOnlyNormdatumDialogBody'
import de from '../../../../../src/infrastructure/i18n/translation_de.json'
import { TestContext } from '../../../../TestContext'

describe('ReadOnlyNormdatumDialogBody', () => {
  const state: NormdatumDialogState = {
    view: 'read',
    status: 'idle',
    type: 'person',
    text: 'xxx',
    rollen: [],
    identifier: '123',
  }
  beforeEach(() => {
    render(
      <TestContext>
        <ReadOnlyNormdatumDialogBody state={state} />
      </TestContext>
    )
  })

  it(`has labeled element "normdata_text"`, () => {
    expect(
      screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_text)
    ).toHaveValue(state.text)
  })

  it(`has labeled element "normdata_link"`, () => {
    expect(
      screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_link)
    ).toBeVisible()
  })

  it(`has labeled element "role"`, () => {
    expect(
      screen.getByLabelText(de.text_tagging.referenz.dialog.role)
    ).toBeVisible()
  })

  it(`has button to open`, () => {
    expect(
      screen.getByRole('button', {
        name: de.text_tagging.referenz.dialog.open_action,
      })
    ).toBeVisible()
  })
})
