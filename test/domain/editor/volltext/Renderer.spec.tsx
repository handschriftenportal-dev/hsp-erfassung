import { render, screen } from '@testing-library/react'
import { Renderer } from 'src/domain/editor/volltext/Renderer'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Renderer', () => {
  describe('element', () => {
    const element = {
      data_origin: 'paragraph',
      children: [{ text: '' }],
    }
    const children = <button />
    beforeEach(() => {
      render(
        Renderer.element({
          attributes: TestSlateAttributes.element,
          children,
          element,
        })
      )
    })
    it('renders children', () => {
      expect(screen.getByRole('button')).toBeVisible()
    })
    it('attaches attributes', () => {
      expect(document.querySelector('#element-marker')).toBeVisible()
    })
  })
  describe('leaf', () => {
    const leaf = { text: 'leaf' }
    const children = <button />
    beforeEach(() => {
      render(
        Renderer.leaf({
          attributes: TestSlateAttributes.leaf,
          children,
          leaf,
          text: leaf,
        })
      )
    })
    it('renders children', () => {
      expect(screen.getByRole('button')).toBeVisible()
    })
    it('attaches attributes', () => {
      expect(document.querySelector('#leaf-marker')).toBeVisible()
    })
  })
})
