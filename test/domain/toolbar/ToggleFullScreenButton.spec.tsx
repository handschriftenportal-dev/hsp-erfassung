import { render, screen, waitFor } from '@testing-library/react'
import { Slate } from 'slate-react'
import { ToggleFullscreenButton } from 'src/domain/toolbar/ToggleFullscreenButton'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

test('ToggleFullscreen Button', async () => {
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
        <ToggleFullscreenButton />
      </Slate>
    </TestContext>
  )

  await waitFor(() => {
    expect(screen.getByTitle('Vollbild')).toBeVisible()
  })
})
