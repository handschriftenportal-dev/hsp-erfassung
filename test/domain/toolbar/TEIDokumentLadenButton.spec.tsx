import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { TEIDokumentLadenButton } from 'src/domain/toolbar/TEIDokumentLadenButton'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

test('TEIDokumentLadenButton', () => {
  const editor = createErfassungsEditor()
  const slateValue = [
    {
      data_origin: 'paragraph',
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]

  render(
    <TestContext>
      <Slate initialValue={slateValue} editor={editor}>
        <TEIDokumentLadenButton editor={editor} />
      </Slate>
    </TestContext>
  )

  expect(screen.getByRole('button')).toBeVisible()
})
