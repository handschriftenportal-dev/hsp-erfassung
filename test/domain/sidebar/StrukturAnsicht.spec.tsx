import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { StrukturAnsicht } from 'src/domain/sidebar/StrukturAnsicht'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('Strukturansicht', () => {
  it('Rendered Kopf', () => {
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
          <StrukturAnsicht editor={editor} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText(de.sidebar.head)).toBeVisible()
  })
})
