import { render, screen } from '@testing-library/react'
import { Leaf } from 'src/domain/editor/volltext/components/Leaf'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Leaf', () => {
  const attributes = TestSlateAttributes.leaf
  const leaf = { text: 'hi' }

  it('renders children', () => {
    render(
      <Leaf leaf={leaf} text={leaf} attributes={attributes}>
        <button />
      </Leaf>
    )
    expect(screen.getByRole('button')).toBeVisible()
  })

  it('renders superskript inside <sup>', () => {
    const superskript = { text: 'hi', superskript: true }
    render(
      <Leaf leaf={superskript} text={leaf} attributes={attributes}>
        content
      </Leaf>
    )
    const container = screen.getByText('content')
    expect(container.tagName).toBe('SUP')
  })

  it('attaches attributes', () => {
    render(
      <Leaf leaf={leaf} text={leaf} attributes={attributes}>
        <button />
      </Leaf>
    )
    expect(document.querySelector('#leaf-marker')).toBeVisible()
  })
})
