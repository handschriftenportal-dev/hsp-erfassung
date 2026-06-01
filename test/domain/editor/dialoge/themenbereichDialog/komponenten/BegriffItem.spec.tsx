import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BegriffItem } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/BegriffItem'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'

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
