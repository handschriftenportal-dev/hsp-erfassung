import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { ExpandAllComponentsButton } from 'src/domain/toolbar/ExpandAllComponentsButton'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

test('ExpandAllComponentsButton contains button', () => {
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
        <ExpandAllComponentsButton />
      </Slate>
    </TestContext>
  )

  expect(screen.getByRole('button')).toBeTruthy()
})
