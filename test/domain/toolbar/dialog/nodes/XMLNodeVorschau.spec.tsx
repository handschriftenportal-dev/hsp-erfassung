import { render, screen } from '@testing-library/react'
import { XMLNodeVorschau } from 'src/domain/toolbar/dialog/nodes/XMLNodeVorschau'

describe('XMLNodeVorschau', () => {
  it('renders XMLText', () => {
    render(<XMLNodeVorschau node={{ text: 'hello world' }} level={0} />)
    expect(screen.getByText('hello world')).toBeVisible()
  })
})
