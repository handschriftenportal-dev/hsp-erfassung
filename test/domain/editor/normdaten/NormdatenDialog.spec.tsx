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

import { NormdatenDialog } from '../../../../src/domain/editor/normdaten/NormdatenDialog'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestContext } from '../../../TestContext'
import { GNDEntity } from '../../../../src/infrastructure/normdaten/GNDEntity'
import '@testing-library/jest-dom'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { findIDOrName } from '../../../../src/domain/editor/normdaten/useNormdaten'
import ConfigureStore from '../../../../src/infrastructure/ConfigureReduxStore'

describe('Normdaten Test', () => {

  const slateValueForNormdatenTests = [{
    path: '#document-msItem',
    component: 'msItemmusic',
    data_class: 'music',
    children: [
      {
        data_origin: 'note',
        region: 'msItem',
        path: '#document-msItem-note',
        component: '',
        children: [
          {
            data_origin: 'textelement',
            region: 'msItem',
            children: [
              {
                region: 'msItem',
                text: 'et dolore magna aliquyam erat, sed diam voluptua. At vero eos et\n              accusam et dolore magna aliquyam erat, für die',
                showtei: true
              }
            ],
            showtei: true
          },
          {
            data_origin: 'orgName',
            data_role: 'Redakteur',
            region: 'msItem',
            path: '#document-msItem-note-orgName',
            component: '',
            data_ref: 'http://d-nb.info/gnd/5036103-X',
            children: [
              {
                data_origin: 'textelement',
                region: 'msContents',
                children: [
                  {
                    region: 'msContents',
                    text: 'Staatsbibliothek zu Berlin',
                    showtei: true
                  }
                ],
                showtei: true
              }
            ],
            showtei: true
          }
        ],
        showtei: true
      }
    ],
    showtei: true
  }]


  const normdatenElement = {
    data_origin: 'orgName',
    data_role: 'Redakteur',
    region: 'msItem',
    path: '#document-msItem-note-orgName',
    component: '',
    data_ref: 'http://d-nb.info/gnd/5036103-X',
    children: [
      {
        data_origin: 'textelement',
        region: 'msContents',
        children: [
          {
            region: 'msContents',
            text: 'Staatsbibliothek zu Berlin',
            showtei: true
          }
        ],
        showtei: true
      }
    ],
    showtei: true
  }

  it('Test Find ID or Name by Key', () => {
    const element = { data_key: '1' }
    expect(findIDOrName(element)).toEqual('1')
  })

  it('Test Find ID or Name by Ref', () => {
    const element = { data_ref: '1' }
    expect(findIDOrName(element)).toEqual('1')
  })

  it('Test NormdatenDialog', () => {

    const editor = withReact(createEditor() as ReactEditor)

    const gndEntity: GNDEntity = {
      preferredName: 'Konrad Eichstädt',
      gndIdentifier: 'GND1',
      variantName: [] as any,
      error: '',
      id: ''
    }

    // noinspection JSConstantReassignment
    /** @noinspection JSConstantReassignment */
    // @ts-ignore
    ReactEditor = {
      findPath(any1: any, any2: any) {
        return [0, 0, 1, 0, 0]
      }
    }

    render(<TestContext><Slate value={slateValueForNormdatenTests} onChange={() => {
    }} editor={editor}><NormdatenDialog title="Title" open={true} setOpen={() => {
    }} gndEntity={gndEntity} element={normdatenElement}/></Slate></TestContext>)

    expect(screen.getByText('Title')).toBeVisible()
    expect(screen.getAllByDisplayValue('Staatsbibliothek zu Berlin')[0]).toBeVisible()
  })

  it('Test NormdatenDialog Rolle', () => {
    const editor = withReact(createEditor() as ReactEditor)

    const gndEntity: GNDEntity = {
      preferredName: 'Konrad Eichstädt',
      gndIdentifier: 'GND1',
      variantName: [] as any,
      error: '',
      id: ''
    }

    // noinspection JSConstantReassignment
    /** @noinspection JSConstantReassignment */
    // @ts-ignore
    ReactEditor = {
      findPath(any1: any, any2: any) {
        return [0, 0, 1]
      }
    }

    render(<TestContext><Slate value={slateValueForNormdatenTests} onChange={() => {
    }} editor={editor}><NormdatenDialog title="Title" open={true} setOpen={() => {
    }} gndEntity={gndEntity} element={normdatenElement}/></Slate></TestContext>)

    expect(screen.getByDisplayValue('normdatenRole.Redakteur')).toBeVisible()
  })

  it('Test NormdatenDialog delete Orte', () => {
    const editor = withReact(createEditor() as ReactEditor)

    const store = ConfigureStore
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true
    })
    const gndEntity: GNDEntity = {
      preferredName: 'Konrad Eichstädt',
      gndIdentifier: 'GND1',
      variantName: [] as any,
      error: '',
      id: ''
    }

    // noinspection JSConstantReassignment
    /** @noinspection JSConstantReassignment */
    // @ts-ignore
    ReactEditor = {
      findPath(any1: any, any2: any) {
        return [0]
      }
    }

    render(<TestContext><Slate value={slateValueForNormdatenTests} onChange={() => {
    }} editor={editor}><NormdatenDialog title="Title" open={true} setOpen={() => {
    }} gndEntity={gndEntity} element={normdatenElement}/></Slate></TestContext>)

    // @ts-ignore
    expect(editor.children[0].children[0].children[1].data_origin).toBe('orgName')

    // noinspection JSConstantReassignment
    /** @noinspection JSConstantReassignment */
    // @ts-ignore
    ReactEditor = {
      findPath(any1: any, any2: any) {
        return [0, 0, 1]
      }
    }
    fireEvent.click(screen.getByTitle('deleteElementButton'))

    // @ts-ignore
    expect(editor.children[0].children[0].children[1].data_origin).toBe('textelement')
  })
})
