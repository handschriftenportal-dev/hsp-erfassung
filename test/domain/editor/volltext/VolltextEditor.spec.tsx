import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VolltextEditor } from 'src/domain/editor/volltext/VolltextEditor'
import { updateMode, writeDocument } from 'src/domain/erfassung/ErfassungsState'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('VolltextEditor', () => {
  beforeEach(() => {
    const store = configureTestStore()
    store.dispatch(updateMode('editMode'))
    store.dispatch(writeDocument())
    render(
      <TestContext store={store}>
        <VolltextEditor
          initialValue={[
            {
              data_origin: 'paragraph',
              children: [{ text: '' }],
            },
          ]}
        />
      </TestContext>
    )
  })

  it('renders textbox', () => {
    expect(screen.getByRole('textbox')).toBeVisible()
  })

  it('can edit content', async () => {
    const editor = screen.getByRole('textbox')
    await userEvent.type(editor, 'hello world')
    expect(editor).toHaveTextContent('hello world')
  })
})
