import { render, screen } from '@testing-library/react'
import { ReferenzAuszeichnungActions } from 'src/domain/editor/selectiontoolbar/ReferenzAuszeichnungActions'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('ReferenzAuszeichnungActions', () => {
  beforeEach(() => {
    const editor = createErfassungsEditor()
    render(
      <TestContext>
        <ReferenzAuszeichnungActions editor={editor} />
      </TestContext>
    )
  })

  it('has 12 buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(12)
  })

  it('buttons are ordered by group and sorted by translation', () => {
    const {
      // GND
      koerperschaft,
      ort,
      person,
      // Themenbereiche
      buchkunde,
      buchschmuck,
      einband,
      musiknotation,
      schreibsprache,
      schriftart,
      textgattung,
      ueberlieferungsform,
      // Sonstiges
      initium,
    } = de.text_tagging.referenz.type
    const buttons = screen
      .getAllByRole('button')
      .map((button) => button.textContent)
    expect(buttons).toMatchObject([
      koerperschaft,
      ort,
      person,
      buchkunde,
      buchschmuck,
      einband,
      musiknotation,
      schreibsprache,
      schriftart,
      textgattung,
      ueberlieferungsform,
      initium,
    ])
  })

  const { gnd, subject_area, other } = de.text_tagging.referenz.type_header

  it.each([gnd, subject_area, other])('subheader %s is visible', (name) => {
    expect(screen.getByRole('heading', { name, level: 3 })).toBeVisible()
  })
})
