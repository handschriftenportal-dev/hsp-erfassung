import { act, fireEvent, render, screen } from '@testing-library/react'
import { ImportiereNormdatumDialog } from 'src/domain/editor/dialoge/ImportiereNormdatumDialog'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

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
