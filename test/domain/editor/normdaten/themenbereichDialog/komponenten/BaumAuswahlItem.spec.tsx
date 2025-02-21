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

import { BaumAuswahlItem } from '../../../../../../src/domain/editor/normdaten/themenbereichDialog/komponenten/BaumAuswahlItem'
import { ThemenbereichDialogState } from '../../../../../../src/domain/editor/normdaten/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from '../../../../../../src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from '../../../../../infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from '../../../../../TestContext'

describe('Themenbereich Baum-Auswahl Item', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const state = ThemenbereichDialogState.new('Zeitgenössischer Einband', 'BNDG')

  it('renders one list item for leaf', () => {
    const begriff = api.begriff({ notation: 'BNDG-G292' })!
    render(
      <TestContext>
        <BaumAuswahlItem
          begriff={begriff}
          state={state}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(1)
  })

  it('renders one list item plus list items for sublist for node', () => {
    const begriff = api.begriff({ notation: 'BNDG-G699' })!
    render(
      <TestContext>
        <BaumAuswahlItem
          begriff={begriff}
          state={state}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(6)
  })
})
