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
 * Author: Christoph Marten on 17.11.2021 at 14:08
 */
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { render, screen } from '@testing-library/react'
import { TestContext } from '../../../../TestContext'
import React from 'react'
import ConfigureStore from '../../../../../src/infrastructure/ConfigureReduxStore'

import { OrigPlaceNormdatenVerknuepfung } from '../../../../../src/domain/editor/beschreibungskomponenten/kopf/OrigPlaceNormdatenVerknuepfung'

const slateValue = [{
  type: 'paragraph',
  istop: false,
  children: [{ text: 'A line of text in a paragraph.' }],
}]

const origPlaceGndId = {
  data_origin: 'term',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index-term',
  component: '',
  level: 1,
  id: 'a7c26131-d40d-47c8-8227-f941e58a9b8d',
  data_type: 'origPlace_gnd-ID',
  children: [
    {
      data_origin: 'textelement',
      region: 'head',
      children: [
        {
          region: 'head',
          text: '4007405-5',
          showtei: false
        }
      ],
      showtei: false
    }
  ],
  showtei: false
}

describe('OrigPlaceNormdatenVerknuepfung Test', () => {
  const editor = withReact(createEditor() as ReactEditor)

  it('OrigPlaceNormdatenVerknuepfung', () => {
    const store = ConfigureStore
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true
    })
    render(<TestContext><Slate value={slateValue} onChange={() => {
    }} editor={editor}><OrigPlaceNormdatenVerknuepfung normdatenurl={'normdatenURL'} editor={editor} termElements={[origPlaceGndId]} dataIndexName={'norm_origPlace'}
                                                       termElement={origPlaceGndId}/></Slate></TestContext>)

    expect(screen.getByText('Normdatenverknüpfung', { exact: false })).toBeTruthy()
  })
})
