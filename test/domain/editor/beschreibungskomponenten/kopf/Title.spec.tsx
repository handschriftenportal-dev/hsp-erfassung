/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

/**
 * Author: Christoph Marten on 17.11.2021 at 09:27
 */

import { render, screen } from '@testing-library/react'
import { TestContext } from '../../../../TestContext'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { Title } from '../../../../../src/domain/editor/beschreibungskomponenten/kopf/Title'
import React from 'react'
import { createEditor } from 'slate'
import ConfigureStore from '../../../../../src/infrastructure/ConfigureReduxStore'

const slateValue = [{
  type: 'paragraph',
  istop: false,
  children: [{ text: 'A line of text in a paragraph.' }],
}]

const titleElement = {
  data_origin: 'title',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-title',
  component: '',
  level: 1,
  id: 'a857aeee-b583-4656-9c1e-415741d481b1',
  children: [
    {
      data_origin: 'textelement',
      region: 'head',
      children: [
        {
          region: 'head',
          text: 'Lorem ipsum',
          showtei: false
        }
      ],
      showtei: false
    }
  ],
  showtei: false
}

const mustyTitleElement = {
  data_origin: 'title',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-title',
  component: '',
  level: 1,
  id: 'a857aeee-b583-4656-9c1e-415741d481b1',
  showtei: false
}

describe('Title Kopf', () => {
  const editor = withReact(createEditor() as ReactEditor)
  it('Title musty', () => {
    const store = ConfigureStore
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true
    })
    render(<TestContext><Slate value={slateValue} onChange={() => {
    }} editor={editor}><Title attributes={[]}
                              children={[]} element={mustyTitleElement}/></Slate></TestContext>)

    expect(screen.getByDisplayValue('')).toBeTruthy()
  })
  it('Title', () => {
    render(<TestContext><Slate value={slateValue} onChange={() => {
    }} editor={editor}><Title attributes={[]}
                              children={[]} element={titleElement}/></Slate></TestContext>)
    expect(document.body.innerHTML.includes('Titel')).toBeTruthy()
  })

})
