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

import { UnbekannteAusgewaehlteNotationItem } from '../../../../../../src/domain/editor/normdaten/themenbereichDialog/komponenten/UnbekannteAusgewaehlteNotationItem'
import de from '../../../../../../src/infrastructure/i18n/translation_de.json'
import { TestContext } from '../../../../../TestContext'

describe('UnbekannteAusgewaehlteNotationItem', () => {
  it('translates text', () => {
    render(
      <TestContext>
        <UnbekannteAusgewaehlteNotationItem
          readOnly={false}
          notation={'invalid'}
        />
      </TestContext>
    )
    expect(
      screen.getByText(de.subject_area_dialog.unknown_selected_concept)
    ).toBeVisible()
  })

  it('notation is shown', () => {
    render(
      <TestContext>
        <UnbekannteAusgewaehlteNotationItem
          readOnly={false}
          notation={'invalid'}
        />
      </TestContext>
    )
    expect(screen.getByText('invalid')).toBeVisible()
  })

  it('checkbox is not rendered in readOnly mode', () => {
    render(
      <TestContext>
        <UnbekannteAusgewaehlteNotationItem
          readOnly={true}
          notation={'invalid'}
        />
      </TestContext>
    )
    expect(screen.queryByRole('checkbox')).toBeNull()
  })

  it('checkbox exists in edit mode', () => {
    render(
      <TestContext>
        <UnbekannteAusgewaehlteNotationItem
          readOnly={false}
          notation={'invalid'}
        />
      </TestContext>
    )
    expect(screen.getByRole('checkbox')).toBeDefined()
  })

  it('clicking checkbox executes onRemove handler with notation', async () => {
    const removeHandler = jest.fn()
    render(
      <TestContext>
        <UnbekannteAusgewaehlteNotationItem
          readOnly={false}
          notation={'invalid'}
          onRemove={removeHandler}
        />
      </TestContext>
    )
    await userEvent.click(screen.getByRole('checkbox'))
    expect(removeHandler).toHaveBeenLastCalledWith('invalid')
  })
})
