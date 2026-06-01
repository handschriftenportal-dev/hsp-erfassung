import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import type { Editor } from 'slate'
import { Slate } from 'slate-react'
import { Ueberlieferungsform } from 'src/domain/editor/beschreibungskomponenten/kopf/indexd/Ueberlieferungsform'
import { writeDocument } from 'src/domain/erfassung/ErfassungsState'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import de from 'src/infrastructure/i18n/translation_de.json'
import { ThemenbereichService } from 'src/infrastructure/normdaten/ThemenbereichService'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import subjectArea from 'test/infrastructure/normdaten/fixtures/ueberlieferungsform.json'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('Ueberlieferungsform', () => {
  const api = ThemenbereicheAPI.new('de')
  const ueberlieferungsform = subjectArea.data.findSubjectArea
  api.addSubjectArea(ueberlieferungsform)

  describe('without error', () => {
    let editor: Editor
    let container: HTMLElement

    const ueberlieferungsformElement = {
      data_origin: 'index',
      data_indexName: 'norm_form',
      children: [
        {
          data_origin: 'term',
          data_type: 'form',
          data_key: 'NORM-385d6995-a735-3a4c-a8b0-221b21cccf01',
          data_ref:
            'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/FORM-X869',
          children: [{ text: 'Sammlung handschriftlichen Materials' }],
        },
        {
          data_origin: 'term',
          data_type: 'form',
          data_key: 'NORM-c93ac08a-42e4-3f13-bea2-ed07dfea9892',
          data_ref:
            'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/FORM-B456',
          children: [{ text: '' }],
        },
        {
          data_origin: 'term',
          data_type: 'form',
          data_key: 'NORM-fcdc9965-677e-3c69-9a70-0c266893e376',
          data_ref:
            'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/FORM-A890',
          children: [{ text: '' }],
        },
      ],
    }

    beforeEach(() => {
      const store = configureTestStore()
      store.dispatch(writeDocument())
      editor = createErfassungsEditor()
      container = render(
        <TestContext store={store}>
          <ThemenbereichService api={api}>
            <Slate
              initialValue={[
                {
                  data_origin: 'paragraph',
                  children: [{ text: 'A line of text in a paragraph.' }],
                },
              ]}
              editor={editor}
            >
              <Ueberlieferungsform element={ueberlieferungsformElement} />
            </Slate>
          </ThemenbereichService>
        </TestContext>
      ).container
    })

    it('renders label', () => {
      expect(screen.getByLabelText(de.editor.form)).toBeVisible()
    })

    it('has helper text', async () => {
      await userEvent.click(
        screen.getByRole('button', { name: de.editor.show_help })
      )
      expect(container.innerHTML).toContain(de.editor.help_text.form_type)
    })

    it('renders Begriff label in combobox', () => {
      expect(screen.getByRole('combobox')).toHaveValue(
        'Sammlung handschriftlichen Materials'
      )
    })

    it('offers Ueberlieferungsformen for selection', async () => {
      await userEvent.click(screen.getByRole('combobox'))
      const name = 'mehrbändige Handschrift FORM-X446'
      expect(screen.getByRole('option', { name })).toBeVisible()
    })

    it('does not render inline color', () => {
      expect(container.innerHTML).not.toContain('style="color: rgb')
    })
  })

  describe('with error', () => {
    const ueberlieferungsformElement = {
      data_origin: 'index',
      data_indexName: 'norm_form',
      children: [
        {
          data_origin: 'term',
          data_type: 'form',
          data_key: 'NORM-385d6995-a735-3a4c-a8b0-221b21cccf01',
          data_ref:
            'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/FORM-X869',
          children: [{ text: 'Sammlung handschriftlichen Materials' }],
        },
        {
          data_origin: 'term',
          data_type: 'form',
          error: 'some error here',
          data_key: 'NORM-c93ac08a-42e4-3f13-bea2-ed07dfea9892',
          data_ref:
            'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/FORM-B456',
          children: [{ text: '' }],
        },
        {
          data_origin: 'term',
          data_type: 'form',
          data_key: 'NORM-fcdc9965-677e-3c69-9a70-0c266893e376',
          data_ref:
            'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/FORM-A890',
          children: [{ text: '' }],
        },
      ],
    }

    it('on error renders label red', () => {
      const store = configureTestStore()
      store.dispatch(writeDocument())
      const editor = createErfassungsEditor()
      const container = render(
        <TestContext store={store}>
          <ThemenbereichService api={api}>
            <Slate
              initialValue={[
                {
                  data_origin: 'paragraph',
                  children: [{ text: 'A line of text in a paragraph.' }],
                },
              ]}
              editor={editor}
            >
              <Ueberlieferungsform element={ueberlieferungsformElement} />
            </Slate>
          </ThemenbereichService>
        </TestContext>
      ).container
      expect(container.innerHTML).toContain('style="color: rgb')
    })
  })
})
