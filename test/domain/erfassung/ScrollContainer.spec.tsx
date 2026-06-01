import { render, screen } from '@testing-library/react'
import { ScrollContainer } from 'src/domain/erfassung/ScrollContainer'

describe('ScrollContainer', () => {
  const children = 'children'
  const containerId = 'containerId'

  test('Children get inserted', () => {
    render(<ScrollContainer>{children}</ScrollContainer>)
    expect(screen.getByText(children)).toBeTruthy()
  })

  test('containerId becomes id', () => {
    render(
      <ScrollContainer containerId={containerId}>{children}</ScrollContainer>
    )
    const scrollContainer = screen.getByTestId('scroll-container')
    expect(scrollContainer).toBeTruthy()
    expect(scrollContainer.getAttribute('id')).toBe(containerId)
  })

  test('Without containerId id is null', () => {
    render(<ScrollContainer>{children}</ScrollContainer>)
    const scrollContainer = screen.getByTestId('scroll-container')
    expect(scrollContainer).toBeTruthy()
    expect(scrollContainer.getAttribute('id')).toBe(null)
  })
})
