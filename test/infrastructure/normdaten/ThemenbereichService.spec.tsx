import { render, screen } from '@testing-library/react'
import type { FC } from 'react'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import {
  ThemenbereichService,
  useThemenbereich,
} from 'src/infrastructure/normdaten/ThemenbereichService'

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
