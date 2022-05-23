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

import { HSPSlateNode } from '../../infrastructure/slate/SlateBoundary'
import i18next from 'i18next'

export const ErfassungsRules = {
  'medieval': {
    'msIdentifier': {
      'allowedNumbers': '1',
      'required': true,
      'selfContaining': false,
      'duplicate': false,
      'allowedComponents': [],
      'allowedIn': [
        'medieval',
        'msPartbinding',
        'msPartaccMat',
        'msPartbooklet',
        'msPartfragment',
      ],
      'allowedFollower': ['head', 'physDesc', 'history', 'msContents', 'msPartbinding', 'msPartfragment', 'msPartbooklet', 'msPartaccMat', 'msPartother', 'additional'],
      'allowedPredecessor': [],
      'defaultElement': {
        'data_origin': 'msIdentifier',
        'region': 'msIdentifier',
        'component': 'msIdentifier',
        'copied': false
      },
      'defaultChildren': [
        {
          'data_origin': 'idno',
          'region': 'msIdentifier',
          'children': [
            {
              'data_origin': 'textelement',
              'region': 'msIdentifier',
              'children': [
                {
                  'region': 'msIdentifier',
                  'text': ''
                }
              ]
            }
          ]
        },
        {
          'data_origin': 'settlement',
          'region': 'msIdentifier',
          'children': [
            {
              'data_origin': 'textelement',
              'region': 'msIdentifier',
              'children': [
                {
                  'region': 'msIdentifier',
                  'text': ''
                }
              ]
            }
          ]
        },
        {
          'data_origin': 'repository',
          'region': 'msIdentifier',
          'children': [
            {
              'data_origin': 'textelement',
              'region': 'msIdentifier',
              'children': [
                {
                  'region': 'msIdentifier',
                  'text': ''
                }
              ]
            }
          ]
        },
        {
          'data_origin': 'altIdentifier',
          'region': 'altIdentifiercorpus',
          'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          'component': '',
          'level': 1,
          'id': 'XXXX',
          'data_type': 'corpus',
          'children': [
            {
              'data_origin': 'collection',
              'region': 'altIdentifiercorpus',
              'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              'component': '',
              'level': 1,
              'id': 'XXXX',
              'children': [
                {
                  'data_origin': 'textelement',
                  'region': 'altIdentifiercorpus',
                  'children': [
                    {
                      'region': 'altIdentifiercorpus',
                      'text': ''
                    }
                  ]
                }
              ]
            },
            {
              'data_origin': 'idno',
              'region': 'altIdentifiercorpus',
              'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              'component': '',
              'level': 1,
              'id': 'XXXX',
              'children': [
                {
                  'data_origin': 'textelement',
                  'region': 'altIdentifiercorpus',
                  'children': [
                    {
                      'region': 'altIdentifiercorpus',
                      'text': ''
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          'data_origin': 'altIdentifier',
          'region': 'altIdentifierhsp-ID',
          'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          'component': '',
          'level': 1,
          'id': 'XXXX',
          'data_type': 'hsp-ID',
          'children': [
            {
              'data_origin': 'collection',
              'region': 'altIdentifierhsp-ID',
              'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              'component': '',
              'level': 1,
              'id': 'XXXX',
              'children': [
                {
                  'data_origin': 'textelement',
                  'region': 'altIdentifierhsp-ID',
                  'children': [
                    {
                      'region': 'altIdentifierhsp-ID',
                      'text': 'Handschriftenportal Kulturobjektdokument-ID'
                    }
                  ]
                }
              ]
            },
            {
              'data_origin': 'idno',
              'region': 'altIdentifierhsp-ID',
              'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              'component': '',
              'level': 1,
              'id': 'XXXX',
              'children': [
                {
                  'data_origin': 'textelement',
                  'region': 'altIdentifierhsp-ID',
                  'children': [
                    {
                      'region': 'altIdentifierhsp-ID',
                      'text': ''
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          'data_origin': 'altIdentifier',
          'region': 'altIdentifierformer',
          'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          'component': '',
          'level': 1,
          'id': 'XXXX',
          'data_type': 'former',
          'children': [
            {
              'data_origin': 'settlement',
              'region': 'altIdentifierformer',
              'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-settlement',
              'component': '',
              'level': 1,
              'id': 'XXXX',
              'data_key': '',
              'children': [
                {
                  'data_origin': 'textelement',
                  'region': 'altIdentifierformer',
                  'children': [
                    {
                      'region': 'altIdentifierformer',
                      'text': ''
                    }
                  ]
                }
              ]
            },
            {
              'data_origin': 'repository',
              'region': 'altIdentifierformer',
              'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-repository',
              'component': '',
              'level': 1,
              'id': 'XXXX',
              'data_key': '',
              'children': [
                {
                  'data_origin': 'textelement',
                  'region': 'altIdentifierformer',
                  'children': [
                    {
                      'region': 'altIdentifierformer',
                      'text': ''
                    }
                  ]
                }
              ]
            },
            {
              'data_origin': 'idno',
              'region': 'altIdentifierformer',
              'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              'component': '',
              'level': 1,
              'id': 'XXXX',
              'children': [
                {
                  'data_origin': 'textelement',
                  'region': 'altIdentifierformer',
                  'children': [
                    {
                      'region': 'altIdentifierformer',
                      'text': ''
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    'head': {
      'allowedNumbers': '1',
      'required': true,
      'selfContaining': false,
      'duplicate': false,
      'allowedComponents': [],
      'allowedIn':
          [
            'medieval',
            'msPartbinding',
            'msPartaccMat',
            'msPartbooklet',
            'msPartfragment'
          ],
      'allowedFollower': ['physDesc', 'msContents', 'history', 'msPartbinding', 'msPartfragment', 'msPartbooklet', 'msPartaccMat', 'msPartother', 'additional'],
      'allowedPredecessor': ['msIdentifier'],
      'defaultElement':
          {
            'data_origin': 'head',
            'region': 'head',
            'component': 'head',
            'copied':
                false
          },
      'defaultChildren':
          [{
            'data_origin': 'title',
            'region': 'head',
            'repeatable': false,
            'children': [
              {
                'data_origin': 'textelement',
                'region': 'head',
                'children': [{
                  'text': '',
                  'region': 'head'
                }]
              }
            ]
          },
          {
            'data_origin': 'note',
            'data_type': 'headline',
            'repeatable': false,
            'region': 'head',
            'children': [
              {
                'data_origin': 'textelement',
                'region': 'head',
                'children': [{
                  'text': '',
                  'region': 'head'
                }]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_title',
            'repeatable': false,
            'path': '#document-TEI-text-body-msDesc-head-index',
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'title',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_material',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'repeatable': false,
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'material',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'material_type',
                'path': '#document-TEI-text-body-msDesc-head-index',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'material_type',
                'path': '#document-TEI-text-body-msDesc-head-index',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_measure',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'repeatable': false,
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'measure',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'measure_noOfLeaves',
                'path': '#document-TEI-text-body-msDesc-head-index',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_dimensions',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'repeatable': true,
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'dimensions',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'height',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'width',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'depth',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'dimensions_typeOfInformation',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': 'factual',
                      'region': 'head'
                    }]
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'component': '',
            'level': 1,
            'data_indexName': 'norm_format',
            'repeatable': true,
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'component': '',
                'level': 1,
                'data_type': 'format',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [
                      {
                        'region': 'head',
                        'text': ''
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'component': '',
                'level': 1,
                'id': '4a2254d3-77b8-4242-8a97-dc5a8e2ecce5',
                'data_type': 'format_typeOfInformation',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [
                      {
                        'region': 'head',
                        'text': 'factual'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_origPlace',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'origPlace',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'origPlace_gnd-ID',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'origPlace_gnd-ID',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_origDate',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'origDate',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'origDate_notBefore',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'origDate_notAfter',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'origDate_type',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_textLang',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'textLang',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'textLang-ID',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_form',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'form',
                'children': [
                  {
                    'text': '',
                    'region': 'head'
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_status',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'status',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_decoration',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'decoration',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              }
            ]
          },
          {
            'data_origin': 'index',
            'region': 'head',
            'data_indexName': 'norm_musicNotation',
            'path': '#document-TEI-text-body-msDesc-head-index',
            'children': [
              {
                'data_origin': 'term',
                'region': 'head',
                'data_type': 'musicNotation',
                'path': '#document-TEI-text-body-msDesc-head-index-term',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              }
            ]
          }
          ]
    },
    'physDesc': {
      'allowedNumbers': '1',
      'required': false,
      'selfContaining': false,
      'duplicate': false,
      'allowedComponents':
          ['decoNoteform'],
      'allowedIn':
          [
            'medieval',
            'msPartbinding',
            'msPartaccMat',
            'msPartbooklet',
            'msPartfragment'
          ],
      'allowedFollower': ['msContents', 'history', 'msPartbinding', 'msPartfragment', 'msPartbooklet', 'msPartaccMat', 'msPartother', 'additional'],
      'allowedPredecessor': ['msIdentifier', 'head'],
      'defaultElement':
          {
            'data_origin': 'physDesc',
            'region': 'physDesc',
            'component': 'physDesc',
            'copied': false
          },
      'defaultChildren':
          [
            {
              'data_origin': 'p',
              'region': 'physDesc',
              'children': [
                {
                  'data_origin': 'textelement',
                  'text': '__ÄUßERES__',
                  'region': 'physDesc'
                }
              ]
            }
          ]
    },
    'decoNoteform':
        {
          'allowedNumbers': 'multi',
          'required': false,
          'selfContaining': false,
          'duplicate': false,
          'allowedComponents':
              [],
          'allowedIn':
              [
                'physDesc'
              ],
          'allowedFollower': ['decoNoteform'],
          'allowedPredecessor': ['decoNoteform'],
          'wrapperElement': {
            'data_origin': 'decoDesc',
            'region': 'decoNoteform',
            'copied': false,
            'relevantIn': ['physDesc']
          },
          'defaultElement':
              {
                'data_origin': 'decoNote',
                'region': 'decoNoteform',
                'component': 'decoNoteform',
                'data_type': 'form',
                'copied':
                    false
              },
          'defaultChildren':
              [
                {
                  'data_origin': 'textelement',
                  'region': 'decoNoteform',
                  'children': [
                    {
                      'text': ' ',
                      'region': 'decoNoteform'
                    }
                  ]
                }
              ]
        },
    'history':
        {
          'allowedNumbers': '1',
          'required': false,
          'selfContaining': false,
          'duplicate': false,
          'allowedComponents': [],
          'allowedIn':
              [
                'medieval',
                'msPartbinding',
                'msPartaccMat',
                'msPartbooklet',
                'msPartfragment'
              ],
          'allowedFollower': ['msPartbinding', 'msPartfragment', 'msPartbooklet', 'msPartaccMat', 'msPartother', 'additional'],
          'allowedPredecessor': ['msIdentifier', 'head', 'physDesc', 'msContents'],
          'defaultElement':
              {
                'data_origin':
                    'history',
                'region':
                    'history',
                'component':
                    'history',
                'copied':
                    false
              },
          'defaultChildren':
              [
                {
                  'data_origin': 'p',
                  'region': 'history',
                  'children': [
                    {
                      'text': ' ',
                      'region': 'history'
                    }
                  ]
                }
              ]
        },
    'msPartbinding':
        {
          'allowedNumbers': '1',
          'required': false,
          'selfContaining': true,
          'duplicate': false,
          'allowedComponents':
              [
                'msIdentifier',
                'head',
                'physDesc',
                'msContents',
                'history',
                'msPartother',
                'additional'
              ],
          'allowedIn':
              [
                'medieval',
                'msPartfragment',
                'msPartaccMat'
              ],
          'allowedFollower': ['msPartbinding', 'msPartfragment', 'msPartbooklet', 'msPartaccMat', 'msPartother'],
          'allowedPredecessor': ['msIdentifier', 'head', 'physDesc', 'msContents', 'history', 'notetext', 'decoNotecontent', 'notemusic', 'additional'],
          'defaultElement':
              {
                'data_origin': 'msPart',
                'region': 'msPart',
                'component': 'msPartbinding',
                'data_type': 'binding',
                'copied':
                    false,
              },
          'defaultChildren': [
            {
              'data_origin': 'msIdentifier',
              'region': 'msIdentifier',
              'component': 'msIdentifier',
              'copied': false,
              'children': [{
                'data_origin': 'idno',
                'region': 'msIdentifier',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'msIdentifier',
                    'children': [
                      {
                        'region': 'msIdentifier',
                        'text': ''
                      }
                    ]
                  }
                ]
              }]
            },
            {
              'data_origin': 'head',
              'region': 'head',
              'component': 'head',
              'copied': false,
              'children': [{
                'data_origin': 'title',
                'region': 'head',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'note',
                'data_type': 'headline',
                'region': 'head',
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'head',
                    'children': [{
                      'text': '',
                      'region': 'head'
                    }]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_title',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'title',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_material',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'material',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'material_type',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'material_type',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_measure',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'measure',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'measure_noOfLeaves',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_dimensions',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'dimensions',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'height',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'width',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'depth',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'dimensions_typeOfInformation',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': 'factual',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_format',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'format',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'format_typeOfInformation',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': 'factual',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_origPlace',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'origPlace',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'origPlace_gnd-ID',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'origPlace_gnd-ID',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_origDate',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'origDate',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'origDate_notBefore',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'origDate_notAfter',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'origDate_type',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_textLang',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'textLang',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'textLang-ID',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_form',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'form',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': 'binding',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_status',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'status',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_decoration',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'decoration',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': 'yes',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              },
              {
                'data_origin': 'index',
                'region': 'head',
                'data_indexName': 'norm_musicNotation',
                'children': [
                  {
                    'data_origin': 'term',
                    'region': 'head',
                    'data_type': 'musicNotation',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': 'no',
                          'region': 'head'
                        }]
                      }
                    ]
                  }
                ]
              }
              ]
            },
          ]
        },
    'msContents': {
      'allowedNumbers': '1',
      'required': false,
      'selfContaining': false,
      'duplicate': false,
      'allowedComponents':
          ['msItem'],
      'allowedIn':
          [
            'medieval',
            'msPartbinding',
            'msPartaccMat',
            'msPartbooklet',
            'msPartfragment'
          ],
      'allowedFollower': ['physDesc', 'decoNoteform', 'history', 'msPartbinding', 'msPartfragment', 'msPartbooklet', 'msPartaccMat', 'msPartother', 'additional'],
      'allowedPredecessor': ['msIdentifier', 'head'],
      'defaultElement':
          {
            'data_origin': 'msContents',
            'region': 'msContents',
            'component': 'msContents',
            'copied':
                false,
          },
      'defaultChildren':
          []
    },
    'notetext':
        {
          'allowedNumbers': 'multi',
          'required': false,
          'selfContaining': true,
          'duplicate': true,
          'allowedComponents':
              ['decoNoteform'],
          'allowedIn':
              [
                'msItem',
              ],
          'allowedFollower': ['notetext', 'decoNotecontent', 'notemusic', 'msItem', 'decoNoteform'],
          'allowedPredecessor': ['notetext', 'decoNotecontent', 'notemusic', 'msItem', 'decoNoteform'],
          'defaultElement':
              {
                'data_origin': 'note',
                'region': 'note',
                'component': 'notetext',
                'data_type': 'text',
                'copied': false,
              },
          'defaultChildren':
              [
                {
                  'data_origin': 'textelement',
                  'region': 'note',
                  'copied': false,
                  'children': [
                    {
                      'text': ' ',
                      'region': 'note'
                    }
                  ]
                }
              ]
        },
    'msItem':
        {
          'allowedNumbers': 'multi',
          'required': false,
          'selfContaining': true,
          'duplicate': false,
          'allowedComponents':
              [
                'notetext',
                'decoNotecontent',
                'notemusic',
                'msItem',
                'decoNoteform'
              ],
          'allowedIn':
              [
                'msContents',
              ],
          'allowedFollower': ['notetext', 'decoNotecontent', 'notemusic', 'msItem', 'decoNoteform'],
          'allowedPredecessor': ['notetext', 'decoNotecontent', 'notemusic', 'msItem', 'decoNoteform'],
          'defaultElement':
              {
                'data_origin': 'msItem',
                'region': 'msItem',
                'component': 'msItem',
                'copied':
                    false,
              },
          'defaultChildren':
              [{
                'data_origin': 'note',
                'region': 'note',
                'component': 'notetext',
                'data_type': 'text',
                'copied': false,
                'children': [
                  {
                    'data_origin': 'textelement',
                    'region': 'note',
                    'copied': false,
                    'children': [
                      {
                        'text': ' ',
                        'region': 'note'
                      }
                    ]
                  }
                ]
              }]
        },
    'decoNotecontent':
        {
          'allowedNumbers':
              'multi',
          'required':
              false,
          'selfContaining': true,
          'duplicate': true,
          'allowedComponents':
              ['decoNoteform'],
          'allowedIn':
              [
                'notetext',
                'decoNotecontent',
                'notemusic',
                'msItem',
              ],
          'allowedFollower': ['notetext', 'decoNotecontent', 'notemusic', 'msItem', 'decoNoteform'],
          'allowedPredecessor': ['notetext', 'notemusic', 'decoNotecontent', 'msItem', 'decoNoteform'],
          'defaultElement':
              {
                'data_origin': 'decoNote',
                'region': 'decoNote',
                'component': 'decoNotecontent',
                'data_type': 'content',
                'copied':
                    false,
              },
          'defaultChildren':
              [{
                'data_origin': 'textelement',
                'region': 'note',
                'children': [
                  {
                    'text': ' ',
                    'region': 'note'
                  }
                ]
              }]
        },
    'msPartfragment':
        {
          'allowedNumbers':
              'multi',
          'required':
              false,
          'selfContaining': true,
          'duplicate': false,
          'allowedComponents':
              [
                'msIdentifier',
                'head',
                'physDesc',
                'history',
                'msContents',
                'msPartfragment',
                'msPartaccMat',
                'msPartother',
                'msPartbooklet',
                'msPartbinding',
                'additional',
              ],
          'allowedIn':
              [
                'medieval',
                'msPartfragment',
                'msPartaccMat',
              ],
          'allowedFollower': ['msPartaccMat', 'msPartfragment', 'msPartbooklet', 'msPartother'],
          'allowedPredecessor': ['msIdentifier', 'head', 'physDesc', 'msContents', 'history', 'notetext', 'decoNotecontent', 'notemusic', 'msPartbinding', 'additional', 'msPartfragment'],
          'defaultElement':
              {
                'data_origin': 'msPart',
                'region': 'msPart',
                'component': 'msPartfragment',
                'data_type': 'fragment',
                'copied': false
              },
          'defaultChildren':
              [
                {
                  'data_origin': 'msIdentifier',
                  'region': 'msIdentifier',
                  'component': 'msIdentifier',
                  'copied': false,
                  'children': [{
                    'data_origin': 'idno',
                    'region': 'msIdentifier',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'msIdentifier',
                        'children': [
                          {
                            'text': ' ',
                            'region': 'msIdentifier'
                          }
                        ]
                      }
                    ]
                  }]
                },
                {
                  'data_origin': 'head',
                  'region': 'head',
                  'component': 'head',
                  'copied': false,
                  'children': [{
                    'data_origin': 'title',
                    'region': 'head',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'note',
                    'data_type': 'headline',
                    'region': 'head',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_title',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'title',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_material',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'material',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'material_type',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'material_type',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_measure',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'measure',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'measure_noOfLeaves',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_dimensions',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'dimensions',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'height',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'width',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'depth',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'dimensions_typeOfInformation',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'factual',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_format',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'format',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'format_typeOfInformation',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'factual',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_origPlace',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origPlace',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origPlace_gnd-ID',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origPlace_gnd-ID',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_origDate',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate_notBefore',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate_notAfter',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate_type',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_textLang',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'textLang',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'textLang-ID',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_form',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'form',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'fragment',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_status',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'status',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_decoration',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'decoration',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'yes',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_musicNotation',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'musicNotation',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'no',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  }
                  ]
                },
              ]
        },
    'msPartbooklet':
        {
          'allowedNumbers':
              'multi',
          'required':
              false,
          'selfContaining': true,
          'duplicate': true,
          'allowedComponents':
              [
                'msIdentifier',
                'head',
                'physDesc',
                'history',
                'msContents',
                'additional',
                'msPartbooklet',
                'msPartother',
              ],
          'allowedIn':
              [
                'medieval',
                'msPartbinding',
                'msPartfragment',
                'msPartbooklet'
              ],
          'allowedFollower': ['msPartbooklet', 'msPartother'],
          'allowedPredecessor': ['msIdentifier', 'head', 'physDesc', 'msContents', 'history', 'notetext', 'decoNotecontent', 'notemusic', 'msPartbinding', 'msPartfragment', 'msPartbooklet', 'additional', 'msPartaccMat'],
          'defaultElement':
              {
                'data_origin': 'msPart',
                'region': 'msPart',
                'component': 'msPartbooklet',
                'data_type': 'booklet',
                'copied': false
              },
          'defaultChildren':
              [
                {
                  'data_origin': 'msIdentifier',
                  'region': 'msIdentifier',
                  'component': 'msIdentifier',
                  'copied': false,
                  'children': [{
                    'data_origin': 'idno',
                    'region': 'msIdentifier',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'msIdentifier',
                        'children': [
                          {
                            'text': ' ',
                            'region': 'msIdentifier'
                          }
                        ]
                      }
                    ]
                  }]
                },
                {
                  'data_origin': 'head',
                  'region': 'head',
                  'component': 'head',
                  'copied': false,
                  'children': [{
                    'data_origin': 'title',
                    'region': 'head',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'note',
                    'data_type': 'headline',
                    'region': 'head',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_title',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'title',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_material',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'material',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'material_type',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'material_type',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_measure',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'measure',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'measure_noOfLeaves',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_dimensions',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'dimensions',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'height',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'width',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'depth',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'dimensions_typeOfInformation',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'factual',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_format',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'format',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'format_typeOfInformation',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'factual',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_origPlace',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origPlace',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origPlace_gnd-ID',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origPlace_gnd-ID',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_origDate',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate_notBefore',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate_notAfter',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate_type',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_textLang',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'textLang',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'textLang-ID',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_form',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'form',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'booklet',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_status',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'status',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_decoration',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'decoration',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'yes',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_musicNotation',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'musicNotation',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'no',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  }
                  ]
                }
              ]
        },
    'msPartother':
        {
          'allowedNumbers':
              'multi',
          'required':
              false,
          'selfContaining': true,
          'duplicate': false,
          'allowedComponents':
              [],
          'allowedIn':
              [
                'medieval',
                'msPartbinding',
                'msPartaccMat', 'msPartfragment', 'msPartbooklet'
              ],
          'allowedFollower': ['msPartother'],
          'allowedPredecessor': ['msIdentifier', 'head', 'physDesc', 'msContents', 'history', 'notetext', 'decoNotecontent', 'notemusic', 'msPartbinding', 'msPartfragment', 'msPartbooklet', 'msPartaccMat', 'msPartother'],
          'defaultElement':
              {
                'data_origin': 'msPart',
                'region': 'msPart',
                'component': 'msPartother',
                'data_type': 'other',
                'copied': false
              },
          'defaultChildren': [{
            'data_origin': 'msIdentifier',
            'region': 'msIdentifier',
            'component': 'msIdentifier',
            'copied': false,
            'children': [{
              'data_origin': 'idno',
              'region': 'msIdentifier',
              'children': [
                {
                  'data_origin': 'textelement',
                  'region': 'msIdentifier',
                  'children': [
                    {
                      'text': 'Sonstiges',
                      'region': 'msIdentifier'
                    }
                  ]
                }
              ]
            }]
          },
          {
            'data_origin': 'p',
            'region': 'msPart',
            'copied': false,
            'children': [
              {
                'data_origin': 'textelement',
                'region': 'msPart',
                'children': [
                  {
                    'text': ' ',
                    'region': 'msPart'
                  }
                ]
              }
            ]
          }]
        },
    'msPartaccMat':
        {
          'allowedNumbers':
              'multi',
          'required':
              false,
          'selfContaining': true,
          'duplicate': false,
          'allowedComponents':
              [
                'msIdentifier',
                'head',
                'physDesc',
                'history',
                'msContents',
                'msPartfragment',
                'msPartaccMat',
                'msPartbinding',
                'msPartbooklet',
                'msPartother',
                'additional',
              ],
          'allowedIn':
              [
                'medieval',
                'msPartfragment',
                'msPartaccMat'
              ],
          'allowedFollower': ['msPartaccMat', 'msPartbooklet', 'msPartother'],
          'allowedPredecessor': ['msIdentifier', 'head', 'physDesc', 'msContents', 'history', 'notetext', 'decoNotecontent', 'msItemmusic', 'msPartbinding', 'msPartfragment', 'msPartaccMat', 'additional'],
          'defaultElement':
              {
                'data_origin': 'msPart',
                'region': 'msPart',
                'component': 'msPartaccMat',
                'data_type': 'accMat',
                'copied': false
              },
          'defaultChildren':
              [
                {
                  'data_origin': 'msIdentifier',
                  'region': 'msIdentifier',
                  'component': 'msIdentifier',
                  'copied': false,
                  'children': [{
                    'data_origin': 'idno',
                    'region': 'msIdentifier',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'msIdentifier',
                        'children': [
                          {
                            'text': ' ',
                            'region': 'msIdentifier'
                          }
                        ]
                      }
                    ]
                  }]
                },
                {
                  'data_origin': 'head',
                  'region': 'head',
                  'component': 'head',
                  'copied': false,
                  'children': [{
                    'data_origin': 'title',
                    'region': 'head',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'note',
                    'data_type': 'headline',
                    'region': 'head',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'head',
                        'children': [{
                          'text': '',
                          'region': 'head'
                        }]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_title',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'title',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_material',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'material',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'material_type',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'material_type',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_measure',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'measure',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'measure_noOfLeaves',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_dimensions',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'dimensions',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'height',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'width',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'depth',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'dimensions_typeOfInformation',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'factual',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_format',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'format',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'format_typeOfInformation',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'factual',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_origPlace',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origPlace',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origPlace_gnd-ID',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origPlace_gnd-ID',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_origDate',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate_notBefore',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate_notAfter',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'origDate_type',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_textLang',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'textLang',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      },
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'textLang-ID',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_form',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'form',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'loose insert',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_status',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'status',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': '',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_decoration',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'decoration',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'yes',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'data_origin': 'index',
                    'region': 'head',
                    'data_indexName': 'norm_musicNotation',
                    'children': [
                      {
                        'data_origin': 'term',
                        'region': 'head',
                        'data_type': 'musicNotation',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'region': 'head',
                            'children': [{
                              'text': 'no',
                              'region': 'head'
                            }]
                          }
                        ]
                      }
                    ]
                  }
                  ]
                }
              ]
        },
    'notemusic':
        {
          'allowedNumbers':
              'multi',
          'required':
              false,
          'duplicate': true,
          'allowedComponents':
              ['decoNoteform'],
          'allowedIn':
              [
                'msItem'
              ],
          'allowedFollower': ['notetext', 'decoNotecontent', 'notemusic', 'msItem', 'decoNoteform'],
          'allowedPredecessor': ['notetext', 'decoNotecontent', 'notemusic', 'msItem', 'decoNoteform'],
          'defaultElement':
              {
                'data_origin': 'note',
                'region': 'note',
                'component': 'notemusic',
                'data_type': 'music',
                'copied': false,
              },
          'defaultChildren':
              [{
                'data_origin': 'textelement',
                'region': 'note',
                'children': [
                  {
                    'text': ' ',
                    'region': 'note'
                  }
                ]
              }]
        },
    'additional':
        {
          'allowedNumbers': '1',
          'required': false,
          'selfContaining': false,
          'duplicate': false,
          'allowedComponents': [],
          'allowedIn':
              [
                'medieval', 'msPartbinding', 'msPartaccMat', 'msPartfragment', 'msPartbooklet'
              ],
          'allowedFollower': ['msPartbinding', 'msPartaccMat', 'msPartfragment', 'msPartbooklet'],
          'allowedPredecessor': ['msIdentifier', 'head', 'physDesc', 'msContent', 'history'],
          'defaultElement':
              {
                'data_origin': 'additional',
                'region': 'additional',
                'component': 'additional',
                'copied':
                    false,
              },
          'defaultChildren':
              [{
                'data_origin': 'listBibl',
                'region': 'additional',
                'children': [
                  {
                    'data_origin': 'bibl',
                    'region': 'additional',
                    'children': [
                      {
                        'data_origin': 'textelement',
                        'region': 'additional',
                        'copied': false,
                        'children': [
                          {
                            'text': ' ',
                            'region': 'additional'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }]
        },
    'normdata': {
      'allowedIn': ['textLang', 'note', 'notetext', 'notemusic', 'decoNote', 'physDesc', 'history', 'quote', 'p', 'bibl'],
      'allowedFollower': ['textelement'],
      'allowedTypes':
          {
            'person':
                {
                  'disabled': false,
                  'defaultElement':
                      {
                        'data_origin': 'persName',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'children': [
                              {
                                'text': ''
                              }
                            ]
                          }
                        ]
                      }
                },
            'corporatebody':
                {
                  'disabled': false,
                  'defaultElement':
                      {
                        'data_origin': 'orgName',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'children': [
                              {
                                'text': ''
                              }
                            ]
                          }
                        ]
                      }
                },
            'place':
                {
                  'disabled': false,
                  'defaultElement':
                      {
                        'data_origin': 'placeName',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'children': [
                              {
                                'text': ''
                              }
                            ]
                          }
                        ]
                      }
                },
            'work':
                {
                  'disabled': true,
                  'defaultElement':
                      {
                        'data_origin': 'work',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'children': [
                              {
                                'text': ''
                              }
                            ]
                          }
                        ]
                      }
                },
            'language':
                {
                  'disabled': true,
                  'defaultElement':
                      {
                        'data_origin': 'language',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'children': [
                              {
                                'text': ''
                              }
                            ]
                          }
                        ]
                      }
                },
            'materialtype':
                {
                  'disabled': true,
                  'defaultElement':
                      {
                        'data_origin': 'material',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'children': [
                              {
                                'text': ''
                              }
                            ]
                          }
                        ]
                      }
                },
            'font':
                {
                  'disabled': true,
                  'defaultElement':
                      {
                        'data_origin': 'font',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'children': [
                              {
                                'text': ''
                              }
                            ]
                          }
                        ]
                      }
                },
            'initium':
                {
                  'disabled': true,
                  'defaultElement':
                      {
                        'data_origin': 'initium',
                        'children': [
                          {
                            'data_origin': 'textelement',
                            'children': [
                              {
                                'text': ''
                              }
                            ]
                          }
                        ]
                      }
                }
          }
    },
    'allowedComponents': ['msIdentifier', 'head', 'msContents', 'physDesc', 'msItem', 'history', 'msPartfragment', 'msPartbinding', 'msPartbooklet', 'msPartaccMat', 'msPartother', 'additional'],
    'wrapperElements': ['decoDesc'],
    'erfassungsElemente': {
      // Identifikation
      'altIdentifierhsp-ID': {
        'idno': {
          'editable': false,
          'repeatable': false,
          'empty': false,
          'required': true,
          'allowedNumbers': '1',
        },
      },
      'altIdentifiercorpus': {
        'required': false,
        'allowedNumbers': 'multi',
        'collection': {
          'editable': true,
          'repeatable': false,
          'empty': false,
          'required': false,
          'allowedNumbers': '1',
        },
        'idno': {
          'editable': true,
          'repeatable': false,
          'empty': false,
          'required': true,
          'allowedNumbers': '1',
        },
      },
      'altIdentifierformer': {
        'required': false,
        'allowedNumbers': 'multi',
        'settlement': {
          'editable': true,
          'repeatable': false,
          'empty': true,
          'required': false,
          'allowedNumbers': 'multi',
        },
        'repository': {
          'editable': true,
          'repeatable': false,
          'empty': true,
          'required': false,
          'allowedNumbers': 'multi',
        },
        'idno': {
          'editable': true,
          'repeatable': false,
          'empty': false,
          'required': true,
          'allowedNumbers': '1',
        },
      },
      'settlement': {
        'editable': false,
        'repeatable': false,
        'empty': false,
        'required': true,
        'allowedNumbers': '1',
      },
      'mspart_settlement': {
        'editable': false,
        'repeatable': false,
        'empty': false,
        'required': false,
        'allowedNumbers': '1',
      },
      'repository': {
        'editable': false,
        'repeatable': false,
        'empty': false,
        'required': true,
        'allowedNumbers': '1',
      },
      'mspart_repository': {
        'editable': false,
        'repeatable': false,
        'empty': false,
        'required': false,
        'allowedNumbers': '1',
      },
      'idno': {
        'editable': true,
        'repeatable': false,
        'empty': false,
        'required': true,
        'allowedNumbers': '1',
      },
      'indexnorm_format': {
        'repeatable': true,
        'required': true,
        'term': [
          {
            'format': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'format_typeOfInformation': {
              'repeatable': false,
              'required': false,
            }
          }
        ]
      },
      'indexnorm_material': {
        'repeatable': false,
        'required': false,
        'term': [
          {
            'material': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'material_type': {
              'repeatable': true,
              'required': true,
            }
          }
        ]
      },
      'indexnorm_dimensions': {
        'repeatable': true,
        'required': true,
        'term': [
          {
            'dimensions': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'height': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'width': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'depth': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'dimensions_typeOfInformation': {
              'repeatable': false,
              'required': false,
            }
          },
        ]
      },
      'indexnorm_origPlace': {
        'repeatable': false,
        'required': false,
        'term': [
          {
            'origPlace': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'origPlace_gnd-ID': {
              'repeatable': true,
              'required': true,
            }
          }
        ]
      },
      'indexnorm_origDate': {
        'repeatable': true,
        'required': true,
        'term': [
          {
            'origDate': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'origDate_notBefore': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'origDate_notAfter': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'origDate_type': {
              'repeatable': false,
              'required': false,
            }
          },
        ]
      },
      'indexnorm_form': {
        'repeatable': false,
        'required': false,
        'term': [
          {
            'form': {
              'repeatable': false,
              'required': false,
            }
          }
        ]
      },
      'indexnorm_status': {
        'repeatable': false,
        'required': false,
        'term': [
          {
            'status': {
              'repeatable': false,
              'required': false,
            }
          }
        ]
      },
      'indexnorm_measure': {
        'repeatable': false,
        'required': false,
        'term': [
          {
            'measure': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'measure_noOfLeaves': {
              'repeatable': false,
              'required': false,
            }
          }
        ]
      },
      'indexnorm_decoration': {
        'repeatable': false,
        'required': false,
        'term': [
          {
            'decoration': {
              'repeatable': false,
              'required': false,
            }
          }
        ]
      },
      'indexnorm_musicNotation': {
        'repeatable': false,
        'required': false,
        'term': [
          {
            'musicNotation': {
              'repeatable': false,
              'required': false,
            }
          }
        ]
      },
      'indexnorm_textLang': {
        'repeatable': false,
        'required': false,
        'term': [
          {
            'textLang': {
              'repeatable': false,
              'required': false,
            }
          },
          {
            'textLang-ID': {
              'repeatable': true,
              'required': true,
            }
          }
        ]
      },
      'termform': {
        'values': ['', 'codex', 'composite', 'fragment', 'binding', 'booklet', 'loose insert', 'sammelband', 'printWithManuscriptParts', 'hostVolume', 'collection', 'singleSheet', 'scroll', 'leporello', 'other'],
      },
      'termstatus': {
        'values': ['', 'existent', 'missing', 'destroyed', 'dismembered', 'unknown', 'displaced'],
      },
      'termformat': {
        'values': ['', 'folio', 'quarto', 'octavo', 'larger than folio', 'smaller than octavo', 'long and narrow', 'oblong', 'square', 'other'],
      },
      'termmaterial_type': {
        'values': ['', 'paper', 'parchment', 'papyrus', 'palm', 'linen', 'other'],
      },
      'msPartbinding_termmaterial_type': {
        'values': ['', 'wood', 'leather', 'parchment', 'textile materials', 'gold', 'silver', 'copper', 'brass', 'other'],
      }
    },
    'elements': ['idno', 'settlement', 'repository', 'collection', 'altIdentifierformer', 'altIdentifiercorpus', 'altIdentifierhsp-ID'],
    'regionsSet': ['msIdentifier', 'head', 'msItem', 'physDesc', 'history', 'msPart', 'additional', 'altIdentifier', 'decoNoteform', 'note', 'msContents'],
    'components': ['msIdentifier', 'head', 'physDesc', 'decoNoteform', 'msContents', 'msItem', 'notetext', 'notemusic', 'decoNotecontent', 'decoNoteform', 'history', 'msPartbinding',
      'msPartbooklet', 'msPartaccMat', 'msPartother', 'additional']
  }
} as Record<string, any>

export interface BeschreibungsKomponentenRule {
  allowedNumbers: string
  required: boolean
  allowedComponents: Array<string>
  allowedIn: Array<string>
  wrapperElement: HSPSlateNode
}

export interface BeschreibungsKomponenteElement {
  // eslint-disable-next-line camelcase
  data_origin: string
  region: string
  children: Array<any>
}

export const ErfassungsRuleWrapperFactory = (beschreibungsTyp: string, component: string): BeschreibungsKomponentenRule | undefined => {
  if (ErfassungsRules[beschreibungsTyp] && ErfassungsRules[beschreibungsTyp][component] && ErfassungsRules[beschreibungsTyp][component].wrapperElement) {
    return JSON.parse(JSON.stringify(ErfassungsRules[beschreibungsTyp][component].wrapperElement))
  }
}

export const ErfassungsRuleDefaultChildrenFactory = (beschreibungsTyp: string, component: string): BeschreibungsKomponentenRule | undefined => {
  if (ErfassungsRules[beschreibungsTyp] && ErfassungsRules[beschreibungsTyp][component] && ErfassungsRules[beschreibungsTyp][component].defaultChildren) {
    return JSON.parse(JSON.stringify(ErfassungsRules[beschreibungsTyp][component].defaultChildren))
  }
}

export const ErfassungsRuleDefaultChildrenOneElementFactory = (beschreibungsTyp: string, component: string, dataOrigin: string, dataType?: string): BeschreibungsKomponenteElement | undefined => {
  if (ErfassungsRules[beschreibungsTyp] && ErfassungsRules[beschreibungsTyp][component] && ErfassungsRules[beschreibungsTyp][component].defaultChildren) {
    const children: Array<any> = JSON.parse(JSON.stringify(ErfassungsRules[beschreibungsTyp][component].defaultChildren))

    for (const child of children) {
      if (child.data_origin === dataOrigin) {
        if (child.data_type === undefined || child.data_type === dataType) {
          return child
        }
      }
    }

    return undefined
  }

  return undefined
}

export const ErfassungsRuleDefaultElementFactory = (beschreibungsTyp: string, component: string): BeschreibungsKomponentenRule | undefined => {
  if (ErfassungsRules[beschreibungsTyp] && ErfassungsRules[beschreibungsTyp][component] && ErfassungsRules[beschreibungsTyp][component].defaultElement) {
    return JSON.parse(JSON.stringify(ErfassungsRules[beschreibungsTyp][component].defaultElement))
  }
}

export const ErfassungsRuleForComponent = (beschreibungsTyp: string, component: string): BeschreibungsKomponentenRule | undefined => {
  if (ErfassungsRules[beschreibungsTyp] && ErfassungsRules[beschreibungsTyp][component]) {
    return JSON.parse(JSON.stringify(ErfassungsRules[beschreibungsTyp][component])) as BeschreibungsKomponentenRule
  }
}

export const ErfassungsRuleForType = (beschreibungsTyp: string): BeschreibungsKomponentenRule | undefined => {
  if (ErfassungsRules[beschreibungsTyp]) {
    return JSON.parse(JSON.stringify(ErfassungsRules[beschreibungsTyp])) as BeschreibungsKomponentenRule
  }
}

export const ComponentTranslation = () => {
  const translation: Map<string, string> = new Map()
  translation.set('msIdentifier', i18next.t('sidebar.identification'))
  translation.set('head', i18next.t('sidebar.head'))
  translation.set('physDesc', i18next.t('sidebar.physical'))
  translation.set('decoNoteform', i18next.t('sidebar.physicalArt'))
  translation.set('history', i18next.t('sidebar.history'))
  translation.set('msPartbinding', i18next.t('sidebar.binding'))
  translation.set('notetext', i18next.t('sidebar.contenttext'))
  translation.set('msItem', i18next.t('sidebar.section'))
  translation.set('decoNotecontent', i18next.t('sidebar.iconography'))
  translation.set('msPartfragment', i18next.t('sidebar.part'))
  translation.set('msPartbooklet', i18next.t('sidebar.booklet'))
  translation.set('msPartother', i18next.t('sidebar.other'))
  translation.set('msPartaccMat', i18next.t('sidebar.accMat'))
  translation.set('notemusic', i18next.t('sidebar.music'))
  translation.set('additional', i18next.t('sidebar.literature'))
  translation.set('msContents', i18next.t('sidebar.content'))
  return translation
}
