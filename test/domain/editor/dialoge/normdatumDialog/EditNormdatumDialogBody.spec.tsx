import { render, screen } from '@testing-library/react'
import { EditNormdatumDialogBody } from 'src/domain/editor/dialoge/normdatumDialog/EditNormdatumDialogBody'
import { NormdatumDialogState } from 'src/domain/editor/dialoge/normdatumDialog/NormdatumDialogState'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('EditNormdatumDialogBody', () => {
  const createEmpty = NormdatumDialogState.new.create('person')
  const createSearch = NormdatumDialogState.new.create('person', 'Text')
  const createFilled: NormdatumDialogState = {
    ...createEmpty,
    status: 'filled',
    rollen: ['author'],
    normdatum: {
      preferredName: 'Found',
      gndIdentifier: '1234',
      identifier: 'NORM-5678',
    },
  }
  const editIdle: NormdatumDialogState = {
    view: 'edit',
    status: 'idle',
    type: 'person',
    text: 'Pytagoras',
    normdatum: {
      gndIdentifier: '123',
      preferredName: 'Pythagoras',
    },
    rollen: ['author', 'other'],
  }
  const {
    normdata_text,
    normdata_text_create,
    normdata_link,
    normdata_link_create,
    role_one,
    role_other,
  } = de.text_tagging.referenz.dialog

  const testCases = [
    [createEmpty, normdata_text_create, normdata_link_create, role_other],
    [createSearch, normdata_text_create, normdata_link_create, role_other],
    [createFilled, normdata_text_create, normdata_link_create, role_one],
    [editIdle, normdata_text, normdata_link, role_other],
  ] as const

  describe.each(testCases)(
    'has translated labelled element',
    (initialState, textLabel, linkLabel, roleLabel) => {
      beforeEach(() => {
        render(
          <TestContext>
            <EditNormdatumDialogBody
              initialState={initialState}
              onAction={jest.fn()}
            />
          </TestContext>
        )
      })

      it(`"${textLabel}" for status "${initialState.status}"`, () => {
        expect(screen.getByLabelText(textLabel)).toHaveValue(initialState.text)
      })

      it(`"${linkLabel}" for status "${initialState.status}"`, () => {
        expect(screen.getByLabelText(linkLabel)).toBeVisible()
      })

      it(`"${roleLabel}" for status "${initialState.status}"`, () => {
        expect(screen.getByLabelText(roleLabel)).toBeVisible()
      })

      it(`button to submit on for status "${initialState.status}"`, () => {
        expect(
          screen.getByRole('button', { name: de.editor.determine })
        ).toBeVisible()
      })

      it(`button to cancel on for status "${initialState.status}"`, () => {
        expect(
          screen.getByRole('button', { name: de.editor.cancellation })
        ).toBeVisible()
      })

      const deletable = NormdatumDialogState.is.deletable(initialState)

      it(`button to delete is ${deletable ? '' : 'visible'} for status "${initialState.status}"`, () => {
        expect(
          screen.queryByRole('button', {
            name: de.editor.remove_normdata_reference,
          }) !== null
        ).toBe(deletable)
      })
    }
  )
})
