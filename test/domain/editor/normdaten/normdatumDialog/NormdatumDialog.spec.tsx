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

import { NormdatumDialog } from '../../../../../src/domain/editor/normdaten/normdatumDialog/NormdatumDialog'
import { NormdatumDialogState } from '../../../../../src/domain/editor/normdaten/normdatumDialog/NormdatumDialogState'
import de from '../../../../../src/infrastructure/i18n/translation_de.json'
import { TestContext } from '../../../../TestContext'

describe('Normdatum Dialog', () => {
  describe('read mode', () => {
    const initialState: NormdatumDialogState = {
      view: 'read',
      status: 'idle',
      type: 'person',
      identifier: '123',
      text: 'Pytagoras',
      rollen: [],
    }

    it('renders text', () => {
      render(
        <TestContext>
          <NormdatumDialog onAction={jest.fn()} initialState={initialState} />
        </TestContext>
      )
      expect(
        screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_text)
      ).toHaveValue(initialState.text)
    })

    it('shows preferred name and id of normdatum', () => {
      render(
        <TestContext>
          <NormdatumDialog onAction={jest.fn()} initialState={initialState} />
        </TestContext>
      )
      expect(
        screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_link)
      ).toHaveValue(de.api_call.state.loading)
      expect(screen.getByText(initialState.identifier)).toBeTruthy()
    })

    it('closing dialog sends "back"', async () => {
      const onAction = jest.fn()
      render(
        <TestContext>
          <NormdatumDialog onAction={onAction} initialState={initialState} />
        </TestContext>
      )
      await userEvent.click(
        screen.getByRole('button', { name: de.editor.close_dialog })
      )
      expect(onAction.mock.lastCall).toMatchObject(['back', initialState])
    })
  })

  describe('create modus', () => {
    it('determine action dialog sends "submit"', async () => {
      const initialState: NormdatumDialogState = {
        view: 'create',
        status: 'filled',
        type: 'person',
        text: 'Pytagoras',
        rollen: ['author'],
        normdatum: {
          preferredName: 'Pyth',
          gndIdentifier: '123',
        },
      }
      const onAction = jest.fn()
      render(
        <TestContext>
          <NormdatumDialog onAction={onAction} initialState={initialState} />
        </TestContext>
      )
      await userEvent.click(
        screen.getByRole('button', {
          name: de.editor.determine,
        })
      )
      expect(onAction.mock.lastCall).toMatchObject(['submit', initialState])
    })

    it('empty state has disabled determine action button', async () => {
      const initialState: NormdatumDialogState = {
        view: 'create',
        status: 'empty',
        type: 'person',
        text: 'Pytagoras',
        rollen: [],
      }
      render(
        <TestContext>
          <NormdatumDialog onAction={jest.fn()} initialState={initialState} />
        </TestContext>
      )
      expect(
        screen.getByRole('button', {
          name: de.editor.determine,
        })
      ).toBeDisabled()
    })
  })

  describe('edit modus', () => {
    const initialState: NormdatumDialogState = {
      view: 'edit',
      status: 'idle',
      type: 'person',
      text: 'Pytagoras',
      normdatum: {
        gndIdentifier: '123',
        preferredName: 'Pythagoras',
      },
      rollen: ['author'],
    }

    it('determine action dialog sends "submit"', async () => {
      const onAction = jest.fn()
      render(
        <TestContext>
          <NormdatumDialog onAction={onAction} initialState={initialState} />
        </TestContext>
      )
      await userEvent.click(
        screen.getByRole('button', {
          name: de.editor.determine,
        })
      )
      expect(onAction.mock.lastCall).toMatchObject(['submit', initialState])
    })

    it('changing text and determine sends submit', async () => {
      const onAction = jest.fn()
      render(
        <TestContext>
          <NormdatumDialog onAction={onAction} initialState={initialState} />
        </TestContext>
      )
      const append = ' - update'
      await userEvent.type(
        screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_text),
        append
      )
      await userEvent.click(
        screen.getByRole('button', {
          name: de.editor.determine,
        })
      )
      expect(onAction.mock.lastCall).toMatchObject([
        'submit',
        { ...initialState, text: initialState.text + append },
      ])
    })
  })
})
