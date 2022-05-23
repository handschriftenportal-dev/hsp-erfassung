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

import '@testing-library/jest-dom'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestContext } from '../../../TestContext'
import { SelectionToolbar } from '../../../../src/domain/editor/normdaten/SelectionToolbar'
import React from 'react'

describe('SelectionToolbar Test', () => {

  const slateValueForNormdatenTests = [{
    path: '#document-msItem',
    component: 'msItemmusic',
    data_class: 'music',
    children: [
      {
        data_origin: 'note',
        region: 'msItem',
        path: '#document-msItem-note',
        component: '',
        children: [
          {
            data_origin: 'textelement',
            region: 'msItem',
            children: [
              {
                region: 'msItem',
                text: 'et dolore magna',
                showtei: true
              }
            ],
            showtei: true
          }
        ],
        showtei: true
      }
    ],
    showtei: true
  }]

  it('Test SelectionToolbar', () => {

    const editor = withReact(createEditor() as ReactEditor)

    render(
            <TestContext>
              <Slate value={slateValueForNormdatenTests}
                     onChange={() => {
                     }}
                     editor={editor}>
                <SelectionToolbar normdatenurl={'http://localhost:8080'}/>
              </Slate>
            </TestContext>
    )

    expect(screen.getByTitle('Normdaten verknüpfen')).toBeTruthy()
  })

  it('Test SelectionToolbar Button', () => {

    const editor = withReact(createEditor() as ReactEditor)

    render(
            <TestContext>
              <Slate value={slateValueForNormdatenTests}
                     onChange={() => {
                     }}
                     editor={editor}>
                <SelectionToolbar normdatenurl={'http://localhost:8080'}/>
              </Slate>
            </TestContext>
    )

    expect(screen.getByTitle('Normdaten verknüpfen')).toBeTruthy()

    fireEvent.click(screen.getByRole('SelectionToolbarButton'))

    expect(screen.getByText('Person')).toBeVisible()

  })

}
)
