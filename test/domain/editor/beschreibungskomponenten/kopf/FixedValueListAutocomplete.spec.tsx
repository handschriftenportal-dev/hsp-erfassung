/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * Author: Christoph Marten on 17.11.2021 at 14:50
 */
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { render, screen } from '@testing-library/react'
import { TestContext } from '../../../../TestContext'
import React from 'react'
import ConfigureStore from '../../../../../src/infrastructure/ConfigureReduxStore'
import {
  FixedValueListAutocomplete
} from '../../../../../src/domain/editor/beschreibungskomponenten/kopf/FixedValueListAutocomplete'
import '@testing-library/jest-dom'

const slateValue = [{
  type: 'paragraph',
  istop: false,
  children: [{ text: 'A line of text in a paragraph.' }],
}]

const materialType = {
  data_origin: 'term',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index-term',
  component: '',
  level: 1,
  id: 'a5bfe3c7-4b80-4f68-a4ac-ba5c0b1846a5',
  data_type: 'material_type',
  children: [
    {
      data_origin: 'textelement',
      region: 'head',
      children: [
        {
          region: 'head',
          text: 'chart',
          showtei: false
        }
      ],
      showtei: false
    }
  ],
  showtei: false
}

describe('FixedValueListAutocomplete Test', () => {
  const editor = withReact(createEditor() as ReactEditor)

  it('materialType', () => {
    const store = ConfigureStore
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true
    })
    render(<TestContext><Slate value={slateValue} onChange={() => {
    }} editor={editor}><FixedValueListAutocomplete leftSidelabel={'MaterialType'} termElement={materialType}
                                                   optionsArray={[]} useDeleteButton={true}/></Slate></TestContext>)

    expect(screen.getByText('MaterialType', { exact: false })).toBeTruthy()
    expect(screen.getByTitle('Löschen')).toBeVisible()
  })
})
