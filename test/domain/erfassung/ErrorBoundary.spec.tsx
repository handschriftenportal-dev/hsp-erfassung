import { render, screen } from '@testing-library/react'
import ErrorBoundary from 'src/domain/erfassung/ErrorBoundary'
import { TestContext } from 'test/TestContext'

test('ErrorBoundary Test', () => {
  const Throws = () => {
    throw new Error('Oh no!')
  }
  jest.spyOn(console, 'error').mockImplementation(() => null)

  render(
    <TestContext>
      <ErrorBoundary>
        <Throws />
      </ErrorBoundary>
    </TestContext>
  )

  expect(
    screen.getByText(
      'Ein Fehler ist aufgetreten. Bitte wenden Sie sich an unseren Helpdesk'
    )
  ).toBeVisible()
  expect(screen.getByText('Oh no!')).toBeVisible()
})
