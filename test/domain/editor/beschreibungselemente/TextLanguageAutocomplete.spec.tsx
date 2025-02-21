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

import { act, render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'

import { TextLanguageAutocomplete } from '../../../../src/domain/editor/beschreibungselemente/TextLanguageAutocomplete'
import { createErfassungsEditor } from '../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../TestContext'

const slateValue = [
  {
    data_origin: 'paragraph',
    type: 'paragraph',
    istop: false,
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

describe('Test TextLanguageAutocomplete', () => {
  test('Show TextLanguageAutocomplete', () => {
    const editor = createErfassungsEditor()
    const options: any = [
      {
        preferredName: 'Deutsch',
        identifier: [],
        gndIdentifier: 'GND123',
        variantName: [],
        error: '',
        id: '123',
      },
      {
        preferredName: 'Englisch',
        identifier: [],
        gndIdentifier: 'GND1234',
        variantName: [],
        error: '',
        id: '1234',
      },
    ]
    const onChange = jest.fn()
    const onOpen = jest.fn()
    const container = render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <TextLanguageAutocomplete
            title={'Test Autocomplete'}
            options={options}
            onChange={onChange}
            value={options[0]}
            onOpen={onOpen}
          />
        </Slate>
      </TestContext>
    )

    const input = container.getByDisplayValue(
      'Deutsch GND123'
    ) as HTMLInputElement
    const autocomplete = screen.getByRole('combobox')
    act(() => autocomplete.focus())
    expect(autocomplete).toBeTruthy()
    expect(input).toBeTruthy()
    expect(screen.getByText('Test Autocomplete')).toBeTruthy()
    expect(screen.getByTestId('languageInput')).toBeTruthy()
    expect(input.value).toBe('Deutsch GND123')
  })
})
