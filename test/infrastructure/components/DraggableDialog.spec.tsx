import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('DraggableDialog', () => {
  it('renders dialog', () => {
    render(
      <TestContext>
        <DraggableDialog title={'Title'}>Content</DraggableDialog>
      </TestContext>
    )
    expect(screen.getByRole('dialog')).toBeVisible()
  })

  it('renders children', () => {
    render(
      <TestContext>
        <DraggableDialog title={'Title'}>Content</DraggableDialog>
      </TestContext>
    )
    expect(screen.getByText('Content')).toBeVisible()
  })

  it('renders title', () => {
    render(
      <TestContext>
        <DraggableDialog title={'Title'}>Content</DraggableDialog>
      </TestContext>
    )
    expect(screen.getByRole('heading', { name: 'Title' })).toBeVisible()
  })

  it('does not render close icon by default', () => {
    render(
      <TestContext>
        <DraggableDialog title={'Title'}>Content</DraggableDialog>
      </TestContext>
    )
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('does render close icon when provided onClose', async () => {
    const onClose = jest.fn()
    render(
      <TestContext>
        <DraggableDialog title={'Title'} onClose={onClose}>
          Content
        </DraggableDialog>
      </TestContext>
    )
    const button = screen.queryByRole('button', {
      name: de.editor.close_dialog,
    })!
    expect(button).toBeVisible()
    expect(onClose).not.toHaveBeenCalled()
    await userEvent.click(button)
    expect(onClose).toHaveBeenCalled()
  })
})
