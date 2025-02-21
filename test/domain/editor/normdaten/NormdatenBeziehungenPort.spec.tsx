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

import {
  NormdatenBeziehungenPort,
  useBeziehungsUebersetzung,
} from '../../../../src/domain/editor/normdaten/NormdatenBeziehungenPort'
import { TestContext } from '../../../TestContext'

describe.each([NormdatenBeziehungenPort])(
  'NormdatenBeziehungenPort',
  (adapter) => {
    it('erfüllt Interface', () => {
      expect(adapter).toHaveProperty('getNormdaten')
      expect(adapter).toHaveProperty('getBeziehungen')
    })

    it('jedes aufgeführtes Normdaten enthält mindestens eine Beziehung', () => {
      adapter.getNormdaten().forEach((konzept) => {
        expect(adapter.getBeziehungen(konzept)).not.toHaveLength(0)
      })
    })
  }
)

describe('useBeziehungsUebersetzung', () => {
  type Props = { beziehung: string }
  const TestKomponente: FC<Props> = ({ beziehung }) => {
    const t = useBeziehungsUebersetzung()
    const [translation, status] = t(beziehung)
    return (
      <div data-testid="translation" data-status={status}>
        {translation}
      </div>
    )
  }

  it('translates known values successfully', () => {
    render(
      <TestContext>
        <TestKomponente beziehung="scribe" />
      </TestContext>
    )
    expect(screen.getByTestId('translation')).toHaveTextContent('Schreiber')
    expect(screen.getByTestId('translation')).toHaveAttribute(
      'data-status',
      'true'
    )
  })

  it('does not translate unknown values', () => {
    render(
      <TestContext>
        <TestKomponente beziehung="UNKNOWN" />
      </TestContext>
    )
    expect(screen.getByTestId('translation')).toHaveTextContent('UNKNOWN')
    expect(screen.getByTestId('translation')).toHaveAttribute(
      'data-status',
      'false'
    )
  })
})
