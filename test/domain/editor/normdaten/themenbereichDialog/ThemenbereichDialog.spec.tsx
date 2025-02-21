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
import userEvent from '@testing-library/user-event'

import { ThemenbereichDialog } from '../../../../../src/domain/editor/normdaten/themenbereichDialog/ThemenbereichDialog'
import { ThemenbereichDialogState } from '../../../../../src/domain/editor/normdaten/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from '../../../../../src/domain/erfassung/ThemenbereicheAPI'
import de from '../../../../../src/infrastructure/i18n/translation_de.json'
import { ThemenbereichService } from '../../../../../src/infrastructure/normdaten/ThemenbereichService'
import subjectArea from '../../../../infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from '../../../../TestContext'

describe('ThemenbereichDialog', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const initialState = ThemenbereichDialogState.new(
    'Zeitgenössischer Einband',
    'BNDG'
  )

  it('renders a dialog', () => {
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog initialState={initialState} />
        </ThemenbereichService>
      </TestContext>
    )
    expect(screen.getByRole('dialog')).toBeVisible()
  })

  it('renders translated label', () => {
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog initialState={initialState} />
        </ThemenbereichService>
      </TestContext>
    )
    expect(screen.getByRole('heading').textContent).toContain('Einband')
  })

  it('renders close button', () => {
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog initialState={initialState} />
        </ThemenbereichService>
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.editor.close_dialog })
    ).toBeVisible()
  })

  it('renders no action in read mode', () => {
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog
            initialState={{ ...initialState, readOnly: true }}
            onAbort={jest.fn()}
            onDelete={jest.fn()}
            onSave={jest.fn()}
          />
        </ThemenbereichService>
      </TestContext>
    )
    expect(
      screen.queryByRole('button', {
        name: de.subject_area_dialog.abort_action,
      })
    ).toBeNull()
    expect(
      screen.queryByRole('button', {
        name: de.subject_area_dialog.delete_action,
      })
    ).toBeNull()
    expect(
      screen.queryByRole('button', { name: de.subject_area_dialog.save_action })
    ).toBeNull()
  })

  it('dont render any action button in edit mode if no handler is provided', () => {
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog initialState={initialState} />
        </ThemenbereichService>
      </TestContext>
    )
    expect(
      screen.queryByRole('button', {
        name: de.subject_area_dialog.abort_action,
      })
    ).toBeNull()
    expect(
      screen.queryByRole('button', {
        name: de.subject_area_dialog.delete_action,
      })
    ).toBeNull()
    expect(
      screen.queryByRole('button', { name: de.subject_area_dialog.save_action })
    ).toBeNull()
  })

  it('renders save button in edit mode if onSave handler is provided', () => {
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog initialState={initialState} onSave={jest.fn()} />
        </ThemenbereichService>
      </TestContext>
    )
    expect(
      screen.queryByRole('button', { name: de.subject_area_dialog.save_action })
    ).toBeVisible()
  })

  it('onSave transformers ids to uri und ids', async () => {
    const saveHandler = jest.fn()
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog
            initialState={{
              ...initialState,
              auswahl: ['NORM-f3bd05cd-c31d-314b-bafa-cda21482d0c0'],
            }}
            onSave={saveHandler}
          />
        </ThemenbereichService>
      </TestContext>
    )
    await userEvent.click(
      screen.getByRole('button', { name: de.subject_area_dialog.save_action })
    )
    expect(saveHandler).toHaveBeenLastCalledWith(initialState.linkedText, [
      {
        id: 'NORM-f3bd05cd-c31d-314b-bafa-cda21482d0c0',
        notation: 'BNDG-A239',
        uri: 'https://normdaten.staatsbibliothek-berlin.de/vocabulary/BNDG-A239',
      },
    ])
  })

  it('renders delete button in edit mode if onDelete handler is provided', () => {
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog
            initialState={initialState}
            onDelete={jest.fn()}
          />
        </ThemenbereichService>
      </TestContext>
    )
    expect(
      screen.queryByRole('button', {
        name: de.subject_area_dialog.delete_action,
      })
    ).toBeVisible()
  })

  it('renders abort button in edit mode if onAbort handler is provided', () => {
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog
            initialState={initialState}
            onAbort={jest.fn()}
          />
        </ThemenbereichService>
      </TestContext>
    )
    expect(
      screen.queryByRole('button', {
        name: de.subject_area_dialog.abort_action,
      })
    ).toBeVisible()
  })
})
