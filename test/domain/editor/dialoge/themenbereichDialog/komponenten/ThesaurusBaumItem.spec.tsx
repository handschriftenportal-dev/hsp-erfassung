import { render, screen } from '@testing-library/react'
import { ThesaurusBaumItem } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/ThesaurusBaumItem'
import { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('BegriffBaumItem', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const state = ThemenbereichDialogState.new('Zeitgenössischer Einband', 'BNDG')

  it('thesaurus has one list item, since it is collapsed', () => {
    const thesaurus = api.thesaurus({ notation: 'BNDG-G' })!
    render(
      <TestContext>
        <ThesaurusBaumItem
          thesaurus={thesaurus}
          state={state}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(1)
  })
})
