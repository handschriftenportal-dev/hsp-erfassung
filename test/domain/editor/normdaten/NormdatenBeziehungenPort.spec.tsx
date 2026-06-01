import { render, screen } from '@testing-library/react'
import type { FC } from 'react'
import {
  NormdatenBeziehungenPort,
  useBeziehungsUebersetzung,
} from 'src/domain/editor/normdaten/NormdatenBeziehungenPort'
import { TestContext } from 'test/TestContext'

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
