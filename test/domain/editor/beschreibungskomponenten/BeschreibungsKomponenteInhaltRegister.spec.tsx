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

import { render, screen } from '@testing-library/react'

import { BeschreibungsKomponenteInhaltRegister } from '../../../../src/domain/editor/beschreibungskomponenten/BeschreibungsKomponenteInhaltRegister'
import translation from '../../../../src/infrastructure/i18n/translation_de.json'
import { TestContext } from '../../../TestContext'

describe('Beschreibungs Komponente Inhalt (Register)', () => {
  const element = {
    data_origin: 'note',
    data_type: 'register',
    component: 'noteregister',
    children: [{ text: '' }],
  }
  const attributes: any = { 'data-slate-node': 'needle', ref: null }

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
