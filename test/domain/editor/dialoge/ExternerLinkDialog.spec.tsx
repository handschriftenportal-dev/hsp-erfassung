import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExternerLinkDialog } from 'src/domain/editor/dialoge/ExternerLinkDialog'
import de from 'src/infrastructure/i18n/translation_de.json'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { TestContext } from 'test/TestContext'

const ShowExternerLinkDialog: typeof ExternerLinkDialog = ({
  initialValue,
  onSave,
}) => {
  const { showModal } = useGlobalModalContext()
  return (
    <button
      onClick={() =>
        showModal(
          <ExternerLinkDialog initialValue={initialValue} onSave={onSave} />
        )
      }
    >
      Open
    </button>
  )
}

describe('ExternerLinkDialog', () => {
  const {
    save,
    cancel,
    linked_text,
    linked_url,
    open_link,
    title,
    invalid_url,
  } = de.externer_link_dialog
  const validValue = { text: 'Some text', href: 'http://example.com' }
  const invalidValues = [
    { text: '', href: '' },
    { text: '', href: 'http://handschriftenportal.de' },
    { text: 'xxx', href: 'invalid_url' },
    { text: 'something', href: '' },
  ]

  describe('in edit mode', () => {
    it('renders all components', () => {
      render(
        <TestContext>
          <ExternerLinkDialog initialValue={validValue} />
        </TestContext>
      )
      expect(screen.getByRole('heading')).toHaveTextContent(title)
      expect(screen.getByLabelText(linked_text)).toBeVisible()
      expect(screen.getByLabelText(linked_url)).toBeVisible()
      expect(screen.getByRole('button', { name: save })).toBeVisible()
      expect(screen.getByRole('button', { name: cancel })).toBeVisible()
    })

    it('renders error message for invalid href', () => {
      render(
        <TestContext>
          <ExternerLinkDialog
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
            <ExternerLinkDialog initialValue={value} />
          </TestContext>
        )
        expect(screen.getByRole('button', { name: save })).toBeDisabled()
      }
    )

    it('enables save button on filled out text fields', async () => {
      render(
        <TestContext>
          <ExternerLinkDialog onSave={jest.fn()} />
        </TestContext>
      )
      await userEvent.type(
        screen.getByRole('textbox', { name: linked_text }),
        'Some text'
      )
      await userEvent.type(
        screen.getByRole('textbox', { name: linked_url }),
        'https://some-url'
      )
      expect(screen.getByRole('button', { name: save })).not.toBeDisabled()
    })

    it('gives new values to callback onSave', async () => {
      const onSave = jest.fn()
      render(
        <TestContext>
          <ExternerLinkDialog onSave={onSave} />
        </TestContext>
      )
      await userEvent.type(
        screen.getByRole('textbox', { name: linked_text }),
        validValue.text
      )
      await userEvent.type(
        screen.getByRole('textbox', { name: linked_url }),
        validValue.href
      )
      await userEvent.click(screen.getByRole('button', { name: save }))

      expect(onSave).toHaveBeenCalledWith(validValue)
    })

    it.each(invalidValues)(
      'pressing key "Enter" does not save when value is invalid (%p)',
      async (value) => {
        const onSave = jest.fn()
        render(
          <TestContext>
            <ExternerLinkDialog initialValue={value} onSave={onSave} />
          </TestContext>
        )
        await userEvent.keyboard('{Enter}')
        expect(onSave).not.toHaveBeenCalled()
      }
    )

    describe('closes', () => {
      let onSave: typeof jest.fn
      beforeEach(async () => {
        onSave = jest.fn()
        render(
          <TestContext>
            <ShowExternerLinkDialog initialValue={validValue} onSave={onSave} />
          </TestContext>
        )
        await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      })

      it.each([cancel, save])('after pressing "%s" button', async (name) => {
        expect(screen.queryByRole('heading')).toBeVisible()
        await userEvent.click(screen.getByRole('button', { name }))
        expect(screen.queryByRole('heading')).toBeNull()
      })

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
          <ExternerLinkDialog initialValue={validValue} readOnly />
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

    it('can open url in new tab', () => {
      const open = jest.fn()
      window.open = open
      render(
        <TestContext>
          <ExternerLinkDialog initialValue={validValue} readOnly />
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
