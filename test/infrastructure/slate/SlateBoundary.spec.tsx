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

import { render } from '@testing-library/react'
import { Editor, Element, Node, Range, Text, Transforms } from 'slate'
import { Editable, Slate } from 'slate-react'

import { HSPEditor } from '../../../src/domain/editor/HSPEditor'
import { writeDocument } from '../../../src/domain/erfassung/ErfassungsState'
import { TEI_ELEMENT_PART_OTHER } from '../../../src/domain/erfassung/TEIConstants'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import {
  deleteSlateNodeWithWrapper,
  extractFirstText,
  findFirstElements,
  findSlateNodeAtPath,
  findSlateNodeByWrapperID,
  findSlateTargetPath,
  insertSlateNode,
  isNodeInComponent,
  pathFromXPath,
  removeFormatierung,
  wrapFormatierungAuszeichnung,
} from '../../../src/infrastructure/slate/SlateBoundary'
import { createVolltextEditor } from '../../../src/infrastructure/slate/volltext/VolltextEditorFactory'
import { VolltextFormatierung } from '../../../src/infrastructure/slate/volltext/VolltextElement'
import { configureTestStore, TestContext } from '../../TestContext'

function createElement(data_origin: string, children: Node[]): Element {
  return {
    data_origin,
    children,
  }
}

