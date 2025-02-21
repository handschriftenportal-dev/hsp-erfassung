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

import { BegriffItem } from '../../../../../../src/domain/editor/normdaten/themenbereichDialog/komponenten/BegriffItem'
import { ThemenbereicheAPI } from '../../../../../../src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from '../../../../../infrastructure/normdaten/fixtures/einband.json'

describe('Themenbereich Begriff Item', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const begriff = api.begriff({ notation: 'BNDG-C506' })!

  it('renders list item', () => {
    render(<BegriffItem begriff={begriff} />)
    expect(screen.getByRole('listitem')).toBeVisible()
  })

  it('renders begriff label', () => {
    render(<BegriffItem begriff={begriff} />)
    expect(screen.getByText(begriff.label)).toBeVisible()
  })

  it('renders begriff notation', () => {
    render(<BegriffItem begriff={begriff} />)
    expect(screen.getByText(begriff.identifier.notation)).toBeVisible()
  })

  it('does not render checkbox by default', () => {
    render(<BegriffItem begriff={begriff} />)
    expect(screen.queryByRole('checkbox')).toBeNull()
  })

  it.each([true, false])(
    'does contain checkbox if "checked=%p" is provided',
    (checked) => {
      render(<BegriffItem begriff={begriff} checked={checked} />)
      expect(screen.getByRole('checkbox')).toBeDefined()
    }
  )

  it('does contain checkbox if onChange handler is provider', () => {
    render(<BegriffItem begriff={begriff} onChange={jest.fn()} />)
    expect(screen.getByRole('checkbox')).toBeDefined()
  })

  it('clicking checkbox triggers onChange', async () => {
    const changeHandler = jest.fn()
    render(<BegriffItem begriff={begriff} onChange={changeHandler} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(changeHandler).toHaveBeenCalled()
  })
})
