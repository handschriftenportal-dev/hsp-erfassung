import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { IdnoSimpleWithLink } from 'src/domain/editor/beschreibungskomponenten/identifikation/IdnoSimpleWithLink'
import { updateStandalone } from 'src/domain/erfassung/ErfassungsState'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('IdnoSimpleWithLink Test', () => {
  it('View IdnoSimpleWithLink', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'idno',
      region: 'altIdentifiercorpus',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      component: '',
      level: 1,
      id: 'XXXX',
      children: [
        {
          region: 'altIdentifiercorpus',
          text: 'Signatur 123',
        },
      ],
    }
    const props = {
      element,
      attributes: TestSlateAttributes.element,
      children: [],
    }

    const store = configureTestStore()
    store.dispatch(updateStandalone(false))

    render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <IdnoSimpleWithLink props={props} link={'Link'} title={'Title'} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Signatur 123')).toBeTruthy()
    expect(screen.getByRole('link')).toHaveAttribute('href', 'Link')
  })
})
