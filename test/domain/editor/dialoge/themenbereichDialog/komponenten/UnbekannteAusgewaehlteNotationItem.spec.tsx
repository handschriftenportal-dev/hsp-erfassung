import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UnbekannteAusgewaehlteNotationItem } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/UnbekannteAusgewaehlteNotationItem'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

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
        <UnbekannteAusgewaehlteNotationItem readOnly notation={'invalid'} />
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
          onClick={removeHandler}
        />
      </TestContext>
    )
    await userEvent.click(screen.getByRole('checkbox'))
    expect(removeHandler).toHaveBeenLastCalledWith('invalid')
  })
})
