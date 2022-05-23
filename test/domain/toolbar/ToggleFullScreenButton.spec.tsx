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
 * Created by Christoph Marten on 03.06.2021 at 13:17
 */
import { render, screen, waitFor } from '@testing-library/react'
import { ToggleFullScreenButton } from '../../../src/domain/toolbar/ToggleFullScreenButton'
import '@testing-library/jest-dom'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { TestContext } from '../../TestContext'

test('ToggleFullScreen Button', async () => {
  const editor = withReact(createEditor() as ReactEditor)
  const slateValue = [{
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }]

  render(<TestContext><Slate value={slateValue} onChange={() => {
  }} editor={editor}>

    <ToggleFullScreenButton/></Slate></TestContext>)

  await waitFor(() => {
    expect(screen.getByTitle('Vollbild')).toBeVisible()
  })
})
