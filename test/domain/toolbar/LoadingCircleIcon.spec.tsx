import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Slate } from 'slate-react'
import { LoadingCircleIcon } from 'src/domain/toolbar/LoadingCircleIcon'
import ConfigureStore from 'src/infrastructure/ConfigureReduxStore'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'

test('LoadingCircle Anzeigen', () => {
  const store = ConfigureStore
  store.dispatch({ type: 'erfassung/updateApplicationBusy', payload: true })
  const editor = createErfassungsEditor()
  const slateValue = [
    {
      data_origin: 'paragraph',
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]

  render(
    <Provider store={store}>
      <Slate initialValue={slateValue} editor={editor}>
        <LoadingCircleIcon />
      </Slate>
    </Provider>
  )

  expect(screen.getByTestId('loadingCircle')).toBeVisible()
})
