import { render, screen } from '@testing-library/react'
import { NotationChip } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/NotationChip'

describe('NotationChip', () => {
  const notation = 'marker'
  it('renders notation', () => {
    render(<NotationChip notation={notation} />)
    expect(screen.getByText(notation)).toBeVisible()
  })

  it('is not clickable if no uri is provided', () => {
    render(<NotationChip notation={notation} />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('is clickable if uri is provided', () => {
    render(<NotationChip notation={notation} uri={'something'} />)
    expect(screen.getByRole('button')).toBeVisible()
  })
})
