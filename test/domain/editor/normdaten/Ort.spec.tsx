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

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Ort } from '../../../../src/domain/editor/normdaten/Ort'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { TestContext } from '../../../TestContext'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'

const graphqlResponse = '{"data":{"findGNDEntityFacts":[{"preferredName":"Berlin","gndIdentifier":"5036103-X"}]}}'

const server = setupServer(
  rest.post('/rest/graphql', (req, res, ctx) => {
    return res(ctx.text(graphqlResponse))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('Ort Test', () => {
  it('View Ort', async () => {

    const editor = withReact(createEditor() as ReactEditor)

    const slateValue = [{
      data_origin: 'placeName',
      type: 'paragraph',
      istop: false,
      children: [{ text: 'A line of text in a paragraph.' }],
    }]

    // noinspection JSConstantReassignment
    /** @noinspection JSConstantReassignment */
    // @ts-ignore
    ReactEditor = {
      findPath(any1: any, any2: any) {
        return [0]
      }
    }

    render(
        <TestContext><Slate value={slateValue} onChange={() => {
        }} editor={editor}><Ort element={slateValue} normdatenurl={'/rest/graphql'} attributes={[]}
                                children={[]}/></Slate></TestContext>
    )

    await waitFor(() => {
      expect(screen.getByRole('place')).toBeVisible()
      expect(screen.getByRole('place')).toHaveAttribute('style', 'background-color: rgb(255, 223, 107); cursor: pointer;')
      fireEvent.mouseDown(screen.getByRole('place'))

      waitFor(() => {
        expect(screen.getByText('Berlin')).toBeVisible()
      })
    })
  })
})
