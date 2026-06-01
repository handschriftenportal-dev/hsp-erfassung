import { render } from '@testing-library/react'
import { XMLTextVorschau } from 'src/domain/toolbar/dialog/nodes/XMLTextVorschau'

describe('XMLTextVorschau', () => {
  it('renders text', () => {
    const { baseElement } = render(
      <XMLTextVorschau node={{ text: 'hello world' }} level={0} />
    )
    expect(baseElement.textContent).toBe('hello world\n')
  })
  it('indents', () => {
    const { baseElement } = render(
      <XMLTextVorschau node={{ text: 'hello world' }} level={4} />
    )
    expect(baseElement.textContent).toBe('        hello world\n')
  })
  it('breaks text up to max line length', () => {
    const longText = 'A'.repeat(30)
    const { baseElement } = render(
      <XMLTextVorschau
        node={{ text: `${longText} ${longText} ${longText}` }}
        level={0}
      />
    )
    expect(baseElement.textContent).toBe(
      `${longText} ${longText}\n${longText}\n`
    )
  })
})
