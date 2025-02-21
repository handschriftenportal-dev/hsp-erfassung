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
import userEvent, { UserEvent } from '@testing-library/user-event'

import { BeziehungsMehrfachAuswahl } from '../../../../../src/domain/editor/normdaten/dialog/BeziehungsMehrfachAuswahl'
import de from '../../../../../src/infrastructure/i18n/translation_de.json'
import { seemsToBeTranslationKey, startsCapitalized } from '../../../../regEx'
import { TestContext } from '../../../../TestContext'

describe('BeziehungsMehrfachAuswahl', () => {
  describe('for normdatum "person"', () => {
    const knownValues = ['commissionedBy', 'author', 'scribe']
    const unknownValues = ['invalid']
    const value = knownValues.concat(unknownValues)
    let onChange: jest.Mock
    let user: UserEvent
    const roles: Record<string, string> = de.text_tagging.referenz.role
    beforeEach(() => {
      /* Normally values have to be contained in options. Since there are old
       * descriptions which can have any value, we have to support showing those.
       * MUI will currently log a warning, but as new descriptions won't have this
       * problem I assume that it is not a core requirement to work without
       * logging.
       */
      jest.spyOn(console, 'warn').mockImplementation(() => null)
      onChange = jest.fn()
      user = userEvent.setup()
      render(
        <TestContext>
          <BeziehungsMehrfachAuswahl
            value={value}
            normdatum="person"
            onChange={onChange}
          />
        </TestContext>
      )
    })

    it('combobox is labelled', () => {
      expect(
        screen.getByRole('combobox', {
          name: de.text_tagging.referenz.dialog.role,
        })
      ).toBeDefined()
    })

    it.each(knownValues)('known value "%s" is translated', (value) => {
      const name: string = roles[value] || value
      const button = screen.getByRole('button', { name })
      expect(button).toHaveTextContent(startsCapitalized)
    })

    it.each(knownValues)('known value "%s" not marked as warning', (value) => {
      const name: string = roles[value] || value
      const button = screen.getByRole('button', { name })
      expect(button).not.toHaveAttribute('MuiChip-colorWarning')
    })

    it.each(unknownValues)('unknown values are marked as warning', (value) => {
      expect(screen.getByRole('button', { name: value })).toHaveClass(
        'MuiChip-colorWarning'
      )
    })

    it('shows translated options', async () => {
      const open = screen.getByRole('button', { name: 'Open' })
      await user.click(open)

      screen
        .getAllByRole('option')
        .forEach((option) =>
          expect(option).not.toHaveTextContent(seemsToBeTranslationKey)
        )
    })

    it('adding an item adds it in the event handler', async () => {
      await user.click(screen.getByRole('button', { name: 'Open' }))
      await user.click(screen.getByRole('option', { name: roles.illuminator }))

      const [[call]] = onChange.mock.calls
      expect(call).toEqual(value.concat(['illuminator']))
    })

    it('deleting an item removes it in the handler', async () => {
      screen.getByRole('button', { name: 'invalid' }).focus()
      await user.keyboard('{Backspace}')

      const [[call]] = onChange.mock.calls
      expect(call).toEqual(knownValues)
    })
  })

  describe('with readOnly flag', () => {
    const roles = de.text_tagging.referenz.role
    let user: UserEvent
    beforeEach(() => {
      user = userEvent.setup()
      render(
        <TestContext>
          <BeziehungsMehrfachAuswahl
            normdatum="person"
            value={['scribe']}
            readOnly={true}
          />
        </TestContext>
      )
    })

    it('relationships are not a button', () => {
      expect(screen.getByText(roles.scribe)).not.toHaveRole('button')
    })

    it('has no options', async () => {
      await user.click(screen.getByRole('button', { name: 'Open' }))
      expect(screen.queryAllByRole('option')).toEqual([])
    })
  })

  describe('for normdatum with no relationships', () => {
    it("no options text get's translated", async () => {
      const user = userEvent.setup()
      render(
        <TestContext>
          <BeziehungsMehrfachAuswahl
            value={[]}
            normdatum="initium"
            onChange={jest.fn()}
          />
        </TestContext>
      )

      await user.click(screen.getByRole('button', { name: 'Open' }))

      expect(
        screen.getByText(de.text_tagging.referenz.dialog.no_roles)
      ).toBeTruthy()
    })
  })
})
