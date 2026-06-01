import { render, screen } from '@testing-library/react'
import { ErrorDialog } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/ErrorDialog'
import { TestContext } from 'test/TestContext'

describe('ErrorDialog', () => {
  test('renders dialog', () => {
    render(
      <TestContext>
        <ErrorDialog notation={'BNDG'} />
      </TestContext>
    )
    expect(screen.getByRole('dialog')).toBeVisible()
  })
  test('shows notation', () => {
    render(
      <TestContext>
        <ErrorDialog notation={'BNDG'} />
      </TestContext>
    )
    expect(screen.getByRole('dialog')).toHaveTextContent(/BNDG/)
  })
})
