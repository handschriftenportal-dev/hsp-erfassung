import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemenbereichDialog } from 'src/domain/editor/dialoge/ThemenbereichDialog'
import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import { ThemenbereichDialogReducer } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import de from 'src/infrastructure/i18n/translation_de.json'
import { ThemenbereichService } from 'src/infrastructure/normdaten/ThemenbereichService'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

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
    expect(
      screen.getByRole('heading', {
        name: de.subject_area_dialog.title.replace('{{label}}', 'Einband'),
      })
    ).toBeVisible()
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
              auswahl: [{ id: 'NORM-f3bd05cd-c31d-314b-bafa-cda21482d0c0' }],
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
        uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/BNDG-A239',
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

  it('notwendige begriffe are disabled', () => {
    const state = ThemenbereichDialogReducer(initialState, {
      type: 'addBegriffe',
      payload: AuswahlItem.fromBegriff(api.begriff({ notation: 'BNDG-X434' })!),
    })
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog initialState={state} onAbort={jest.fn()} />
        </ThemenbereichService>
      </TestContext>
    )
    const [_broschur, flexiblerEinband, heftungAufBand] =
      screen.queryAllByRole('checkbox')
    expect(flexiblerEinband).toBeChecked()
    expect(heftungAufBand).toBeChecked()
    expect(flexiblerEinband).toBeDisabled()
    expect(heftungAufBand).toBeDisabled()
  })

  it('can toggle optionale begriffe', async () => {
    const state = ThemenbereichDialogReducer(initialState, {
      type: 'addBegriffe',
      payload: AuswahlItem.fromBegriff(api.begriff({ notation: 'BNDG-X434' })!),
    })
    render(
      <TestContext>
        <ThemenbereichService api={api}>
          <ThemenbereichDialog initialState={state} onAbort={jest.fn()} />
        </ThemenbereichService>
      </TestContext>
    )
    const [_broschur, _flexiblerEinband, _heftungAufBand, papierBezug] =
      screen.queryAllByRole('checkbox')
    expect(papierBezug).not.toBeChecked()
    await userEvent.click(papierBezug)
    expect(papierBezug).toBeChecked()
    await userEvent.click(papierBezug)
    expect(papierBezug).not.toBeChecked()
  })
})
