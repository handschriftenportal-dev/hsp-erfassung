import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { BeschreibungsTextField } from 'src/domain/editor/BeschreibungsTextField'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('BeschreibungsTextField', () => {
  const editor = createErfassungsEditor()
  const element = {
    data_origin: 'altIdentifier',
    id: '5276f915-5da8-450b-8235-b5618fa7c7b3',
    children: [
      {
        text: 'Text',
      },
    ],
  }
  const errorElement = {
    data_origin: 'altIdentifier',
    id: '5276f915-5da8-450b-8235-b5618fa7c7b3',
    error: 'xxx',
    children: [
      {
        text: 'Text',
      },
    ],
  }
  const slateValue = [
    {
      data_origin: 'paragraph',
      children: [element],
    },
  ]

  it('renders input with elements text content', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <BeschreibungsTextField element={element} />
        </Slate>
      </TestContext>
    )
    expect(screen.getByRole('textbox')).toHaveValue('Text')
  })

  it('supports label', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <BeschreibungsTextField label="Label" element={element} />
        </Slate>
      </TestContext>
    )
    expect(screen.getByLabelText('Label')).toBeVisible()
  })

  it('supports labelled by', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <label id={'123'}>Label</label>
          <BeschreibungsTextField labelledBy="123" element={element} />
        </Slate>
      </TestContext>
    )
    expect(screen.getByLabelText('Label')).toBeVisible()
  })

  it('shows error if in element', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <BeschreibungsTextField element={errorElement} />
        </Slate>
      </TestContext>
    )
    expect(screen.getByText('Error')).toBeVisible()
  })
})
