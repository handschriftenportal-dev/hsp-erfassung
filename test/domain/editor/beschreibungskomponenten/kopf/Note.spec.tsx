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
 * Author: Christoph Marten on 17.11.2021 at 09:27
 */

import { render, screen } from '@testing-library/react'
import { TestContext } from '../../../../TestContext'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { Note } from '../../../../../src/domain/editor/beschreibungskomponenten/kopf/Note'
import React from 'react'
import { createEditor } from 'slate'
import ConfigureStore from '../../../../../src/infrastructure/ConfigureReduxStore'

const slateValue = [{
  type: 'paragraph',
  istop: false,
  children: [{ text: 'A line of text in a paragraph.' }],
}]

const noteElement = {
  data_origin: 'note',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-note',
  component: '',
  level: 1,
  id: '79fa03fe-a9ff-49ec-80bf-f37b277cfb98',
  data_type: 'headline',
  children: [
    {
      data_origin: 'textelement',
      region: 'head',
      children: [
        {
          region: 'head',
          text: 'dolor sit amet',
          showtei: false
        }
      ],
      showtei: false
    }
  ],
  showtei: false
}

const mustyNoteElement = {
  data_origin: 'note',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-note',
  component: '',
  level: 1,
  id: '79fa03fe-a9ff-49ec-80bf-f37b277cfb98',
  data_type: 'headline',
  showtei: false
}

describe('Note Kopf', () => {
  const editor = withReact(createEditor() as ReactEditor)
  it('Note musty', () => {
    const store = ConfigureStore
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true
    })
    render(<TestContext><Slate value={slateValue} onChange={() => {
    }} editor={editor}><Note attributes={[]}
                             children={[]} element={mustyNoteElement}/></Slate></TestContext>)
    expect(screen.getByDisplayValue('')).toBeTruthy()
  })
  it('Note', () => {
    render(<TestContext><Slate value={slateValue} onChange={() => {
    }} editor={editor}><Note element={noteElement} attributes={[]}
                             children={[]} /></Slate></TestContext>)
    expect(document.body.innerHTML.includes('Schlagzeile')).toBeTruthy()
  })

})
