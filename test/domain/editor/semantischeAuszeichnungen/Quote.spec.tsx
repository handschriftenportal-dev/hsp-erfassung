import { render, screen } from '@testing-library/react'
import type { Element } from 'slate'
import { SemantischeZitate } from 'src/domain/editor/semantischeAuszeichnungen/SemantischeZitate'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Quote', () => {
  const other: Element = { data_origin: 'quote', children: [{ text: 'Zitat' }] }
  const incipit = { ...other, data_type: 'incipit' } as Element
  const explizit = { ...other, data_type: 'explizit' } as Element
  const attributes = TestSlateAttributes.element

  describe.each([
    ['Incipit', incipit],
    ['Explizit', explizit],
    ['Anderes Zitat', other],
  ])('of type %s', (_title, element) => {
    it("has semantic html, i.e. get's rendered as <q>", () => {
      render(
        <SemantischeZitate element={element} attributes={attributes}>
          Zitat
        </SemantischeZitate>
      )
      expect(screen.getByText('Zitat').tagName).toBe('Q')
    })

    it('is rendered italic without quotation marks', () => {
      render(
        <SemantischeZitate element={element} attributes={attributes}>
          Zitat
        </SemantischeZitate>
      )
      expect(screen.getByText('Zitat')).toHaveStyle(
        'font-style: italic; quotes: none'
      )
    })
  })
})
