import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NeuladenWarnungDialog } from 'src/domain/toolbar/dialog/NeuladenWarnungDialog'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('NeuladenWarnungDialog', () => {
  const { title, content, error, cancel_action, save_action, discard_action } =
    de.neuladen_warnung_dialog

  describe('layout', () => {
    beforeEach(() => {
      render(
        <TestContext>
          <NeuladenWarnungDialog
            onSave={jest.fn().mockResolvedValue({ success: true })}
            onDiscard={jest.fn()}
          />
        </TestContext>
      )
    })

    it('renders dialog', () => {
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    it('renders content', () => {
      expect(screen.getByText(content)).toBeVisible()
    })

    it('renders title', () => {
      expect(screen.getByRole('heading', { name: title })).toBeVisible()
    })

    it('has cancel action', () => {
      expect(screen.getByRole('button', { name: cancel_action })).toBeVisible()
    })

    it('has discard action', () => {
      expect(screen.getByRole('button', { name: discard_action })).toBeVisible()
    })

    it('has save action', () => {
      expect(screen.getByRole('button', { name: save_action })).toBeVisible()
    })
  })

  describe('has behaviour', () => {
    it('clicking save button triggers onSave', async () => {
      const onSave = jest.fn().mockResolvedValue({ success: true })
      render(
        <TestContext>
          <NeuladenWarnungDialog onSave={onSave} onDiscard={jest.fn()} />
        </TestContext>
      )
      await userEvent.click(screen.getByRole('button', { name: save_action }))
      expect(onSave).toHaveBeenCalled()
    })

    it('clicking save button with failing succes shows error and disable save button', async () => {
      const onSave = jest.fn().mockResolvedValue({ success: false })
      render(
        <TestContext>
          <NeuladenWarnungDialog onSave={onSave} onDiscard={jest.fn()} />
        </TestContext>
      )
      await userEvent.click(screen.getByRole('button', { name: save_action }))
      expect(onSave).toHaveBeenCalled()
      expect(screen.getByRole('button', { name: save_action })).toBeDisabled()
      expect(screen.getByText(error)).toBeVisible()
    })

    it('clicking discard button triggers onDiscard', async () => {
      const onDiscard = jest.fn()
      render(
        <TestContext>
          <NeuladenWarnungDialog
            onSave={jest.fn().mockResolvedValue({ success: true })}
            onDiscard={onDiscard}
          />
        </TestContext>
      )
      await userEvent.click(
        screen.getByRole('button', { name: discard_action })
      )
      expect(onDiscard).toHaveBeenCalled()
    })
  })
})
