import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HSPToolbarButton } from 'src/domain/toolbar/styles/HSPToolbarButton'

describe('HSPToolbarButton', () => {
  it('renders a button', () => {
    render(<HSPToolbarButton />)
    expect(screen.getByRole('button')).toBeVisible()
  })
  it('button is a icon button', () => {
    render(<HSPToolbarButton />)
    expect(screen.getByRole('button').classList).toContain('MuiIconButton-root')
  })
  it('title is accessible', () => {
    render(<HSPToolbarButton title="Click me" />)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeVisible()
  })
  it('supports onClick handler', async () => {
    const handler = jest.fn()
    render(<HSPToolbarButton onClick={handler} />)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalled()
  })

  it('supports secondary class', () => {
    render(<HSPToolbarButton color="secondary" />)
    expect(screen.getByRole('button').classList).toContain(
      'MuiIconButton-colorSecondary'
    )
  })
})
