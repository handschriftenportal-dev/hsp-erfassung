import { render } from '@testing-library/react'
import { XMLElementVorschau } from 'src/domain/toolbar/dialog/nodes/XMLElementVorschau'

describe('XMLElementVorschau', () => {
  it('renders element without attributes', () => {
    const { baseElement } = render(
      <XMLElementVorschau
        node={{ tag: 'p', attributes: {}, children: [{ text: 'hello world' }] }}
        level={0}
      />
    )
    expect(baseElement.textContent).toBe('<p>\n  hello world\n</p>\n')
  })
  it('renders open tag of element with single attribute in one line', () => {
    const { baseElement } = render(
      <XMLElementVorschau
        node={{
          tag: 'p',
          attributes: { x: '1' },
          children: [{ text: 'hello world' }],
        }}
        level={0}
      />
    )
    expect(baseElement.textContent).toBe('<p x="1">\n  hello world\n</p>\n')
  })
  it('renders open tag of element with multiple attributes on multiple lines', () => {
    const { baseElement } = render(
      <XMLElementVorschau
        node={{
          tag: 'p',
          attributes: { x: '1', y: '2' },
          children: [{ text: 'hello world' }],
        }}
        level={0}
      />
    )
    expect(baseElement.textContent).toBe(
      '<p\n  x="1"\n  y="2"\n>\n  hello world\n</p>\n'
    )
  })

  it('renders empty element', () => {
    const { baseElement } = render(
      <XMLElementVorschau
        node={{
          tag: 'p',
          attributes: {},
          children: [{ text: '' }],
        }}
        level={0}
      />
    )
    expect(baseElement.textContent).toBe('<p />\n')
  })

  it('renders empty element with one attribute', () => {
    const { baseElement } = render(
      <XMLElementVorschau
        node={{
          tag: 'p',
          attributes: { x: '1' },
          children: [{ text: '' }],
        }}
        level={1}
      />
    )
    expect(baseElement.textContent).toBe('  <p x="1" />\n')
  })

  it('renders empty element with multiple attributes', () => {
    const { baseElement } = render(
      <XMLElementVorschau
        node={{
          tag: 'p',
          attributes: { x: '1', y: '2', z: '3' },
          children: [{ text: '' }],
        }}
        level={1}
      />
    )
    expect(baseElement.textContent).toBe(
      '  <p\n    x="1"\n    y="2"\n    z="3"\n  />\n'
    )
  })
})
