import { render, screen } from '@testing-library/react'
import { AuszeichnungAuswahlDialog } from 'src/domain/editor/selectiontoolbar/AuszeichnungAuswahlDialog'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('AuszeichnungAuswahlDialog Factory', () => {
  const editor = createErfassungsEditor()
  const tests = [
    ['referenz', 'Normdatum auszeichnen'],
    ['formatierung', 'Semantische Auszeichnung'],
    ['andere', 'Andere Auszeichnung'],
  ] as const
  it.each(tests)('for type "%s" has title "%s"', (type, name) => {
    render(
      <TestContext>
        <AuszeichnungAuswahlDialog editor={editor} type={type} />
      </TestContext>
    )
    expect(screen.getByRole('heading', { name })).toBeVisible()
  })
})
