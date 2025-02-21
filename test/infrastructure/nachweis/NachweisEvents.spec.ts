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

import { act } from '@testing-library/react'

import { NachweisEvents } from '../../../src/infrastructure/nachweis/NachweisEvents'

describe('Nachweis Events', () => {
  const aktualisierenListener = jest.fn()
  const bearbeitenListener = jest.fn()
  const lesenListener = jest.fn()
  const speichernListener = jest.fn()
  beforeAll(() => {
    document.addEventListener(
      'BeschreibungAktualisierenEvent',
      aktualisierenListener
    )
    document.addEventListener('BeschreibungBearbeitenEvent', bearbeitenListener)
    document.addEventListener('BeschreibungLesenEvent', lesenListener)
    document.addEventListener('BeschreibungSpeichernEvent', speichernListener)
  })
  afterAll(() => {
    document.removeEventListener(
      'BeschreibungAktualisierenEvent',
      aktualisierenListener
    )
    document.removeEventListener(
      'BeschreibungBearbeitenEvent',
      bearbeitenListener
    )
    document.removeEventListener('BeschreibungLesenEvent', lesenListener)
    document.removeEventListener(
      'BeschreibungSpeichernEvent',
      speichernListener
    )
  })

  it('Beschreibung aktualisieren', () => {
    expect(aktualisierenListener).not.toHaveBeenCalled()
    act(() => NachweisEvents.beschreibungAktualisieren())
    expect(aktualisierenListener).toHaveBeenCalled()
  })
  it('Beschreibung bearbeiten', () => {
    expect(bearbeitenListener).not.toHaveBeenCalled()
    act(() => NachweisEvents.beschreibungBearbeiten())
    expect(bearbeitenListener).toHaveBeenCalled()
  })

  it('Beschreibung lesen', () => {
    expect(lesenListener).not.toHaveBeenCalled()
    act(() => NachweisEvents.beschreibungLesen())
    expect(lesenListener).toHaveBeenCalled()
  })

  it('Beschreibung speichern', () => {
    expect(speichernListener).not.toHaveBeenCalled()
    act(() => NachweisEvents.beschreibungSpeichern())
    expect(speichernListener).toHaveBeenCalled()
  })
})
