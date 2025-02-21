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

import { XMLVorschauDialog } from '../../../../src/domain/toolbar/xmlVorschau/XMLVorschauDialog'
import de from '../../../../src/infrastructure/i18n/translation_de.json'
import { XMLTransformation } from '../../../../src/infrastructure/slate/transformation/XMLTransformation'
import Loader from '../../../LoadPublic'
import { TestContext } from '../../../TestContext'

describe('XML Vorschau Dialog', () => {
  const { transform } = XMLTransformation
  const { data: document } = transform({ data: Loader.loremIpsum() })

  it('renders a dialog', () => {
    render(
      <TestContext>
        <XMLVorschauDialog document={document} />
      </TestContext>
    )
    expect(screen.getByRole('dialog')).toBeVisible()
  })

  it('title is translated', () => {
    render(
      <TestContext>
        <XMLVorschauDialog document={document} />
      </TestContext>
    )
    expect(
      screen.getByRole('heading', { name: de.xml_preview_dialog.title })
    ).toBeVisible()
  })
  it('close action is translated', () => {
    render(
      <TestContext>
        <XMLVorschauDialog document={document} />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.xml_preview_dialog.close_action })
    ).toBeVisible()
  })
  it('copy action is translated', () => {
    render(
      <TestContext>
        <XMLVorschauDialog document={document} />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.xml_preview_dialog.copy_action })
    ).toBeVisible()
  })
})
