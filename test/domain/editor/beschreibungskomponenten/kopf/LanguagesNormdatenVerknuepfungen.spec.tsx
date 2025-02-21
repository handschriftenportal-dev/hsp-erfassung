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
import React from 'react'
import { Slate } from 'slate-react'

import { LanguagesNormdatenVerknuepfungen } from '../../../../../src/domain/editor/beschreibungskomponenten/kopf/LanguagesNormdatenVerknuepfungen'
import { writeDocument } from '../../../../../src/domain/erfassung/ErfassungsState'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../../../TestContext'

const validText = { text: 'valid' }
const languageTermElement = {
  data_origin: 'term',
  id: 'valid language term',
  data_type: 'textLang-ID',
  children: [validText],
}
const notLanguageTermElement = {
  data_origin: 'term',
  id: 'something differnet',
  data_type: 'different-term',
  children: [{ text: 'invalid' }],
}

describe('LanguagesNormdatenVerknuepfung', () => {
  const editor = createErfassungsEditor()

  it('displays only valid language term elements', () => {
    const store = configureTestStore()
    store.dispatch(writeDocument())
    render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <LanguagesNormdatenVerknuepfungen
            termElements={[languageTermElement, notLanguageTermElement]}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getAllByRole('combobox')).toHaveLength(1)
    expect(screen.getByRole('combobox')).toHaveValue(validText.text)
  })
})
