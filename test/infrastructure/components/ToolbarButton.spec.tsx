import { act, fireEvent, render, screen } from '@testing-library/react'
import { TagTextIcon } from 'src/domain/editor/icons/TagTextIcon'
import { ToolbarButton } from 'src/infrastructure/components/ToolbarButton'

describe('ToolbarButton', () => {
  it('has role "button"', () => {
    render(
      <ToolbarButton>
        <TagTextIcon />
      </ToolbarButton>
    )
    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('renders icon', () => {
    render(
      <ToolbarButton>
        <TagTextIcon />
      </ToolbarButton>
    )
    const svg = screen.getByRole('button').children[0]
    expect(svg.tagName).toBe('svg')
  })

  it('can be disabled', () => {
    render(
      <ToolbarButton disabled>
        <TagTextIcon />
      </ToolbarButton>
    )
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })

  it('attaches click handler', () => {
    const handleClick = jest.fn()
    render(
      <ToolbarButton onClick={handleClick}>
        <TagTextIcon />
      </ToolbarButton>
    )
    const btn = screen.getByRole('button')
    expect(handleClick.mock.calls).toHaveLength(0)
    act(() => fireEvent.click(btn))
    expect(handleClick.mock.calls).toHaveLength(1)
  })
})
