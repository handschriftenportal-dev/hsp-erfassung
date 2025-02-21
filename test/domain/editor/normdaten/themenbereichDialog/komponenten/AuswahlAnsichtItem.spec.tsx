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
import userEvent from '@testing-library/user-event'

import { AuswahlAnsichtItem } from '../../../../../../src/domain/editor/normdaten/themenbereichDialog/komponenten/AuswahlAnsichtItem'
import { ThemenbereicheAPI } from '../../../../../../src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from '../../../../../infrastructure/normdaten/fixtures/einband.json'

describe('Themenbereich Auswahl Ansicht Item', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const id = 'NORM-15d0ffbf-2df1-38b9-9a3a-ad51304eef6c'
  const begriff = api.begriff({ id })!

  it('renders with accessible role', () => {
    render(<AuswahlAnsichtItem begriff={begriff} />)
    expect(screen.getByRole('listitem')).toBeVisible()
  })

  it('renders translated label', () => {
    render(<AuswahlAnsichtItem begriff={begriff} />)
    expect(screen.getByText(begriff.label)).toBeVisible()
  })

  it('does not contain checkbox in readOnly mode', () => {
    render(<AuswahlAnsichtItem begriff={begriff} readOnly={true} />)
    expect(screen.queryByRole('checkbox')).toBeNull()
  })

  it('does contain checkbox when not in readOnly mode', () => {
    render(<AuswahlAnsichtItem begriff={begriff} readOnly={false} />)
    expect(screen.getByRole('checkbox')).toBeDefined()
  })

  it('clicking checkbox triggers onRemove with notation', async () => {
    const removeHandler = jest.fn()
    render(
      <AuswahlAnsichtItem
        begriff={begriff}
        readOnly={false}
        onRemove={removeHandler}
      />
    )
    await userEvent.click(screen.getByRole('checkbox'))
    expect(removeHandler).toHaveBeenLastCalledWith(id)
  })
})
