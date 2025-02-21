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

import { act, render, screen } from '@testing-library/react'
import { Point, Transforms } from 'slate'

import { SelectionToolbarActions } from '../../../../src/domain/editor/selectiontoolbar/SelectionToolbarActions'
import de from '../../../../src/infrastructure/i18n/translation_de.json'
import { TEIText } from '../../../../src/infrastructure/slate/TEI'
import { createVolltextEditor } from '../../../../src/infrastructure/slate/volltext/VolltextEditorFactory'
import { TestContext } from '../../../TestContext'

describe('Selection toolbar actions', () => {
  describe('generally', () => {
    beforeEach(() => {
      const editor = createVolltextEditor()
      editor.children = [
        { data_origin: 'paragraph', children: [{ text: 'content' }] },
      ]
      const anchor = { path: [0, 0], offset: 0 }
      const focus = { path: [0, 0], offset: 4 }
      Transforms.select(editor, { anchor, focus })
      render(
        <TestContext>
          <SelectionToolbarActions editor={editor} />
        </TestContext>
      )
    })

    it('buttons are not disabled', () => {
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).not.toBeDisabled()
      })
    })

    it('contains three buttons', () => {
      expect(screen.getAllByRole('button')).toHaveLength(3)
    })

    it('all buttons have a (nonempty) title', () => {
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button.title).toMatch(/\w+/)
      })
    })

    it.each([
      [
        { altKey: true, shiftKey: true, key: 'N' },
        de.text_tagging.referenz.dialog.title,
      ],
      [
        { altKey: true, shiftKey: true, key: 'S' },
        de.text_tagging.formatierung.dialog.title,
      ],
      [
        { altKey: true, shiftKey: true, key: 'W' },
        de.text_tagging.andere.dialog.title,
      ],
    ])('shortcut "%o" opens "%s" dialog', (keyCombination, name) => {
      act(() => {
        const event = new KeyboardEvent('keydown', keyCombination)
        document.dispatchEvent(event)
      })

      expect(screen.getByRole('heading', { name })).toBeTruthy()
    })
  })

  describe('selection spans', () => {
    const formatierungAutor = {
      data_origin: 'autor',
      box: {
        data_origin: 'persName',
        children: [{ text: 'Autor' }],
      },
      children: [{ text: 'Autor' }],
    }
    const normdatumPerson = {
      data_origin: 'person',
      box: {
        data_origin: 'persName',
        data_ref: '123',
        children: [{ text: 'Autor' }],
      },
      content: 'Normdatum',
      children: [{ text: '' }],
    }
    const content = [
      {
        data_origin: 'paragraph',
        children: [
          TEIText.normalizedText('Semantische Formattierung: '),
          formatierungAutor,
          TEIText.normalizedText('. Text danach.'),
        ],
      },
      {
        data_origin: 'paragraph',
        children: [
          TEIText.normalizedText('Normdaten Verknüpfung: '),
          normdatumPerson,
          TEIText.normalizedText('. Ende.'),
        ],
      },
    ]

    function setup(anchor?: Point, focus?: Point) {
      const editor = createVolltextEditor()
      editor.children = content
      if (anchor) {
        Transforms.select(editor, { anchor, focus: focus || anchor })
      }
      render(
        <TestContext>
          <SelectionToolbarActions editor={editor} />
        </TestContext>
      )
    }

    function buttons() {
      return {
        semantisch: screen.queryByRole('button', {
          name: de.selection_toolbar.semantische_auszeichnung,
        }),
        weitere: screen.queryByRole('button', {
          name: de.selection_toolbar.weitere_auszeichnung,
        }),
        normdaten: screen.queryByRole('button', {
          name: de.selection_toolbar.normdaten_auszeichnung,
        }),
        formatierungLoeschen: screen.queryByRole('button', {
          name: de.selection_toolbar.formatierung_loeschen,
        }),
      }
    }

    it('no text: buttons are disabled', () => {
      setup()
      const { weitere, normdaten, semantisch, formatierungLoeschen } = buttons()
      expect(formatierungLoeschen).toBeNull()
      expect(normdaten).toBeDisabled()
      expect(semantisch).toBeDisabled()
      expect(weitere).toBeDisabled()
    })

    it('just text: all buttons are enabled', () => {
      setup({ path: [0, 0], offset: 0 }, { path: [0, 0], offset: 5 })
      const { weitere, normdaten, semantisch, formatierungLoeschen } = buttons()
      expect(formatierungLoeschen).toBeNull()
      expect(normdaten).not.toBeDisabled()
      expect(semantisch).not.toBeDisabled()
      expect(weitere).not.toBeDisabled()
    })

    it('over paragraphs: all buttons are disabled', () => {
      setup({ path: [0, 3], offset: 1 }, { path: [1, 0], offset: 2 })
      const { weitere, normdaten, semantisch, formatierungLoeschen } = buttons()
      expect(formatierungLoeschen).toBeNull()
      expect(normdaten).toBeDisabled()
      expect(semantisch).toBeDisabled()
      expect(weitere).toBeDisabled()
    })

    it('text inside semantic tag: other and normdata are not disabled, semantic is null, deletion button is visible', () => {
      setup({ path: [0, 1, 0], offset: 0 }, { path: [0, 1, 0], offset: 4 })
      const { weitere, normdaten, semantisch, formatierungLoeschen } = buttons()
      expect(normdaten).not.toBeDisabled()
      expect(semantisch).toBeNull()
      expect(formatierungLoeschen).not.toBeDisabled()
      expect(weitere).not.toBeDisabled()
    })

    it('from semantic tag to neighbor text: all buttons are disabled', () => {
      setup({ path: [0, 1, 0], offset: 1 }, { path: [0, 2], offset: 4 })
      const { weitere, normdaten, semantisch, formatierungLoeschen } = buttons()
      expect(normdaten).toBeDisabled()
      expect(semantisch).toBeNull()
      expect(formatierungLoeschen).not.toBeDisabled()
      expect(weitere).toBeDisabled()
    })
  })
})
