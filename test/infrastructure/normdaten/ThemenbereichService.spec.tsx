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
import { FC } from 'react'

import { ThemenbereicheAPI } from '../../../src/domain/erfassung/ThemenbereicheAPI'
import {
  ThemenbereichService,
  useThemenbereich,
} from '../../../src/infrastructure/normdaten/ThemenbereichService'
import subjectArea from './fixtures/einband.json'

const TestComponent: FC = () => {
  const api = useThemenbereich()
  return (
    <ul>
      {api.themenbereiche().map((themenbereich) => (
        <li key={themenbereich.id} aria-label={themenbereich.notation}>
          {themenbereich.uri}
        </li>
      ))}
    </ul>
  )
}

describe('ThemenbereichService', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)

  it('Loads themenbereich "BNDG"', () => {
    render(
      <ThemenbereichService api={api}>
        <TestComponent />
      </ThemenbereichService>
    )
    expect(screen.getByRole('listitem', { name: 'BNDG' })).toBeVisible()
  })
})
