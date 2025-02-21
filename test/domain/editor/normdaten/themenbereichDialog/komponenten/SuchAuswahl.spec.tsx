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

import { SuchAuswahl } from '../../../../../../src/domain/editor/normdaten/themenbereichDialog/komponenten/SuchAuswahl'
import { ThemenbereichDialogState } from '../../../../../../src/domain/editor/normdaten/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from '../../../../../../src/domain/erfassung/ThemenbereicheAPI'
import de from '../../../../../../src/infrastructure/i18n/translation_de.json'
import subjectArea from '../../../../../infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from '../../../../../TestContext'

describe('Themenbereich Such-Auswahl', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const initialState = ThemenbereichDialogState.new(
    'Zeitgenössischer Einband',
    'BNDG'
  )

  it('renders no list if search is empty', () => {
    render(
      <TestContext>
        <SuchAuswahl state={initialState} dispatch={jest.fn()} api={api} />
      </TestContext>
    )
    expect(
      screen.getByText(de.subject_area_dialog.no_search_results)
    ).toBeVisible()
  })

  it('renders text if search is empty', () => {
    render(
      <TestContext>
        <SuchAuswahl state={initialState} dispatch={jest.fn()} api={api} />
      </TestContext>
    )
    expect(
      screen.getByText(de.subject_area_dialog.no_search_results)
    ).toBeVisible()
  })

  it('renders no list if search hits nothing', () => {
    render(
      <TestContext>
        <SuchAuswahl
          state={{ ...initialState, suche: 'SEARCH_WHICH_FINDS_NOTHING' }}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(
      screen.getByText(de.subject_area_dialog.no_search_results)
    ).toBeVisible()
  })

  it('renders text if search hits nothing', () => {
    render(
      <TestContext>
        <SuchAuswahl
          state={{ ...initialState, suche: 'SEARCH_WHICH_FINDS_NOTHING' }}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(
      screen.getByText(de.subject_area_dialog.no_search_results)
    ).toBeVisible()
  })

  it('renders 9 listitems for term "Kette"', () => {
    render(
      <TestContext>
        <SuchAuswahl
          state={{ ...initialState, suche: 'Kette' }}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(9)
  })

  it('renders 2 listitems items for term "BNDG-N625"', () => {
    render(
      <TestContext>
        <SuchAuswahl
          state={{ ...initialState, suche: 'BNDG-N625' }}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(2)
  })

  const begriff = api.begriff({ notation: 'BNDG-N625' })!

  it('can add search result', async () => {
    const dispatch = jest.fn()
    render(
      <TestContext>
        <SuchAuswahl
          state={{ ...initialState, suche: begriff.identifier.notation }}
          dispatch={dispatch}
          api={api}
        />
      </TestContext>
    )
    await userEvent.click(screen.getByRole('checkbox'))
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'addBegriffe',
      payload: begriff.identifier.id,
    })
  })

  it('can remove search result', async () => {
    const dispatch = jest.fn()
    render(
      <TestContext>
        <SuchAuswahl
          state={{
            ...initialState,
            suche: begriff.identifier.notation,
            auswahl: [begriff.identifier.id],
          }}
          dispatch={dispatch}
          api={api}
        />
      </TestContext>
    )
    await userEvent.click(screen.getByRole('checkbox'))
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'removeBegriff',
      payload: begriff.identifier.id,
    })
  })
})
