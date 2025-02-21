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
import { FC, useReducer } from 'react'

import { SonderzeichenAPI } from '../../../src/domain/sonderzeichen/SonderzeichenAPI'
import { SonderzeichenAuswahlReducer } from '../../../src/domain/sonderzeichen/SonderzeichenAuswahlReducer'
import { SonderzeichenAuswahlState } from '../../../src/domain/sonderzeichen/SonderzeichenAuswahlState'
import { SonderzeichenGrid } from '../../../src/domain/sonderzeichen/SonderzeichenGrid'
import { TestContext } from '../../TestContext'

const initialState = SonderzeichenAuswahlState.empty()
initialState.sonderzeichenKeys = initialState.sonderzeichenKeys.slice(0, 21)

interface Props {
  onSubmit?: typeof jest.fn
}

const TestComponent: FC<Props> = ({ onSubmit = jest.fn() }) => {
  const [state, dispatch] = useReducer(
    SonderzeichenAuswahlReducer,
    initialState
  )
  return (
    <TestContext>
      <SonderzeichenGrid
        state={state}
        dispatch={dispatch}
        onSubmit={onSubmit}
      />
    </TestContext>
  )
}

describe('SonderzeichenGrid', () => {
  const codepoints = initialState.sonderzeichenKeys
  describe('is accessible', () => {
    beforeEach(() => {
      render(<TestComponent />)
    })

    it('has role "grid"', () => {
      expect(screen.getByRole('grid')).toBeVisible()
    })

    it('gridcells are disible by spalten', () => {
      const amount = screen.getAllByRole('gridcell').length
      expect(Number.isInteger(amount / initialState.spalten)).toBe(true)
    })

    it('has #codepoints not disabled gridcells', () => {
      const gridcells = screen.getAllByRole('gridcell')
      const enabledGridcells = gridcells.filter(
        (cell) => cell.getAttribute('aria-disabled') === 'false'
      )
      expect(enabledGridcells).toHaveLength(codepoints.length)
    })

    it('has selected item', () => {
      expect(screen.getByRole('gridcell', { selected: true })).toBeVisible()
    })
  })

  describe('can be used by mouse', () => {
    it('clicking changes selection', async () => {
      render(<TestComponent />)
      const start = screen.getByRole('gridcell', { selected: true })
      const [firstRow] = screen.getAllByRole('row')
      await userEvent.click(firstRow.children[2])
      const next = screen.getByRole('gridcell', { selected: true })
      expect(start).not.toBe(next)
    })

    it('double click submits element', async () => {
      const onSubmit = jest.fn()
      render(<TestComponent onSubmit={onSubmit} />)
      const [firstRow] = screen.getAllByRole('row')
      await userEvent.dblClick(firstRow.children[2])
      expect(onSubmit).toHaveBeenCalled()
      expect(onSubmit.mock.lastCall).toMatchObject([codepoints[2]])
    })
  })

  describe('can be navigated with keyboard', () => {
    let onSubmit: jest.Mock
    beforeEach(() => {
      onSubmit = jest.fn()
      render(<TestComponent onSubmit={onSubmit} />)
      screen.getByRole('grid').focus()
    })

    function selectedGridKey() {
      return screen
        .getByRole('gridcell', { selected: true })
        .getAttribute('data-key')
    }

    it("left arrow on beginning doesn't change selection", async () => {
      await userEvent.keyboard('{ArrowLeft}')
      expect(selectedGridKey()).toBe(codepoints[0])
    })

    it('reacts to right arrow and left arrow', async () => {
      await userEvent.keyboard('{ArrowRight}')
      expect(selectedGridKey()).toBe(codepoints[1])
      await userEvent.keyboard('{ArrowRight}')
      expect(selectedGridKey()).toBe(codepoints[2])
      await userEvent.keyboard('{ArrowRight}')
      expect(selectedGridKey()).toBe(codepoints[3])
      await userEvent.keyboard('{ArrowLeft}')
      expect(selectedGridKey()).toBe(codepoints[2])
      await userEvent.keyboard('{ArrowLeft}')
      expect(selectedGridKey()).toBe(codepoints[1])
      await userEvent.keyboard('{ArrowLeft}')
      expect(selectedGridKey()).toBe(codepoints[0])
    })

    it('reacts to down and up arrow', async () => {
      await userEvent.keyboard('{ArrowDown}')
      expect(selectedGridKey()).toBe(codepoints[4])
      await userEvent.keyboard('{ArrowDown}')
      expect(selectedGridKey()).toBe(codepoints[8])
      await userEvent.keyboard('{ArrowUp}')
      expect(selectedGridKey()).toBe(codepoints[4])
      await userEvent.keyboard('{ArrowUp}')
      expect(selectedGridKey()).toBe(codepoints[0])
    })

    it("up arrow on top doesn't change selection", async () => {
      await userEvent.keyboard('{ArrowUp}')
      expect(selectedGridKey()).toBe(codepoints[0])
    })

    it('can navigate with home and end key', async () => {
      await userEvent.keyboard('{End}')
      expect(selectedGridKey()).toBe(codepoints[3])
      await userEvent.keyboard('{Control>}{Home}{/Control}')
      expect(selectedGridKey()).toBe(codepoints[0])
      await userEvent.keyboard('{Control>}{End}{/Control}')
      expect(selectedGridKey()).toBe(codepoints[codepoints.length - 1])
      await userEvent.keyboard('{Home}')
      expect(selectedGridKey()).toBe(codepoints[codepoints.length - 1])
      await userEvent.keyboard('{Control>}{Home}{/Control}')
      expect(selectedGridKey()).toBe(codepoints[0])
    })

    it('can navigate with page up and page down key', async () => {
      await userEvent.keyboard('{PageUp}')
      expect(selectedGridKey()).toBe(codepoints[0])
      await userEvent.keyboard('{PageDown}')
      expect(selectedGridKey()).toBe(codepoints[20])
      await userEvent.keyboard('{PageUp}')
      expect(selectedGridKey()).toBe(codepoints[0])
      await userEvent.keyboard('{ArrowRight}')
      await userEvent.keyboard('{PageDown}')
      expect(selectedGridKey()).toBe(codepoints[17])
    })

    it('can submit using enter key', async () => {
      await userEvent.keyboard('{Enter}')
      expect(onSubmit.mock.lastCall).toMatchObject([selectedGridKey()!])
      await userEvent.keyboard('{ArrowRight}')
      await userEvent.keyboard('{Enter}')
      expect(onSubmit.mock.lastCall).toMatchObject([selectedGridKey()!])
    })
  })

  describe('shows tooltip', () => {
    it('when hovering on cell', async () => {
      render(<TestComponent />)
      const [firstRow] = screen.getAllByRole('row')
      await userEvent.hover(firstRow.children[2])
      const firstTooltip = await screen.findByRole('tooltip')
      const key = initialState.sonderzeichenKeys[2]
      expect(firstTooltip).toBeVisible()
      expect(firstTooltip.textContent).toContain(key)
      expect(firstTooltip.textContent).toContain(
        SonderzeichenAPI.getSonderzeichen(key).description
      )
    })

    it('when clicking on cell', async () => {
      render(<TestComponent />)
      const [firstRow] = screen.getAllByRole('row')
      await userEvent.hover(firstRow)
      await userEvent.click(firstRow.children[1])
      const firstTooltip = await screen.findByRole('tooltip')
      const key = initialState.sonderzeichenKeys[1]
      expect(firstTooltip).toBeVisible()
      expect(firstTooltip.textContent).toContain(key)
      expect(firstTooltip.textContent).toContain(
        SonderzeichenAPI.getSonderzeichen(key).description
      )
    })

    it('when navigating by keyboard', async () => {
      render(<TestComponent />)
      const [firstRow] = screen.getAllByRole('row')
      await userEvent.hover(firstRow)
      await userEvent.click(firstRow.children[1])
      await userEvent.keyboard('{ArrowDown}')
      const firstTooltip = await screen.findByRole('tooltip')
      const key = initialState.sonderzeichenKeys[1 + initialState.spalten]
      expect(firstTooltip).toBeVisible()
      expect(firstTooltip.textContent).toContain(key)
      expect(firstTooltip.textContent).toContain(
        SonderzeichenAPI.getSonderzeichen(key).description
      )
    })
  })
})
