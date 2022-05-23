/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { render, screen } from '@testing-library/react'
import { TestContext } from '../../TestContext'
import { KomponentenAuswahlDialog } from '../../../src/domain/sidebar/KomponentenAuswahlDialog'
import '@testing-library/jest-dom'
import { BeschreibungsKomponente } from '../../../src/domain/sidebar/BeschreibungsKomponenteFactory'
import { PopupState } from 'material-ui-popup-state/core'

describe('KomponentenAuswahlDialog Test', () => {
  it('View', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    }]

    const beschreibungsKomponente : BeschreibungsKomponente = {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: '',
      wrapperID: '',
      xmlpath: ''
    }

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

    render(
        <TestContext>
          <Slate value={slateValue} onChange={() => {
          }}
                 editor={editor}>
            <KomponentenAuswahlDialog open={true} title={'Auswahldialog'} setOpen={() => {
            }} popupState={popupState} value={'Auswahl'} beschreibung={beschreibungsKomponente} komponentOptions={[]} insert={() => {}} setKomponent={() => {}} type={'child'}/>
          </Slate></TestContext>)
    expect(screen.getByText('Auswahldialog')).toBeVisible()
  })
})
