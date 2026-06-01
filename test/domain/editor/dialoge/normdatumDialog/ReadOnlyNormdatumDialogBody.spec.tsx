import { render, screen } from '@testing-library/react'
import type { NormdatumDialogState } from 'src/domain/editor/dialoge/normdatumDialog/NormdatumDialogState'
import { ReadOnlyNormdatumDialogBody } from 'src/domain/editor/dialoge/normdatumDialog/ReadOnlyNormdatumDialogBody'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('ReadOnlyNormdatumDialogBody', () => {
  const state: NormdatumDialogState = {
    view: 'read',
    status: 'idle',
    type: 'person',
    text: 'xxx',
    rollen: [],
    identifier: '123',
  }
  beforeEach(() => {
    render(
      <TestContext>
        <ReadOnlyNormdatumDialogBody state={state} />
      </TestContext>
    )
  })

  it(`has labeled element "normdata_text"`, () => {
    expect(
      screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_text)
    ).toHaveValue(state.text)
  })

  it(`has labeled element "normdata_link"`, () => {
    expect(
      screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_link)
    ).toBeVisible()
  })

  it(`has labeled element "role"`, () => {
    expect(
      screen.getByLabelText(de.text_tagging.referenz.dialog.role_other)
    ).toBeVisible()
  })

  it(`has button to open`, () => {
    expect(
      screen.getByRole('button', {
        name: de.text_tagging.referenz.dialog.open_action,
      })
    ).toBeVisible()
  })
})
