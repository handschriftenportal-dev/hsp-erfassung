import { render, screen } from '@testing-library/react'
import { Block } from 'src/domain/editor/volltext/components/Block'
import type { VolltextBlock } from 'src/infrastructure/slate/volltext/VolltextElement'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Block', () => {
  const attributes = TestSlateAttributes.element
  const block: VolltextBlock = {
    data_origin: 'paragraph',
    children: [{ text: '' }],
  }
  it('renders children', () => {
    render(
      <Block element={block} attributes={attributes}>
        <button />
      </Block>
    )
    expect(screen.getByRole('button')).toBeVisible()
  })
  it('attaches attributes', () => {
    render(
      <Block element={block} attributes={attributes}>
        <button />
      </Block>
    )
    expect(document.querySelector('#element-marker')).toBeVisible()
  })
})
