import { render, screen } from '@testing-library/react'
import React from 'react'
import { Slate } from 'slate-react'
import { BeschreibungsKomponenteKopf } from 'src/domain/editor/beschreibungskomponenten/kopf/BeschreibungsKomponenteKopf'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('BeschreibungsKomponenteKopf Test', () => {
  it('BeschreibungsKomponenteKopf in Edit Mode', () => {
    const editor = createErfassungsEditor()
    const attributes = TestSlateAttributes.element
    const element = {
      type: 'paragraph',
      data_origin: 'paragraph',
      id: 'Hallo',
      children: [{ text: 'A line of text in a paragraph.' }],
    }

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <BeschreibungsKomponenteKopf
            element={element}
            attributes={attributes}
            children={[]}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.getByText('Kopf')).toBeVisible()
  })
})
