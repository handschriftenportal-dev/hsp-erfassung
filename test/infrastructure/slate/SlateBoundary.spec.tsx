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

import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import {
  deleteSlateNodeWithWrapper,
  findSlateNodeByWrapperID,
  findSlateNodeWithBeschreibung,
  insertSlateNode,
  isNodeInComponent
} from '../../../src/infrastructure/slate/SlateBoundary'
import { render, waitFor } from '@testing-library/react'
import { TestContext } from '../../TestContext'
import ConfigureStore from '../../../src/infrastructure/ConfigureReduxStore'
import { updateSlate, writeDocument } from '../../../src/domain/erfassung/ErfassungsState'
import {
  TEI_ELEMENT_PART_OTHER
} from '../../../src/domain/editor/beschreibungskomponenten/BeschreibungsKomponenteSonstiges'

describe('Slate Boundary', () => {
  it('Find Node By Wrapper ID', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [
      {
        data_origin: 'TEI',
        region: 'TEI',
        path: '#document-TEI',
        component: '',
        level: 0,
        id: 'ed831698-1c26-41a7-afd7-db6e5dcd0fa0',
        data_xmlns: 'http://www.tei-c.org/ns/1.0',
        data_xml_id: 'file_someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss',
        data_xml_lang: 'de',
        children: [
          {
            data_origin: 'teiHeader',
            region: 'TEI',
            path: '#document-TEI-teiHeader',
            component: '',
            level: 0,
            id: 'a08788b9-8a41-4fd6-9722-27e18b821eb1',
            children: [
              {
                data_origin: 'fileDesc',
                region: 'TEI',
                path: '#document-TEI-teiHeader-fileDesc',
                component: '',
                level: 0,
                id: '8a8693bf-8140-4799-bace-8a8314040b55',
                children: [
                  {
                    data_origin: 'titleStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-titleStmt',
                    component: '',
                    level: 0,
                    id: '61d43133-1261-49ee-a8bf-e6c42ebdd603',
                    children: [
                      {
                        data_origin: 'title',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-titleStmt-title',
                        component: '',
                        level: 0,
                        id: 'c534e805-3abc-42e6-8ff1-2ecaca764f28',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: '(Leipzig, Universitätsbibliothek Leipzig, Ms 758)'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'editionStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-editionStmt',
                    component: '',
                    level: 0,
                    id: 'e72c3b5d-560d-4954-b3f5-ace3fe4fa4b8',
                    children: [
                      {
                        data_origin: 'edition',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-editionStmt-edition',
                        component: '',
                        level: 0,
                        id: '1737d99d-f6a9-47d0-8c8e-a2811ccedb11',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: 'Elektronische Ausgabe nach TEI P5'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'respStmt',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt',
                        component: '',
                        level: 0,
                        id: '8a468650-9568-4780-b034-ba0ce2fb546f',
                        children: [
                          {
                            data_origin: 'resp',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-resp',
                            component: '',
                            level: 0,
                            id: '5b2d3849-4957-4c1f-9e2a-9918bbfc74f5',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'TEI',
                                children: [
                                  {
                                    region: 'TEI',
                                    text: 'Diese Datei wurde automatisch erzeugt, unter Verwendung der MXML-to-TEI-P5-Stylesheets, die an der\n            Herzog August Bibliothek Wolfenbüttel im Rahmen des Projektes "Handschriftenportal" gepflegt\n            werden.2021-07-01'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'name',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-name',
                            component: '',
                            level: 0,
                            id: 'b41170cc-5ea8-4bb3-9ad8-ab8702e2b40b',
                            data_type: 'person',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          },
                          {
                            data_origin: 'name',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-name',
                            component: '',
                            level: 0,
                            id: 'ce954cf1-36af-4de6-b279-ab1d5d8acb6b',
                            data_type: 'org',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'publicationStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-publicationStmt',
                    component: '',
                    level: 0,
                    id: 'b8497751-203b-450e-bc21-64f2b2d5eccf',
                    children: [
                      {
                        data_origin: 'publisher',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-publisher',
                        component: '',
                        level: 0,
                        id: 'a9b08360-d5c3-4530-bbfc-172207674509',
                        children: [
                          {
                            data_origin: 'name',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-publicationStmt-publisher-name',
                            component: '',
                            level: 0,
                            id: '8bd45a9d-4f40-47a6-862c-fcaac10ec14d',
                            data_type: 'org',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          },
                          {
                            data_origin: 'ptr',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-publicationStmt-publisher-ptr',
                            component: '',
                            level: 0,
                            id: '3572b982-a964-453d-858f-3e2e7ef5c12d',
                            data_target: 'http://some.url',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'date',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-date',
                        component: '',
                        level: 0,
                        id: '246c0d61-e120-41a3-9afc-507c70b5b6f1',
                        data_when: '2021-07-01',
                        data_type: 'published',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: '2021-07-01'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'date',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-date',
                        component: '',
                        level: 0,
                        id: '61c386f8-382b-441f-98ec-a210edea7beb',
                        data_when: '2009-10-14',
                        data_type: 'issued',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: '2009-10-14'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'availability',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability',
                        component: '',
                        level: 0,
                        id: '0217b5b6-6278-4ffd-b90d-4216c3f6c2e9',
                        data_status: 'restricted',
                        children: [
                          {
                            data_origin: 'licence',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence',
                            component: '',
                            level: 0,
                            id: 'd90158dc-834e-4b30-b485-c10912ac1d06',
                            data_target: 'http://some.url',
                            children: [
                              {
                                data_origin: 'p',
                                region: 'TEI',
                                path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p',
                                component: '',
                                level: 0,
                                id: '71e2f28c-3812-4405-b011-07e149715cb1',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'TEI',
                                    children: [
                                      {
                                        region: 'TEI',
                                        text: '('
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'ref',
                                    region: 'TEI',
                                    path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p-ref',
                                    component: '',
                                    level: 0,
                                    id: '81b7d03c-13dd-4435-a51d-146ec4d9f977',
                                    data_target: 'http://some.url',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'TEI',
                                        children: [
                                          {
                                            region: 'TEI',
                                            text: 'copyright information'
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'textelement',
                                    region: 'TEI',
                                    children: [
                                      {
                                        region: 'TEI',
                                        text: ')'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'sourceDesc',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-sourceDesc',
                    component: '',
                    level: 0,
                    id: 'a717d80a-c2ef-478d-800c-4a2766ee917a',
                    children: [
                      {
                        data_origin: 'p',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-sourceDesc-p',
                        component: '',
                        level: 0,
                        id: 'd6179cf5-388e-4208-bbed-38d62600647d',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: 'Automatisch generierte Beschreibung aus einem HiDA-4 Dokument.'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            data_origin: 'facsimile',
            region: 'TEI',
            path: '#document-TEI-facsimile',
            component: '',
            level: 0,
            id: 'df9eaad6-4839-4020-92a2-4b1914fc91f3',
            children: [
              {
                data_origin: 'graphic',
                region: 'TEI',
                path: '#document-TEI-facsimile-graphic',
                component: '',
                level: 0,
                id: '1dd4890b-e0d6-4d98-89f2-22768d198f58',
                data_xml_id: 'HSK0516_b069_obj-90682838-T',
                data_url: 'http://bilder.manuscripta-mediaevalia.de/hs/katalogseiten/HSK0516_b069_jpg.htm',
                children: [
                  {
                    text: ''
                  }
                ]
              }
            ]
          },
          {
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
                    data_xml_id: 'HSP-99ca4765-7b18-38f9-b3ff-220d32cc55ae',
                    data_xml_lang: 'de',
                    data_subtype: 'medieval',
                    data_type: 'hsp:description',
                    children: [
                      {
                        data_origin: 'msIdentifier',
                        region: 'msIdentifier',
                        path: '#document-TEI-text-body-msDesc-msIdentifier',
                        component: 'msIdentifier',
                        level: 1,
                        id: 'ca63ef1b-b984-45df-8c61-9a0d830dec49',
                        children: [
                          {
                            data_origin: 'settlement',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
                            component: '',
                            level: 1,
                            id: 'f4e58795-bc60-46cd-9387-2f170c3b745d',
                            data_key: '4a887b8a-68ac-39b0-8d9d-027bddedb06b',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Leipzig'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'repository',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
                            component: '',
                            level: 1,
                            id: '4576a780-acf7-460c-9a96-ae587c48648f',
                            data_key: '016bc785-54a5-3c23-a276-7162a959306e',
                            data_ref: 'http://d-nb.info/gnd/30026-3 https://sigel.staatsbibliothek-berlin.de/suche/?isil=DE-15',
                            data_rend: 'UB',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Universitätsbibliothek Leipzig'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'collection',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-collection',
                            component: '',
                            level: 1,
                            id: '67cd6ede-8992-4e88-9595-153b8c09039f',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Ms Konrasd asdas'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'collection',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-collection',
                            component: '',
                            level: 1,
                            id: '169c7578-3b29-467f-a526-fd9fe2a60af9',
                            data_type: 'baseShelfmarkGroup',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Ms 0022-0961 Sammlung'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'idno',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
                            component: '',
                            level: 1,
                            id: '7e6fdc90-0bfb-4736-b122-18f96ad1e51c',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Cod. 758'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'altIdentifier',
                            region: 'altIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
                            component: '',
                            level: 1,
                            id: '61594ef1-6ae3-4908-9a8c-4a6b73162b03',
                            data_type: 'catalog',
                            children: [
                              {
                                data_origin: 'idno',
                                region: 'altIdentifier',
                                path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
                                component: '',
                                level: 1,
                                id: '88d0a8d0-849b-426b-b7b5-0266f6f67e18',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'altIdentifier',
                                    children: [
                                      {
                                        region: 'altIdentifier',
                                        text: 'someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        istop: false
                      },
                      {
                        data_origin: 'head',
                        region: 'head',
                        path: '#document-TEI-text-body-msDesc-head',
                        component: 'head',
                        level: 1,
                        id: '830aab80-2e00-41ba-99d0-fac1df397e27',
                        children: [
                          {
                            data_origin: 'title',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-title',
                            component: '',
                            level: 1,
                            id: '5eedf9d6-22ee-4bbb-afdf-c20f7e8a1420',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'head',
                                children: [
                                  {
                                    region: 'head',
                                    text: 'Maria, Hl. Jungfrau, Gebet – Heiliger Geist, Predigt (lat.) und Auslegung (dt.) – Jesus Christus,\n            Passion – Advent, Predigt (lat.) und Auslegung (dt.) – Predigt, Festpredigt'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '2e46e5c7-2f17-403d-82eb-39ad76d7a1bc',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '5d75ae0a-b4e1-4c2d-ba0a-f5e2f812bb53',
                                data_type: 'title',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Theologische Sammelhandschrift, lat. und dt.'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'a08407c8-5504-4a8c-8b42-b43fedc57cde',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '67a78342-b3e5-4795-ad3d-33c10e2d6a2d',
                                data_type: 'form',
                                data_n: 'codex',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Codex'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '6514d696-85c8-470a-965a-276cf284cc43',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '3244c5ea-4f31-4152-b7de-7ba9685fb07d',
                                data_type: 'origDate_type',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Datierung'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'adfe22dd-5e34-4f39-a5fb-5079690d008c',
                                data_type: 'origDate',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '14. Jh.'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'f61ff4d0-062c-4465-9779-7c3320b3e4e7',
                                data_type: 'origDate_notBefore',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '1301'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '5b8fc5ce-86f7-4b27-874d-eed51e71e754',
                                data_type: 'origDate_notAfter',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '1400'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '56a1eb2a-a690-4193-bd66-d189d47196b6',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '12a2aecb-1637-4b1d-81ac-df89e99afed3',
                                data_type: 'msDesc_status',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Beschreibung'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'f050a1c8-07e1-4af7-8876-5411746a105e',
                                data_type: 'source_author',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Franzjosef Pensel'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '6ecf1287-4d91-460a-bfa3-89d831838e5a',
                                data_type: 'publicationStmt_date_published',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '1998'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'db7a46b8-9b6d-48d0-8abe-4c98300943c8',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '77060594-0339-4010-8c1e-fcd18bbf4b55',
                                data_type: 'material',
                                data_n: 'perg',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Pergament'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'f9603614-f646-421a-8e7a-d9883de3c3c5',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'c3b63e8f-cffa-4830-a918-4b4437cc93e5',
                                data_type: 'dimensions',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '21,4 × 13,5'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '7a4b3a2f-3100-42ec-9023-8d578f9f8952',
                                data_type: 'height',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '21'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'b059e7e1-a594-403b-b8f9-9f7272adf7d9',
                                data_type: 'width',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '13'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '3c1ff353-aac0-4622-95ab-f431198a8f93',
                                data_type: 'format_typeOfInformation',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'real'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '026079f9-7e79-4cd3-a165-40a4405b9e51',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'fd014eac-25ba-410e-b0cd-bf2c476e3ca0',
                                data_type: 'measure_noOfLeaves',
                                data_n: '243',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '243 Bl.'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'a0c69282-4fd3-426c-8a51-2ff8ffe73096',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '20c90749-fc6f-4463-a821-a1612db97109',
                                data_type: 'textLang',
                                data_n: 'la',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'lateinisch'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'e1f1ccdb-c374-442d-9b40-ffd04619c454',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'e1a846ea-f68c-4e81-97ad-935ddf74aa50',
                                data_type: 'textLang',
                                data_n: 'cs',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'tschechisch'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '84540c2f-8aa8-4691-ac34-20122cec18d4',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'cbce28c5-bdc8-4473-93b3-6d567af46e88',
                                data_type: 'textLang',
                                data_n: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'deutsch'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '9466a623-af2c-4509-afd4-e83d1ee964f9',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '9b27cd4d-6938-4bd4-b1d4-89db10f158bb',
                                data_type: 'biblScope',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Anfang'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '135c0fd7-f3f2-4684-92dc-9499ccfded49',
                                data_type: 'biblScope_page',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '103'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '87fa054d-f2c5-474b-b5aa-63f6f91c9133',
                                data_type: 'biblScope_line',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '6'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'c7288df9-a05d-442d-981a-3a0fd64b07c2',
                                data_type: 'biblScope_Alto-Element-ID',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Page103_Block6'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'bb2af95f-1573-4a5e-92e7-1b655a771334',
                            data_indexName: 'norm',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '25bacf88-fb80-4a58-9e03-2a0e1de3e38e',
                                data_type: 'biblScope',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Ende'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '7c7cda57-3c01-49ee-b5b3-160b0da5941e',
                                data_type: 'biblScope_page',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '105'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '4f9e5d19-32ee-461c-816c-0c5942b57c9f',
                                data_type: 'biblScope_line',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '4'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '265396fb-783b-4a43-898a-24089e06bfb6',
                                data_type: 'biblScope_Alto-Element-ID',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Page105_Block4'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '64cb063b-9003-44a1-9a2a-e05c3d04e4f1',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '08cea85c-19e4-490d-9a94-fedaf292cd30',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Datierung'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: '2fc2e418-6b17-4e4a-9e47-042c6a3b249d',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '2f772ddf-c7d5-4be8-8bf0-197aac235ffe',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Zeiträume'
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'index',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-index',
                                    component: '',
                                    level: 1,
                                    id: '3d9a6d3d-8712-41ed-9791-22635d50baad',
                                    children: [
                                      {
                                        data_origin: 'term',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-index-term',
                                        component: '',
                                        level: 1,
                                        id: '07437170-24e3-4710-b89b-2fcf2c1ca96d',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '14. Jh.'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'c993e4f2-8508-497c-aeb0-1cf65c888f99',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '7291a242-ecc1-4a91-b318-d16e4e380d6a',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Schreibsprache'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: 'fa665211-e0bd-41f9-91f8-ab8206839a82',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: 'a0e98e75-92e7-4157-9b99-0f08f51deed2',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'bair.'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '0fd53664-38ea-4929-ab4b-da0db7c1eca0',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '6251d421-72d5-406a-834d-138f319e2cf6',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Di czehen gebot di got selber gab Moysi geschriben mit gotes vinger an czwayn stainen\n              taveln, di scholtu merken an disem buoche'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '26102f42-0c5a-46b3-8a84-75612310be3e',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0154recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '2cd1736c-1585-4364-a18f-2cc02c276650',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '41959c94-82ac-48a3-a008-581f8c7231db',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Handschriften, zitierte'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: 'fcfee04a-e779-4b85-b6db-05914059c24a',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '816035e6-c0da-4c94-acbd-fda5691b19fc',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Wien, ÖNB'
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'index',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-index',
                                    component: '',
                                    level: 1,
                                    id: '7f0fd543-3b99-453d-b414-2c1d7e2cbfbb',
                                    children: [
                                      {
                                        data_origin: 'term',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-index-term',
                                        component: '',
                                        level: 1,
                                        id: '50f12c0f-67d0-49eb-bdf7-0ae47b22dbf6',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '1646'
                                              }
                                            ]
                                          },
                                          {
                                            data_origin: 'locus',
                                            region: 'head',
                                            path: '#document-TEI-text-body-msDesc-head-index-index-index-term-locus',
                                            component: '',
                                            level: 1,
                                            id: 'c093cc37-6cb9-4f35-81da-cf28ec3bd979',
                                            data_from: '0154r',
                                            children: [
                                              {
                                                data_origin: 'textelement',
                                                region: 'head',
                                                children: [
                                                  {
                                                    region: 'head',
                                                    text: '0154recto'
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'db29f4de-230f-4f80-98c9-5b3c18acd413',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'ef15f0af-446d-4e83-9079-792d8f6c9b74',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Johannes von Iglau'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: '6c94e0da-a147-4cba-aae9-3ee169eb1d7f',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '6de8ef8e-dc24-45fd-805b-c78e6466f8fe',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Dekalogerklärung'
                                          }
                                        ]
                                      },
                                      {
                                        data_origin: 'locus',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                                        component: '',
                                        level: 1,
                                        id: 'd75fa5af-ff64-44ed-b8a5-0831b7319fc8',
                                        data_from: '0154r',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0154recto'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '04dd808f-6ac7-46a7-a64a-4d7047ca46ed',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '26a6f44b-4166-4ae8-ba20-bf4b8f17978d',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Also sprichet got czu dem menschen, der seinen heiligen leichnam wirdicleichen enpfehet\n              und froloket in seiner sele: Duo enpfehst mich, so rainig ich dich fon suenden'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: 'd575b62f-84a4-448b-9ebc-34b8d93fe7fc',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0163verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'a3cd6e97-b678-40f5-a69f-6672466efdb3',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '182cbcac-5e84-4c85-8cba-39cd0bdb1e17',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Eucharistie-Sakrament'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: '87750b1f-a315-4dd6-a741-9eda7969301a',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '089b5a7f-5b06-4e16-bcc3-49ebc001f4ac',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Traktate'
                                          }
                                        ]
                                      },
                                      {
                                        data_origin: 'locus',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                                        component: '',
                                        level: 1,
                                        id: '31a5a083-ab07-42cd-beef-293d662c38d6',
                                        data_from: '0163v',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0163verso'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '1ff7ef16-7c03-42f3-9edf-ad098be7d733',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'a236cc6b-39b4-4c99-b7da-8ab30c4a9151',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'grüßen, gegrüßt - Gegruest seistu Maria, in dem munde ain suzer name, in dem herczen ain\n              teur schacze'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '77a8113d-be63-42b9-821b-32db15d5a966',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0173verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '3d59a092-e2bd-4590-b1a4-7e061e6df20a',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '38c73975-ff73-476e-84c4-e80fa17c71bf',
                                data_xml_lang: 'la',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Tres sunt penae ingratuitorum: Privatio gratiae spiritualis ... Et nota undecim nomina\n              inferni: Primo vocatur in sacra scriptura lacus mortis, ain ze des todes'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: 'daded326-124c-4838-99f5-f741da98b235',
                                    data_from: '0180v',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0180verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'cb519949-4604-4f38-ae21-cee63181b92d',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '852fc2a8-6ccd-4dbc-9ba9-a12f951d3d9a',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Tres sunt penae ingratuitorum: Privatio gratiae spiritualis ... Et nota undecim nomina\n              inferni: Primo vocatur in sacra scriptura lacus mortis, ain ze des todes'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: 'f3a20cec-540f-48a0-b581-a9afa1074899',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0180verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '99c6e65c-3401-4df2-a74c-dc5755e921a2',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '4f941641-3363-4e43-9fa8-68feae398461',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Hölle'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: 'd4e1c578-7d74-44a0-9539-f547643504de',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '0b7270f0-4688-4602-a0df-9ffc0e5f745f',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Die elf Namen der Hölle'
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'index',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-index',
                                    component: '',
                                    level: 1,
                                    id: 'a085d736-c78e-4543-8bf9-130cb96c6191',
                                    children: [
                                      {
                                        data_origin: 'term',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-index-term',
                                        component: '',
                                        level: 1,
                                        id: '979ffc6f-6d3c-49d3-8ba3-21f50fd7c12e',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: 'lat.-dt.'
                                              }
                                            ]
                                          },
                                          {
                                            data_origin: 'locus',
                                            region: 'head',
                                            path: '#document-TEI-text-body-msDesc-head-index-index-index-term-locus',
                                            component: '',
                                            level: 1,
                                            id: 'b617cec6-79f2-4a4e-a7a0-fecaf18f1b08',
                                            data_from: '0180v',
                                            children: [
                                              {
                                                data_origin: 'textelement',
                                                region: 'head',
                                                children: [
                                                  {
                                                    region: 'head',
                                                    text: '0180verso'
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '79ee96cb-ec90-4168-8f8f-9030a37614f6',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '9287b314-c802-49bc-9d6a-d8293d1f4fb7',
                                data_xml_lang: 'la',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Elatio dicitur uebermuot, arrogantia - geuden vel gueften'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '5c5214a4-a625-495d-a9b8-dc8cf3809ebc',
                                    data_from: '0182v',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0182verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'ad58095c-4674-4e42-af61-4e34b578f841',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'c8d3e859-3cc4-4a3e-9457-949051315db2',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Elatio dicitur uebermuot, arrogantia - geuden vel gueften'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '42708033-966e-434e-9781-0b7c09fde692',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0182verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'eab05c70-8434-4355-b92e-0abce805b77f',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'b6f240c5-5eca-4ee3-8ddd-ed616b027b70',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Vokabular'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: '9ba55e00-6ae3-4214-9b1f-5dd471324228',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: 'cd0f9faa-b00c-47fd-a4e7-a6c4195b52cb',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'lat.-dt.'
                                          }
                                        ]
                                      },
                                      {
                                        data_origin: 'locus',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                                        component: '',
                                        level: 1,
                                        id: 'd75b65ae-d9e5-430a-91a5-13dc116b5aec',
                                        data_from: '0182v',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0182verso'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '67af42ce-3032-4d91-863d-b8fed7e30b1e',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '1e5e1121-9894-4e2c-b0b6-313a3178528d',
                                data_xml_lang: 'la',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Araxanus - habr; franeus - iessen'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '63cc56d3-6033-428e-87c8-cda221736b7b',
                                    data_from: '0183v',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0183verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '9691b521-3917-4664-8bdb-e64a86cc8226',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'fb5df6c4-4f84-49a6-bdc9-0946cbec9686',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Araxanus - habr; franeus - iessen'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '5a12f048-9235-441a-92e1-bdc6156dc72a',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0183verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'd04b50d8-2241-4eaa-a1f8-c8535aab44ea',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '94f9a303-e122-4213-9472-5b68f4a6403a',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Vokabular'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: 'b2fdb887-5ba6-4309-aff5-2c2a5bcf2804',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '2613745c-a34d-4984-a79c-4171f5f88fd7',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'lat.-dt.-tschech.'
                                          }
                                        ]
                                      },
                                      {
                                        data_origin: 'locus',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                                        component: '',
                                        level: 1,
                                        id: '0cfbbf50-e886-4f3f-96bd-9f870053361e',
                                        data_from: '0183v',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0183verso'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '0d6eec4e-70d8-4754-96ad-6d56ccbc013e',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '702b6e69-f157-4865-bd6f-1614aa295211',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Der heilig vater sant Bernhard ist geleichet dreien achpern fuersten von der alten e.\n              Der erste ist Moyses'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '23ef562e-0539-4f03-ba10-18d00d509671',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0204recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '92bf9c6c-4d2b-453f-bb6f-946d2cde5cfc',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '287b0caf-8f62-4203-bec7-65201584c6c8',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Bernardus Claraevallensis'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: '2361b01a-3d7d-4211-8da0-df1ea85f55a8',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '46eb580a-f976-45c3-9349-3e0b714cb26a',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Vergleiche zu seiner Person'
                                          }
                                        ]
                                      },
                                      {
                                        data_origin: 'locus',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                                        component: '',
                                        level: 1,
                                        id: '39916e41-8949-49d8-88cb-549f12e3a807',
                                        data_from: '0204r',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0204recto'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'e02117a0-c433-4f95-944d-72a8079eab6a',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '6a286aec-ed53-4470-8354-d563b5946a36',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Maria, Hl. Jungfrau'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: 'd539bb66-d5a9-4e6f-8251-a642e1f48dad',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '3f61ce2f-baf5-4976-aaaf-01d5c2e4d5c8',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Marienfeste'
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'index',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-index',
                                    component: '',
                                    level: 1,
                                    id: '0b9a1cc9-48b6-47f3-9a4b-b62fab0f495d',
                                    children: [
                                      {
                                        data_origin: 'term',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-index-term',
                                        component: '',
                                        level: 1,
                                        id: '1b8823b7-88d8-4ce9-97cd-e73bbc4d4ecc',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: 'Himmelfahrt, Predigt (lat.) und Auslegung (dt.)'
                                              }
                                            ]
                                          },
                                          {
                                            data_origin: 'locus',
                                            region: 'head',
                                            path: '#document-TEI-text-body-msDesc-head-index-index-index-term-locus',
                                            component: '',
                                            level: 1,
                                            id: '1755446a-309a-4c4a-8fc0-2cc745b82138',
                                            data_from: '0221v',
                                            children: [
                                              {
                                                data_origin: 'textelement',
                                                region: 'head',
                                                children: [
                                                  {
                                                    region: 'head',
                                                    text: '0221verso'
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '34de82ef-8d62-46ac-81ba-6f42a7237eba',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '8c2909f1-3f18-4b44-868e-2266c8fe803d',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Dise hohczeit unser vrawen hat drey merkleich namen: Des ersten ist si genant der tage\n              des slaffes, darumme das gottes muoter an disem tage di valsche werlt ueberwunde hat'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '809354e0-9dab-46e2-a75a-64f6d3b82f92',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0222verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'e0eeb304-53a1-42c0-93c5-8cd67465ad0c',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'c1079b6a-df2a-4264-9910-2be4f195ca2b',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Dise predig mant uns, das wir den heyligen gaist enphahen schuellen in fierlay weise:\n              Des ersten mit des cristenleichen frides gemaynunge'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '7696e6b6-f17c-4f1f-95cc-445ee1fd2f85',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0225recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'cbddf7a4-fb38-409f-8cad-575be6b87407',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '5048ef92-6f47-44f3-bb3a-c64452d3721e',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Petrus und Paulus, Hll.'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: 'b60c27f7-a2d0-480b-821a-740e3f51192f',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '835785ef-397c-4aab-b7a2-6a1d78a6068b',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Predigt (lat.) und Auslegung (dt.)'
                                          }
                                        ]
                                      },
                                      {
                                        data_origin: 'locus',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                                        component: '',
                                        level: 1,
                                        id: '4fc202e6-846a-47d6-b53a-34fffbfb3fce',
                                        data_from: '0225v',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0225verso'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '4eede9d6-1d0f-4e30-9b28-c89c30f3eea0',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '71489db5-d4f5-4b0a-83bc-e5b6b9d82ee7',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Sant Peter und send Paul seint mit ainadern [!] gewonet als tzwen bruder an siben\n              sachen. Des ersten an der cristenhait stiftunge'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '7b51f8ff-2364-4d77-a505-034e40684d3f',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0227verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'eb6f52d1-5cc9-4a71-874c-3be0ede403db',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'b4b65120-fa7b-4fcf-b03d-5496a8452c1c',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Margarethe von Antiochien, Hl.'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: '1311bcc2-f143-4d1d-85cb-990f1802e473',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '9311cece-3c73-43af-b476-00480a188e12',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Predigt (lat.) und Auslegung (dt.)'
                                          }
                                        ]
                                      },
                                      {
                                        data_origin: 'locus',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-term-locus',
                                        component: '',
                                        level: 1,
                                        id: 'd6a312ad-3854-45ed-93bf-88e0bc821f99',
                                        data_from: '0229v',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0229verso'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '0dc4aaa8-7e4b-4b56-9d72-8572a4f1eaef',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'e5b0b6d2-7f45-4bbf-9288-e02cb524c478',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'An der gaistleichen freude sein sechs hande pilde, dar an sich sant Margareth gefreut\n              hat und uns das pilde der freuden gelassen hat'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '3d16a2d0-97d2-4a55-99c6-016622f4fd56',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0231recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: 'f4a97177-b27f-4190-9740-0ea5ef412a5c',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'c5df69ec-f836-4d62-abd7-461b9a473bb0',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Der gotes suon ist in dise werlt quomen in ierlay weise: Sein erste chuonfte ist\n              wunderleich, di leit an unser menschait vorainunge'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '756926bd-1e09-45b3-abc9-47f8ed405083',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0231recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '83cfa0fb-cc7e-4d41-911e-25dc5fe93b32',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '33e05685-495c-4539-8872-9854d361e20a',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Der grosße heilige prophete David spricht yn dem ersten psalme nach hundertin des\n              salters'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: 'e90b671e-74da-40f5-9552-b6ed421f3492',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0231recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '417d15ec-f847-4c2b-a286-2c0e5d864425',
                            data_indexName: 'nasa',
                            data_facs: '#HSK0516_b069_obj-90682838-T',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '553a0912-51fb-4135-a2df-545b2a75bcda',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Maria, Hl. Jungfrau'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'index',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-index',
                                component: '',
                                level: 1,
                                id: '9cb32215-3e69-4ace-bdda-3e96601563a5',
                                children: [
                                  {
                                    data_origin: 'term',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-term',
                                    component: '',
                                    level: 1,
                                    id: '1733d106-1eb1-4e2f-b5f9-4a27b5ce32b5',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Marienfeste'
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'index',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-index-index',
                                    component: '',
                                    level: 1,
                                    id: '572e6ac6-885b-4254-b30a-ca979e9ecb4b',
                                    children: [
                                      {
                                        data_origin: 'term',
                                        region: 'head',
                                        path: '#document-TEI-text-body-msDesc-head-index-index-index-term',
                                        component: '',
                                        level: 1,
                                        id: '29fc46b9-e67e-4e68-927c-e1e546a5d22a',
                                        children: [
                                          {
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: 'Verkündigung, Auslegung einer Predigt'
                                              }
                                            ]
                                          },
                                          {
                                            data_origin: 'locus',
                                            region: 'head',
                                            path: '#document-TEI-text-body-msDesc-head-index-index-index-term-locus',
                                            component: '',
                                            level: 1,
                                            id: 'adf2a6b3-c3b8-41b8-9bc0-ac94059a5c54',
                                            data_from: '0231r',
                                            children: [
                                              {
                                                data_origin: 'textelement',
                                                region: 'head',
                                                children: [
                                                  {
                                                    region: 'head',
                                                    text: '0231recto'
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '69a3aa56-e864-4390-8bb8-85126f9ad80c',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: 'd9203768-f3b7-4110-bef3-db3bb52e740d',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'An disen worten seint czuo merken czway ding: Das ain ist der menschleichen crankhait\n              derchennunge, das ander der gotleichen barmhertichait gemainunge'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: 'a2940bd1-8bdb-4fa8-a551-f3ea3ecf7724',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0232recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'index',
                            region: 'head',
                            path: '#document-TEI-text-body-msDesc-head-index',
                            component: '',
                            level: 1,
                            id: '37fe4952-8e39-4298-b7d2-a2aedd079593',
                            data_indexName: 'initien',
                            children: [
                              {
                                data_origin: 'term',
                                region: 'head',
                                path: '#document-TEI-text-body-msDesc-head-index-term',
                                component: '',
                                level: 1,
                                id: '5feb8f72-83b7-4ebd-ad07-2028bc741943',
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Unser hailant der gotes suon sicczet auf sechs stuelen uns czuo trost und czuo ainer\n              fuerderunge. Des ersten siczzet er als ein mayster'
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'locus',
                                    region: 'head',
                                    path: '#document-TEI-text-body-msDesc-head-index-term-locus',
                                    component: '',
                                    level: 1,
                                    id: '1d006997-940c-4a11-8a05-a79abfdabb4f',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0234recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        istop: false
                      },
                      {
                        data_origin: 'msContents',
                        copied: false,
                        id: '1b184655-bc39-4f80-8e09-3df13c9212ae',
                        path: '#document-TEI-text-body-msDesc-msContents',
                        level: 1,
                        children: [
                          {
                            data_origin: 'msItem',
                            region: 'msItem',
                            component: 'msItemtext',
                            data_class: 'text',
                            copied: false,
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
                                    level: 1
                                  }
                                ],
                                id: '3551ce8e-3038-4173-9df9-9c0f22d6d634',
                                path: '#document-TEI-text-body-msDesc-msContents-msItem-note',
                                level: 1
                              }
                            ],
                            id: 'a200daaf-a6c6-4ab4-890b-35ed80e96fa0',
                            path: '#document-TEI-text-body-msDesc-msContents-msItem',
                            level: 1,
                            istop: false
                          },
                          {
                            data_origin: 'msItem',
                            region: 'msItem',
                            component: 'msItemiconography',
                            data_class: 'iconography',
                            copied: false,
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
                                    level: 1
                                  }
                                ],
                                id: '63e8c3b3-3fb5-4524-9ac5-138b13d91376',
                                path: '#document-TEI-text-body-msDesc-msContents-msItem-note',
                                level: 1
                              }
                            ],
                            istop: false
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    const store = ConfigureStore

    store.dispatch(writeDocument(true))

    render(
        <TestContext>
          <Slate value={slateValue} onChange={() => {
          }}
                 editor={editor}><span></span></Slate>
        </TestContext>)

    expect(JSON.stringify(findSlateNodeByWrapperID('msContents', {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: '',
      wrapperID: '1b184655-bc39-4f80-8e09-3df13c9212ae',
      xmlpath: ''
    }, editor))).toEqual('[{"data_origin":"msContents","copied":false,"id":"1b184655-bc39-4f80-8e09-3df13c9212ae","path":"#document-TEI-text-body-msDesc-msContents","level":1,"children":[{"data_origin":"msItem","region":"msItem","component":"msItemtext","data_class":"text","copied":false,"children":[{"data_origin":"note","region":"msItem","children":[{"text":"__INHALT_TEXT__","region":"msItem","id":"771e890f-d527-42b5-9cd3-8a82ce6353cd","path":"#document-TEI-text-body-msDesc-msContents-msItem-note-undefined","level":1}],"id":"3551ce8e-3038-4173-9df9-9c0f22d6d634","path":"#document-TEI-text-body-msDesc-msContents-msItem-note","level":1}],"id":"a200daaf-a6c6-4ab4-890b-35ed80e96fa0","path":"#document-TEI-text-body-msDesc-msContents-msItem","level":1,"istop":false},{"data_origin":"msItem","region":"msItem","component":"msItemiconography","data_class":"iconography","copied":false,"id":"a15ec159-41af-4cd6-8d20-baffe96eb684","path":"#document-TEI-text-body-msDesc-msContents-msItem","level":1,"children":[{"data_origin":"note","region":"msItem","children":[{"text":"INHALT_TEXT_DECORATION","region":"msItem","id":"36285907-b4cc-49e5-9f79-8917b97c7854","path":"#document-TEI-text-body-msDesc-msContents-msItem-note-undefined","level":1}],"id":"63e8c3b3-3fb5-4524-9ac5-138b13d91376","path":"#document-TEI-text-body-msDesc-msContents-msItem-note","level":1}],"istop":false}]},[0,2,0,0,2]]')

  })

  it('Delete Slate Node Value', async () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [
      {
        data_origin: 'TEI',
        region: 'TEI',
        path: '#document-TEI',
        component: '',
        level: 0,
        id: '806a350c-3637-4d6e-9c8c-6d28b98f87f8',
        data_xmlns: 'http://www.tei-c.org/ns/1.0',
        data_xml_id: 'file_someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss',
        data_xml_lang: 'de',
        children: [
          {
            data_origin: 'teiHeader',
            region: 'TEI',
            path: '#document-TEI-teiHeader',
            component: '',
            level: 0,
            id: '1ddda5cc-d8a0-4091-94ba-8bf972161eb5',
            children: [
              {
                data_origin: 'fileDesc',
                region: 'TEI',
                path: '#document-TEI-teiHeader-fileDesc',
                component: '',
                level: 0,
                id: 'fa6c26a6-b715-41ca-aa56-8a5317a067fb',
                children: [
                  {
                    data_origin: 'titleStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-titleStmt',
                    component: '',
                    level: 0,
                    id: '65417025-d418-4d58-af13-20bfac73afa0',
                    children: [
                      {
                        data_origin: 'title',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-titleStmt-title',
                        component: '',
                        level: 0,
                        id: 'ff9592fd-93f3-4b0e-97b3-03ffec953067',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: '(Leipzig, Universitätsbibliothek Leipzig, Ms 758)'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'editionStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-editionStmt',
                    component: '',
                    level: 0,
                    id: '210db9e7-ce7f-4936-b7bc-09d662ad1a17',
                    children: [
                      {
                        data_origin: 'edition',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-editionStmt-edition',
                        component: '',
                        level: 0,
                        id: '81b0645c-088a-4dc1-880e-ebd986faeab4',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: 'Elektronische Ausgabe nach TEI P5'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'respStmt',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt',
                        component: '',
                        level: 0,
                        id: 'd64a30b1-9e1d-4a6d-b92a-963d658b84b3',
                        children: [
                          {
                            data_origin: 'resp',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-resp',
                            component: '',
                            level: 0,
                            id: 'a431114a-5506-4689-b4d8-7b2ac7a2042b',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'TEI',
                                children: [
                                  {
                                    region: 'TEI',
                                    text: 'Diese Datei wurde automatisch erzeugt, unter Verwendung der MXML-to-TEI-P5-Stylesheets, die an der\n            Herzog August Bibliothek Wolfenbüttel im Rahmen des Projektes "Handschriftenportal" gepflegt\n            werden.2021-07-01'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'name',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-name',
                            component: '',
                            level: 0,
                            id: '456f34a6-babe-4d7a-bcfc-e340adbcab0e',
                            data_type: 'person',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          },
                          {
                            data_origin: 'name',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-name',
                            component: '',
                            level: 0,
                            id: '436085cf-e400-4191-91f8-7c696c6179a1',
                            data_type: 'org',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'publicationStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-publicationStmt',
                    component: '',
                    level: 0,
                    id: 'ba4d7fd9-99dd-48ca-a45d-fba756ce9df7',
                    children: [
                      {
                        data_origin: 'publisher',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-publisher',
                        component: '',
                        level: 0,
                        id: '6cf906d9-61ed-43d1-a0e6-ef8393ab454e',
                        children: [
                          {
                            data_origin: 'name',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-publicationStmt-publisher-name',
                            component: '',
                            level: 0,
                            id: 'e95106fe-17d5-4a8c-b9ed-62c41516c704',
                            data_type: 'org',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          },
                          {
                            data_origin: 'ptr',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-publicationStmt-publisher-ptr',
                            component: '',
                            level: 0,
                            id: 'abf0fd76-4861-45a4-8011-813a1fec5649',
                            data_target: 'http://some.url',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'date',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-date',
                        component: '',
                        level: 0,
                        id: '888d2879-5ac5-43ef-ae0e-7f53b56e799f',
                        data_when: '2021-07-01',
                        data_type: 'published',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: '2021-07-01'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'date',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-date',
                        component: '',
                        level: 0,
                        id: '7ea73069-95d3-4155-b14e-dac108da8499',
                        data_when: '2009-10-14',
                        data_type: 'issued',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: '2009-10-14'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'availability',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability',
                        component: '',
                        level: 0,
                        id: '54a40bc9-7d94-4c2c-b291-53768356945f',
                        data_status: 'restricted',
                        children: [
                          {
                            data_origin: 'licence',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence',
                            component: '',
                            level: 0,
                            id: 'd6ac1eed-c6ce-447c-8055-c158fef13daa',
                            data_target: 'http://some.url',
                            children: [
                              {
                                data_origin: 'p',
                                region: 'TEI',
                                path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p',
                                component: '',
                                level: 0,
                                id: '970a04c0-a6c3-41b6-ae42-a2b41b374411',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'TEI',
                                    children: [
                                      {
                                        region: 'TEI',
                                        text: '('
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'ref',
                                    region: 'TEI',
                                    path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p-ref',
                                    component: '',
                                    level: 0,
                                    id: 'ef4c6b6a-b5a8-423c-aa90-d0f95268c048',
                                    data_target: 'http://some.url',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'TEI',
                                        children: [
                                          {
                                            region: 'TEI',
                                            text: 'copyright information'
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'textelement',
                                    region: 'TEI',
                                    children: [
                                      {
                                        region: 'TEI',
                                        text: ')'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'sourceDesc',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-sourceDesc',
                    component: '',
                    level: 0,
                    id: '2771b26b-97eb-4322-b6ac-d1e4e19cafa1',
                    children: [
                      {
                        data_origin: 'p',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-sourceDesc-p',
                        component: '',
                        level: 0,
                        id: '5290eb6b-4d5b-4f0e-9fac-66fd61bccf0b',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: 'Automatisch generierte Beschreibung aus einem HiDA-4 Dokument.'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            data_origin: 'facsimile',
            region: 'TEI',
            path: '#document-TEI-facsimile',
            component: '',
            level: 0,
            id: 'a22d3559-7254-43bb-b56b-5a15d5cb1f60',
            children: [
              {
                data_origin: 'graphic',
                region: 'TEI',
                path: '#document-TEI-facsimile-graphic',
                component: '',
                level: 0,
                id: '1f7f2cd7-81c4-48b6-8957-bce853410502',
                data_xml_id: 'HSK0516_b069_obj-90682838-T',
                data_url: 'http://bilder.manuscripta-mediaevalia.de/hs/katalogseiten/HSK0516_b069_jpg.htm',
                children: [
                  {
                    text: ''
                  }
                ]
              }
            ]
          },
          {
            data_origin: 'text',
            region: 'TEI',
            path: '#document-TEI-text',
            component: '',
            level: 0,
            id: 'a7b04e65-3b2b-4133-8529-772fc275f005',
            children: [
              {
                data_origin: 'body',
                region: 'TEI',
                path: '#document-TEI-text-body',
                component: '',
                level: 0,
                id: '2ef8b4b8-fdab-43a0-9dc3-f14485a1d4e9',
                children: [
                  {
                    data_origin: 'msDesc',
                    region: 'TEI',
                    path: '#document-TEI-text-body-msDesc',
                    component: '',
                    level: 1,
                    id: '09920555-5833-4605-85ea-0252de3cb7da',
                    data_status: 'intern',
                    data_xml_id: 'HSP-99ca4765-7b18-38f9-b3ff-220d32cc55ae',
                    data_xml_lang: 'de',
                    data_subtype: 'medieval',
                    data_type: 'hsp:description',
                    children: [
                      {
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
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Leipzig'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'repository',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
                            component: '',
                            level: 1,
                            id: '2fa6956a-124f-4fa9-8e02-f773e0849b69',
                            data_key: '016bc785-54a5-3c23-a276-7162a959306e',
                            data_ref: 'http://d-nb.info/gnd/30026-3 https://sigel.staatsbibliothek-berlin.de/suche/?isil=DE-15',
                            data_rend: 'UB',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Universitätsbibliothek Leipzig'
                                  }
                                ]
                              }
                            ]
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
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Ms Konrasd asdas'
                                  }
                                ]
                              }
                            ]
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
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Ms 0022-0961 Sammlung'
                                  }
                                ]
                              }
                            ]
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
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Cod. 758'
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'altIdentifier',
                                    children: [
                                      {
                                        region: 'altIdentifier',
                                        text: 'someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        istop: false
                      },
                      {
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
                                data_origin: 'textelement',
                                region: 'head',
                                children: [
                                  {
                                    region: 'head',
                                    text: 'Maria, Hl. Jungfrau, Gebet – Heiliger Geist, Predigt (lat.) und Auslegung (dt.) – Jesus Christus,\n            Passion – Advent, Predigt (lat.) und Auslegung (dt.) – Predigt, Festpredigt'
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Theologische Sammelhandschrift, lat. und dt.'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Codex'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Datierung'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '14. Jh.'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '1301'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '1400'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Beschreibung'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Franzjosef Pensel'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '1998'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Pergament'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '21,4 × 13,5'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '21'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '13'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'real'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '243 Bl.'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'lateinisch'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'tschechisch'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'deutsch'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Anfang'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '103'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '6'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Page103_Block6'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Ende'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '105'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: '4'
                                      }
                                    ]
                                  }
                                ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Page105_Block4'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Datierung'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Zeiträume'
                                          }
                                        ]
                                      }
                                    ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '14. Jh.'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Schreibsprache'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'bair.'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Di czehen gebot di got selber gab Moysi geschriben mit gotes vinger an czwayn stainen\n              taveln, di scholtu merken an disem buoche'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0154recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Handschriften, zitierte'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Wien, ÖNB'
                                          }
                                        ]
                                      }
                                    ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '1646'
                                              }
                                            ]
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
                                                data_origin: 'textelement',
                                                region: 'head',
                                                children: [
                                                  {
                                                    region: 'head',
                                                    text: '0154recto'
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Johannes von Iglau'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Dekalogerklärung'
                                          }
                                        ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0154recto'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Also sprichet got czu dem menschen, der seinen heiligen leichnam wirdicleichen enpfehet\n              und froloket in seiner sele: Duo enpfehst mich, so rainig ich dich fon suenden'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0163verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Eucharistie-Sakrament'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Traktate'
                                          }
                                        ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0163verso'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'grüßen, gegrüßt - Gegruest seistu Maria, in dem munde ain suzer name, in dem herczen ain\n              teur schacze'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0173verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'la',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Tres sunt penae ingratuitorum: Privatio gratiae spiritualis ... Et nota undecim nomina\n              inferni: Primo vocatur in sacra scriptura lacus mortis, ain ze des todes'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0180verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Tres sunt penae ingratuitorum: Privatio gratiae spiritualis ... Et nota undecim nomina\n              inferni: Primo vocatur in sacra scriptura lacus mortis, ain ze des todes'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0180verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Hölle'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Die elf Namen der Hölle'
                                          }
                                        ]
                                      }
                                    ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: 'lat.-dt.'
                                              }
                                            ]
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
                                                data_origin: 'textelement',
                                                region: 'head',
                                                children: [
                                                  {
                                                    region: 'head',
                                                    text: '0180verso'
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'la',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Elatio dicitur uebermuot, arrogantia - geuden vel gueften'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0182verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Elatio dicitur uebermuot, arrogantia - geuden vel gueften'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0182verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Vokabular'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'lat.-dt.'
                                          }
                                        ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0182verso'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'la',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Araxanus - habr; franeus - iessen'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0183verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Araxanus - habr; franeus - iessen'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0183verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Vokabular'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'lat.-dt.-tschech.'
                                          }
                                        ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0183verso'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Der heilig vater sant Bernhard ist geleichet dreien achpern fuersten von der alten e.\n              Der erste ist Moyses'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0204recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Bernardus Claraevallensis'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Vergleiche zu seiner Person'
                                          }
                                        ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0204recto'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Maria, Hl. Jungfrau'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Marienfeste'
                                          }
                                        ]
                                      }
                                    ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: 'Himmelfahrt, Predigt (lat.) und Auslegung (dt.)'
                                              }
                                            ]
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
                                                data_origin: 'textelement',
                                                region: 'head',
                                                children: [
                                                  {
                                                    region: 'head',
                                                    text: '0221verso'
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Dise hohczeit unser vrawen hat drey merkleich namen: Des ersten ist si genant der tage\n              des slaffes, darumme das gottes muoter an disem tage di valsche werlt ueberwunde hat'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0222verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Dise predig mant uns, das wir den heyligen gaist enphahen schuellen in fierlay weise:\n              Des ersten mit des cristenleichen frides gemaynunge'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0225recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Petrus und Paulus, Hll.'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Predigt (lat.) und Auslegung (dt.)'
                                          }
                                        ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0225verso'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Sant Peter und send Paul seint mit ainadern [!] gewonet als tzwen bruder an siben\n              sachen. Des ersten an der cristenhait stiftunge'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0227verso'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Margarethe von Antiochien, Hl.'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Predigt (lat.) und Auslegung (dt.)'
                                          }
                                        ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: '0229verso'
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'An der gaistleichen freude sein sechs hande pilde, dar an sich sant Margareth gefreut\n              hat und uns das pilde der freuden gelassen hat'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0231recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Der gotes suon ist in dise werlt quomen in ierlay weise: Sein erste chuonfte ist\n              wunderleich, di leit an unser menschait vorainunge'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0231recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Der grosße heilige prophete David spricht yn dem ersten psalme nach hundertin des\n              salters'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0231recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Maria, Hl. Jungfrau'
                                      }
                                    ]
                                  }
                                ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: 'Marienfeste'
                                          }
                                        ]
                                      }
                                    ]
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
                                            data_origin: 'textelement',
                                            region: 'head',
                                            children: [
                                              {
                                                region: 'head',
                                                text: 'Verkündigung, Auslegung einer Predigt'
                                              }
                                            ]
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
                                                data_origin: 'textelement',
                                                region: 'head',
                                                children: [
                                                  {
                                                    region: 'head',
                                                    text: '0231recto'
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'An disen worten seint czuo merken czway ding: Das ain ist der menschleichen crankhait\n              derchennunge, das ander der gotleichen barmhertichait gemainunge'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0232recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
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
                                data_xml_lang: 'de',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'head',
                                    children: [
                                      {
                                        region: 'head',
                                        text: 'Unser hailant der gotes suon sicczet auf sechs stuelen uns czuo trost und czuo ainer\n              fuerderunge. Des ersten siczzet er als ein mayster'
                                      }
                                    ]
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
                                        data_origin: 'textelement',
                                        region: 'head',
                                        children: [
                                          {
                                            region: 'head',
                                            text: '0234recto'
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        istop: false
                      },
                      {
                        data_origin: 'additional',
                        copied: false,
                        id: '26f27f8b-7c1e-401e-b059-943591c09c5e',
                        path: '#document-TEI-text-body-msDesc-additional',
                        level: 1,
                        children: [
                          {
                            data_origin: 'listBibl',
                            region: 'listBibl',
                            component: 'listBibl',
                            copied: false,
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
                                    level: 1
                                  }
                                ],
                                id: 'e20c8a44-2b83-4c6d-904d-523dc3452273',
                                path: '#document-TEI-text-body-msDesc-additional-listBibl-bibl',
                                level: 1
                              }
                            ],
                            id: 'e69212d5-b550-4228-9df6-4c3c5c69d4bc',
                            path: '#document-TEI-text-body-msDesc-additional-listBibl',
                            level: 1,
                            istop: false
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    const store = ConfigureStore
    const dispatch = jest.fn()
    const callback = jest.fn(() => {
    })

    store.dispatch(writeDocument(true))

    render(
        <TestContext>
          <Slate value={slateValue} onChange={() => {
          }}
                 editor={editor}><span></span></Slate>
        </TestContext>)

    deleteSlateNodeWithWrapper('additional', {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [0, 2, 0, 0, 2, 0],
      teiElement: '',
      wrapperID: '26f27f8b-7c1e-401e-b059-943591c09c5e',
      xmlpath: ''
    }, editor, callback, true, dispatch, 'ID')

    await waitFor(() => {
      expect(JSON.stringify(slateValue)).toEqual('[{"data_origin":"TEI","region":"TEI","path":"#document-TEI","component":"","level":0,"id":"806a350c-3637-4d6e-9c8c-6d28b98f87f8","data_xmlns":"http://www.tei-c.org/ns/1.0","data_xml_id":"file_someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss","data_xml_lang":"de","children":[{"data_origin":"teiHeader","region":"TEI","path":"#document-TEI-teiHeader","component":"","level":0,"id":"1ddda5cc-d8a0-4091-94ba-8bf972161eb5","children":[{"data_origin":"fileDesc","region":"TEI","path":"#document-TEI-teiHeader-fileDesc","component":"","level":0,"id":"fa6c26a6-b715-41ca-aa56-8a5317a067fb","children":[{"data_origin":"titleStmt","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-titleStmt","component":"","level":0,"id":"65417025-d418-4d58-af13-20bfac73afa0","children":[{"data_origin":"title","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-titleStmt-title","component":"","level":0,"id":"ff9592fd-93f3-4b0e-97b3-03ffec953067","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"(Leipzig, Universitätsbibliothek Leipzig, Ms 758)"}]}]}]},{"data_origin":"editionStmt","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt","component":"","level":0,"id":"210db9e7-ce7f-4936-b7bc-09d662ad1a17","children":[{"data_origin":"edition","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt-edition","component":"","level":0,"id":"81b0645c-088a-4dc1-880e-ebd986faeab4","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"Elektronische Ausgabe nach TEI P5"}]}]},{"data_origin":"respStmt","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt-respStmt","component":"","level":0,"id":"d64a30b1-9e1d-4a6d-b92a-963d658b84b3","children":[{"data_origin":"resp","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-resp","component":"","level":0,"id":"a431114a-5506-4689-b4d8-7b2ac7a2042b","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"Diese Datei wurde automatisch erzeugt, unter Verwendung der MXML-to-TEI-P5-Stylesheets, die an der\\n            Herzog August Bibliothek Wolfenbüttel im Rahmen des Projektes \\"Handschriftenportal\\" gepflegt\\n            werden.2021-07-01"}]}]},{"data_origin":"name","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-name","component":"","level":0,"id":"456f34a6-babe-4d7a-bcfc-e340adbcab0e","data_type":"person","children":[{"text":""}]},{"data_origin":"name","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-name","component":"","level":0,"id":"436085cf-e400-4191-91f8-7c696c6179a1","data_type":"org","children":[{"text":""}]}]}]},{"data_origin":"publicationStmt","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt","component":"","level":0,"id":"ba4d7fd9-99dd-48ca-a45d-fba756ce9df7","children":[{"data_origin":"publisher","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-publisher","component":"","level":0,"id":"6cf906d9-61ed-43d1-a0e6-ef8393ab454e","children":[{"data_origin":"name","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-publisher-name","component":"","level":0,"id":"e95106fe-17d5-4a8c-b9ed-62c41516c704","data_type":"org","children":[{"text":""}]},{"data_origin":"ptr","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-publisher-ptr","component":"","level":0,"id":"abf0fd76-4861-45a4-8011-813a1fec5649","data_target":"http://some.url","children":[{"text":""}]}]},{"data_origin":"date","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-date","component":"","level":0,"id":"888d2879-5ac5-43ef-ae0e-7f53b56e799f","data_when":"2021-07-01","data_type":"published","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"2021-07-01"}]}]},{"data_origin":"date","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-date","component":"","level":0,"id":"7ea73069-95d3-4155-b14e-dac108da8499","data_when":"2009-10-14","data_type":"issued","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"2009-10-14"}]}]},{"data_origin":"availability","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-availability","component":"","level":0,"id":"54a40bc9-7d94-4c2c-b291-53768356945f","data_status":"restricted","children":[{"data_origin":"licence","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence","component":"","level":0,"id":"d6ac1eed-c6ce-447c-8055-c158fef13daa","data_target":"http://some.url","children":[{"data_origin":"p","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p","component":"","level":0,"id":"970a04c0-a6c3-41b6-ae42-a2b41b374411","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"("}]},{"data_origin":"ref","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p-ref","component":"","level":0,"id":"ef4c6b6a-b5a8-423c-aa90-d0f95268c048","data_target":"http://some.url","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"copyright information"}]}]},{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":")"}]}]}]}]}]},{"data_origin":"sourceDesc","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-sourceDesc","component":"","level":0,"id":"2771b26b-97eb-4322-b6ac-d1e4e19cafa1","children":[{"data_origin":"p","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-sourceDesc-p","component":"","level":0,"id":"5290eb6b-4d5b-4f0e-9fac-66fd61bccf0b","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"Automatisch generierte Beschreibung aus einem HiDA-4 Dokument."}]}]}]}]}]},{"data_origin":"facsimile","region":"TEI","path":"#document-TEI-facsimile","component":"","level":0,"id":"a22d3559-7254-43bb-b56b-5a15d5cb1f60","children":[{"data_origin":"graphic","region":"TEI","path":"#document-TEI-facsimile-graphic","component":"","level":0,"id":"1f7f2cd7-81c4-48b6-8957-bce853410502","data_xml_id":"HSK0516_b069_obj-90682838-T","data_url":"http://bilder.manuscripta-mediaevalia.de/hs/katalogseiten/HSK0516_b069_jpg.htm","children":[{"text":""}]}]},{"data_origin":"text","region":"TEI","path":"#document-TEI-text","component":"","level":0,"id":"a7b04e65-3b2b-4133-8529-772fc275f005","children":[{"data_origin":"body","region":"TEI","path":"#document-TEI-text-body","component":"","level":0,"id":"2ef8b4b8-fdab-43a0-9dc3-f14485a1d4e9","children":[{"data_origin":"msDesc","region":"TEI","path":"#document-TEI-text-body-msDesc","component":"","level":1,"id":"09920555-5833-4605-85ea-0252de3cb7da","data_status":"intern","data_xml_id":"HSP-99ca4765-7b18-38f9-b3ff-220d32cc55ae","data_xml_lang":"de","data_subtype":"medieval","data_type":"hsp:description","children":[{"data_origin":"msIdentifier","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier","component":"msIdentifier","level":1,"id":"aebd6f56-f58d-4044-b9c3-a1082e369491","children":[{"data_origin":"settlement","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-settlement","component":"","level":1,"id":"b805a0f6-0ae1-4802-8545-6211a239ae6f","data_key":"4a887b8a-68ac-39b0-8d9d-027bddedb06b","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"Leipzig"}]}]},{"data_origin":"repository","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-repository","component":"","level":1,"id":"2fa6956a-124f-4fa9-8e02-f773e0849b69","data_key":"016bc785-54a5-3c23-a276-7162a959306e","data_ref":"http://d-nb.info/gnd/30026-3 https://sigel.staatsbibliothek-berlin.de/suche/?isil=DE-15","data_rend":"UB","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"Universitätsbibliothek Leipzig"}]}]},{"data_origin":"collection","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-collection","component":"","level":1,"id":"655d60c6-b93c-4ef1-8482-b543e4b4d862","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"Ms Konrasd asdas"}]}]},{"data_origin":"collection","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-collection","component":"","level":1,"id":"eba1731f-7a81-4c1d-a105-2d7cb736230d","data_type":"baseShelfmarkGroup","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"Ms 0022-0961 Sammlung"}]}]},{"data_origin":"idno","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-idno","component":"","level":1,"id":"211a2c53-9c08-4fb6-bc64-850ab0150b90","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"Cod. 758"}]}]},{"data_origin":"altIdentifier","region":"altIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-altIdentifier","component":"","level":1,"id":"4edb4b5f-a7c0-4121-b43c-1234db5b8172","data_type":"catalog","children":[{"data_origin":"idno","region":"altIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno","component":"","level":1,"id":"c9a2d5ef-fd42-4302-9490-ec8fde5311e1","children":[{"data_origin":"textelement","region":"altIdentifier","children":[{"region":"altIdentifier","text":"someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss"}]}]}]}],"istop":false},{"data_origin":"head","region":"head","path":"#document-TEI-text-body-msDesc-head","component":"head","level":1,"id":"7c5f2dd5-05fa-4c11-b56c-3d6bb83d61e5","children":[{"data_origin":"title","region":"head","path":"#document-TEI-text-body-msDesc-head-title","component":"","level":1,"id":"2e4a2ff1-0dd9-4951-a25a-bbbc6a09c135","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Maria, Hl. Jungfrau, Gebet – Heiliger Geist, Predigt (lat.) und Auslegung (dt.) – Jesus Christus,\\n            Passion – Advent, Predigt (lat.) und Auslegung (dt.) – Predigt, Festpredigt"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"4f2b6a62-c23b-4e3c-879a-13e4adbd2c13","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"a9e53ed2-1efd-4630-afdc-4dfc964ea37e","data_type":"title","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Theologische Sammelhandschrift, lat. und dt."}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"c6f579d9-6d45-4455-a124-96b7562f3658","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"c4132f22-7696-4a12-876e-94947d332e4d","data_type":"form","data_n":"codex","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Codex"}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"fb8af528-ee77-4a30-b2af-509fdf9af8be","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"4579076c-800b-4845-b02a-c13d9d6a0efd","data_type":"origDate_type","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Datierung"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"91387fa8-4de9-4199-8719-cf387875b223","data_type":"origDate","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"14. Jh."}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"813295d4-5620-4df6-945e-de31f2e95db7","data_type":"origDate_notBefore","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"1301"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"60cf9019-df53-418e-90be-21f5dfbffa36","data_type":"origDate_notAfter","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"1400"}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"eca7e3a9-c0fc-4f33-a15e-5fd05ab160bf","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"e3e9736a-608d-4952-8ec1-4c2befb137c8","data_type":"msDesc_status","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Beschreibung"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"b8f0a173-6cb3-4b30-bd5a-8d81eec64459","data_type":"source_author","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Franzjosef Pensel"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"2f573e05-ea1d-4c89-925d-f666d0bb1ecf","data_type":"publicationStmt_date_published","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"1998"}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"d9cb9f2d-d877-4906-9fc3-103f505a4eb8","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"c3005564-1414-4275-95ac-bcb13cbd9a99","data_type":"material","data_n":"perg","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Pergament"}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"cdce9573-483f-4ec9-83f4-7573bf55dcaf","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"78e7d96b-fa4a-40e5-bde6-c060ca96f735","data_type":"dimensions","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"21,4 × 13,5"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"59aff063-30c8-476e-8a19-f675744d2b36","data_type":"height","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"21"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"089c5887-9089-4f91-94b7-c566aa35c9c1","data_type":"width","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"13"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"36061f10-cca7-4bd0-8b79-fea540c78899","data_type":"format_typeOfInformation","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"real"}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"6891ff83-40f4-4451-8b10-a40e5653ef80","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"487548d1-f0d9-440a-a3c5-7e9fcc75cab4","data_type":"measure_noOfLeaves","data_n":"243","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"243 Bl."}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"a7574e4d-2f3e-4562-9b66-a7cf5e100e02","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"58f5d2e0-334d-4a34-880e-6887c3e34789","data_type":"textLang","data_n":"la","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"lateinisch"}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"138144f0-a433-4b5a-9c0b-464b969717ff","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"cf744b01-77bf-4200-afbf-fbbe0545f75f","data_type":"textLang","data_n":"cs","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"tschechisch"}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"9009d3de-1559-468e-bcf7-ec9ccf550010","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"2a52d9bb-8c76-458d-8dd8-1a29a435e4c8","data_type":"textLang","data_n":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"deutsch"}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"621c9cff-7a9f-4ba2-be62-438de04e6a26","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"4a804b20-3c31-47c9-a7e3-b79b2adfb01e","data_type":"biblScope","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Anfang"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"9b868d11-931c-4ca3-a36d-143881bdac57","data_type":"biblScope_page","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"103"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"62930199-b7ef-47f3-9a06-26c12b849e01","data_type":"biblScope_line","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"6"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"b07821c7-0dea-4330-9296-b4854d63f86c","data_type":"biblScope_Alto-Element-ID","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Page103_Block6"}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"92596c80-85bc-4554-9b61-c9aecbfb6370","data_indexName":"norm","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"50badef2-ce3d-4693-88c7-1dace9b5af44","data_type":"biblScope","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Ende"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"9d9d7325-1a18-4798-b1f2-c6bfd48b0c7e","data_type":"biblScope_page","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"105"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"6ecaa17a-815c-42fd-a1b9-ed4ba2e0e4a1","data_type":"biblScope_line","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"4"}]}]},{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"4bc5a2d9-1cdf-4e78-b2fe-bcdc7ecf8c9f","data_type":"biblScope_Alto-Element-ID","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Page105_Block4"}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"eef38f04-58a7-41e5-9d57-3a52345b6c6e","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"426387a0-c4a7-4e1b-9812-c2da77c5f7bf","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Datierung"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"7cd82fb4-cdfb-4c4c-8032-c4c8fc0593cc","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"0353d887-a3ad-47d7-86ea-419883ce902d","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Zeiträume"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index","component":"","level":1,"id":"a052dbb2-452d-4483-adc2-68aecaf29cd9","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index-term","component":"","level":1,"id":"e797c224-3d65-4c9e-84cd-a542011a07a8","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"14. Jh."}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"b3bb777c-a929-4c8d-b5a7-46912d509b63","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"947b00ef-1973-4a79-ae44-5f5a09b4f2b9","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Schreibsprache"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"13729a2f-580c-42b6-930a-0d83fbfc38e7","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"c1e4157c-7407-41e0-a367-e9fc5f5ac5a1","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"bair."}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"06b5b485-981d-4381-8772-561db3a79497","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"92939b82-ffe8-48a4-b4b4-5021d7c01317","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Di czehen gebot di got selber gab Moysi geschriben mit gotes vinger an czwayn stainen\\n              taveln, di scholtu merken an disem buoche"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"077ea923-a346-4fa0-912c-115d621cd65b","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0154recto"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"2ce11abc-deb4-4ac0-b004-149aa3e571c9","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"effc0a3b-10f0-4ba7-9111-8ab02cc1b20e","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Handschriften, zitierte"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"eeb5e700-f131-4458-9ae0-7c5d992d9925","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"68d1cd1f-7dad-4885-b192-87abaceb3736","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Wien, ÖNB"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index","component":"","level":1,"id":"09ef7822-2eae-4f78-949e-59830b5bd893","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index-term","component":"","level":1,"id":"0072d58c-5cef-4587-98eb-d2386908651c","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"1646"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index-term-locus","component":"","level":1,"id":"31b6bd47-53de-4d50-a461-2f1a841d4316","data_from":"0154r","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0154recto"}]}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"ef3f07e2-a75a-4163-a12f-cd4459696a94","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"14cc14f9-885f-4613-85eb-b3f75f1e06e8","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Johannes von Iglau"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"9808be64-9a0e-4449-8233-5429e571f8cb","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"6db5c53d-10cb-4688-926f-cf232788396a","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Dekalogerklärung"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term-locus","component":"","level":1,"id":"ec76756a-d152-4108-aaea-5049df5ce783","data_from":"0154r","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0154recto"}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"341a84ce-d860-4e14-961f-54d4b7a62625","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"ab94a57b-deab-4ce9-be8e-a2f1e29bad88","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Also sprichet got czu dem menschen, der seinen heiligen leichnam wirdicleichen enpfehet\\n              und froloket in seiner sele: Duo enpfehst mich, so rainig ich dich fon suenden"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"3f713f21-fa4e-4442-b4e8-e7d3195eb57b","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0163verso"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"ba97810f-3b44-48e2-9e9e-aa6281f9cdf0","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"83bbb163-d712-4e2e-8a07-186e2f157955","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Eucharistie-Sakrament"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"30bc33c1-59a4-4a1c-8f37-b04b17cac004","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"c1b92943-1ccc-499a-bc61-d5ca14fbf36d","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Traktate"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term-locus","component":"","level":1,"id":"2b1e558b-11ab-4459-9c26-a9466f2b908d","data_from":"0163v","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0163verso"}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"15db0e8b-047b-40ad-b08b-90a51958629f","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"dd8e2e86-a40a-4b4f-b18d-5ed3c64da25c","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"grüßen, gegrüßt - Gegruest seistu Maria, in dem munde ain suzer name, in dem herczen ain\\n              teur schacze"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"58266cc8-d561-4d84-8fb1-ac56923db8e1","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0173verso"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"c78a7d61-2a1e-4cbe-bccf-ec4f9a5ced26","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"50973bcd-b0f4-45ae-9e58-7ac926aa9eb3","data_xml_lang":"la","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Tres sunt penae ingratuitorum: Privatio gratiae spiritualis ... Et nota undecim nomina\\n              inferni: Primo vocatur in sacra scriptura lacus mortis, ain ze des todes"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"c9275a4a-80c7-4f8c-a71f-9eaaabd27aed","data_from":"0180v","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0180verso"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"bd9034ff-15ed-4d1c-92a8-f3655c6ee392","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"1b335c34-5333-4f64-b5e5-8f6640b683a7","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Tres sunt penae ingratuitorum: Privatio gratiae spiritualis ... Et nota undecim nomina\\n              inferni: Primo vocatur in sacra scriptura lacus mortis, ain ze des todes"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"f91bc304-2ff2-4272-8a82-8189b8b23f0a","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0180verso"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"bb22e189-fbd0-4708-be69-1acfb8b2a7e6","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"c1ba86c8-a4ae-4acd-bc9c-939fbcb08cf6","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Hölle"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"d6d382f4-cbd7-43df-a5aa-6c7409f63f2a","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"bc2f153c-896e-4078-8833-7b2f1c232b81","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Die elf Namen der Hölle"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index","component":"","level":1,"id":"5d37bab3-a3a5-4831-8d9c-63ec4adea1b2","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index-term","component":"","level":1,"id":"3b386e4b-46f1-4b1a-87b4-a30a70a815a4","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"lat.-dt."}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index-term-locus","component":"","level":1,"id":"292c810c-92cc-4646-99d8-03418002ca23","data_from":"0180v","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0180verso"}]}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"4ffa0841-3189-476c-bdd6-eab1148ea578","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"46a12ee6-cec2-4a91-a0f3-7106d5b54872","data_xml_lang":"la","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Elatio dicitur uebermuot, arrogantia - geuden vel gueften"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"e1856859-3f44-44bc-827e-3a2a5195869b","data_from":"0182v","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0182verso"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"a18f77f5-887c-45a3-9a0f-42a8313f1801","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"3f1cc72f-0e40-4b50-8e9f-245f12e14e0b","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Elatio dicitur uebermuot, arrogantia - geuden vel gueften"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"87067a65-e4f1-47b5-afcb-73511f3dbdaa","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0182verso"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"64fecda1-6105-45c2-b888-1c3467f8fa54","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"1bcb614b-f241-4ec9-954a-415042ff9447","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Vokabular"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"171b5d3f-d3e2-4ed5-8fd6-a858ec2a07f4","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"314c0bf7-3fb2-4f19-88e1-19993d0cceae","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"lat.-dt."}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term-locus","component":"","level":1,"id":"e7a6169f-956f-45f4-9f7d-c19285795d62","data_from":"0182v","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0182verso"}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"79ddb563-cfd0-4846-88c3-ec47b4b2b3d5","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"be7e6e1f-af0b-4eb8-9091-166a47421945","data_xml_lang":"la","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Araxanus - habr; franeus - iessen"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"9a3a7ed4-2f15-451b-9b0d-fffca82c1987","data_from":"0183v","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0183verso"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"734f54ae-b504-4737-8c6e-02a52fc18350","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"d56b564f-73e8-4a72-8a33-a762c6674c91","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Araxanus - habr; franeus - iessen"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"c2f2b99c-7fd6-4fda-a62a-e81f7cb9be97","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0183verso"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"782756ab-2d79-4707-826f-3e678a1614cc","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"843ed8e8-de7f-464b-8b40-3864dcf28c72","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Vokabular"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"7ca70f08-ab31-4414-a278-2fcc9cb79d6d","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"6a4c2729-789c-4c8b-bbe4-4db3afef8071","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"lat.-dt.-tschech."}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term-locus","component":"","level":1,"id":"6d523715-9a0f-479f-9b46-d88069134139","data_from":"0183v","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0183verso"}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"f5aa2eaf-f6b9-44c6-b470-31df04a979d8","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"b73a7d17-80e4-4894-b7a6-430252b28e6c","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Der heilig vater sant Bernhard ist geleichet dreien achpern fuersten von der alten e.\\n              Der erste ist Moyses"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"0ece3bae-4fb6-453e-ab13-913b250c4bdb","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0204recto"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"ae13722b-8863-4126-9faa-7c61d6272fcd","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"090bc150-32cf-4713-85ea-150e5b49cf03","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Bernardus Claraevallensis"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"8558020c-efd4-4dd7-bc98-70f3ff3a6c4c","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"85dd2bac-9177-42d2-91f4-bfd0518f6cf9","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Vergleiche zu seiner Person"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term-locus","component":"","level":1,"id":"c70dca7b-b05e-4638-9d8b-fe771b94ce09","data_from":"0204r","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0204recto"}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"50f0eb40-f8be-4ec0-9f7c-280bcca12dfb","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"e7e8e18a-3480-44b3-95cd-79ba9184c5b1","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Maria, Hl. Jungfrau"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"20fc2069-66a9-436e-89ff-f496d8a696da","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"3531544c-6718-485e-83a3-1427b94960e5","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Marienfeste"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index","component":"","level":1,"id":"8c370df7-efc2-4e4b-a2f0-c3fce0cef222","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index-term","component":"","level":1,"id":"f82c3994-c7db-49c1-afa2-75a18612e361","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Himmelfahrt, Predigt (lat.) und Auslegung (dt.)"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index-term-locus","component":"","level":1,"id":"e416176e-32e9-48d2-9b16-3d5e550a4d1b","data_from":"0221v","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0221verso"}]}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"ed4ee8c7-4c77-426a-9371-391e59e70588","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"bc3d3822-1cc3-46e5-85dc-0be6f3a9e41d","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Dise hohczeit unser vrawen hat drey merkleich namen: Des ersten ist si genant der tage\\n              des slaffes, darumme das gottes muoter an disem tage di valsche werlt ueberwunde hat"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"61fbb62c-d6ed-4cb6-8d30-42165a3fc620","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0222verso"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"c1622a95-5169-41ac-a3a4-09c777d34dc0","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"2c0c87fb-d698-4d36-960e-7c1070285c14","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Dise predig mant uns, das wir den heyligen gaist enphahen schuellen in fierlay weise:\\n              Des ersten mit des cristenleichen frides gemaynunge"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"bcc0c923-5586-48aa-ba10-5b4fb27585f6","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0225recto"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"b228c96e-fb17-4863-bcb7-9ef665bf4cf9","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"c86f113a-a44a-4201-a72d-ca4b34e3b05a","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Petrus und Paulus, Hll."}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"09cc51ae-dc75-4ae8-9f05-25bb7cdf8d78","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"7a6b3972-848d-4320-9a22-450ee336ccba","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Predigt (lat.) und Auslegung (dt.)"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term-locus","component":"","level":1,"id":"99412bc9-0f75-43f4-b74c-0116d1d95243","data_from":"0225v","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0225verso"}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"fac23f85-49d5-4294-8966-6b7decaaf308","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"851a7c69-a036-490b-bdbf-5138e661ae1c","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Sant Peter und send Paul seint mit ainadern [!] gewonet als tzwen bruder an siben\\n              sachen. Des ersten an der cristenhait stiftunge"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"3057eaeb-346e-46a6-b100-e67b5b885b63","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0227verso"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"f9bc33fb-256e-486e-80ab-eb2f419917b3","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"81114153-82d7-410a-97fd-91db01ca5c28","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Margarethe von Antiochien, Hl."}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"b7052d0f-2345-4a48-9273-b821c7dcb394","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"2985147b-0f76-4807-8d77-98616e49f44b","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Predigt (lat.) und Auslegung (dt.)"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term-locus","component":"","level":1,"id":"46fe075f-5e2a-4878-9c16-6ec81da872bc","data_from":"0229v","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0229verso"}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"9d24d6a6-a248-4a39-ba54-9df1020745d7","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"0de80d3a-3e9e-4e36-966a-a43102cb4036","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"An der gaistleichen freude sein sechs hande pilde, dar an sich sant Margareth gefreut\\n              hat und uns das pilde der freuden gelassen hat"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"1d5f9424-c976-4bcf-a026-defdddb45734","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0231recto"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"3000840e-4a98-4101-acfa-75406fced664","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"c0bf82de-ca1f-4b3b-ba6d-e57b3bd8bbc8","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Der gotes suon ist in dise werlt quomen in ierlay weise: Sein erste chuonfte ist\\n              wunderleich, di leit an unser menschait vorainunge"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"66d2394f-207f-4eb9-9c9b-a41dd2c06567","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0231recto"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"6441b798-0a44-4268-a5dd-d23a9f6e671a","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"32ac51fa-2860-4bea-911e-e2a698e880b4","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Der grosße heilige prophete David spricht yn dem ersten psalme nach hundertin des\\n              salters"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"c00f5e80-84e0-4d68-9b23-54b7594d8da3","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0231recto"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"83f2b4ac-4c3d-4702-b7a0-719548aa21e5","data_indexName":"nasa","data_facs":"#HSK0516_b069_obj-90682838-T","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"73056e2a-1350-45d9-bd20-aabd24b40151","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Maria, Hl. Jungfrau"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index","component":"","level":1,"id":"ac472d19-f065-4d40-ae66-7ffc18711b7f","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-term","component":"","level":1,"id":"93068085-f310-4458-af6a-8dfc7b962db4","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Marienfeste"}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index","component":"","level":1,"id":"049b732f-f9e9-455b-8983-08caca05ba92","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index-term","component":"","level":1,"id":"04df68fb-fc63-4603-8a8b-84dec0f2adc0","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Verkündigung, Auslegung einer Predigt"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-index-index-term-locus","component":"","level":1,"id":"13ff974d-7909-4bc5-93d2-e0b7d58e972c","data_from":"0231r","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0231recto"}]}]}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"79334f04-4fe1-4bf0-a1b7-8f26b16f0f9c","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"8de4b9c9-3f86-4df4-8577-3c33e8456b1b","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"An disen worten seint czuo merken czway ding: Das ain ist der menschleichen crankhait\\n              derchennunge, das ander der gotleichen barmhertichait gemainunge"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"2fe46b55-2afd-4d86-841e-f8179d5a5e5c","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0232recto"}]}]}]}]},{"data_origin":"index","region":"head","path":"#document-TEI-text-body-msDesc-head-index","component":"","level":1,"id":"14b8fc30-ce4a-4593-be2f-1e42e4b9346a","data_indexName":"initien","children":[{"data_origin":"term","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term","component":"","level":1,"id":"06fffc1f-1432-49c0-bb49-00bbd09fc0bc","data_xml_lang":"de","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"Unser hailant der gotes suon sicczet auf sechs stuelen uns czuo trost und czuo ainer\\n              fuerderunge. Des ersten siczzet er als ein mayster"}]},{"data_origin":"locus","region":"head","path":"#document-TEI-text-body-msDesc-head-index-term-locus","component":"","level":1,"id":"9553fcb0-6554-48e8-9d08-d5031a05328c","children":[{"data_origin":"textelement","region":"head","children":[{"region":"head","text":"0234recto"}]}]}]}]}],"istop":false},{"data_origin":"additional","copied":false,"id":"26f27f8b-7c1e-401e-b059-943591c09c5e","path":"#document-TEI-text-body-msDesc-additional","level":1,"children":[{"data_origin":"listBibl","region":"listBibl","component":"listBibl","copied":false,"children":[{"data_origin":"bibl","region":"listBibl","children":[{"text":"__LITERATUR__","region":"listBibl","id":"76a4a3d6-bee3-4416-80d5-aa43477eb6d0","path":"#document-TEI-text-body-msDesc-additional-listBibl-bibl-undefined","level":1}],"id":"e20c8a44-2b83-4c6d-904d-523dc3452273","path":"#document-TEI-text-body-msDesc-additional-listBibl-bibl","level":1}],"id":"e69212d5-b550-4228-9df6-4c3c5c69d4bc","path":"#document-TEI-text-body-msDesc-additional-listBibl","level":1,"istop":false}]}]}]}]}]}]')
    })
  })

  it('Insert Slate Node', async () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [
      {
        data_origin: 'TEI',
        region: 'TEI',
        path: '#document-TEI',
        component: '',
        level: 0,
        id: '477c4d29-c456-44f4-b55b-772ad7cb5e04',
        data_xmlns: 'http://www.tei-c.org/ns/1.0',
        data_xml_id: 'file_someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss',
        data_xml_lang: 'de',
        children: [
          {
            data_origin: 'teiHeader',
            region: 'TEI',
            path: '#document-TEI-teiHeader',
            component: '',
            level: 0,
            id: '5f0ed499-1650-4310-9aa1-61bf7431413f',
            children: [
              {
                data_origin: 'fileDesc',
                region: 'TEI',
                path: '#document-TEI-teiHeader-fileDesc',
                component: '',
                level: 0,
                id: 'ec2d4b54-582a-4cee-bd73-35bd61ac75cd',
                children: [
                  {
                    data_origin: 'titleStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-titleStmt',
                    component: '',
                    level: 0,
                    id: '6769e89d-5838-49f5-aa53-fdc2b1cea69c',
                    children: [
                      {
                        data_origin: 'title',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-titleStmt-title',
                        component: '',
                        level: 0,
                        id: '46591592-95a8-4739-bc75-555550f0c865',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: '(Leipzig, Universitätsbibliothek Leipzig, Ms 758)'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'editionStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-editionStmt',
                    component: '',
                    level: 0,
                    id: '02421b1b-b229-4aaf-bcf1-de00afbedf2f',
                    children: [
                      {
                        data_origin: 'edition',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-editionStmt-edition',
                        component: '',
                        level: 0,
                        id: '0e97067d-e414-4c03-a88a-00800221fb8e',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: 'Elektronische Ausgabe nach TEI P5'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'respStmt',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt',
                        component: '',
                        level: 0,
                        id: '0711b690-4258-40e3-8cbc-6829e7e6733b',
                        children: [
                          {
                            data_origin: 'resp',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-resp',
                            component: '',
                            level: 0,
                            id: '9cf7fe04-2734-407a-a9a4-f5bf9f2af711',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'TEI',
                                children: [
                                  {
                                    region: 'TEI',
                                    text: 'Diese Datei wurde automatisch erzeugt, unter Verwendung der MXML-to-TEI-P5-Stylesheets, die an der\n            Herzog August Bibliothek Wolfenbüttel im Rahmen des Projektes "Handschriftenportal" gepflegt\n            werden.2021-07-01'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'name',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-name',
                            component: '',
                            level: 0,
                            id: '6f6a95b0-d27a-4b13-ba24-1fb0e991a7c1',
                            data_type: 'person',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          },
                          {
                            data_origin: 'name',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-name',
                            component: '',
                            level: 0,
                            id: 'ccf9ba70-0a75-4700-9b7d-d1158686c022',
                            data_type: 'org',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'publicationStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-publicationStmt',
                    component: '',
                    level: 0,
                    id: 'fa4448d5-fde9-47dc-8eb0-e76c00452403',
                    children: [
                      {
                        data_origin: 'publisher',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-publisher',
                        component: '',
                        level: 0,
                        id: 'a8ce5f40-b280-4d81-827d-fbebad0630a0',
                        children: [
                          {
                            data_origin: 'name',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-publicationStmt-publisher-name',
                            component: '',
                            level: 0,
                            id: '256abf1c-eca9-4fbc-aecc-383214c3e3bd',
                            data_type: 'org',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          },
                          {
                            data_origin: 'ptr',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-publicationStmt-publisher-ptr',
                            component: '',
                            level: 0,
                            id: 'e76f207e-977e-4201-8c11-dc501141e87c',
                            data_target: 'http://some.url',
                            children: [
                              {
                                text: ''
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'date',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-date',
                        component: '',
                        level: 0,
                        id: 'c8381b8e-af77-473b-9f1a-79a8405fd990',
                        data_when: '2021-07-01',
                        data_type: 'published',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: '2021-07-01'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'date',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-date',
                        component: '',
                        level: 0,
                        id: 'aa63068a-cb94-45ae-9e0a-2d2eef98fd15',
                        data_when: '2009-10-14',
                        data_type: 'issued',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: '2009-10-14'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        data_origin: 'availability',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability',
                        component: '',
                        level: 0,
                        id: '9e5b2589-f354-457c-a8b9-ab0feb945b96',
                        data_status: 'restricted',
                        children: [
                          {
                            data_origin: 'licence',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence',
                            component: '',
                            level: 0,
                            id: '28d6b735-1443-4db8-ac30-9545eee6639a',
                            data_target: 'http://some.url',
                            children: [
                              {
                                data_origin: 'p',
                                region: 'TEI',
                                path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p',
                                component: '',
                                level: 0,
                                id: 'b903dd7b-9407-4b43-867f-d1a83ecc039f',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'TEI',
                                    children: [
                                      {
                                        region: 'TEI',
                                        text: '('
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'ref',
                                    region: 'TEI',
                                    path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p-ref',
                                    component: '',
                                    level: 0,
                                    id: '6c226dfe-8417-4f3f-b7d2-af0e865cf936',
                                    data_target: 'http://some.url',
                                    children: [
                                      {
                                        data_origin: 'textelement',
                                        region: 'TEI',
                                        children: [
                                          {
                                            region: 'TEI',
                                            text: 'copyright information'
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    data_origin: 'textelement',
                                    region: 'TEI',
                                    children: [
                                      {
                                        region: 'TEI',
                                        text: ')'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'sourceDesc',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-sourceDesc',
                    component: '',
                    level: 0,
                    id: 'a7ad5b16-e0ff-4cad-bffb-a3c03e95b828',
                    children: [
                      {
                        data_origin: 'p',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-sourceDesc-p',
                        component: '',
                        level: 0,
                        id: '184a47e6-109e-421d-b918-0d6b7080faea',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'TEI',
                            children: [
                              {
                                region: 'TEI',
                                text: 'Automatisch generierte Beschreibung aus einem HiDA-4 Dokument.'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            data_origin: 'facsimile',
            region: 'TEI',
            path: '#document-TEI-facsimile',
            component: '',
            level: 0,
            id: 'ab1cf55f-7a78-4c32-9cd5-e44e1b059694',
            children: [
              {
                data_origin: 'graphic',
                region: 'TEI',
                path: '#document-TEI-facsimile-graphic',
                component: '',
                level: 0,
                id: '2363fe12-165b-4ec4-b329-18e55bcef0e7',
                data_xml_id: 'HSK0516_b069_obj-90682838-T',
                data_url: 'http://bilder.manuscripta-mediaevalia.de/hs/katalogseiten/HSK0516_b069_jpg.htm',
                children: [
                  {
                    text: ''
                  }
                ]
              }
            ]
          },
          {
            data_origin: 'text',
            region: 'TEI',
            path: '#document-TEI-text',
            component: '',
            level: 0,
            id: '000f6981-e733-4bee-aafc-abfaa33b964d',
            children: [
              {
                data_origin: 'body',
                region: 'TEI',
                path: '#document-TEI-text-body',
                component: '',
                level: 0,
                id: '5b3fe692-a409-416a-b942-1efe1999cdeb',
                children: [
                  {
                    data_origin: 'msDesc',
                    region: 'TEI',
                    path: '#document-TEI-text-body-msDesc',
                    component: '',
                    level: 1,
                    id: '08c489c6-bb51-405b-a3cf-780d2c11c7d4',
                    data_status: 'intern',
                    data_xml_id: 'HSP-99ca4765-7b18-38f9-b3ff-220d32cc55ae',
                    data_xml_lang: 'de',
                    data_subtype: 'medieval',
                    data_type: 'hsp:description',
                    children: [
                      {
                        data_origin: 'msIdentifier',
                        region: 'msIdentifier',
                        path: '#document-TEI-text-body-msDesc-msIdentifier',
                        component: 'msIdentifier',
                        level: 1,
                        id: 'b74397cf-7732-49bb-ad96-e11735f8c7aa',
                        children: [
                          {
                            data_origin: 'settlement',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
                            component: '',
                            level: 1,
                            id: 'b0d82a1a-fb95-42e0-b3c6-8488e22fd202',
                            data_key: '4a887b8a-68ac-39b0-8d9d-027bddedb06b',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Leipzig'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'repository',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
                            component: '',
                            level: 1,
                            id: '606001b8-e70e-4891-b7ba-586ec006e965',
                            data_key: '016bc785-54a5-3c23-a276-7162a959306e',
                            data_ref: 'http://d-nb.info/gnd/30026-3 https://sigel.staatsbibliothek-berlin.de/suche/?isil=DE-15',
                            data_rend: 'UB',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Universitätsbibliothek Leipzig'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'collection',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-collection',
                            component: '',
                            level: 1,
                            id: '782b5149-1278-48f8-bc58-70eafd7c7dcc',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Ms Konrasd asdas'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'collection',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-collection',
                            component: '',
                            level: 1,
                            id: '0d245945-1c66-4602-b252-acf7fcfc1e09',
                            data_type: 'baseShelfmarkGroup',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Ms 0022-0961 Sammlung'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'idno',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
                            component: '',
                            level: 1,
                            id: '4416fbdf-dd6f-4a5d-b9be-d71641aad594',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Cod. 758'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'altIdentifier',
                            region: 'altIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
                            component: '',
                            level: 1,
                            id: 'c273bcf1-ae03-4ee0-b48b-622984c81d6e',
                            data_type: 'catalog',
                            children: [
                              {
                                data_origin: 'idno',
                                region: 'altIdentifier',
                                path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
                                component: '',
                                level: 1,
                                id: '38281b53-5ddb-46f5-a083-69c85d0452a1',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'altIdentifier',
                                    children: [
                                      {
                                        region: 'altIdentifier',
                                        text: 'someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        istop: false
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
    const dispatch = jest.fn()

    const store = ConfigureStore
    const callback = jest.fn(() => {
    })

    store.dispatch(writeDocument(true))
    store.dispatch(updateSlate(slateValue))

    render(
        <TestContext>
          <Slate value={slateValue} onChange={(document: any) => {
            store.dispatch(updateSlate(document))
          }}
                 editor={editor}><span></span></Slate>
        </TestContext>)

    insertSlateNode({
      'data_origin':
          'history',
      'region':
          'history',
      'component':
          'history',
      'copied':
          false
    }, [
      {
        'data_origin': 'p',
        'region': 'history',
        'children': [
          {
            'text': '__GESCHICHTE__',
            'region': 'history'
          }
        ]
      }
    ], [
      0,
      2,
      0,
      0,
      0
    ], editor, callback, dispatch, 'ID')

    await waitFor(() => {
      expect(JSON.stringify(store.getState().erfassung.slateValue)).toEqual('[{"data_origin":"TEI","region":"TEI","path":"#document-TEI","component":"","level":0,"id":"477c4d29-c456-44f4-b55b-772ad7cb5e04","data_xmlns":"http://www.tei-c.org/ns/1.0","data_xml_id":"file_someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss","data_xml_lang":"de","children":[{"data_origin":"teiHeader","region":"TEI","path":"#document-TEI-teiHeader","component":"","level":0,"id":"5f0ed499-1650-4310-9aa1-61bf7431413f","children":[{"data_origin":"fileDesc","region":"TEI","path":"#document-TEI-teiHeader-fileDesc","component":"","level":0,"id":"ec2d4b54-582a-4cee-bd73-35bd61ac75cd","children":[{"data_origin":"titleStmt","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-titleStmt","component":"","level":0,"id":"6769e89d-5838-49f5-aa53-fdc2b1cea69c","children":[{"data_origin":"title","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-titleStmt-title","component":"","level":0,"id":"46591592-95a8-4739-bc75-555550f0c865","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"(Leipzig, Universitätsbibliothek Leipzig, Ms 758)"}]}]}]},{"data_origin":"editionStmt","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt","component":"","level":0,"id":"02421b1b-b229-4aaf-bcf1-de00afbedf2f","children":[{"data_origin":"edition","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt-edition","component":"","level":0,"id":"0e97067d-e414-4c03-a88a-00800221fb8e","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"Elektronische Ausgabe nach TEI P5"}]}]},{"data_origin":"respStmt","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt-respStmt","component":"","level":0,"id":"0711b690-4258-40e3-8cbc-6829e7e6733b","children":[{"data_origin":"resp","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-resp","component":"","level":0,"id":"9cf7fe04-2734-407a-a9a4-f5bf9f2af711","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"Diese Datei wurde automatisch erzeugt, unter Verwendung der MXML-to-TEI-P5-Stylesheets, die an der\\n            Herzog August Bibliothek Wolfenbüttel im Rahmen des Projektes \\"Handschriftenportal\\" gepflegt\\n            werden.2021-07-01"}]}]},{"data_origin":"name","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-name","component":"","level":0,"id":"6f6a95b0-d27a-4b13-ba24-1fb0e991a7c1","data_type":"person","children":[{"text":""}]},{"data_origin":"name","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-editionStmt-respStmt-name","component":"","level":0,"id":"ccf9ba70-0a75-4700-9b7d-d1158686c022","data_type":"org","children":[{"text":""}]}]}]},{"data_origin":"publicationStmt","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt","component":"","level":0,"id":"fa4448d5-fde9-47dc-8eb0-e76c00452403","children":[{"data_origin":"publisher","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-publisher","component":"","level":0,"id":"a8ce5f40-b280-4d81-827d-fbebad0630a0","children":[{"data_origin":"name","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-publisher-name","component":"","level":0,"id":"256abf1c-eca9-4fbc-aecc-383214c3e3bd","data_type":"org","children":[{"text":""}]},{"data_origin":"ptr","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-publisher-ptr","component":"","level":0,"id":"e76f207e-977e-4201-8c11-dc501141e87c","data_target":"http://some.url","children":[{"text":""}]}]},{"data_origin":"date","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-date","component":"","level":0,"id":"c8381b8e-af77-473b-9f1a-79a8405fd990","data_when":"2021-07-01","data_type":"published","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"2021-07-01"}]}]},{"data_origin":"date","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-date","component":"","level":0,"id":"aa63068a-cb94-45ae-9e0a-2d2eef98fd15","data_when":"2009-10-14","data_type":"issued","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"2009-10-14"}]}]},{"data_origin":"availability","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-availability","component":"","level":0,"id":"9e5b2589-f354-457c-a8b9-ab0feb945b96","data_status":"restricted","children":[{"data_origin":"licence","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence","component":"","level":0,"id":"28d6b735-1443-4db8-ac30-9545eee6639a","data_target":"http://some.url","children":[{"data_origin":"p","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p","component":"","level":0,"id":"b903dd7b-9407-4b43-867f-d1a83ecc039f","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"("}]},{"data_origin":"ref","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p-ref","component":"","level":0,"id":"6c226dfe-8417-4f3f-b7d2-af0e865cf936","data_target":"http://some.url","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"copyright information"}]}]},{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":")"}]}]}]}]}]},{"data_origin":"sourceDesc","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-sourceDesc","component":"","level":0,"id":"a7ad5b16-e0ff-4cad-bffb-a3c03e95b828","children":[{"data_origin":"p","region":"TEI","path":"#document-TEI-teiHeader-fileDesc-sourceDesc-p","component":"","level":0,"id":"184a47e6-109e-421d-b918-0d6b7080faea","children":[{"data_origin":"textelement","region":"TEI","children":[{"region":"TEI","text":"Automatisch generierte Beschreibung aus einem HiDA-4 Dokument."}]}]}]}]}]},{"data_origin":"facsimile","region":"TEI","path":"#document-TEI-facsimile","component":"","level":0,"id":"ab1cf55f-7a78-4c32-9cd5-e44e1b059694","children":[{"data_origin":"graphic","region":"TEI","path":"#document-TEI-facsimile-graphic","component":"","level":0,"id":"2363fe12-165b-4ec4-b329-18e55bcef0e7","data_xml_id":"HSK0516_b069_obj-90682838-T","data_url":"http://bilder.manuscripta-mediaevalia.de/hs/katalogseiten/HSK0516_b069_jpg.htm","children":[{"text":""}]}]},{"data_origin":"text","region":"TEI","path":"#document-TEI-text","component":"","level":0,"id":"000f6981-e733-4bee-aafc-abfaa33b964d","children":[{"data_origin":"body","region":"TEI","path":"#document-TEI-text-body","component":"","level":0,"id":"5b3fe692-a409-416a-b942-1efe1999cdeb","children":[{"data_origin":"msDesc","region":"TEI","path":"#document-TEI-text-body-msDesc","component":"","level":1,"id":"08c489c6-bb51-405b-a3cf-780d2c11c7d4","data_status":"intern","data_xml_id":"HSP-99ca4765-7b18-38f9-b3ff-220d32cc55ae","data_xml_lang":"de","data_subtype":"medieval","data_type":"hsp:description","children":[{"data_origin":"history","region":"history","component":"history","copied":false,"children":[{"data_origin":"p","region":"history","children":[{"text":"__GESCHICHTE__","region":"history"}]}]},{"data_origin":"msIdentifier","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier","component":"msIdentifier","level":1,"id":"b74397cf-7732-49bb-ad96-e11735f8c7aa","children":[{"data_origin":"settlement","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-settlement","component":"","level":1,"id":"b0d82a1a-fb95-42e0-b3c6-8488e22fd202","data_key":"4a887b8a-68ac-39b0-8d9d-027bddedb06b","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"Leipzig"}]}]},{"data_origin":"repository","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-repository","component":"","level":1,"id":"606001b8-e70e-4891-b7ba-586ec006e965","data_key":"016bc785-54a5-3c23-a276-7162a959306e","data_ref":"http://d-nb.info/gnd/30026-3 https://sigel.staatsbibliothek-berlin.de/suche/?isil=DE-15","data_rend":"UB","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"Universitätsbibliothek Leipzig"}]}]},{"data_origin":"collection","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-collection","component":"","level":1,"id":"782b5149-1278-48f8-bc58-70eafd7c7dcc","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"Ms Konrasd asdas"}]}]},{"data_origin":"collection","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-collection","component":"","level":1,"id":"0d245945-1c66-4602-b252-acf7fcfc1e09","data_type":"baseShelfmarkGroup","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"Ms 0022-0961 Sammlung"}]}]},{"data_origin":"idno","region":"msIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-idno","component":"","level":1,"id":"4416fbdf-dd6f-4a5d-b9be-d71641aad594","children":[{"data_origin":"textelement","region":"msIdentifier","children":[{"region":"msIdentifier","text":"Cod. 758"}]}]},{"data_origin":"altIdentifier","region":"altIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-altIdentifier","component":"","level":1,"id":"c273bcf1-ae03-4ee0-b48b-622984c81d6e","data_type":"catalog","children":[{"data_origin":"idno","region":"altIdentifier","path":"#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno","component":"","level":1,"id":"38281b53-5ddb-46f5-a083-69c85d0452a1","children":[{"data_origin":"textelement","region":"altIdentifier","children":[{"region":"altIdentifier","text":"someBib_obj-90682838-T_tei-msDesc_L_UB_Kat_Dt_Hss"}]}]}]}],"istop":false}]}]}]}]}]')
    })
  })

  it('Find Node With Beschreibung', () => {
    const slateValue = [
      {
        data_origin: 'TEI',
        region: 'TEI',
        path: '#document-TEI',
        component: '',
        level: 0,
        id: '44f3a951-3b8e-4944-b087-8ddaf5aea46a',
        data_xmlns: 'http://www.tei-c.org/ns/1.0',
        data_version: '5.0',
        data_xml_lang: 'de',
        children: [
          {
            data_origin: 'teiHeader',
            region: 'TEI',
            path: '#document-TEI-teiHeader',
            component: '',
            level: 0,
            id: '76637332-b3e6-4ca8-b2da-63ad3be07d17',
            children: [
              {
                data_origin: 'fileDesc',
                region: 'TEI',
                path: '#document-TEI-teiHeader-fileDesc',
                component: '',
                level: 0,
                id: '776ded16-0d33-4cef-8322-9adbb4bf1858',
                children: [
                  {
                    data_origin: 'titleStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-titleStmt',
                    component: '',
                    level: 0,
                    id: '86c530fa-f301-4925-8cd8-5739822ecb88',
                    children: [
                      {
                        data_origin: 'title',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-titleStmt-title',
                        component: '',
                        level: 0,
                        id: '89c449fa-981c-4c5d-ae64-9724f7c84c47',
                        children: [
                          {
                            text: ''
                          }
                        ]
                      },
                      {
                        data_origin: 'respStmt',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-titleStmt-respStmt',
                        component: '',
                        level: 0,
                        id: '8e6aeec9-4eef-4887-aa9c-81a310717472',
                        children: [
                          {
                            data_origin: 'resp',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-titleStmt-respStmt-resp',
                            component: '',
                            level: 0,
                            id: 'bc1afcbc-b2d1-42c3-8132-7db1e4f65dff',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'TEI',
                                children: [
                                  {
                                    region: 'TEI',
                                    text: 'katalogisiert durch'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'persName',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-titleStmt-respStmt-persName',
                            component: '',
                            level: 0,
                            id: 'a335b26d-bdd3-434f-8584-d39f4e0a704d',
                            data_role: 'author conservator',
                            data_key: '__UUID__',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'TEI',
                                children: [
                                  {
                                    region: 'TEI',
                                    text: 'Katrin Sturm'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'persName',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-titleStmt-respStmt-persName',
                            component: '',
                            level: 0,
                            id: '31a2e1d9-2712-4018-8a0d-3be2a1f104fb',
                            data_role: 'author',
                            data_key: '__UUID__',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'TEI',
                                children: [
                                  {
                                    region: 'TEI',
                                    text: 'Konstantin Görlitz'
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'publicationStmt',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-publicationStmt',
                    component: '',
                    level: 0,
                    id: 'f2873950-bde8-412e-96b3-16233856ef8e',
                    children: [
                      {
                        data_origin: 'publisher',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-publisher',
                        component: '',
                        level: 0,
                        id: '9b16effb-8d1d-4537-97f9-33f5a7f1b0a4',
                        children: [
                          {
                            text: ''
                          }
                        ]
                      },
                      {
                        data_origin: 'date',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-date',
                        component: '',
                        level: 0,
                        id: 'e202a641-78e8-40ea-a17e-cafe3c3b9a79',
                        data_when: '2020-01-01',
                        data_type: 'created',
                        children: [
                          {
                            text: ''
                          }
                        ]
                      },
                      {
                        data_origin: 'date',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-date',
                        component: '',
                        level: 0,
                        id: '0c53b9c6-a6fa-43e5-8b47-6c27c2efa5b5',
                        data_when: '2020-01-01',
                        data_type: 'modified',
                        children: [
                          {
                            text: ''
                          }
                        ]
                      },
                      {
                        data_origin: 'availability',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability',
                        component: '',
                        level: 0,
                        id: 'bd2786cf-eb7b-490e-bf7e-60166d2101d0',
                        data_status: 'restricted',
                        children: [
                          {
                            data_origin: 'licence',
                            region: 'TEI',
                            path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence',
                            component: '',
                            level: 0,
                            id: 'fa2338de-1dde-4737-8c54-3fef8b1d3720',
                            data_target: 'http://creativecommons.org/licenses/by-sa/3.0/de/',
                            children: [
                              {
                                data_origin: 'p',
                                region: 'TEI',
                                path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p',
                                component: '',
                                level: 0,
                                id: '18b68a0b-fe46-4fc8-9110-7f93fa1c37e6',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'TEI',
                                    children: [
                                      {
                                        region: 'TEI',
                                        text: 'Dieses\n              Dokument steht unter einer Creative Commons Namensnennung-Weitergabe\n              unter gleichen Bedingungen 3.0 Deutschland Lizenz (CC BY-SA).'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'p',
                                region: 'TEI',
                                path: '#document-TEI-teiHeader-fileDesc-publicationStmt-availability-licence-p',
                                component: '',
                                level: 0,
                                id: '0bd2963a-2152-4693-8f5d-6fca1c309c03',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'TEI',
                                    children: [
                                      {
                                        region: 'TEI',
                                        text: 'Für die Nutzung weiterer Daten wie Digitalisaten gelten gegebenenfalls\n              andere Lizenzen.'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'sourceDesc',
                    region: 'TEI',
                    path: '#document-TEI-teiHeader-fileDesc-sourceDesc',
                    component: '',
                    level: 0,
                    id: 'd37b6f56-ee96-4426-ad77-fc49bc80041e',
                    children: [
                      {
                        data_origin: 'p',
                        region: 'TEI',
                        path: '#document-TEI-teiHeader-fileDesc-sourceDesc-p',
                        component: '',
                        level: 0,
                        id: 'f04cbf60-9364-4728-8b6c-df0f01a4f27c',
                        children: [
                          {
                            text: ''
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            data_origin: 'text',
            region: 'TEI',
            path: '#document-TEI-text',
            component: '',
            level: 0,
            id: '76e42c17-28c8-4103-9f09-14fd9a15aec9',
            children: [
              {
                data_origin: 'body',
                region: 'TEI',
                path: '#document-TEI-text-body',
                component: '',
                level: 0,
                id: '6ef9276e-f07e-4803-a88b-45b642fbd222',
                children: [
                  {
                    data_origin: 'msDesc',
                    region: 'TEI',
                    path: '#document-TEI-text-body-msDesc',
                    component: '',
                    level: 1,
                    id: 'a8362fef-6e49-4932-841d-cc3c68973725',
                    data_xml_id: '___ID___',
                    data_xml_lang: '',
                    data_type: 'hsp:description',
                    data_subtype: 'medieval',
                    data_status: 'intern',
                    children: [
                      {
                        data_origin: 'msIdentifier',
                        region: 'msIdentifier',
                        path: '#document-TEI-text-body-msDesc-msIdentifier',
                        component: 'msIdentifier',
                        level: 1,
                        id: 'f0e5e20d-6e8c-4831-956b-a7a649b67cfc',
                        children: [
                          {
                            data_origin: 'settlement',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
                            component: '',
                            level: 1,
                            id: '45afe2fe-4bcf-4aab-a3f9-05a335b51db9',
                            data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Berlin'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'repository',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
                            component: '',
                            level: 1,
                            id: 'e8d0656a-b3a1-4cf6-8e50-f280010c74aa',
                            data_key: '6790851b-9519-3874-a9fd-0839d494a3c9',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'Staatsbibliothek zu\n            Berlin'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'idno',
                            region: 'msIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
                            component: '',
                            level: 1,
                            id: 'e003ce40-4504-49bc-9446-624b093f04b3',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'msIdentifier',
                                children: [
                                  {
                                    region: 'msIdentifier',
                                    text: 'dolor sit amet'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            data_origin: 'altIdentifier',
                            region: 'altIdentifier',
                            path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
                            component: '',
                            level: 1,
                            id: '8d80351c-ba72-46ce-a09a-ada344b36da1',
                            data_type: 'catalog',
                            children: [
                              {
                                data_origin: 'collection',
                                region: 'altIdentifier',
                                path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
                                component: '',
                                level: 1,
                                id: 'f8996ad7-d5a2-4ded-888c-dba6753ac1f2',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'altIdentifier',
                                    children: [
                                      {
                                        region: 'altIdentifier',
                                        text: 'dolor'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                data_origin: 'idno',
                                region: 'altIdentifier',
                                path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
                                component: '',
                                level: 1,
                                id: 'bed5fb07-1aa3-4805-abac-7df40626cc34',
                                children: [
                                  {
                                    data_origin: 'textelement',
                                    region: 'altIdentifier',
                                    children: [
                                      {
                                        region: 'altIdentifier',
                                        text: 'amet'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        istop: true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
    const editor = withReact(createEditor() as ReactEditor)

    const store = ConfigureStore

    store.dispatch(writeDocument(true))

    render(
        <TestContext>
          <Slate value={slateValue} onChange={() => {
          }}
                 editor={editor}><span></span></Slate>
        </TestContext>)

    const node = findSlateNodeWithBeschreibung({ path: [0, 1, 0, 0, 0] }, editor)

    expect(node).toBeDefined()
  })

  it('Is Node in Component', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [
      {
        data_origin: 'msPart',
        region: 'msPart',
        component: 'msPartother',
        data_type: 'other',
        copied: false,
        id: '8a7ae897-fbbf-4012-8f2a-46724de73440',
        path: '#document-TEI-text-body-msDesc-msPart',
        level: 1,
        children: [
          {
            data_origin: 'msIdentifier',
            region: 'msIdentifier',
            component: 'msIdentifier',
            copied: false,
            children: [
              {
                data_origin: 'idno',
                region: 'msIdentifier',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'msIdentifier',
                    children: [
                      {
                        text: ' ',
                        region: 'msIdentifier',
                        id: 'a94be2e3-35f2-4ffa-85ed-b42eea8c250d',
                        path: '#document-TEI-text-body-msDesc-msPart-msIdentifier-idno-textelement-undefined',
                        level: 1
                      }
                    ],
                    id: 'cd08deff-2750-4b0c-a209-c94b3d72b809',
                    path: '#document-TEI-text-body-msDesc-msPart-msIdentifier-idno-textelement',
                    level: 1
                  }
                ],
                id: '6721aa28-1734-489c-b6a9-431be629c0c9',
                path: '#document-TEI-text-body-msDesc-msPart-msIdentifier-idno',
                level: 1
              }
            ],
            id: '747dd113-ee3d-45fc-8e7e-dd64b7960691',
            path: '#document-TEI-text-body-msDesc-msPart-msIdentifier',
            level: 1
          },
          {
            data_origin: 'p',
            region: 'msPart',
            copied: false,
            children: [
              {
                data_origin: 'textelement',
                region: 'msPart',
                children: [
                  {
                    text: ' ',
                    region: 'msPart',
                    id: '486d5c63-5c69-40e8-a0ca-d12107383a93',
                    path: '#document-TEI-text-body-msDesc-msPart-p-textelement-undefined',
                    level: 1
                  }
                ],
                id: 'c74422d7-24e5-429f-a4ac-788919bb5648',
                path: '#document-TEI-text-body-msDesc-msPart-p-textelement',
                level: 1
              }
            ],
            id: '380437fd-83a7-4c25-b98d-79bb61e69d3b',
            path: '#document-TEI-text-body-msDesc-msPart-p',
            level: 1
          }
        ]
      }
    ]

    const store = ConfigureStore
    store.dispatch(writeDocument(true))

    render(
        <TestContext>
          <Slate value={slateValue} onChange={() => {
          }}
                 editor={editor}><Editable></Editable></Slate>
        </TestContext>)

    const found = isNodeInComponent(editor, slateValue[0].children[0], TEI_ELEMENT_PART_OTHER)
    expect(found).toBeTruthy()

  })
})
