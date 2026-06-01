import { render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { BeschreibungsKomponenteIdentifikation } from 'src/domain/editor/beschreibungskomponenten/identifikation/BeschreibungsKomponenteIdentifikation'
import {
  updateConfiguration,
  updateStandalone,
  writeDocument,
} from 'src/domain/erfassung/ErfassungsState'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { configureTestStore, TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('BeschreibungsKomponenteIdentifikation', () => {
  jest.spyOn(console, 'error').mockImplementation(() => null)
  const store = configureTestStore()
  store.dispatch(
    updateConfiguration({
      validationUrl: '/test',
      beschreibungsUrl: '/test',
      workspaceUrl: '/test',
      isEditable: false,
    })
  )
  store.dispatch(updateStandalone(false))
  store.dispatch(writeDocument())
  const attributes = TestSlateAttributes.element

  describe('for root identification', () => {
    beforeEach(() => {
      const element = ErfassungsRegeln.komponenteElement('msIdentifier')
      const identifikation = {
        ...element,
        path: 'document-TEI-text-body-msDesc-msIdentifier',
      }
      const editor = createErfassungsEditor()
      render(
        <TestContext store={store}>
          <Slate initialValue={[]} editor={editor}>
            <BeschreibungsKomponenteIdentifikation
              element={identifikation}
              attributes={attributes}
              children={[]}
            />
          </Slate>
        </TestContext>
      )
    })

    it('has heading', () => {
      const headings = screen.getAllByRole('heading', {
        name: de.sidebar.identification,
      })
      expect(headings).not.toHaveLength(0)
      headings.forEach((heading) => expect(heading).toBeVisible())
    })

    it('does not render Vorbesitzersignatur button in edit mode', () => {
      expect(
        screen.queryByRole('button', { name: de.editor.former_signature })
      ).toBeFalsy()
    })

    it('does not render Corpus button in edit mode', () => {
      expect(
        screen.queryByRole('button', { name: de.editor.corpus })
      ).toBeFalsy()
    })
  })

  describe('for msPart identification', () => {
    beforeEach(() => {
      const element = ErfassungsRegeln.komponenteElement('msIdentifier')
      const identifikation = {
        ...element,
        path: 'document-TEI-text-body-msDesc-msPart-msIdentifier',
      }
      const editor = createErfassungsEditor()
      render(
        <TestContext store={store}>
          <Slate initialValue={[]} editor={editor}>
            <BeschreibungsKomponenteIdentifikation
              element={identifikation}
              attributes={attributes}
              children={[]}
            />
          </Slate>
        </TestContext>
      )
    })

    it('has headings', () => {
      const headings = screen.getAllByRole('heading', {
        name: de.sidebar.identification,
      })
      expect(headings).not.toHaveLength(0)
      headings.forEach((heading) => expect(heading).toBeVisible())
    })

    it('does not render Vorbesitzersignatur button in edit mode', () => {
      expect(
        screen.queryByRole('button', { name: de.editor.former_signature })
      ).toBeFalsy()
    })

    it('does render Besitzende Einrichtung button in edit mode', () => {
      expect(
        screen.getByRole('button', { name: de.editor.repository })
      ).toBeVisible()
    })

    it('does render Ort button in edit mode', () => {
      expect(
        screen.getByRole('button', { name: de.editor.place })
      ).toBeVisible()
    })

    it('does not render Corpus button in edit mode', () => {
      expect(
        screen.queryByRole('button', { name: de.editor.corpus })
      ).toBeFalsy()
    })
  })
})
