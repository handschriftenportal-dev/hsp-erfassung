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

import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ExternerLinkDialog } from '../../../../../src/domain/editor/normdaten/dialog/ExternerLinkDialog'
import de from '../../../../../src/infrastructure/i18n/translation_de.json'
import { useGlobalModalContext } from '../../../../../src/infrastructure/modal/GlobalModal'
import { TestContext } from '../../../../TestContext'

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
  const { save, cancel, linked_text, linked_url, open_link, title } =
    de.externer_link_dialog
  const validValue = { text: 'Some text', url: 'http://example.com' }
  const invalidValues = [
    { text: '', url: '' },
    { text: '', url: 'something' },
    { text: 'something', url: '' },
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
        validValue.url
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
          <ExternerLinkDialog initialValue={validValue} readOnly={true} />
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
          <ExternerLinkDialog initialValue={validValue} readOnly={true} />
        </TestContext>
      )

      fireEvent.click(
        screen.getByRole('button', {
          name: open_link,
        })
      )

      expect(open.mock.lastCall).toMatchObject([
        validValue.url,
        '_blank',
        'noopener,noreferrer',
      ])
    })
  })
})
