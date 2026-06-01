import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LiteraturDialog } from 'src/domain/editor/dialoge/LiteraturDialog'
import de from 'src/infrastructure/i18n/translation_de.json'
import { LiteraturService } from 'src/infrastructure/literatur/LiteraturService'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { TestContext } from 'test/TestContext'

describe('LiteraturDialog', () => {
  const {
    save_action,
    cancel_action,
    delete_action,
    linked_text,
    linked_url,
    open_link,
    title,
    invalid_url,
  } = de.literatur_dialog

  const validValue = { text: 'Some text', href: 'http://example.com' }
  const literatur = LiteraturService.all()[0]
  const validLiteratur = { text: literatur.title, href: literatur.uri }
  const invalidValues = [
    { text: '', href: '' },
    { text: '', href: 'http://handschriftenportal.de' },
    { text: 'something', href: '' },
    { text: 'something', href: 'invalid_url' },
  ]

  describe('in edit mode', () => {
    it('renders all components', () => {
      render(
        <TestContext>
          <LiteraturDialog initialValue={validValue} />
        </TestContext>
      )

      expect(screen.getByRole('heading')).toHaveTextContent(title)
      expect(screen.getByLabelText(linked_text)).toBeVisible()
      expect(screen.getByLabelText(linked_url)).toBeVisible()
      expect(screen.getByRole('button', { name: save_action })).toBeVisible()
      expect(screen.getByRole('button', { name: cancel_action })).toBeVisible()
    })

    it('renders error message for invalid href', () => {
      render(
        <TestContext>
          <LiteraturDialog
            initialValue={{
              text: 'Hello World',
              href: 'htp://example.com',
            }}
          />
        </TestContext>
      )
      expect(screen.getByText(invalid_url)).toBeVisible()
    })

    it.each(invalidValues)(
      'has disabled save button on empty text field (%p)',
      (value) => {
        render(
          <TestContext>
            <LiteraturDialog initialValue={value} />
          </TestContext>
        )
        expect(screen.getByRole('button', { name: save_action })).toBeDisabled()
      }
    )

    it('renders description for literature from LiteraturService', () => {
      render(
        <TestContext>
          <LiteraturDialog initialValue={validLiteratur} />
        </TestContext>
      )
      expect(screen.getByText(literatur.description)).toBeVisible()
    })

    it('enables save button on filled out text fields', async () => {
      render(
        <TestContext>
          <LiteraturDialog onSave={jest.fn()} />
        </TestContext>
      )
      await userEvent.type(
        screen.getByRole('combobox', { name: linked_text }),
        'Some text'
      )
      await userEvent.type(
        screen.getByRole('textbox', { name: linked_url }),
        'https://some-url'
      )
      expect(
        screen.getByRole('button', { name: save_action })
      ).not.toBeDisabled()
    })

    it('gives new values to callback onSave', async () => {
      const onSave = jest.fn()
      render(
        <TestContext>
          <LiteraturDialog onSave={onSave} />
        </TestContext>
      )
      await userEvent.type(
        screen.getByRole('combobox', { name: linked_text }),
        validValue.text
      )
      await userEvent.type(
        screen.getByRole('textbox', { name: linked_url }),
        validValue.href
      )
      await userEvent.click(screen.getByRole('button', { name: save_action }))

      expect(onSave).toHaveBeenCalledWith(validValue)
    })

    it('shows options from literatur service', async () => {
      render(
        <TestContext>
          <LiteraturDialog />
        </TestContext>
      )
      await userEvent.click(screen.getByRole('combobox', { name: linked_text }))

      LiteraturService.all().forEach((literature) => {
        expect(
          screen.getByRole('option', { name: literature.title })
        ).toBeVisible()
      })
    })

    it('selecting options fills URL', async () => {
      render(
        <TestContext>
          <LiteraturDialog />
        </TestContext>
      )
      await userEvent.click(screen.getByRole('combobox', { name: linked_text }))
      await userEvent.click(
        screen.getByRole('option', { name: literatur.title })
      )
      expect(screen.getByRole('textbox', { name: linked_url })).toHaveValue(
        literatur.uri
      )
    })

    it.each(invalidValues)(
      'pressing key "Enter" does not save when value is invalid (%p)',
      async (value) => {
        const onSave = jest.fn()
        render(
          <TestContext>
            <LiteraturDialog initialValue={value} onSave={onSave} />
          </TestContext>
        )
        await userEvent.keyboard('{Enter}')
        expect(onSave).not.toHaveBeenCalled()
      }
    )

    describe('closes', () => {
      let onSave: typeof jest.fn

      const ShowDialog: typeof LiteraturDialog = ({ initialValue, onSave }) => {
        const { showModal } = useGlobalModalContext()
        return (
          <button
            onClick={() =>
              showModal(
                <LiteraturDialog initialValue={initialValue} onSave={onSave} />
              )
            }
          >
            Open
          </button>
        )
      }

      beforeEach(async () => {
        onSave = jest.fn()
        render(
          <TestContext>
            <ShowDialog initialValue={validValue} onSave={onSave} />
          </TestContext>
        )
        await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      })

      it.each([cancel_action, save_action])(
        'after pressing "%s" button',
        async (name) => {
          expect(screen.queryByRole('heading')).toBeVisible()
          await userEvent.click(screen.getByRole('button', { name }))
          expect(screen.queryByRole('heading')).toBeNull()
        }
      )

      it('after pressing "Escape" key', async () => {
        expect(screen.queryByRole('heading')).toBeVisible()
        await userEvent.keyboard('{Escape}')
        expect(screen.queryByRole('heading')).toBeNull()
      })

      it('after pressing "Enter" key with valid value', async () => {
        await userEvent.keyboard('{Enter}')
        expect(onSave).toHaveBeenCalledWith(validValue)
      })
    })
  })

  describe('in readonly mode', () => {
    it('renders all components', () => {
      render(
        <TestContext>
          <LiteraturDialog initialValue={validValue} readOnly />
        </TestContext>
      )
      expect(screen.getByRole('heading')).toHaveTextContent(title)
      expect(screen.getByLabelText(linked_text)).toBeVisible()
      expect(screen.getByLabelText(linked_url)).toBeVisible()
      expect(
        screen.getByRole('button', {
          name: open_link,
        })
      ).toBeVisible()
    })

    it('does not render delete button', () => {
      render(
        <TestContext>
          <LiteraturDialog initialValue={validValue} readOnly />
        </TestContext>
      )
      expect(screen.queryByRole('button', { name: delete_action })).toBeNull()
    })

    it('can open url in new tab', () => {
      const open = jest.fn()
      window.open = open
      render(
        <TestContext>
          <LiteraturDialog initialValue={validValue} readOnly />
        </TestContext>
      )

      fireEvent.click(
        screen.getByRole('button', {
          name: open_link,
        })
      )

      expect(open.mock.lastCall).toMatchObject([
        validValue.href,
        '_blank',
        'noopener,noreferrer',
      ])
    })
  })
})
