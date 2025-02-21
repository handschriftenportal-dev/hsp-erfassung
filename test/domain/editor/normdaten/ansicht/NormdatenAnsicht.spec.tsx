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
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { NormdatenAnsicht } from '../../../../../src/domain/editor/normdaten/ansicht/NormdatenAnsicht'
import de from '../../../../../src/infrastructure/i18n/translation_de.json'
import { InlineTransformation } from '../../../../../src/infrastructure/slate/transformation/volltext/InlineTransformation'
import { VolltextEditorElement } from '../../../../../src/infrastructure/slate/volltext/VolltextEditorElement'
import { TestContext } from '../../../../TestContext'

const server = setupServer(
  http.post('*', () =>
    HttpResponse.json({
      data: {
        findGNDEntityFactsByIds: [],
      },
    })
  )
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function normdatum(
  data_origin: string,
  text: string,
  data_role: string,
  data_ref: string
) {
  const tei = {
    data_origin,
    children: [
      {
        text,
      },
    ],
    data_role,
    data_ref,
  }
  return InlineTransformation.transform({ data: tei }).data
}

describe('NormdatenAnsicht', () => {
  const person = normdatum(
    'persName',
    'Aaron',
    'commissionedBy',
    'http://d-nb.info/gnd/10241787'
  )
  const org = normdatum(
    'orgName',
    'Adelhaus',
    'mentionedIn',
    'http://d-nb.info/gnd/4005728-8'
  )
  const place = normdatum(
    'placeName',
    'Berlin',
    'mentionedIn',
    'http://d-nb.info/gnd/2086132-1'
  )
  const attributes: any = {}

  it('without normdata links does not contain table', () => {
    const element = VolltextEditorElement.emptyVolltext()
    render(
      <TestContext>
        <NormdatenAnsicht element={element} attributes={attributes}>
          {''}
        </NormdatenAnsicht>
      </TestContext>
    )
    expect(screen.queryByRole('table')).toBeFalsy()
  })

  it('with normdata Links contains table', () => {
    const element: any = VolltextEditorElement.emptyVolltext()
    element.content[0].children = [person]
    render(
      <TestContext>
        <NormdatenAnsicht element={element} attributes={attributes}>
          {''}
        </NormdatenAnsicht>
      </TestContext>
    )
    expect(screen.getByRole('table')).toBeTruthy()
  })

  it('with one normdatum Link contains two rows, header and normdatum link', () => {
    const element: any = VolltextEditorElement.emptyVolltext()
    element.content[0].children = [person]
    const { container } = render(
      <TestContext>
        <NormdatenAnsicht element={element} attributes={attributes}>
          {''}
        </NormdatenAnsicht>
      </TestContext>
    )
    expect(container.querySelectorAll('tr')).toHaveLength(2)
  })

  it.each([
    [de.text_tagging.referenz.type.person, person],
    [de.text_tagging.referenz.type.koerperschaft, org],
    [de.text_tagging.referenz.type.ort, place],
  ])('normdatum type "%s" get\'s translated', (name, normdatum) => {
    const element: any = VolltextEditorElement.emptyVolltext()
    element.content[0].children = [normdatum]
    render(
      <TestContext>
        <NormdatenAnsicht element={element} attributes={attributes}>
          {''}
        </NormdatenAnsicht>
      </TestContext>
    )
    expect(screen.getByRole('cell', { name })).toBeTruthy()
  })
})
