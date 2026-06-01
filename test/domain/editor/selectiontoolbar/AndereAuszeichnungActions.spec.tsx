import { render, screen } from '@testing-library/react'
import { AndereAuszeichnungActions } from 'src/domain/editor/selectiontoolbar/AndereAuszeichnungActions'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { regEx } from 'test/regEx'
import { TestContext } from 'test/TestContext'

describe('Andere Auszeichnung actions', () => {
  beforeEach(() => {
    const editor = createErfassungsEditor()
    render(
      <TestContext>
        <AndereAuszeichnungActions editor={editor} />
      </TestContext>
    )
  })

  it('has 3 buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('are translated', () => {
    screen.getAllByRole('button').forEach((button) => {
      // Assumption: Translated buttons start with capitalized letter
      expect(button).toHaveTextContent(regEx.startsCapitalized)
    })
  })
})
