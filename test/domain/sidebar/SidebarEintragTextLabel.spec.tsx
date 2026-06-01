import { render, screen } from '@testing-library/react'
import i18next from 'i18next'
import { SidebarEintragTextLabel } from 'src/domain/sidebar/SidebarEintragTextLabel'
import { TestContext } from 'test/TestContext'

test('BeschreibungsInhaltTextLabel View', () => {
  render(<SidebarEintragTextLabel name="1v-2" titel="Titel" />)
  expect(screen.getByText('1v-2')).toBeVisible()
  expect(screen.getByText('Titel')).toBeVisible()
})

test('BeschreibungsInhaltTextLabel Abschnitt View', () => {
  const section: string = i18next.t('sidebar.section')
  render(
    <TestContext>
      <SidebarEintragTextLabel name={section} titel="(1)" />
    </TestContext>
  )

  expect(screen.getByText('Abschnitt (1)')).toBeVisible()
})
