import { act, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import type { Editor } from 'slate'
import { Slate } from 'slate-react'
import { TextLang } from 'src/domain/editor/beschreibungselemente/TextLang'
import {
  readDocument,
  updateConfiguration,
  writeDocument,
} from 'src/domain/erfassung/ErfassungsState'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { MockNormdatenService } from 'test/infrastructure/normdaten/MockNormdatenService'
import { configureTestStore, TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('TextLang', () => {
  const attributes = TestSlateAttributes.element
  const slateValue = [
    {
      data_origin: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  const service = MockNormdatenService('/normdaten', 0)
  let store: ReturnType<typeof configureTestStore>
  let editor: Editor
  beforeEach(() => {
    editor = createErfassungsEditor()
    store = configureTestStore()
    store.dispatch(updateConfiguration({ normdatenUrl: '/normdaten' }))
  })
  beforeAll(() => service.listen())
  afterEach(() => service.resetHandlers())
  afterAll(() => service.close())
  const deutsch = 'deutsch (4113292-0)'

  describe('delete button', () => {
    const element = {
      data_origin: 'textLang',
      data_mainLang: 'de',
      data_otherLangs: '',
      children: [
        {
          text: 'Beschreibungstext',
        },
      ],
    }

    it('is visible in edit mode', () => {
      store.dispatch(writeDocument())
      render(
        <TestContext store={store}>
          <Slate initialValue={slateValue} editor={editor}>
            <TextLang attributes={attributes} element={element}>
              Sprache
            </TextLang>
          </Slate>
        </TestContext>
      )
      expect(screen.getByRole('button')).toBeVisible()
    })

    it('is not rendered in read mode', () => {
      store.dispatch(readDocument())
      render(
        <TestContext store={store}>
          <Slate initialValue={slateValue} editor={editor}>
            <TextLang attributes={attributes} element={element}>
              Sprache
            </TextLang>
          </Slate>
        </TestContext>
      )
      expect(screen.queryByRole('button')).toBeNull()
    })
  })

  describe('without otherLangs', () => {
    const element = {
      data_origin: 'textLang',
      data_mainLang: 'de',
      data_otherLangs: '',
      children: [
        {
          text: 'Beschreibungstext',
        },
      ],
    }
    beforeEach(async () => {
      await act(async () =>
        render(
          <TestContext store={store}>
            <Slate initialValue={slateValue} editor={editor}>
              <TextLang attributes={attributes} element={element}>
                Sprache
              </TextLang>
            </Slate>
          </TestContext>
        )
      )
    })

    it('shows heading', () => {
      expect(
        screen.getByRole('heading', { name: de.editor.text_lang_element })
      ).toBeVisible()
    })

    it('shows columnheader Freitext and Schreibsprache', () => {
      expect(
        screen.getByRole('columnheader', { name: de.editor.free_text })
      ).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: de.editor.main_language })
      ).toBeVisible()
    })

    it('shows main language in cell', async () => {
      await waitFor(() => {
        expect(screen.getByRole('cell', { name: deutsch })).toBeVisible()
      })
    })

    it('does not show columnheader Andere Schreibsprachen', () => {
      expect(
        screen.queryByRole('columnheader', { name: de.editor.other_language })
      ).toBeNull()
    })
  })

  describe('with other languages', () => {
    const element = {
      data_origin: 'textLang',
      data_mainLang: 'de',
      data_otherLangs: 'de de',
      children: [
        {
          text: 'Beschreibungstext',
        },
      ],
    }
    beforeEach(async () => {
      await act(async () =>
        render(
          <TestContext store={store}>
            <Slate initialValue={slateValue} editor={editor}>
              <TextLang attributes={attributes} element={element}>
                Sprache
              </TextLang>
            </Slate>
          </TestContext>
        )
      )
    })

    it('does show columnheader Andere Schreibsprachen', () => {
      expect(
        screen.getByRole('columnheader', { name: de.editor.other_language })
      ).toBeVisible()
    })

    it('shows other languages in list', () => {
      expect(screen.getByRole('list')).toBeVisible()
    })

    it('has list items equals to other langs', async () => {
      await waitFor(() => {
        const items = screen.getAllByRole('listitem')
        expect(items).toHaveLength(2)
        expect(items.map((item) => item.textContent)).toMatchObject([
          deutsch,
          deutsch,
        ])
      })
    })
  })

  it('unknown language shows server error', async () => {
    const element = {
      data_origin: 'textLang',
      data_mainLang: 'unknown',
      data_otherLangs: '',
      children: [
        {
          text: 'Deutsche',
        },
      ],
    }
    render(
      <TestContext store={store}>
        <Slate initialValue={slateValue} editor={editor}>
          <TextLang attributes={attributes} element={element}>
            Sprache
          </TextLang>
        </Slate>
      </TestContext>
    )

    await waitFor(() => {
      expect(
        screen.getByRole('cell', { name: 'unknown (Nicht gefunden)' })
      ).toBeVisible()
    })
  })
})
