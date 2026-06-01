import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { FC, PropsWithChildren } from 'react'
import { act } from 'react'
import { Slate } from 'slate-react'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { VolltextEditor } from 'src/domain/editor/volltext/VolltextEditor'
import {
  updateConfiguration,
  updateMode,
} from 'src/domain/erfassung/ErfassungsState'
import {
  GlobalerEinfuegeService,
  useGlobalerEinfuegeContext,
} from 'src/infrastructure/slate/einfuegeservice/GlobalerEinfuegeService'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { VolltextEditorElement } from 'src/infrastructure/slate/volltext/VolltextEditorElement'
import { configureTestStore, TestContext } from 'test/TestContext'

const InsertTarget: FC<PropsWithChildren> = ({ children }) => {
  const { target } = useGlobalerEinfuegeContext()
  return (
    <>
      <h1>{target?.type ?? 'empty'}</h1>
      {children}
    </>
  )
}

const enterAndLeave = (element: HTMLElement) => (): void => {
  element.focus()
  element.blur()
}

describe('GlobalerEinfuegeService', () => {
  it('LabelledTextField registers itself as target when blurred', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'altIdentifier',
      data_type: 'corpus',
      children: [
        {
          data_origin: 'collection',
          children: [
            {
              text: 'Sammlung XYZ',
            },
          ],
        },
        {
          data_origin: 'idno',
          children: [
            {
              text: '123',
            },
          ],
        },
      ],
    }
    render(
      <GlobalerEinfuegeService>
        <InsertTarget>
          <Slate initialValue={[element]} editor={editor}>
            <LabelledTextField label={'Label'} element={element} />
          </Slate>
        </InsertTarget>
      </GlobalerEinfuegeService>
    )
    act(enterAndLeave(screen.getByRole('textbox')))

    expect(screen.getByRole('heading')).toHaveTextContent('element')
  })

  it.skip('volltext editor register itself as target when blurred', async () => {
    /* The onBlur function of VolltextEditor doesn't fire in the test
     * environment. I couldn't find a way to make it work currently.
     * This could be a bug and should be reevaluated after an jest, jestdom,
     * react or slate update
     */
    const store = configureTestStore()
    store.dispatch(updateConfiguration({ isEditable: true }))
    store.dispatch(updateMode('editMode'))
    const initialValue = VolltextEditorElement.emptyVolltext().content
    render(
      <TestContext store={store}>
        <GlobalerEinfuegeService>
          <InsertTarget>
            <VolltextEditor initialValue={initialValue} />
            <input type="text" defaultValue="tab target" />
          </InsertTarget>
        </GlobalerEinfuegeService>
      </TestContext>
    )
    const [editor, tabTarget] = screen.getAllByRole('textbox')

    expect(editor).not.toHaveFocus()
    await userEvent.tab()
    expect(editor).toHaveFocus()
    await userEvent.tab()
    expect(tabTarget).toHaveFocus()
    // Now onBlur should have been fired, but it didn't

    expect(screen.getByRole('heading')).toHaveTextContent('editor')
  })
})
