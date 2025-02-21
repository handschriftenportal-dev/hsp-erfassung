/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act, FC, PropsWithChildren } from 'react'
import { Slate } from 'slate-react'

import { EditableTextfieldTwoColumnElement } from '../../../../src/domain/editor/EditableTextfieldTwoColumnElement'
import { VolltextEditor } from '../../../../src/domain/editor/volltext/VolltextEditor'
import {
  updateConfiguration,
  updateMode,
} from '../../../../src/domain/erfassung/ErfassungsState'
import {
  GlobalerEinfuegeService,
  useGlobalerEinfuegeContext,
} from '../../../../src/infrastructure/slate/einfuegeservice/GlobalerEinfuegeService'
import { createErfassungsEditor } from '../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { VolltextEditorElement } from '../../../../src/infrastructure/slate/volltext/VolltextEditorElement'
import { configureTestStore, TestContext } from '../../../TestContext'

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
  it('EditableTextfieldTwoColumnElement registers itself as target when blurred', () => {
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
            <EditableTextfieldTwoColumnElement
              label={'Label'}
              element={element}
            />
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
