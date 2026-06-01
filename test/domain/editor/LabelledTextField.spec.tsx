import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Editable, Slate } from 'slate-react'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { selectRenderer } from 'src/domain/editor/TEIElementRenderer'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('LabelledTextField', () => {
  const editor = createErfassungsEditor()
  const element = {
    data_origin: 'altIdentifier',
    region: 'altIdentifier',
    path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
    component: '',
    level: 1,
    id: '5276f915-5da8-450b-8235-b5618fa7c7b3',
    data_type: 'corpus',
    children: [
      {
        data_origin: 'collection',
        region: 'altIdentifiercorpus',
        path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
        component: '',
        level: 1,
        id: '194fef8e-89af-420f-8456-43ac1f91caf5',
        children: [
          {
            region: 'altIdentifier',
            text: 'Sammlung XYZ',
          },
        ],
      },
      {
        data_origin: 'idno',
        region: 'altIdentifier',
        path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
        component: '',
        level: 1,
        id: 'b5b63b39-092b-425d-a8d5-7a8b0a4505bc',
        children: [
          {
            region: 'altIdentifier',
            text: '123',
          },
        ],
      },
    ],
  }

  const slateValue = [
    {
      data_origin: 'paragraph',
      children: [element],
    },
  ]
  it('has accessible label', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabelledTextField element={element} label={'Label'} />
        </Slate>
      </TestContext>
    )
    expect(screen.getByLabelText('Label')).toBeVisible()
  })

  it('label points to textfield', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabelledTextField element={element} label={'Label'} />
        </Slate>
      </TestContext>
    )
    expect(screen.getByLabelText('Label')).toHaveTextContent('Sammlung XYZ')
  })

  it('shows helper text if error flag is set to true', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabelledTextField
            error
            helpertext={'Helper Text'}
            element={element}
            label={'Label'}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.getByText('Helper Text')).toBeVisible()
  })

  it('does not show helper text if error flag is set to false', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabelledTextField
            error={false}
            helpertext={'Helper Text'}
            element={element}
            label={'Label'}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.queryByText('Helper Text')).toBeNull()
  })

  it('does show delete button if delete flag is set', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabelledTextField deletable element={element} label={'Label'} />
        </Slate>
      </TestContext>
    )
    expect(screen.getByRole('button')).toBeVisible()
  })

  it('does not show delete button if delete flag is set', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabelledTextField
            deletable={false}
            element={element}
            label={'Label'}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('typing in textfield changes state', async () => {
    const user = userEvent.setup()
    const editor = createErfassungsEditor()
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Editable renderElement={selectRenderer('editMode')} />
        </Slate>
      </TestContext>
    )

    await user.click(screen.getByRole('textbox'))
    await user.click(screen.getByLabelText('Corpus Name'))
    await user.keyboard('{ArrowLeft}')
    await user.keyboard('1')
    await user.keyboard('2')
    expect(screen.getByLabelText('Corpus Name')).toHaveTextContent(
      'Sammlung XY12Z'
    )
  })
})
