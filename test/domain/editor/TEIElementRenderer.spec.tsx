import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { selectRenderer } from 'src/domain/editor/TEIElementRenderer'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('TEIElementRenderer', () => {
  it('TEI Element Rendering render Title in head', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'title',
      component: 'head',
      children: [
        {
          text: '___HANDSCHRIFTENTITEL__',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          {selectRenderer('editMode')({
            element,
            children: <>Test</>,
            attributes: {
              'data-slate-node': 'element',
              ref: null,
            },
          })}
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Kopf')).toBeVisible()
  })

  test('TEI Element Rendering render teiHeader without visibility', () => {
    render(
      selectRenderer('editMode')({
        element: {
          data_origin: 'msDesc',
          children: [{ text: '' }],
        },
        children: <>Hello Slate</>,
        attributes: {
          'data-slate-node': 'element',
          ref: null,
        },
      })
    )

    expect(screen.getByText('Hello Slate')).toBeVisible()
  })
})