describe('Slate Boundary', () => {
  describe('traversing the slate data structure', () => {
    const xABTree = {
      data_origin: 'x',
      children: [
        {
          data_origin: 'a',
          children: [
            {
              data_origin: 'b',
              children: [{ data_origin: 'c', children: [{ text: 'exists' }] }],
            },
            {
              data_origin: 'b2',
              children: [{ data_origin: 'c', children: [{ text: 'exists' }] }],
            },
          ],
        },
        {
          data_origin: 'a',
          children: [
            {
              data_origin: 'e',
              children: [{ text: 'not reachable' }],
            },
          ],
        },
      ],
    }
    test.each([
      [['a', 'b', 'c'], true],
      [['a', 'b2', 'c'], true],
      [['a', 'b', 'd'], false],
      [['a', 'e'], false],
    ])('findFirstsElements: %o', (dataOriginPath, expected) => {
      expect(!!findFirstElements(xABTree, dataOriginPath)).toBe(expected)
    })

    test.each([
      ['/*:x[1]', [0]],
      ['/*:x[1]/*:a[2]', [0, 1]],
      ['/*:x[1]/*:a[2]/*:e[1]', [0, 1, 0]],
      ['/*:x[1]/*:a[2]/*:e[1]/*:f[1]', undefined],
      ['/*:x[1]/*:y[2]', undefined],
      ['/*:x[1]/*:a[3]', undefined],
    ])('pathFromXPath: %s', (xPath, expectedPath) => {
      expect(pathFromXPath({ children: [xABTree] } as any, xPath)).toEqual(
        expectedPath
      )
    })

    const needle = 'needle'
    const text = { text: needle }
    const o1 = createElement('haystack', [text])
    const o2 = createElement('haystack', [text, { text: 'invisible' }])
    const o3 = createElement('nested_haystack', [o1, o2])

    test.each([
      [text, needle],
      [o1, needle],
      [o2, needle],
      [o3, needle],
    ])('extract first Text from %o should be "%s"', (element, text) => {
      expect(extractFirstText(element)).toBe(text)
    })
  })

  describe('BeschreibungsKomponente API', () => {
    const tei = {
      data_origin: 'TEI',
      region: 'TEI',
      path: '#document-TEI',
      component: '',
      level: 0,
      id: 'ed831698-1c26-41a7-afd7-db6e5dcd0fa0',
      data_xmlns: 'http://www.tei-c.org/ns/1.0',
      'data_xml:id': 'file_someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss',
      'data_xml:lang': 'de',
    }
    const teiHeader = {
      data_origin: 'teiHeader',
      region: 'TEI',
      path: '#document-TEI-teiHeader',
      component: '',
      level: 0,
      id: 'a08788b9-8a41-4fd6-9722-27e18b821eb1',
      children: [{ text: 'header' }],
    }
    const facsimile = {
      data_origin: 'facsimile',
      region: 'TEI',
      path: '#document-TEI-facsimile',
      component: '',
      level: 0,
      id: 'a22d3559-7254-43bb-b56b-5a15d5cb1f60',
      children: [{ text: 'facsimile' }],
    }
    const msIdentifier = {
      data_origin: 'msIdentifier',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier',
      component: 'msIdentifier',
      level: 1,
      id: 'aebd6f56-f58d-4044-b9c3-a1082e369491',
      children: [
        {
          data_origin: 'settlement',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
          component: '',
          level: 1,
          id: 'b805a0f6-0ae1-4802-8545-6211a239ae6f',
          data_key: '4a887b8a-68ac-39b0-8d9d-027bddedb06b',
          children: [
            {
              region: 'msIdentifier',
              text: 'Leipzig',
            },
          ],
        },
        {
          data_origin: 'repository',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
          component: '',
          level: 1,
          id: '2fa6956a-124f-4fa9-8e02-f773e0849b69',
          data_key: '016bc785-54a5-3c23-a276-7162a959306e',
          data_ref:
            'http://d-nb.info/gnd/30026-3 https://sigel.staatsbibliothek-berlin.de/suche/?isil=DE-15',
          data_rend: 'UB',
          children: [
            {
              region: 'msIdentifier',
              text: 'Universitätsbibliothek Leipzig',
            },
          ],
        },
        {
          data_origin: 'collection',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-collection',
          component: '',
          level: 1,
          id: '655d60c6-b93c-4ef1-8482-b543e4b4d862',
          children: [
            {
              region: 'msIdentifier',
              text: 'Ms Konrasd asdas',
            },
          ],
        },
        {
          data_origin: 'collection',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-collection',
          component: '',
          level: 1,
          id: 'eba1731f-7a81-4c1d-a105-2d7cb736230d',
          data_type: 'baseShelfmarkGroup',
          children: [
            {
              region: 'msIdentifier',
              text: 'Ms 0022-0961 Sammlung',
            },
          ],
        },
        {
          data_origin: 'idno',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
          component: '',
          level: 1,
          id: '211a2c53-9c08-4fb6-bc64-850ab0150b90',
          children: [
            {
              region: 'msIdentifier',
              text: 'Cod. 758',
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: '4edb4b5f-a7c0-4121-b43c-1234db5b8172',
          data_type: 'catalog',
          children: [
            {
              data_origin: 'idno',
              region: 'altIdentifier',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: 'c9a2d5ef-fd42-4302-9490-ec8fde5311e1',
              children: [
                {
                  region: 'altIdentifier',
                  text: 'someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss',
                },
              ],
            },
          ],
        },
      ],
    }
    const head = {
      data_origin: 'head',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head',
      component: 'head',
      level: 1,
      id: '7c5f2dd5-05fa-4c11-b56c-3d6bb83d61e5',
      children: [
        {
          data_origin: 'title',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-title',
          component: '',
          level: 1,
          id: '2e4a2ff1-0dd9-4951-a25a-bbbc6a09c135',
          children: [
            {
              text: 'Maria, Hl. Jungfrau, Gebet – Heiliger Geist, Predigt (lat.) und Auslegung (dt.) – Jesus Christus,\n            Passion – Advent, Predigt (lat.) und Auslegung (dt.) – Predigt, Festpredigt',
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '4f2b6a62-c23b-4e3c-879a-13e4adbd2c13',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'a9e53ed2-1efd-4630-afdc-4dfc964ea37e',
              data_type: 'title',
              children: [
                {
                  region: 'head',
                  text: 'Theologische Sammelhandschrift, lat. und dt.',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'c6f579d9-6d45-4455-a124-96b7562f3658',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'c4132f22-7696-4a12-876e-94947d332e4d',
              data_type: 'form',
              data_n: 'codex',
              children: [
                {
                  region: 'head',
                  text: 'Codex',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'fb8af528-ee77-4a30-b2af-509fdf9af8be',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '4579076c-800b-4845-b02a-c13d9d6a0efd',
              data_type: 'origDate_type',
              children: [
                {
                  region: 'head',
                  text: 'Datierung',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '91387fa8-4de9-4199-8719-cf387875b223',
              data_type: 'origDate',
              children: [
                {
                  region: 'head',
                  text: '14. Jh.',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '813295d4-5620-4df6-945e-de31f2e95db7',
              data_type: 'origDate_notBefore',
              children: [
                {
                  region: 'head',
                  text: '1301',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '60cf9019-df53-418e-90be-21f5dfbffa36',
              data_type: 'origDate_notAfter',
              children: [
                {
                  region: 'head',
                  text: '1400',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'eca7e3a9-c0fc-4f33-a15e-5fd05ab160bf',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'e3e9736a-608d-4952-8ec1-4c2befb137c8',
              data_type: 'msDesc_status',
              children: [
                {
                  region: 'head',
                  text: 'Beschreibung',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'b8f0a173-6cb3-4b30-bd5a-8d81eec64459',
              data_type: 'source_author',
              children: [
                {
                  region: 'head',
                  text: 'Franzjosef Pensel',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '2f573e05-ea1d-4c89-925d-f666d0bb1ecf',
              data_type: 'publicationStmt_date_published',
              children: [
                {
                  region: 'head',
                  text: '1998',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'd9cb9f2d-d877-4906-9fc3-103f505a4eb8',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'c3005564-1414-4275-95ac-bcb13cbd9a99',
              data_type: 'material',
              data_n: 'perg',
              children: [
                {
                  region: 'head',
                  text: 'Pergament',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'cdce9573-483f-4ec9-83f4-7573bf55dcaf',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '78e7d96b-fa4a-40e5-bde6-c060ca96f735',
              data_type: 'dimensions',
              children: [
                {
                  region: 'head',
                  text: '21,4 × 13,5',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '59aff063-30c8-476e-8a19-f675744d2b36',
              data_type: 'height',
              children: [
                {
                  region: 'head',
                  text: '21',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '089c5887-9089-4f91-94b7-c566aa35c9c1',
              data_type: 'width',
              children: [
                {
                  region: 'head',
                  text: '13',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '36061f10-cca7-4bd0-8b79-fea540c78899',
              data_type: 'format_typeOfInformation',
              children: [
                {
                  region: 'head',
                  text: 'real',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '6891ff83-40f4-4451-8b10-a40e5653ef80',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '487548d1-f0d9-440a-a3c5-7e9fcc75cab4',
              data_type: 'measure_noOfLeaves',
              data_n: '243',
              children: [
                {
                  region: 'head',
                  text: '243 Bl.',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'a7574e4d-2f3e-4562-9b66-a7cf5e100e02',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '58f5d2e0-334d-4a34-880e-6887c3e34789',
              data_type: 'textLang',
              data_n: 'la',
              children: [
                {
                  region: 'head',
                  text: 'lateinisch',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '138144f0-a433-4b5a-9c0b-464b969717ff',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'cf744b01-77bf-4200-afbf-fbbe0545f75f',
              data_type: 'textLang',
              data_n: 'cs',
              children: [
                {
                  region: 'head',
                  text: 'tschechisch',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '9009d3de-1559-468e-bcf7-ec9ccf550010',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '2a52d9bb-8c76-458d-8dd8-1a29a435e4c8',
              data_type: 'textLang',
              data_n: 'de',
              children: [
                {
                  region: 'head',
                  text: 'deutsch',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '621c9cff-7a9f-4ba2-be62-438de04e6a26',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '4a804b20-3c31-47c9-a7e3-b79b2adfb01e',
              data_type: 'biblScope',
              children: [
                {
                  region: 'head',
                  text: 'Anfang',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '9b868d11-931c-4ca3-a36d-143881bdac57',
              data_type: 'biblScope_page',
              children: [
                {
                  region: 'head',
                  text: '103',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '62930199-b7ef-47f3-9a06-26c12b849e01',
              data_type: 'biblScope_line',
              children: [
                {
                  region: 'head',
                  text: '6',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'b07821c7-0dea-4330-9296-b4854d63f86c',
              data_type: 'biblScope_Alto-Element-ID',
              children: [
                {
                  region: 'head',
                  text: 'Page103_Block6',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '92596c80-85bc-4554-9b61-c9aecbfb6370',
          data_indexName: 'norm',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '50badef2-ce3d-4693-88c7-1dace9b5af44',
              data_type: 'biblScope',
              children: [
                {
                  region: 'head',
                  text: 'Ende',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '9d9d7325-1a18-4798-b1f2-c6bfd48b0c7e',
              data_type: 'biblScope_page',
              children: [
                {
                  region: 'head',
                  text: '105',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '6ecaa17a-815c-42fd-a1b9-ed4ba2e0e4a1',
              data_type: 'biblScope_line',
              children: [
                {
                  region: 'head',
                  text: '4',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '4bc5a2d9-1cdf-4e78-b2fe-bcdc7ecf8c9f',
              data_type: 'biblScope_Alto-Element-ID',
              children: [
                {
                  region: 'head',
                  text: 'Page105_Block4',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'eef38f04-58a7-41e5-9d57-3a52345b6c6e',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '426387a0-c4a7-4e1b-9812-c2da77c5f7bf',
              children: [
                {
                  region: 'head',
                  text: 'Datierung',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: '7cd82fb4-cdfb-4c4c-8032-c4c8fc0593cc',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: '0353d887-a3ad-47d7-86ea-419883ce902d',
                  children: [
                    {
                      region: 'head',
                      text: 'Zeiträume',
                    },
                  ],
                },
                {
                  data_origin: 'index',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-index',
                  component: '',
                  level: 1,
                  id: 'a052dbb2-452d-4483-adc2-68aecaf29cd9',
                  children: [
                    {
                      data_origin: 'term',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-index-term',
                      component: '',
                      level: 1,
                      id: 'e797c224-3d65-4c9e-84cd-a542011a07a8',
                      children: [
                        {
                          region: 'head',
                          text: '14. Jh.',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'b3bb777c-a929-4c8d-b5a7-46912d509b63',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '947b00ef-1973-4a79-ae44-5f5a09b4f2b9',
              children: [
                {
                  region: 'head',
                  text: 'Schreibsprache',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: '13729a2f-580c-42b6-930a-0d83fbfc38e7',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: 'c1e4157c-7407-41e0-a367-e9fc5f5ac5a1',
                  children: [
                    {
                      region: 'head',
                      text: 'bair.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '06b5b485-981d-4381-8772-561db3a79497',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '92939b82-ffe8-48a4-b4b4-5021d7c01317',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Di czehen gebot di got selber gab Moysi geschriben mit gotes vinger an czwayn stainen\n              taveln, di scholtu merken an disem buoche',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '077ea923-a346-4fa0-912c-115d621cd65b',
                  children: [
                    {
                      region: 'head',
                      text: '0154recto',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '2ce11abc-deb4-4ac0-b004-149aa3e571c9',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'effc0a3b-10f0-4ba7-9111-8ab02cc1b20e',
              children: [
                {
                  region: 'head',
                  text: 'Handschriften, zitierte',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: 'eeb5e700-f131-4458-9ae0-7c5d992d9925',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: '68d1cd1f-7dad-4885-b192-87abaceb3736',
                  children: [
                    {
                      region: 'head',
                      text: 'Wien, ÖNB',
                    },
                  ],
                },
                {
                  data_origin: 'index',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-index',
                  component: '',
                  level: 1,
                  id: '09ef7822-2eae-4f78-949e-59830b5bd893',
                  children: [
                    {
                      data_origin: 'term',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-index-term',
                      component: '',
                      level: 1,
                      id: '0072d58c-5cef-4587-98eb-d2386908651c',
                      children: [
                        {
                          region: 'head',
                          text: '1646',
                        },
                        {
                          data_origin: 'locus',
                          region: 'head',
                          path: '#document-TEI-text-body-msDesc-head-index-index-index-term-locus',
                          component: '',
                          level: 1,
                          id: '31b6bd47-53de-4d50-a461-2f1a841d4316',
                          data_from: '0154r',
                          children: [
                            {
                              region: 'head',
                              text: '0154recto',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'ef3f07e2-a75a-4163-a12f-cd4459696a94',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '14cc14f9-885f-4613-85eb-b3f75f1e06e8',
              children: [
                {
                  region: 'head',
                  text: 'Johannes von Iglau',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: '9808be64-9a0e-4449-8233-5429e571f8cb',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: '6db5c53d-10cb-4688-926f-cf232788396a',
                  children: [
                    {
                      region: 'head',
                      text: 'Dekalogerklärung',
                    },
                    {
                      data_origin: 'locus',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                      component: '',
                      level: 1,
                      id: 'ec76756a-d152-4108-aaea-5049df5ce783',
                      data_from: '0154r',
                      children: [
                        {
                          region: 'head',
                          text: '0154recto',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '341a84ce-d860-4e14-961f-54d4b7a62625',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'ab94a57b-deab-4ce9-be8e-a2f1e29bad88',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Also sprichet got czu dem menschen, der seinen heiligen leichnam wirdicleichen enpfehet\n              und froloket in seiner sele: Duo enpfehst mich, so rainig ich dich fon suenden',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '3f713f21-fa4e-4442-b4e8-e7d3195eb57b',
                  children: [
                    {
                      region: 'head',
                      text: '0163verso',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'ba97810f-3b44-48e2-9e9e-aa6281f9cdf0',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '83bbb163-d712-4e2e-8a07-186e2f157955',
              children: [
                {
                  region: 'head',
                  text: 'Eucharistie-Sakrament',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: '30bc33c1-59a4-4a1c-8f37-b04b17cac004',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: 'c1b92943-1ccc-499a-bc61-d5ca14fbf36d',
                  children: [
                    {
                      region: 'head',
                      text: 'Traktate',
                    },
                    {
                      data_origin: 'locus',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                      component: '',
                      level: 1,
                      id: '2b1e558b-11ab-4459-9c26-a9466f2b908d',
                      data_from: '0163v',
                      children: [
                        {
                          region: 'head',
                          text: '0163verso',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '15db0e8b-047b-40ad-b08b-90a51958629f',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'dd8e2e86-a40a-4b4f-b18d-5ed3c64da25c',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'grüßen, gegrüßt - Gegruest seistu Maria, in dem munde ain suzer name, in dem herczen ain\n              teur schacze',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '58266cc8-d561-4d84-8fb1-ac56923db8e1',
                  children: [
                    {
                      region: 'head',
                      text: '0173verso',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'c78a7d61-2a1e-4cbe-bccf-ec4f9a5ced26',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '50973bcd-b0f4-45ae-9e58-7ac926aa9eb3',
              'data_xml:lang': 'la',
              children: [
                {
                  region: 'head',
                  text: 'Tres sunt penae ingratuitorum: Privatio gratiae spiritualis ... Et nota undecim nomina\n              inferni: Primo vocatur in sacra scriptura lacus mortis, ain ze des todes',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: 'c9275a4a-80c7-4f8c-a71f-9eaaabd27aed',
                  data_from: '0180v',
                  children: [
                    {
                      region: 'head',
                      text: '0180verso',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'bd9034ff-15ed-4d1c-92a8-f3655c6ee392',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '1b335c34-5333-4f64-b5e5-8f6640b683a7',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Tres sunt penae ingratuitorum: Privatio gratiae spiritualis ... Et nota undecim nomina\n              inferni: Primo vocatur in sacra scriptura lacus mortis, ain ze des todes',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: 'f91bc304-2ff2-4272-8a82-8189b8b23f0a',
                  children: [
                    {
                      region: 'head',
                      text: '0180verso',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'bb22e189-fbd0-4708-be69-1acfb8b2a7e6',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'c1ba86c8-a4ae-4acd-bc9c-939fbcb08cf6',
              children: [
                {
                  region: 'head',
                  text: 'Hölle',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: 'd6d382f4-cbd7-43df-a5aa-6c7409f63f2a',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: 'bc2f153c-896e-4078-8833-7b2f1c232b81',
                  children: [
                    {
                      region: 'head',
                      text: 'Die elf Namen der Hölle',
                    },
                  ],
                },
                {
                  data_origin: 'index',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-index',
                  component: '',
                  level: 1,
                  id: '5d37bab3-a3a5-4831-8d9c-63ec4adea1b2',
                  children: [
                    {
                      data_origin: 'term',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-index-term',
                      component: '',
                      level: 1,
                      id: '3b386e4b-46f1-4b1a-87b4-a30a70a815a4',
                      children: [
                        {
                          region: 'head',
                          text: 'lat.-dt.',
                        },
                        {
                          data_origin: 'locus',
                          region: 'head',
                          path: '#document-TEI-text-body-msDesc-head-index-index-index-term-locus',
                          component: '',
                          level: 1,
                          id: '292c810c-92cc-4646-99d8-03418002ca23',
                          data_from: '0180v',
                          children: [
                            {
                              region: 'head',
                              text: '0180verso',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '4ffa0841-3189-476c-bdd6-eab1148ea578',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '46a12ee6-cec2-4a91-a0f3-7106d5b54872',
              'data_xml:lang': 'la',
              children: [
                {
                  region: 'head',
                  text: 'Elatio dicitur uebermuot, arrogantia - geuden vel gueften',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: 'e1856859-3f44-44bc-827e-3a2a5195869b',
                  data_from: '0182v',
                  children: [
                    {
                      region: 'head',
                      text: '0182verso',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'a18f77f5-887c-45a3-9a0f-42a8313f1801',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '3f1cc72f-0e40-4b50-8e9f-245f12e14e0b',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Elatio dicitur uebermuot, arrogantia - geuden vel gueften',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '87067a65-e4f1-47b5-afcb-73511f3dbdaa',
                  children: [
                    {
                      region: 'head',
                      text: '0182verso',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '64fecda1-6105-45c2-b888-1c3467f8fa54',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '1bcb614b-f241-4ec9-954a-415042ff9447',
              children: [
                {
                  region: 'head',
                  text: 'Vokabular',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: '171b5d3f-d3e2-4ed5-8fd6-a858ec2a07f4',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: '314c0bf7-3fb2-4f19-88e1-19993d0cceae',
                  children: [
                    {
                      region: 'head',
                      text: 'lat.-dt.',
                    },
                    {
                      data_origin: 'locus',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                      component: '',
                      level: 1,
                      id: 'e7a6169f-956f-45f4-9f7d-c19285795d62',
                      data_from: '0182v',
                      children: [
                        {
                          region: 'head',
                          text: '0182verso',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '79ddb563-cfd0-4846-88c3-ec47b4b2b3d5',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'be7e6e1f-af0b-4eb8-9091-166a47421945',
              'data_xml:lang': 'la',
              children: [
                {
                  region: 'head',
                  text: 'Araxanus - habr; franeus - iessen',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '9a3a7ed4-2f15-451b-9b0d-fffca82c1987',
                  data_from: '0183v',
                  children: [
                    {
                      region: 'head',
                      text: '0183verso',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '734f54ae-b504-4737-8c6e-02a52fc18350',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'd56b564f-73e8-4a72-8a33-a762c6674c91',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Araxanus - habr; franeus - iessen',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: 'c2f2b99c-7fd6-4fda-a62a-e81f7cb9be97',
                  children: [
                    {
                      region: 'head',
                      text: '0183verso',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '782756ab-2d79-4707-826f-3e678a1614cc',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '843ed8e8-de7f-464b-8b40-3864dcf28c72',
              children: [
                {
                  region: 'head',
                  text: 'Vokabular',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: '7ca70f08-ab31-4414-a278-2fcc9cb79d6d',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: '6a4c2729-789c-4c8b-bbe4-4db3afef8071',
                  children: [
                    {
                      region: 'head',
                      text: 'lat.-dt.-tschech.',
                    },
                    {
                      data_origin: 'locus',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                      component: '',
                      level: 1,
                      id: '6d523715-9a0f-479f-9b46-d88069134139',
                      data_from: '0183v',
                      children: [
                        {
                          region: 'head',
                          text: '0183verso',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'f5aa2eaf-f6b9-44c6-b470-31df04a979d8',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'b73a7d17-80e4-4894-b7a6-430252b28e6c',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Der heilig vater sant Bernhard ist geleichet dreien achpern fuersten von der alten e.\n              Der erste ist Moyses',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '0ece3bae-4fb6-453e-ab13-913b250c4bdb',
                  children: [
                    {
                      region: 'head',
                      text: '0204recto',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'ae13722b-8863-4126-9faa-7c61d6272fcd',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '090bc150-32cf-4713-85ea-150e5b49cf03',
              children: [
                {
                  region: 'head',
                  text: 'Bernardus Claraevallensis',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: '8558020c-efd4-4dd7-bc98-70f3ff3a6c4c',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: '85dd2bac-9177-42d2-91f4-bfd0518f6cf9',
                  children: [
                    {
                      region: 'head',
                      text: 'Vergleiche zu seiner Person',
                    },
                    {
                      data_origin: 'locus',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                      component: '',
                      level: 1,
                      id: 'c70dca7b-b05e-4638-9d8b-fe771b94ce09',
                      data_from: '0204r',
                      children: [
                        {
                          region: 'head',
                          text: '0204recto',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '50f0eb40-f8be-4ec0-9f7c-280bcca12dfb',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'e7e8e18a-3480-44b3-95cd-79ba9184c5b1',
              children: [
                {
                  region: 'head',
                  text: 'Maria, Hl. Jungfrau',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: '20fc2069-66a9-436e-89ff-f496d8a696da',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: '3531544c-6718-485e-83a3-1427b94960e5',
                  children: [
                    {
                      region: 'head',
                      text: 'Marienfeste',
                    },
                  ],
                },
                {
                  data_origin: 'index',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-index',
                  component: '',
                  level: 1,
                  id: '8c370df7-efc2-4e4b-a2f0-c3fce0cef222',
                  children: [
                    {
                      data_origin: 'term',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-index-term',
                      component: '',
                      level: 1,
                      id: 'f82c3994-c7db-49c1-afa2-75a18612e361',
                      children: [
                        {
                          region: 'head',
                          text: 'Himmelfahrt, Predigt (lat.) und Auslegung (dt.)',
                        },
                        {
                          data_origin: 'locus',
                          region: 'head',
                          path: '#document-TEI-text-body-msDesc-head-index-index-index-term-locus',
                          component: '',
                          level: 1,
                          id: 'e416176e-32e9-48d2-9b16-3d5e550a4d1b',
                          data_from: '0221v',
                          children: [
                            {
                              region: 'head',
                              text: '0221verso',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'ed4ee8c7-4c77-426a-9371-391e59e70588',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'bc3d3822-1cc3-46e5-85dc-0be6f3a9e41d',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Dise hohczeit unser vrawen hat drey merkleich namen: Des ersten ist si genant der tage\n              des slaffes, darumme das gottes muoter an disem tage di valsche werlt ueberwunde hat',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '61fbb62c-d6ed-4cb6-8d30-42165a3fc620',
                  children: [
                    {
                      region: 'head',
                      text: '0222verso',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'c1622a95-5169-41ac-a3a4-09c777d34dc0',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '2c0c87fb-d698-4d36-960e-7c1070285c14',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Dise predig mant uns, das wir den heyligen gaist enphahen schuellen in fierlay weise:\n              Des ersten mit des cristenleichen frides gemaynunge',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: 'bcc0c923-5586-48aa-ba10-5b4fb27585f6',
                  children: [
                    {
                      region: 'head',
                      text: '0225recto',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'b228c96e-fb17-4863-bcb7-9ef665bf4cf9',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'c86f113a-a44a-4201-a72d-ca4b34e3b05a',
              children: [
                {
                  region: 'head',
                  text: 'Petrus und Paulus, Hll.',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: '09cc51ae-dc75-4ae8-9f05-25bb7cdf8d78',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: '7a6b3972-848d-4320-9a22-450ee336ccba',
                  children: [
                    {
                      region: 'head',
                      text: 'Predigt (lat.) und Auslegung (dt.)',
                    },
                    {
                      data_origin: 'locus',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                      component: '',
                      level: 1,
                      id: '99412bc9-0f75-43f4-b74c-0116d1d95243',
                      data_from: '0225v',
                      children: [
                        {
                          region: 'head',
                          text: '0225verso',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'fac23f85-49d5-4294-8966-6b7decaaf308',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '851a7c69-a036-490b-bdbf-5138e661ae1c',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Sant Peter und send Paul seint mit ainadern [!] gewonet als tzwen bruder an siben\n              sachen. Des ersten an der cristenhait stiftunge',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '3057eaeb-346e-46a6-b100-e67b5b885b63',
                  children: [
                    {
                      region: 'head',
                      text: '0227verso',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: 'f9bc33fb-256e-486e-80ab-eb2f419917b3',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '81114153-82d7-410a-97fd-91db01ca5c28',
              children: [
                {
                  region: 'head',
                  text: 'Margarethe von Antiochien, Hl.',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: 'b7052d0f-2345-4a48-9273-b821c7dcb394',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: '2985147b-0f76-4807-8d77-98616e49f44b',
                  children: [
                    {
                      region: 'head',
                      text: 'Predigt (lat.) und Auslegung (dt.)',
                    },
                    {
                      data_origin: 'locus',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                      component: '',
                      level: 1,
                      id: '46fe075f-5e2a-4878-9c16-6ec81da872bc',
                      data_from: '0229v',
                      children: [
                        {
                          region: 'head',
                          text: '0229verso',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '9d24d6a6-a248-4a39-ba54-9df1020745d7',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '0de80d3a-3e9e-4e36-966a-a43102cb4036',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'An der gaistleichen freude sein sechs hande pilde, dar an sich sant Margareth gefreut\n              hat und uns das pilde der freuden gelassen hat',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '1d5f9424-c976-4bcf-a026-defdddb45734',
                  children: [
                    {
                      region: 'head',
                      text: '0231recto',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '3000840e-4a98-4101-acfa-75406fced664',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: 'c0bf82de-ca1f-4b3b-ba6d-e57b3bd8bbc8',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Der gotes suon ist in dise werlt quomen in ierlay weise: Sein erste chuonfte ist\n              wunderleich, di leit an unser menschait vorainunge',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '66d2394f-207f-4eb9-9c9b-a41dd2c06567',
                  children: [
                    {
                      region: 'head',
                      text: '0231recto',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '6441b798-0a44-4268-a5dd-d23a9f6e671a',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '32ac51fa-2860-4bea-911e-e2a698e880b4',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Der grosße heilige prophete David spricht yn dem ersten psalme nach hundertin des\n              salters',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: 'c00f5e80-84e0-4d68-9b23-54b7594d8da3',
                  children: [
                    {
                      region: 'head',
                      text: '0231recto',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '83f2b4ac-4c3d-4702-b7a0-719548aa21e5',
          data_indexName: 'nasa',
          data_facs: '#HSK0516_b069_obj-90682838-T',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '73056e2a-1350-45d9-bd20-aabd24b40151',
              children: [
                {
                  region: 'head',
                  text: 'Maria, Hl. Jungfrau',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-index',
              component: '',
              level: 1,
              id: 'ac472d19-f065-4d40-ae66-7ffc18711b7f',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-term',
                  component: '',
                  level: 1,
                  id: '93068085-f310-4458-af6a-8dfc7b962db4',
                  children: [
                    {
                      region: 'head',
                      text: 'Marienfeste',
                    },
                  ],
                },
                {
                  data_origin: 'index',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-index-index',
                  component: '',
                  level: 1,
                  id: '049b732f-f9e9-455b-8983-08caca05ba92',
                  children: [
                    {
                      data_origin: 'term',
                      region: 'head',
                      path: '#document-TEI-text-body-msDesc-head-index-index-index-term',
                      component: '',
                      level: 1,
                      id: '04df68fb-fc63-4603-8a8b-84dec0f2adc0',
                      children: [
                        {
                          region: 'head',
                          text: 'Verkündigung, Auslegung einer Predigt',
                        },
                        {
                          data_origin: 'locus',
                          region: 'head',
                          path: '#document-TEI-text-body-msDesc-head-index-index-index-term-locus',
                          component: '',
                          level: 1,
                          id: '13ff974d-7909-4bc5-93d2-e0b7d58e972c',
                          data_from: '0231r',
                          children: [
                            {
                              region: 'head',
                              text: '0231recto',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '79334f04-4fe1-4bf0-a1b7-8f26b16f0f9c',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '8de4b9c9-3f86-4df4-8577-3c33e8456b1b',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'An disen worten seint czuo merken czway ding: Das ain ist der menschleichen crankhait\n              derchennunge, das ander der gotleichen barmhertichait gemainunge',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '2fe46b55-2afd-4d86-841e-f8179d5a5e5c',
                  children: [
                    {
                      region: 'head',
                      text: '0232recto',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index',
          component: '',
          level: 1,
          id: '14b8fc30-ce4a-4593-be2f-1e42e4b9346a',
          data_indexName: 'initien',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '06fffc1f-1432-49c0-bb49-00bbd09fc0bc',
              'data_xml:lang': 'de',
              children: [
                {
                  region: 'head',
                  text: 'Unser hailant der gotes suon sicczet auf sechs stuelen uns czuo trost und czuo ainer\n              fuerderunge. Des ersten siczzet er als ein mayster',
                },
                {
                  data_origin: 'locus',
                  region: 'head',
                  path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                  component: '',
                  level: 1,
                  id: '9553fcb0-6554-48e8-9d08-d5031a05328c',
                  children: [
                    {
                      region: 'head',
                      text: '0234recto',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }
    const msContents = {
      data_origin: 'msContents',
      id: '1b184655-bc39-4f80-8e09-3df13c9212ae',
      path: '#document-TEI-text-body-msDesc-msContents',
      level: 1,
      children: [
        {
          data_origin: 'msItem',
          region: 'msItem',
          component: 'msItemtext',
          data_class: 'text',
          children: [
            {
              data_origin: 'note',
              region: 'msItem',
              children: [
                {
                  text: '__INHALT_TEXT__',
                  region: 'msItem',
                  id: '771e890f-d527-42b5-9cd3-8a82ce6353cd',
                  path: '#document-TEI-text-body-msDesc-msContents-msItem-note-undefined',
                  level: 1,
                },
              ],
              id: '3551ce8e-3038-4173-9df9-9c0f22d6d634',
              path: '#document-TEI-text-body-msDesc-msContents-msItem-note',
              level: 1,
            },
          ],
          id: 'a200daaf-a6c6-4ab4-890b-35ed80e96fa0',
          path: '#document-TEI-text-body-msDesc-msContents-msItem',
          level: 1,
        },
        {
          data_origin: 'msItem',
          region: 'msItem',
          component: 'msItemiconography',
          data_class: 'iconography',
          id: 'a15ec159-41af-4cd6-8d20-baffe96eb684',
          path: '#document-TEI-text-body-msDesc-msContents-msItem',
          level: 1,
          children: [
            {
              data_origin: 'note',
              region: 'msItem',
              children: [
                {
                  text: 'INHALT_TEXT_DECORATION',
                  region: 'msItem',
                  id: '36285907-b4cc-49e5-9f79-8917b97c7854',
                  path: '#document-TEI-text-body-msDesc-msContents-msItem-note-undefined',
                  level: 1,
                },
              ],
              id: '63e8c3b3-3fb5-4524-9ac5-138b13d91376',
              path: '#document-TEI-text-body-msDesc-msContents-msItem-note',
              level: 1,
            },
          ],
        },
      ],
    }
    const additional = {
      data_origin: 'additional',
      id: '26f27f8b-7c1e-401e-b059-943591c09c5e',
      path: '#document-TEI-text-body-msDesc-additional',
      level: 1,
      children: [
        {
          data_origin: 'listBibl',
          region: 'listBibl',
          component: 'listBibl',
          children: [
            {
              data_origin: 'bibl',
              region: 'listBibl',
              children: [
                {
                  text: '__LITERATUR__',
                  region: 'listBibl',
                  id: '76a4a3d6-bee3-4416-80d5-aa43477eb6d0',
                  path: '#document-TEI-text-body-msDesc-additional-listBibl-bibl-undefined',
                  level: 1,
                },
              ],
              id: 'e20c8a44-2b83-4c6d-904d-523dc3452273',
              path: '#document-TEI-text-body-msDesc-additional-listBibl-bibl',
              level: 1,
            },
          ],
          id: 'e69212d5-b550-4228-9df6-4c3c5c69d4bc',
          path: '#document-TEI-text-body-msDesc-additional-listBibl',
          level: 1,
        },
      ],
    }
    const description = (content: Node[]): Element => {
      const result = {
        data_origin: 'text',
        region: 'TEI',
        path: '#document-TEI-text',
        component: '',
        level: 0,
        id: '266e605e-0b4f-4f0a-bcd3-ceb0664f23f1',
        children: [
          {
            data_origin: 'body',
            region: 'TEI',
            path: '#document-TEI-text-body',
            component: '',
            level: 0,
            id: '0410ec69-6cc5-41c2-9f02-fdfc230cf537',
            children: [
              {
                data_origin: 'msDesc',
                region: 'TEI',
                path: '#document-TEI-text-body-msDesc',
                component: '',
                level: 1,
                id: 'f4c9eab1-7f16-4058-aa10-2d5f9b861d10',
                data_status: 'intern',
                'data_xml:id': 'HSP-99ca4765-7b18-38f9-b3ff-220d32cc55ae',
                'data_xml:lang': 'de',
                data_subtype: 'medieval',
                data_type: 'hsp:description',
                children: content,
              },
            ],
          },
        ],
      }
      return result
    }

    it('Find Node By Wrapper ID', () => {
      const editor = createErfassungsEditor()
      const slateValue = {
        ...tei,
        children: [
          teiHeader,
          facsimile,
          description([msIdentifier, head, msContents]),
        ],
      }
      editor.children = [slateValue]

      const { data_origin, id } = msContents
      expect(
        findSlateNodeByWrapperID(
          data_origin,
          {
            children: [],
            id: '',
            label: '',
            level: 0,
            parentId: '',
            path: [],
            teiElement: '',
            wrapperId: id,
            xmlpath: '',
          },
          editor
        )
      ).toEqual([msContents, [0, 2, 0, 0, 2]])
    })

    it('Delete Slate Node Value', async () => {
      const editor = createErfassungsEditor()
      const slateValue = {
        ...tei,
        children: [
          teiHeader,
          facsimile,
          description([msIdentifier, head, additional]),
        ],
      }
      editor.children = [slateValue]

      deleteSlateNodeWithWrapper(
        'additional',
        {
          children: [],
          id: 'ID',
          label: '',
          level: 0,
          parentId: '',
          path: [0, 2, 0, 0, 2],
          teiElement: '',
          wrapperId: '26f27f8b-7c1e-401e-b059-943591c09c5e',
          xmlpath: '',
        },
        editor,
        jest.fn(),
        jest.fn()
      )

      const [{ children }] = Editor.node(editor, [0, 2, 0, 0]) as any
      expect(children).toMatchObject([msIdentifier, head])
    })

    it('EinfuegeLogik Slate Node', async () => {
      const editor = createErfassungsEditor()
      const slateValue = {
        ...tei,
        children: [teiHeader, facsimile, description([msIdentifier])],
      }
      editor.children = [slateValue]

      const history = {
        data_origin: 'history',
        region: 'history',
        component: 'history',
        children: [
          {
            data_origin: 'p',
            region: 'history',
            children: [
              {
                text: '__GESCHICHTE__',
                region: 'history',
              },
            ],
          },
        ],
      }

      insertSlateNode(history, [0, 2, 0, 0, 0], editor, jest.fn(), 'ID')

      const [node] = Editor.node(editor, [0, 2, 0, 0, 0]) as any
      expect(node).toMatchObject(history)
    })

    it('Find Node With Beschreibung', () => {
      const slateValue = {
        ...tei,
        children: [teiHeader, description([msIdentifier])],
      }
      const editor = createErfassungsEditor()
      editor.children = [slateValue]

      expect(findSlateNodeAtPath([0, 1, 0, 0, 0], editor)).toBeDefined()
    })

    it('Is Node in Component', () => {
      const editor = createErfassungsEditor()
      const slateValue = {
        data_origin: 'msPart',
        region: 'msPart',
        component: 'msPartother',
        data_type: 'other',
        id: '8a7ae897-fbbf-4012-8f2a-46724de73440',
        path: '#document-TEI-text-body-msDesc-msPart',
        level: 1,
        children: [
          msIdentifier,
          {
            data_origin: 'p',
            region: 'msPart',
            children: [
              {
                text: '',
              },
            ],
            id: '380437fd-83a7-4c25-b98d-79bb61e69d3b',
            path: '#document-TEI-text-body-msDesc-msPart-p',
            level: 1,
          },
        ],
      }
      const store = configureTestStore()
      store.dispatch(writeDocument())

      render(
        <TestContext store={store}>
          <Slate initialValue={[slateValue]} editor={editor}>
            <Editable></Editable>
          </Slate>
        </TestContext>
      )

      expect(
        isNodeInComponent(
          editor,
          slateValue.children[0],
          TEI_ELEMENT_PART_OTHER
        )
      ).toBe(true)
    })

    it('test findSlateTargetPath', () => {
      const editor = createErfassungsEditor()
      const slateValue = {
        ...tei,
        children: [
          teiHeader,
          facsimile,
          description([msIdentifier, head, msContents]),
        ],
      }

      render(
        <TestContext>
          <HSPEditor value={[slateValue]} editor={editor} />
        </TestContext>
      )

      const path = findSlateTargetPath(
        'notetext',
        {
          children: [],
          id: '36285907-b4cc-49e5-9f79-8917b97c7854',
          label: 'Text',
          level: 1,
          parentId: 'a15ec159-41af-4cd6-8d20-baffe96eb684',
          path: [0, 0, 0, 2, 0, 1],
          teiElement: 'notetext',
          wrapperId: '',
          xmlpath:
            '#document-TEI-text-body-msDesc-msContents-msItem-note-undefined',
        },
        'medieval',
        undefined,
        editor,
        []
      )

      expect(path).toEqual([0, 0, 0, 2, 0, 2])
    })
  })

  describe('Semantische Auszeichnung', () => {
    const implemented: VolltextFormatierung['data_origin'][] = [
      'incipit',
      'explicit',
      'zitat',
      'autor',
      'werktitel',
    ]
    const notImplemented: VolltextFormatierung['data_origin'][] = [
      'subskript',
      'superskript',
    ]
    const content = [createElement('p', [{ text: 'Text' }])]

    it.each(implemented)(
      'Tagging selection with Auszeichnung "%s" becomes wrapped',
      (auszeichnung) => {
        const editor = createVolltextEditor()
        editor.children = content

        const anchor = { path: [0, 0], offset: 0 }
        const focus = { path: [0, 0], offset: 4 }
        Transforms.select(editor, { anchor, focus })
        wrapFormatierungAuszeichnung(editor, auszeichnung)

        const [element] = Editor.node(editor, [0, 1]) as unknown as [Element]
        expect(element.data_origin).toEqual(auszeichnung)
        expect(Range.isCollapsed(editor.selection as Range)).toBe(true)
      }
    )

    it.each(implemented)('Can remove formating "%s"', (auszeichnung) => {
      const editor = createVolltextEditor()
      editor.children = content

      const anchor = { path: [0, 0], offset: 0 }
      const focus = { path: [0, 0], offset: 4 }
      Transforms.select(editor, { anchor, focus })
      wrapFormatierungAuszeichnung(editor, auszeichnung)

      Transforms.select(editor, {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      })
      removeFormatierung(editor)

      const [node] = Editor.node(editor, [0, 0]) as unknown as [Node]
      expect(Text.isText(node)).toBeTruthy()
      expect(node).toMatchObject({ text: 'Text' })
    })

    it.each(notImplemented)(
      'Tagging selection with Auszeichnung "%s" is not implemented and does not change the editor',
      (auszeichnung) => {
        const editor = createErfassungsEditor()
        editor.children = content

        const anchor = { path: [0, 0], offset: 0 }
        const focus = { path: [0, 0], offset: 4 }
        Transforms.select(editor, { anchor, focus })
        wrapFormatierungAuszeichnung(editor, auszeichnung)

        const [element] = Editor.node(editor, [0]) as unknown as [Element]
        expect(element).toEqual(content[0])
        expect(Range.isCollapsed(editor.selection as Range)).toBe(false)
      }
    )
  })
})
