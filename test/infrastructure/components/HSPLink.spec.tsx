import { render, screen } from '@testing-library/react'
import { HSPLink } from 'src/infrastructure/components/HSPLink'

describe('HSPLink', () => {
  it('renders children', () => {
    render(<HSPLink url="https://example.com">Click me</HSPLink>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders with correct href attribute', () => {
    render(<HSPLink url="https://example.com">Link text</HSPLink>)
    const link = screen.getByRole('link', { name: 'Link text' })
    expect(link).toHaveAttribute('href', 'https://example.com')
  })
})
