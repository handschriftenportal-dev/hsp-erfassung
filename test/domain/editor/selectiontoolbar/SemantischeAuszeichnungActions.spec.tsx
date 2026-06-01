import { render, screen } from '@testing-library/react'
import { FormatierungAuszeichnungActions } from 'src/domain/editor/selectiontoolbar/FormatierungAuszeichnungActions'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { regEx } from 'test/regEx'
import { TestContext } from 'test/TestContext'

describe('Andere Auszeichnung actions', () => {
  beforeEach(() => {
    const editor = createErfassungsEditor()
    render(
      <TestContext>
        <FormatierungAuszeichnungActions editor={editor} />
      </TestContext>
    )
  })

  it('has 5 buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(5)
  })

  it('Buttons are translated', () => {
    screen.getAllByRole('button').forEach((button) => {
      // Assumption: Translated buttons start with capitalized letter
      expect(button).toHaveTextContent(regEx.startsCapitalized)
    })
  })
})
