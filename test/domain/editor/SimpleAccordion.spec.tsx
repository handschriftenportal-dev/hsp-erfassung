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
import { render } from '@testing-library/react'
import { TestContext } from '../../TestContext'
import React from 'react'
import { SimpleAccordion } from '../../../src/domain/editor/SimpleAccordion'
import ConfigureStore from '../../../src/infrastructure/ConfigureReduxStore'

/**
 * Author: Christoph Marten on 25.03.2022 at 21:16
 */
describe('SimpleAccordion Test', () => {
  const editor = withReact(createEditor() as ReactEditor)

  const slateValue = [{
    type: 'paragraph',
    istop: false,
    children: [{ text: 'A line of text in a paragraph.' }],
  }]

  const element =
    {
      'data_origin': 'altIdentifier',
      'region': 'altIdentifier',
      'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
      'component': '',
      'level': 1,
      'id': '5276f915-5da8-450b-8235-b5618fa7c7b3',
      'data_type': 'corpus',
      'children': [
        {
          'data_origin': 'collection',
          'region': 'altIdentifier',
          'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
          'component': '',
          'level': 1,
          'id': '194fef8e-89af-420f-8456-43ac1f91caf5',
          'children': [
            {
              'data_origin': 'textelement',
              'region': 'altIdentifier',
              'children': [
                {
                  'region': 'altIdentifier',
                  'text': 'Sammlung XYZ'
                }
              ]
            }
          ]
        },
        {
          'data_origin': 'idno',
          'region': 'altIdentifier',
          'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
          'component': '',
          'level': 1,
          'id': 'b5b63b39-092b-425d-a8d5-7a8b0a4505bc',
          'children': [
            {
              'data_origin': 'textelement',
              'region': 'altIdentifier',
              'children': [
                {
                  'region': 'altIdentifier',
                  'text': '123'
                }
              ]
            }
          ]
        }
      ]
    }

  const msdescWithMsContents = {
    data_origin: 'msDesc',
    region: 'TEI',
    path: '#document-TEI-text-body-msDesc',
    component: '',
    level: 1,
    id: '3b5f1a4f-1491-4506-8dc5-9aed400c9348',
    data_xml_id: 'HSP-2881d3f9-b476-37e8-852d-b96fbf976451',
    data_xml_lang: 'de',
    data_type: 'hsp:description',
    data_subtype: 'medieval',
    data_status: 'intern',
    children: [
      {
        data_origin: 'msContents',
        region: 'msContents',
        path: '#document-TEI-text-body-msDesc-msContents',
        component: 'msContents',
        level: 2,
        id: 'd94cfc9d-f1cc-4194-affa-4cd60cffbf7f',
        children: [
          {
            data_origin: 'msItem',
            region: 'msItem',
            path: '#document-TEI-text-body-msDesc-msContents-msItem',
            component: 'msItem',
            level: 3,
            id: '9d912cf6-84a1-4139-b263-b6523e14c22d',
            children: [
              {
                data_origin: 'textLang',
                region: 'msItem',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-textLang',
                component: '',
                level: 3,
                id: '7ca3fd85-d372-4849-8a05-74fa80cc9b08',
                data_mainLang: 'de',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'msItem',
                    children: [
                      {
                        region: 'msItem',
                        text: 'Abschnittstext in Deutsch'
                      }
                    ]
                  }
                ]
              },
              {
                data_origin: 'note',
                region: 'notetext',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-note',
                component: 'notetext',
                level: 3,
                id: 'dcd731e5-9bb7-4069-b6a9-df6382492573',
                data_type: 'text',
                children: [
                  {
                    data_origin: 'locus',
                    region: 'notetext',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-note-locus',
                    component: '',
                    level: 3,
                    id: 'b9466eb7-a5c2-4e41-a4e5-09f323090f09',
                    data_from: '1r',
                    data_to: '12v',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notetext',
                        children: [
                          {
                            region: 'notetext',
                            text: '1r-12v'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'persName',
                    region: 'notetext',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-note-persName',
                    component: '',
                    level: 3,
                    id: '5f23b33a-8b3d-403a-825f-121f15bb5fb9',
                    data_role: 'author',
                    data_ref: 'http://d-nb.info/gnd/xxxxxxx',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notetext',
                        children: [
                          {
                            region: 'notetext',
                            text: 'Autor'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'title',
                    region: 'notetext',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-note-title',
                    component: '',
                    level: 3,
                    id: 'fab4d14e-20fd-44a5-ae0a-78210e6e0e2f',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notetext',
                        children: [
                          {
                            region: 'notetext',
                            text: 'Titel'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'quote',
                    region: 'notetext',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-note-quote',
                    component: '',
                    level: 3,
                    id: '29c9cc85-1751-4adb-8a06-110959f422ad',
                    data_type: 'incipit',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notetext',
                        children: [
                          {
                            region: 'notetext',
                            text: 'Lorem ipsum dolor sit amet'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'textelement',
                    region: 'notetext',
                    children: [
                      {
                        region: 'notetext',
                        text: ', consetetur\n              sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore'
                      }
                    ]
                  }
                ]
              },
              {
                data_origin: 'note',
                region: 'notemusic',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-note',
                component: 'notemusic',
                level: 3,
                id: 'ef04992b-690f-406c-b167-0015c5a37020',
                data_type: 'music',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'notemusic',
                    children: [
                      {
                        region: 'notemusic',
                        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,\n              sed diam nonumy eirmod tempor invidunt ut labore'
                      }
                    ]
                  }
                ]
              },
              {
                data_origin: 'decoNote',
                region: 'msItem',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-decoNote',
                component: 'decoNotecontent',
                level: 3,
                id: '3f0c4a5e-f7d9-43da-b9c0-d28f90418dff',
                data_type: 'content',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'msItem',
                    children: [
                      {
                        region: 'msItem',
                        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing\n              elitr, sed diam nonumy eirmod tempor invidunt ut labore'
                      }
                    ]
                  }
                ]
              },
              {
                data_origin: 'decoNote',
                region: 'msItem',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-decoNote',
                component: 'decoNoteform',
                level: 3,
                id: '835726d6-f61a-4316-990c-052995804ef0',
                data_type: 'form',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'msItem',
                    children: [
                      {
                        region: 'msItem',
                        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing\n              elitr, sed diam nonumy eirmod tempor invidunt ut labore'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            data_origin: 'msItem',
            region: 'msItem',
            path: '#document-TEI-text-body-msDesc-msContents-msItem',
            component: 'msItem',
            level: 3,
            id: '91166bf5-34a5-4651-bb8c-e97cde14eb2c',
            children: [
              {
                data_origin: 'note',
                region: 'notetext',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-note',
                component: 'notetext',
                level: 3,
                id: '0086f073-e222-4f1a-8b76-ea08980d1e92',
                data_type: 'text',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'notetext',
                    children: [
                      {
                        region: 'notetext',
                        text: 'et justo duo dolores et ea rebum. Stet clita kasd\n              gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet in'
                      }
                    ]
                  },
                  {
                    data_origin: 'placeName',
                    region: 'notetext',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-note-placeName',
                    component: '',
                    level: 3,
                    id: 'a32328d8-6791-4e91-b258-0f95a435f69d',
                    data_key: 'berlin',
                    data_ref: 'http://d-nb.info/gnd/4005728-8',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notetext',
                        children: [
                          {
                            region: 'notetext',
                            text: 'Berlin'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                data_origin: 'msItem',
                region: 'msItem',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-msItem',
                component: 'msItem',
                level: 4,
                id: 'baf88d0b-4230-4195-b66a-6ab251193e64',
                children: [
                  {
                    data_origin: 'note',
                    region: 'notetext',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-msItem-note',
                    component: 'notetext',
                    level: 4,
                    id: 'fd525fd4-a1db-479d-8814-85e1de255eb5',
                    data_type: 'text',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notetext',
                        children: [
                          {
                            region: 'notetext',
                            text: 'et justo duo dolores et ea rebum. Stet clita kasd\n                gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet in'
                          }
                        ]
                      },
                      {
                        data_origin: 'placeName',
                        region: 'notetext',
                        path: '#document-TEI-text-body-msDesc-msContents-msItem-msItem-note-placeName',
                        component: '',
                        level: 4,
                        id: 'd8ab964f-2dba-45d0-8ee5-933372a5633c',
                        data_key: 'berlin',
                        data_ref: 'http://d-nb.info/gnd/4005728-8',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'notetext',
                            children: [
                              {
                                region: 'notetext',
                                text: 'Berlin'
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
            data_origin: 'msItem',
            region: 'msItem',
            path: '#document-TEI-text-body-msDesc-msContents-msItem',
            component: 'msItem',
            level: 3,
            id: '9ad2bd41-d477-40ee-a407-d28b9616e38a',
            children: [
              {
                data_origin: 'note',
                region: 'notetext',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-note',
                component: 'notetext',
                level: 3,
                id: '821f1f0e-cf58-4ba8-bf04-f748db2017dc',
                data_type: 'text',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'notetext',
                    children: [
                      {
                        region: 'notetext',
                        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,\n              sed diam nonumy eirmod tempor invidunt ut labore'
                      }
                    ]
                  }
                ]
              },
              {
                data_origin: 'msItem',
                region: 'msItem',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-msItem',
                component: 'msItem',
                level: 4,
                id: 'e0158a10-d452-4634-b24d-cf3b8c2a5768',
                children: [
                  {
                    data_origin: 'note',
                    region: 'notetext',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-msItem-note',
                    component: 'notetext',
                    level: 4,
                    id: 'bdac5a6b-3c54-4750-9599-d6382d6696c1',
                    data_type: 'text',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notetext',
                        children: [
                          {
                            region: 'notetext',
                            text: 'et justo duo dolores et ea rebum. Stet clita kasd\n                gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet in'
                          }
                        ]
                      },
                      {
                        data_origin: 'placeName',
                        region: 'notetext',
                        path: '#document-TEI-text-body-msDesc-msContents-msItem-msItem-note-placeName',
                        component: '',
                        level: 4,
                        id: '137dc33b-2634-47f0-b234-a28b4b4438c5',
                        data_key: 'berlin',
                        data_ref: 'http://d-nb.info/gnd/4005728-8',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'notetext',
                            children: [
                              {
                                region: 'notetext',
                                text: 'Berlin'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'msItem',
                    region: 'msItem',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-msItem-msItem',
                    component: 'msItem',
                    level: 5,
                    id: '790b300a-f529-47d6-9442-b92db9653d80',
                    children: [
                      {
                        data_origin: 'note',
                        region: 'notetext',
                        path: '#document-TEI-text-body-msDesc-msContents-msItem-msItem-msItem-note',
                        component: 'notetext',
                        level: 5,
                        id: '31037bf5-efe7-415a-a777-e620950616d8',
                        data_type: 'text',
                        children: [
                          {
                            data_origin: 'textelement',
                            region: 'notetext',
                            children: [
                              {
                                region: 'notetext',
                                text: 'et justo duo dolores et ea rebum. Stet clita kasd\n                  gubergren, no sea takimata sanctus est Lorem ipsum dolor sit\n                  amet in'
                              }
                            ]
                          },
                          {
                            data_origin: 'placeName',
                            region: 'notetext',
                            path: '#document-TEI-text-body-msDesc-msContents-msItem-msItem-msItem-note-placeName',
                            component: '',
                            level: 5,
                            id: '982a3bae-309a-4703-9047-12f91892c03c',
                            data_key: 'berlin',
                            data_ref: 'http://d-nb.info/gnd/4005728-8',
                            children: [
                              {
                                data_origin: 'textelement',
                                region: 'notetext',
                                children: [
                                  {
                                    region: 'notetext',
                                    text: 'Berlin'
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
                data_origin: 'note',
                region: 'notemusic',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-note',
                component: 'notemusic',
                level: 3,
                id: '414459a6-25e9-493c-8da5-6a603a81c3b5',
                data_type: 'music',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'notemusic',
                    children: [
                      {
                        region: 'notemusic',
                        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,\n              sed diam nonumy eirmod tempor invidunt ut labore'
                      }
                    ]
                  }
                ]
              },
              {
                data_origin: 'decoNote',
                region: 'msItem',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-decoNote',
                component: 'decoNotecontent',
                level: 3,
                id: '31fe6819-52cf-4731-808b-9bef21562a6f',
                data_type: 'content',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'msItem',
                    children: [
                      {
                        region: 'msItem',
                        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing\n              elitr, sed diam nonumy eirmod tempor invidunt ut labore'
                      }
                    ]
                  }
                ]
              },
              {
                data_origin: 'decoNote',
                region: 'msItem',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-decoNote',
                component: 'decoNoteform',
                level: 3,
                id: '73b07a95-2694-4b30-8857-6f4bdafdbb86',
                data_type: 'form',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'msItem',
                    children: [
                      {
                        region: 'msItem',
                        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing\n              elitr, sed diam nonumy eirmod tempor invidunt ut labore'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            data_origin: 'msItem',
            region: 'msItem',
            path: '#document-TEI-text-body-msDesc-msContents-msItem',
            component: 'msItem',
            level: 3,
            id: '7464f3f9-bd0a-418d-aee0-260fbd76a426',
            children: [
              {
                data_origin: 'note',
                region: 'notemusic',
                path: '#document-TEI-text-body-msDesc-msContents-msItem-note',
                component: 'notemusic',
                level: 3,
                id: '37c97c8c-7dd2-4a27-92c1-bb49a4efe114',
                data_type: 'music',
                children: [
                  {
                    data_origin: 'textelement',
                    region: 'notemusic',
                    children: [
                      {
                        region: 'notemusic',
                        text: 'et dolore magna aliquyam erat, sed diam voluptua. At\n              vero eos et accusam et dolore magna aliquyam erat, für die'
                      }
                    ]
                  },
                  {
                    data_origin: 'orgName',
                    region: 'notemusic',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-note-orgName',
                    component: '',
                    level: 3,
                    id: '742fa533-b226-49ac-bd92-25f491c95540',
                    data_ref: 'http://d-nb.info/gnd/5036103-X',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notemusic',
                        children: [
                          {
                            region: 'notemusic',
                            text: 'Staatsbibliothek zu\n                Berlin'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'textelement',
                    region: 'notemusic',
                    children: [
                      {
                        region: 'notemusic',
                        text: 'oder der'
                      }
                    ]
                  },
                  {
                    data_origin: 'orgName',
                    region: 'notemusic',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-note-orgName',
                    component: '',
                    level: 3,
                    id: 'b6231924-200f-4c41-84e6-02c5e1966179',
                    data_key: '30002258',
                    data_role: 'commissionedBy',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notemusic',
                        children: [
                          {
                            region: 'notemusic',
                            text: 'Staatsbibliothek zu Berlin'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'textelement',
                    region: 'notemusic',
                    children: [
                      {
                        region: 'notemusic',
                        text: ',\n              vielleicht auch der'
                      }
                    ]
                  },
                  {
                    data_origin: 'orgName',
                    region: 'notemusic',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-note-orgName',
                    component: '',
                    level: 3,
                    id: '6e8d0e05-d7ad-4b48-8327-e5971b9b293a',
                    data_key: '30002258',
                    data_ref: 'http://d-nb.info/gnd/5036103-X',
                    data_role: 'author',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notemusic',
                        children: [
                          {
                            region: 'notemusic',
                            text: 'Staatsbibliothek\n                zu Berlin'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'textelement',
                    region: 'notemusic',
                    children: [
                      {
                        region: 'notemusic',
                        text: 'und der'
                      }
                    ]
                  },
                  {
                    data_origin: 'orgName',
                    region: 'notemusic',
                    path: '#document-TEI-text-body-msDesc-msContents-msItem-note-orgName',
                    component: '',
                    level: 3,
                    id: '8cce3632-2906-4510-ba4a-0bf4774d9a6b',
                    data_role: 'scribe mentionedIn',
                    children: [
                      {
                        data_origin: 'textelement',
                        region: 'notemusic',
                        children: [
                          {
                            region: 'notemusic',
                            text: 'Staatsbibliothek zu Berlin'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    data_origin: 'textelement',
                    region: 'notemusic',
                    children: [
                      {
                        region: 'notemusic',
                        text: 'sed diam voluptua. At vero eos\n              et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,\n              no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
    ]
  }

  const jsxHeader = <div>header</div>
  const jsxContent = <div>content</div>

  const slateValueMsdescWithMsContents = [msdescWithMsContents]

  it('SimpleAccordion', () => {
    render(<TestContext><Slate value={slateValue} onChange={() => {
    }} editor={editor}><SimpleAccordion node={element} summaryContent={jsxHeader} detailsContent={jsxContent}
                                              /></Slate></TestContext>)
    expect(document.body.innerHTML.includes('content')).toBeTruthy()
    expect(document.body.innerHTML.includes('header')).toBeTruthy()

  })

  it('AllSimpleAccordionsExpandedFalse', () => {

    const editor = withReact(createEditor() as ReactEditor)

    render(<TestContext><Slate value={slateValueMsdescWithMsContents} onChange={() => {
    }} editor={editor}>
      <SimpleAccordion node={msdescWithMsContents.children[0]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[0]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[0].children[0]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[1]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[1].children[0]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[2]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[2].children[0]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
    </Slate>
    </TestContext>)

    expect(document.body.innerHTML.includes('aria-expanded="false"')).toBeTruthy()
    expect(document.body.innerHTML.includes('header')).toBeTruthy()
  })

  it('AllSimpleAccordionsExpandedTrue', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const store = ConfigureStore

    store.dispatch({ type: 'erfassung/updateExpandSelectedAccordionWithNestedAccordions', payload: 'd94cfc9d-f1cc-4194-affa-4cd60cffbf7f' })

    render(<TestContext><Slate value={slateValueMsdescWithMsContents} onChange={() => {
    }} editor={editor}>
      <SimpleAccordion node={msdescWithMsContents.children[0]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[0]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[0].children[0]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[1]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[1].children[0]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[2]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
      <SimpleAccordion node={msdescWithMsContents.children[0].children[2].children[0]} summaryContent={jsxHeader} detailsContent={jsxContent}/>
    </Slate>
    </TestContext>)

    expect(document.body.innerHTML.includes('aria-expanded="false"')).toBeFalsy()
    expect(document.body.innerHTML.includes('header')).toBeTruthy()

  })

})
