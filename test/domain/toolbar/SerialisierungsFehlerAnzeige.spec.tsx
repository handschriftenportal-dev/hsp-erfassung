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

import { SerializationError } from '../../../src/domain/erfassung/transformation/SerializationError'
import { SerialisierungsFehlerAnzeige } from '../../../src/domain/toolbar/SerialisierungsFehlerAnzeige'
import de from '../../../src/infrastructure/i18n/translation_de.json'
import { TestContext } from '../../TestContext'

describe('Serialisierungs Fehler Anzeige', () => {
  const serializationErrors: SerializationError[] = [
    {
      level: SerializationError.level.error,
      errorCode: SerializationError.errorCode.TEITransformationError,
      detail: undefined,
      tag: 'NONE',
    },
    {
      level: SerializationError.level.warning,
      errorCode: SerializationError.errorCode.unknownVolltextElement,
      detail: {
        data_origin: 'initium',
        content: 'Lorem ipsum dolor sit',
        id: 'NORM-38100b09-dc4c-4c7b-88f5-02dd7c1bcf17',
        children: [{ text: '' }],
      },
      tag: 'initium',
    },
    {
      level: SerializationError.level.info,
      errorCode: SerializationError.errorCode.unknownBeschreibungsKomponente,
      detail: [{ data_origin: 'TEI', children: undefined }],
      tag: 'NONE',
    },
  ]
  it('renders title', () => {
    render(
      <TestContext>
        <SerialisierungsFehlerAnzeige
          serializationError={serializationErrors}
        />
      </TestContext>
    )
    expect(
      screen.getByRole('heading', {
        name: de.toolbar.serialization_error_view.title,
      })
    ).toBeVisible()
  })

  it('renders close button', () => {
    render(
      <TestContext>
        <SerialisierungsFehlerAnzeige
          serializationError={serializationErrors}
        />
      </TestContext>
    )
    expect(screen.getByRole('button')).toBeVisible()
  })

  it('renders list', () => {
    render(
      <TestContext>
        <SerialisierungsFehlerAnzeige
          serializationError={serializationErrors}
        />
      </TestContext>
    )
    expect(screen.getByRole('list')).toBeVisible()
  })

  it('renders errors as listitems', () => {
    render(
      <TestContext>
        <SerialisierungsFehlerAnzeige
          serializationError={serializationErrors}
        />
      </TestContext>
    )
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(serializationErrors.length)
    items.forEach((item) => expect(item).toBeVisible())
  })
})
