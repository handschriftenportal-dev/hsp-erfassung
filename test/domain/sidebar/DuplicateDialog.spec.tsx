/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * Author: Christoph Marten on 13.01.2022 at 11:35
 */
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { fireEvent, render, screen } from '@testing-library/react'
import { DuplicateDialog } from '../../../src/domain/sidebar/DuplicateDialog'
import { PopupState } from 'material-ui-popup-state/core'
import { BeschreibungsKomponente } from '../../../src/domain/sidebar/BeschreibungsKomponenteFactory'
import { TestContext } from '../../TestContext'

describe('DuplicateDialog', () => {
  it('View', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    }]

    const popupState : PopupState = {
      _childPopupState: undefined,
      _setChildPopupState(popupState: PopupState | null | undefined): void {
      },
      anchorEl: undefined,
      close(): void {
      },
      disableAutoFocus: false,
      isOpen: false,
      onMouseLeave(event: React.SyntheticEvent<any>): void {
      },
      popupId: undefined,
      setAnchorEl(anchorEl: HTMLElement): any {
      },
      setAnchorElUsed: false,
      setOpen(open: boolean, eventOrAnchorEl: React.SyntheticEvent<any> | HTMLElement | undefined): void {
      },
      toggle(eventOrAnchorEl: React.SyntheticEvent<any> | HTMLElement | null | undefined): void {
      },
      // @ts-ignore
      variant: undefined,
      // @ts-ignore
      open: true
    }

    // @ts-ignore
    const fazikel: BeschreibungsKomponente = {
      'id': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
      'label': 'Faszikel',
      'teiElement': 'msPartbooklet',
      'children': [
        {
          'id': '78e80b55-1c5f-4abd-b6ed-bf3452ca2e09',
          'label': 'Identifikation',
          'teiElement': 'msIdentifier',
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            7,
            0
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-msIdentifier',
          'level': 2,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        },
        {
          'id': 'aa0a613a-65f6-4692-ae5b-4273a59a56d6',
          'label': 'Kopf',
          'teiElement': 'head',
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            7,
            1
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-head',
          'level': 2,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        },
        {
          'id': 'ed255a9e-2262-4297-86ab-7ed664efe79b',
          'label': 'Inhalt',
          'teiElement': 'msContents',
          'children': [
            {
              'id': '439a7932-9f05-4b90-9247-9103c390ca32',
              'label': 'Abschnitt',
              'teiElement': 'msItem',
              'children': [],
              'path': [
                0,
                1,
                0,
                0,
                7,
                2,
                0
              ],
              'xmlpath': '#document-TEI-text-body-msDesc-msPart-msContents-msItem',
              'level': 4,
              'parent': 'ed255a9e-2262-4297-86ab-7ed664efe79b',
              'wrapperID': ''
            },
            {
              'id': 'a9cd7468-ebc0-4d5c-b408-a7912e48dfe4',
              'label': 'Abschnitt',
              'teiElement': 'msItem',
              'children': [],
              'path': [
                0,
                1,
                0,
                0,
                7,
                2,
                1
              ],
              'xmlpath': '#document-TEI-text-body-msDesc-msPart-msContents-msItem',
              'level': 4,
              'parent': 'ed255a9e-2262-4297-86ab-7ed664efe79b',
              'wrapperID': ''
            },
            {
              'id': '250d2471-60b7-47c1-87cc-c0abc6952250',
              'label': 'Abschnitt',
              'teiElement': 'msItem',
              'children': [],
              'path': [
                0,
                1,
                0,
                0,
                7,
                2,
                2
              ],
              'xmlpath': '#document-TEI-text-body-msDesc-msPart-msContents-msItem',
              'level': 4,
              'parent': 'ed255a9e-2262-4297-86ab-7ed664efe79b',
              'wrapperID': ''
            }
          ],
          'path': [
            0,
            1,
            0,
            0,
            7,
            2
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-msContents',
          'level': 3,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        },
        {
          'id': '9f37595e-aea9-489b-82f9-902aadb65b19',
          'label': 'Äußeres',
          'teiElement': 'physDesc',
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            7,
            3
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-physDesc',
          'level': 2,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        },
        {
          'id': 'f12464b1-2a02-40be-ac1e-5a3dfb5e8586',
          'label': 'Geschichte',
          'teiElement': 'history',
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            7,
            4
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-history',
          'level': 2,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        },
        {
          'id': 'e41675be-f996-4434-af6d-0d5c6682ae4a',
          'label': 'Literatur',
          'teiElement': 'additional',
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            7,
            5
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-additional',
          'level': 2,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        }
      ],
      'path': [
        0,
        1,
        0,
        0,
        7
      ],
      'xmlpath': '#document-TEI-text-body-msDesc-msPart',
      'level': 2,
      'parent': 'root',
      'wrapperID': ''
    }

    render(<TestContext>
        <Slate value={slateValue} onChange={() => {
        }} editor={editor}><DuplicateDialog open={true} editor={editor} setOpen={jest.fn()} popupState={popupState} beschreibung={fazikel}/>
        </Slate>
      </TestContext>)

    expect(screen.getByText('Faszikel')).toBeTruthy()
  })
  it('Duplicate', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    }]

    const popupState : PopupState = {
      _childPopupState: undefined,
      _setChildPopupState(popupState: PopupState | null | undefined): void {
      },
      anchorEl: undefined,
      close(): void {
      },
      disableAutoFocus: false,
      isOpen: false,
      onMouseLeave(event: React.SyntheticEvent<any>): void {
      },
      popupId: undefined,
      setAnchorEl(anchorEl: HTMLElement): any {
      },
      setAnchorElUsed: false,
      setOpen(open: boolean, eventOrAnchorEl: React.SyntheticEvent<any> | HTMLElement | undefined): void {
      },
      toggle(eventOrAnchorEl: React.SyntheticEvent<any> | HTMLElement | null | undefined): void {
      },
      // @ts-ignore
      variant: undefined,
      // @ts-ignore
      open: true
    }

    // @ts-ignore
    const fazikel: BeschreibungsKomponente = {
      'id': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
      'label': 'Faszikel',
      'teiElement': 'msPartbooklet',
      'children': [
        {
          'id': '78e80b55-1c5f-4abd-b6ed-bf3452ca2e09',
          'label': 'Identifikation',
          'teiElement': 'msIdentifier',
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            7,
            0
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-msIdentifier',
          'level': 2,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        },
        {
          'id': 'aa0a613a-65f6-4692-ae5b-4273a59a56d6',
          'label': 'Kopf',
          'teiElement': 'head',
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            7,
            1
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-head',
          'level': 2,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        },
        {
          'id': 'ed255a9e-2262-4297-86ab-7ed664efe79b',
          'label': 'Inhalt',
          'teiElement': 'msContents',
          'children': [
            {
              'id': '439a7932-9f05-4b90-9247-9103c390ca32',
              'label': 'Abschnitt',
              'teiElement': 'msItem',
              'children': [],
              'path': [
                0,
                1,
                0,
                0,
                7,
                2,
                0
              ],
              'xmlpath': '#document-TEI-text-body-msDesc-msPart-msContents-msItem',
              'level': 4,
              'parent': 'ed255a9e-2262-4297-86ab-7ed664efe79b',
              'wrapperID': ''
            },
            {
              'id': 'a9cd7468-ebc0-4d5c-b408-a7912e48dfe4',
              'label': 'Abschnitt',
              'teiElement': 'msItem',
              'children': [],
              'path': [
                0,
                1,
                0,
                0,
                7,
                2,
                1
              ],
              'xmlpath': '#document-TEI-text-body-msDesc-msPart-msContents-msItem',
              'level': 4,
              'parent': 'ed255a9e-2262-4297-86ab-7ed664efe79b',
              'wrapperID': ''
            },
            {
              'id': '250d2471-60b7-47c1-87cc-c0abc6952250',
              'label': 'Abschnitt',
              'teiElement': 'msItem',
              'children': [],
              'path': [
                0,
                1,
                0,
                0,
                7,
                2,
                2
              ],
              'xmlpath': '#document-TEI-text-body-msDesc-msPart-msContents-msItem',
              'level': 4,
              'parent': 'ed255a9e-2262-4297-86ab-7ed664efe79b',
              'wrapperID': ''
            }
          ],
          'path': [
            0,
            1,
            0,
            0,
            7,
            2
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-msContents',
          'level': 3,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        },
        {
          'id': '9f37595e-aea9-489b-82f9-902aadb65b19',
          'label': 'Äußeres',
          'teiElement': 'physDesc',
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            7,
            3
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-physDesc',
          'level': 2,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        },
        {
          'id': 'f12464b1-2a02-40be-ac1e-5a3dfb5e8586',
          'label': 'Geschichte',
          'teiElement': 'history',
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            7,
            4
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-history',
          'level': 2,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        },
        {
          'id': 'e41675be-f996-4434-af6d-0d5c6682ae4a',
          'label': 'Literatur',
          'teiElement': 'additional',
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            7,
            5
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msPart-additional',
          'level': 2,
          'parent': 'f6fff11e-5917-4e1b-bc2c-1a1510b889c7',
          'wrapperID': ''
        }
      ],
      'path': [
        0,
      ],
      'xmlpath': '#document-TEI-text-body-msDesc-msPart',
      'level': 2,
      'parent': 'root',
      'wrapperID': ''
    }

    render(<TestContext>
      <Slate value={slateValue} onChange={() => {
      }} editor={editor}><DuplicateDialog open={true} editor={editor} setOpen={jest.fn()} popupState={popupState} beschreibung={fazikel}/>
      </Slate>
    </TestContext>)

    fireEvent.click(screen.getByRole('duplicate'))

    expect(screen.getByText('Faszikel')).toBeTruthy()
  })
})
