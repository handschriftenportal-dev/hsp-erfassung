import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { Referenz } from 'src/domain/editor/volltext/components/Referenz'
import { createVolltextEditor } from 'src/infrastructure/slate/volltext/VolltextEditorFactory'
import type { VolltextReferenz } from 'src/infrastructure/slate/volltext/VolltextElement'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Referenz', () => {
  const editor = createVolltextEditor()
  const referenz: VolltextReferenz = {
    data_origin: 'externerLink',
    children: [{ text: '' }],
    box: {
      data_origin: 'ref',
      children: [{ text: '' }],
    },
    content: 'Referenzcontent',
  }
  beforeEach(() => {
    render(
      <TestContext>
        <Slate initialValue={[referenz]} editor={editor}>
          <Referenz element={referenz} attributes={TestSlateAttributes.element}>
            <button />
          </Referenz>
        </Slate>
      </TestContext>
    )
  })

  it('renders children', () => {
    expect(screen.getByRole('button')).toBeVisible()
  })
  it('renders content', () => {
    expect(screen.getByText('Referenzcontent')).toBeVisible()
  })
  it('attaches attributes', () => {
    expect(document.querySelector('#element-marker')).toBeVisible()
  })
})
