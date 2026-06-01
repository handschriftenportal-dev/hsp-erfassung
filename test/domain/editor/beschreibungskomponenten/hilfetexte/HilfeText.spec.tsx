import { render } from '@testing-library/react'
import { HilfeText } from 'src/domain/editor/beschreibungskomponenten/hilfetexte'

describe('Hilfetext Komponente', () => {
  it('Render helpText', () => {
    const { getByText } = render(<HilfeText helpText="Hilfe!" />)

    expect(getByText('Hilfe!')).toBeDefined()
  })

  it('Render nothing if no help texted is passed', () => {
    const { container } = render(<HilfeText helpText="" />)

    expect(container.childElementCount).toBe(0)
  })
})
