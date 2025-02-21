/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { render } from '@testing-library/react'

import { XMLElementVorschau } from '../../../../../src/domain/toolbar/xmlVorschau/nodes/XMLElementVorschau'

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
