import { render, screen } from '@testing-library/react'
import { InitiumAnlegenDialog } from 'src/domain/editor/dialoge/InitiumAnlegenDialog'
import { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('InitiumAnlegenDialog', () => {
  const initialState = InitiumAnlegenDialogState.initialState(
    'Alea iacta est',
    {
      id: 'NORM-5108c216-2963-3009-9d28-956c37fe60d1',
      gndIdentifier: null,
      preferredName: 'unbekannt',
      typeName: 'Language',
      identifier: [],
      variantName: [],
    }
  )
  describe('for initial state has accessible role', () => {
    beforeEach(() => {
      render(
        <TestContext>
          <InitiumAnlegenDialog
            initialState={initialState}
            onSave={jest.fn()}
            onCancel={jest.fn()}
          />
        </TestContext>
      )
    })

    it('dialog', () => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    it('title', () => {
      expect(screen.getByRole('heading')).toBeVisible()
    })

    it('dialog closing button', () => {
      expect(
        screen.getByRole('button', { name: de.editor.close_dialog })
      ).toBeVisible()
    })

    it('cancel button', () => {
      expect(
        screen.getByRole('button', {
          name: de.initium_anlegen_dialog.cancel_action,
        })
      ).toBeVisible()
    })

    it('submit button', () => {
      expect(
        screen.getByRole('button', {
          name: de.initium_anlegen_dialog.create_action,
        })
      ).toBeVisible()
    })
  })
})
