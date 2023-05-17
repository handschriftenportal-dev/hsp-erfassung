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

import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { render, screen, waitFor } from '@testing-library/react'
import { TestContext } from '../../TestContext'
import { TEIVorschauButton } from '../../../src/domain/toolbar/TEIVorschauButton'
import '@testing-library/jest-dom'

beforeAll(() => {
  // @ts-ignore
  global.window.createHspWorkspace = jest.fn()
})

test('Vorschau Button', async () => {
  const editor = withReact(createEditor() as ReactEditor)
  const slateValue = [{
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }]

  render(<TestContext><Slate value={slateValue} onChange={() => {
  }} editor={editor}>

    <TEIVorschauButton title={'Vorschau'} workspaceUrl={'/test/HSPID'}/></Slate></TestContext>)

  await waitFor(() => {
    expect(screen.getByTitle('Vorschau')).toBeVisible()
  })
})
