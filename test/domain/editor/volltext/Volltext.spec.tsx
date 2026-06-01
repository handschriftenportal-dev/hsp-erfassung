import { render, screen } from '@testing-library/react'
import type { Element } from 'slate'
import { Slate } from 'slate-react'
import { Volltext } from 'src/domain/editor/volltext/Volltext'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('Volltext', () => {
  const editor = createErfassungsEditor()
  const element = {
    data_origin: 'volltext',
    children: [{ text: '' }],
    content: [
      {
        data_origin: 'paragraph',
        children: [{ text: 'inner editor' }],
      },
    ],
  } as Element
  const attributes = {
    'data-slate-node': 'element',
    ref: null,
  } as const

  it('renders VolltextEditor inside another Slate', () => {
    render(
      <TestContext>
        <Slate editor={editor} initialValue={[element]}>
          <Volltext element={element} attributes={attributes}>
            <button />
          </Volltext>
        </Slate>
      </TestContext>
    )
    expect(screen.getByRole('button')).toBeVisible()
    expect(screen.getByText('inner editor')).toBeVisible()
  })
})
