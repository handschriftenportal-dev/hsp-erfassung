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

import { BaumAuswahl } from '../../../../../../src/domain/editor/normdaten/themenbereichDialog/komponenten/BaumAuswahl'
import { ThemenbereichDialogState } from '../../../../../../src/domain/editor/normdaten/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from '../../../../../../src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from '../../../../../infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from '../../../../../TestContext'

describe('Themenbereich Baum Auswahl', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const initialState = ThemenbereichDialogState.new(
    'Zeitgenössischer Einband',
    'BNDG'
  )

  it('renders thesauri as listitems', () => {
    render(
      <TestContext>
        <BaumAuswahl state={initialState} dispatch={jest.fn()} api={api} />
      </TestContext>
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(
      einband.thesauri.length
    )
  })
})
