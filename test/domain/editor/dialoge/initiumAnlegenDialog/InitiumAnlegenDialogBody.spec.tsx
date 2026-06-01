import { render, screen } from '@testing-library/react'
import { InitiumAnlegenDialogBody } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogBody'
import { InitiumAnlegenDialogReducer } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogReducer'
import { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('InitiumAnlegenDialogBody', () => {
  beforeEach(() => {
    const baseState = InitiumAnlegenDialogState.initialState('Alea iacta est', {
      id: 'NORM-5108c216-2963-3009-9d28-956c37fe60d1',
      gndIdentifier: null,
      preferredName: 'unbekannt',
      typeName: 'Language',
      identifier: [],
      variantName: [],
    })
    const state = InitiumAnlegenDialogReducer(baseState, {
      type: 'enter_initium',
    })
    render(
      <TestContext>
        <InitiumAnlegenDialogBody state={state} dispatch={jest.fn()} />
      </TestContext>
    )
  })

  it('enterInitium state renders textbox for the text', () => {
    expect(
      screen.getByRole('textbox', {
        name: de.initium_anlegen_dialog.initium_text,
      })
    ).toBeVisible()
  })

  it('enterInitium state renders select field for languages', () => {
    expect(
      screen.getByRole('combobox', {
        name: de.initium_anlegen_dialog.initium_language,
      })
    ).toBeVisible()
  })
})
