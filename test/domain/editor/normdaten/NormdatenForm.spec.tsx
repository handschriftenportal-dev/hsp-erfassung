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

import { render, screen } from '@testing-library/react'
import { TestContext } from '../../../TestContext'
import '@testing-library/jest-dom'
import { ReactEditor, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { NormdatenForm } from '../../../../src/domain/editor/normdaten/NormdatenForm'
import { GNDEntity } from '../../../../src/infrastructure/normdaten/GNDEntity'
import { NormdatenTEIElement } from '../../../../src/domain/editor/normdaten/NormdatenTEIElement'

describe('NormdatenForm Test', () => {

  it('Test NormdatenForm', () => {

    const editor = withReact(createEditor() as ReactEditor)

    const gndEntity = {
      preferredName: 'Berlin',
      gndIdentifier: '4005728-8',
      variantName: [],
      error: '',
      id: '123'
    } as GNDEntity

    const normdatenTEIElement = {
      normdatenText: 'Berlin',
      role: 'origin',
      gndIdentifierOption: '4005728-8',
      dataOrigin: 'placeName'
    } as NormdatenTEIElement

    render(
        <TestContext>
          <NormdatenForm normdatenurl={'http://localhost:8080'}
                         gndEntity={gndEntity}
                         normdatenTEIElement={normdatenTEIElement}
                         setNormdatenTEIElement={(any) => {
                         }}
                         setGndEntity={(any) => {
                         }}/>
        </TestContext>
    )

    expect(screen.getByText('Verknüpfter Text')).toBeVisible()
    expect(screen.getAllByDisplayValue('Berlin')[0]).toBeVisible()
    expect(screen.getByText('Verknüpftes Normdatum')).toBeVisible()
    expect(screen.getByText('Beziehung')).toBeVisible()
  })
})
