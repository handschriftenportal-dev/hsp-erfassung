import { render, screen } from '@testing-library/react'
import { Box } from 'src/domain/editor/volltext/components/Box'
import type { VolltextBox } from 'src/infrastructure/slate/volltext/VolltextElement'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Box', () => {
  const attributes = TestSlateAttributes.element
  const box: VolltextBox = {
    data_origin: 'box',
    children: [{ text: '' }],
    box: { data_origin: 'anything', children: [] },
    content: 'Boxcontent',
  }
  it('renders children', () => {
    render(
      <Box element={box} attributes={attributes}>
        <button />
      </Box>
    )
    expect(screen.getByRole('button')).toBeVisible()
  })
  it('renders content', () => {
    render(
      <Box element={box} attributes={attributes}>
        <button />
      </Box>
    )
    expect(screen.getByText('Boxcontent')).toBeVisible()
  })
  it('attaches attributes', () => {
    render(
      <Box element={box} attributes={attributes}>
        <button />
      </Box>
    )
    expect(document.querySelector('#element-marker')).toBeVisible()
  })
})
