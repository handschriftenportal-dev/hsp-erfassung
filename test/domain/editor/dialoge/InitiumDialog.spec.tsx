import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InitiumDialog } from 'src/domain/editor/dialoge/InitiumDialog'
import { InitiumDialogState } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogState'
import type { Initium } from 'src/domain/erfassung/Initium'
import de from 'src/infrastructure/i18n/translation_de.json'
import { MockNormdatenService } from 'test/infrastructure/normdaten/MockNormdatenService'
import { TestContext } from 'test/TestContext'

describe('InitiumDialog', () => {
  const service = MockNormdatenService('/', 100)
  beforeAll(() => service.listen())
  afterEach(() => service.resetHandlers())
  afterAll(() => service.close())

  const textState = InitiumDialogState.new({ text: 'hello world' })

  it('renders dialog', () => {
    render(
      <TestContext>
        <InitiumDialog initialState={textState} />
      </TestContext>
    )
    expect(screen.getByRole('dialog')).toBeVisible()
  })

  it('displays dialog title', () => {
    render(
      <TestContext>
        <InitiumDialog initialState={textState} />
      </TestContext>
    )
    expect(
      screen.getByRole('heading', { name: de.initium_dialog.title })
    ).toBeVisible()
  })

  it('initializes with text from initialValue', () => {
    render(
      <TestContext>
        <InitiumDialog initialState={textState} />
      </TestContext>
    )
    expect(screen.getByLabelText(de.initium_dialog.linked_text)).toHaveValue(
      'hello world'
    )
  })

  it('shows withoutInitium state when no href is provided', () => {
    render(
      <TestContext>
        <InitiumDialog initialState={textState} />
      </TestContext>
    )
    expect(
      screen.getByText(de.initium_dialog.detail_view.no_initium_selected)
    ).toBeVisible()
  })

  it('shows loadingFromUri state when uri and id is provided', () => {
    render(
      <TestContext>
        <InitiumDialog
          initialState={InitiumDialogState.new({
            text: 'test text',
            uri: 'https://example.com/initium/Norm-123',
            id: 'Norm-123',
          })}
        />
      </TestContext>
    )
    expect(
      screen.getByText(de.initium_dialog.detail_view.loading_initium)
    ).toBeVisible()
  })

  it('renders text input field', () => {
    render(
      <TestContext>
        <InitiumDialog initialState={textState} />
      </TestContext>
    )
    expect(screen.getByLabelText(de.initium_dialog.linked_text)).toBeVisible()
  })

  it('renders autocomplete search field', () => {
    render(
      <TestContext>
        <InitiumDialog initialState={textState} />
      </TestContext>
    )
    expect(
      screen.getByLabelText(de.initium_dialog.search_initium)
    ).toBeVisible()
  })

  it('disables save button when no initium is selected', () => {
    render(
      <TestContext>
        <InitiumDialog initialState={textState} />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.initium_dialog.save_action })
    ).toBeDisabled()
  })

  it('allows text input when not in readonly mode', async () => {
    const user = userEvent.setup()
    render(
      <TestContext>
        <InitiumDialog initialState={textState} />
      </TestContext>
    )

    const input = screen.getByLabelText(de.initium_dialog.linked_text)
    await user.clear(input)
    await user.type(input, 'new text')

    expect(input).toHaveValue('new text')
  })

  it('renders in readonly mode', () => {
    render(
      <TestContext>
        <InitiumDialog
          initialState={InitiumDialogState.new({
            text: 'hallo welt',
            readOnly: true,
          })}
        />
      </TestContext>
    )
    expect(screen.getByRole('dialog')).toBeVisible()
  })

  it('does render delete button when onDelete is provided', () => {
    render(
      <TestContext>
        <InitiumDialog
          initialState={InitiumDialogState.new({
            text: 'hallo welt',
          })}
          onDelete={jest.fn()}
        />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.initium_dialog.delete_action })
    ).toBeVisible()
  })

  it('does not render delete button in readonly mode', () => {
    render(
      <TestContext>
        <InitiumDialog
          initialState={InitiumDialogState.new({
            text: 'hallo welt',
            readOnly: true,
          })}
          onDelete={jest.fn()}
        />
      </TestContext>
    )
    expect(
      screen.queryByRole('button', { name: de.initium_dialog.delete_action })
    ).toBeNull()
  })

  it('onChange saves initium if set', async () => {
    const user = userEvent.setup()
    const mockInitium: Initium = {
      id: 'NORM-d8a86aaf-f80f-4d5c-85f8-e6d39eeddba2',
      text: 'In principio erat Verbum',
      uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/initia/NORM-d8a86aaf-f80f-4d5c-85f8-e6d39eeddba2',
      alternativeText: ['Alternative 1', 'Alternative 2'],
      languages: [
        {
          id: 'lang-1',
          variantName: [
            { isoCode: 'de', text: 'Latein' },
            { isoCode: 'en', text: 'Latin' },
          ],
        },
      ],
    }

    const onSave = jest.fn()
    render(
      <TestContext>
        <InitiumDialog
          initialState={{
            status: 'withInitium',
            text: 'hallo welt',
            initium: mockInitium,
            readOnly: false,
          }}
          onSave={onSave}
        />
      </TestContext>
    )
    await user.click(
      screen.getByRole('button', { name: de.initium_dialog.save_action })
    )
    expect(onSave).toHaveBeenCalledWith('hallo welt', mockInitium)
  })
})
