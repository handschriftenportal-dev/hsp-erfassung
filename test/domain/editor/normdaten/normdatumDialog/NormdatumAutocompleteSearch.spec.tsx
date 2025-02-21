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

import { NormdatumAutocompleteSearch } from '../../../../../src/domain/editor/normdaten/normdatumDialog/NormdatumAutocompleteSearch'
import { TestContext } from '../../../../TestContext'

const noop = jest.fn()

describe('NormdatumAutocompleteSearch', () => {
  const baseState = {
    type: 'person',
    view: 'edit',
    status: 'search',
    search: '1234',
    text: 'xxx',
    normdatum: {
      preferredName: 'name',
      gndIdentifier: 'gndIdentifier',
    },
  } as const
  it('placeholder', () => {
    render(
      <TestContext>
        <NormdatumAutocompleteSearch
          afterImport={noop}
          onSearchChange={noop}
          onChange={noop}
          state={{ ...baseState, rollen: [] }}
        />
      </TestContext>
    )
    expect(screen.getByRole('combobox')).toHaveValue(
      baseState.normdatum.preferredName
    )
    expect(
      screen.getByText(baseState.normdatum.gndIdentifier)
    ).toHaveTextContent(baseState.normdatum.gndIdentifier)
  })
})
