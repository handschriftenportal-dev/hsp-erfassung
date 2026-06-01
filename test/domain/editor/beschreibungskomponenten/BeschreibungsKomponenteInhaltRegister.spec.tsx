import { render, screen } from '@testing-library/react'
import { BeschreibungsKomponenteInhaltRegister } from 'src/domain/editor/beschreibungskomponenten/BeschreibungsKomponenteInhaltRegister'
import translation from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Beschreibungs Komponente Inhalt (Register)', () => {
  const element = {
    data_origin: 'note',
    data_type: 'register',
    component: 'noteregister',
    children: [{ text: '' }],
  }
  const attributes = TestSlateAttributes.element

  it('shows component label', () => {
    render(
      <TestContext>
        <BeschreibungsKomponenteInhaltRegister
          element={element}
          attributes={attributes}
        >
          Children
        </BeschreibungsKomponenteInhaltRegister>
      </TestContext>
    )
    expect(screen.getByText(translation.sidebar.content_register)).toBeTruthy()
  })

  it('renders children', () => {
    render(
      <TestContext>
        <BeschreibungsKomponenteInhaltRegister
          element={element}
          attributes={attributes}
        >
          <span data-testid="content">Children</span>
        </BeschreibungsKomponenteInhaltRegister>
      </TestContext>
    )
    expect(screen.getByTestId('content')).toHaveTextContent('Children')
  })

  it('attaches attributes', () => {
    render(
      <TestContext>
        <BeschreibungsKomponenteInhaltRegister
          element={element}
          attributes={attributes}
        >
          <span data-testid="content">Children</span>
        </BeschreibungsKomponenteInhaltRegister>
      </TestContext>
    )
    const content = screen.getByTestId('content').parentElement!
      .parentElement as HTMLElement
    expect(content).toHaveAttribute('data-slate-node')
    expect(content.getAttribute('data-slate-node')).toBe(
      attributes['data-slate-node']
    )
  })
})
