import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NormdatumDialog } from 'src/domain/editor/dialoge/NormdatumDialog'
import type { NormdatumDialogState } from 'src/domain/editor/dialoge/normdatumDialog/NormdatumDialogState'
import de from 'src/infrastructure/i18n/translation_de.json'
import { MockNormdatenService } from 'test/infrastructure/normdaten/MockNormdatenService'
import { TestContext } from 'test/TestContext'

describe('Normdatum Dialog', () => {
  const service = MockNormdatenService('/', 100)
  beforeAll(() => service.listen())
  afterEach(() => service.resetHandlers())
  afterAll(() => service.close())

  describe('read mode', () => {
    const initialState: NormdatumDialogState = {
      view: 'read',
      status: 'idle',
      type: 'person',
      identifier: '118575449',
      text: 'Martin Luther',
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

    it('fills in preferred name and id of normdatum', async () => {
      render(
        <TestContext>
          <NormdatumDialog onAction={jest.fn()} initialState={initialState} />
        </TestContext>
      )

      expect(
        screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_link)
      ).toHaveValue(de.api_call.state.loading)
      await waitFor(() => {
        expect(
          screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_link)
        ).not.toHaveValue(de.api_call.state.loading)
      })
      expect(
        screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_link)
      ).toHaveValue('Luther, Martin')

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
