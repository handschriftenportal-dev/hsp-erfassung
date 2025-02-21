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

import { cloneDeep } from 'lodash'
import { Element, Node } from 'slate'

import { getUrlForGndId } from '../../domain/editor/normdaten/dialog/NormdatenDialogUtilities'
import { NormdatenTEIElement } from '../../domain/editor/normdaten/NormdatenTEIElement'
import { VolltextEditorElement } from './volltext/VolltextEditorElement'

export const ErfassungsRules = {
  medieval: {
    msIdentifier: {
      // Komponente Identifikation
      allowedNumbers: '1',
      required: true,
      selfContaining: false,
      duplicate: false,
      allowedComponents: [],
      allowedIn: [
        'medieval',
        'msPartbinding',
        'msPartaccMat',
        'msPartbooklet',
        'msPartfragment',
      ],
      allowedFollower: [
        'head',
        'physDesc',
        'msPartbinding',
        'history',
        'additional',
        'msContents',
        'msPartbooklet',
        'msPartaccMat',
        'msPartother',
      ],
      allowedPredecessor: [],
      defaultElement: {
        data_origin: 'msIdentifier',
        region: 'msIdentifier',
        component: 'msIdentifier',
      },
      defaultChildren: [
        {
          data_origin: 'idno',
          region: 'msIdentifier',
          children: [
            {
              text: '',
            },
          ],
        },
        {
          data_origin: 'settlement',
          region: 'msIdentifier',
          children: [
            {
              text: '',
            },
          ],
        },
        {
          data_origin: 'repository',
          region: 'msIdentifier',
          children: [
            {
              text: '',
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifiercorpus',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: 'XXXX',
          data_type: 'corpus',
          children: [
            {
              data_origin: 'collection',
              region: 'altIdentifiercorpus',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              component: '',
              level: 1,
              id: 'XXXX',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifiercorpus',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: 'XXXX',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifierhsp-ID',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: 'XXXX',
          data_type: 'hsp-ID',
          children: [
            {
              data_origin: 'collection',
              region: 'altIdentifierhsp-ID',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              component: '',
              level: 1,
              id: 'XXXX',
              children: [
                {
                  region: 'altIdentifierhsp-ID',
                  text: 'Handschriftenportal Kulturobjektdokument-ID',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifierhsp-ID',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: 'XXXX',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifierformer',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: 'XXXX',
          data_type: 'former',
          children: [
            {
              data_origin: 'settlement',
              region: 'altIdentifierformer',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-settlement',
              component: '',
              level: 1,
              id: 'XXXX',
              data_key: '',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'repository',
              region: 'altIdentifierformer',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-repository',
              component: '',
              level: 1,
              id: 'XXXX',
              data_key: '',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifierformer',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: 'XXXX',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
      ],
    },
    head: {
      // Komponente Kopf
      allowedNumbers: '1',
      required: true,
      selfContaining: false,
      duplicate: false,
      allowedComponents: [],
      allowedIn: [
        'medieval',
        'msPartbinding',
        'msPartaccMat',
        'msPartbooklet',
        'msPartfragment',
      ],
      allowedFollower: [
        'physDesc',
        'msPartbinding',
        'history',
        'additional',
        'msContents',
        'msPartbooklet',
        'msPartaccMat',
        'msPartother',
      ],
      allowedPredecessor: ['msIdentifier'],
      defaultElement: {
        data_origin: 'head',
        region: 'head',
        component: 'head',
      },
      defaultChildren: [
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_title',
          repeatable: false,
          path: '#document-TEI-text-body-msDesc-head-index',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'title',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'title',
          region: 'head',
          repeatable: false,
          children: [
            {
              text: '',
            },
          ],
        },
        {
          data_origin: 'note',
          data_type: 'headline',
          repeatable: false,
          region: 'head',
          children: [
            {
              text: '',
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_material',
          path: '#document-TEI-text-body-msDesc-head-index',
          repeatable: false,
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'material',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'material_type',
              path: '#document-TEI-text-body-msDesc-head-index',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'material_type',
              path: '#document-TEI-text-body-msDesc-head-index',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_measure',
          path: '#document-TEI-text-body-msDesc-head-index',
          repeatable: false,
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'measure',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'measure_noOfLeaves',
              path: '#document-TEI-text-body-msDesc-head-index',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_dimensions',
          path: '#document-TEI-text-body-msDesc-head-index',
          repeatable: true,
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'dimensions',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'height',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'width',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'depth',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'dimensions_typeOfInformation',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: 'factual',
                  region: 'head',
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
          data_indexName: 'norm_format',
          repeatable: true,
          children: [
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              data_type: 'format',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              component: '',
              level: 1,
              id: '4a2254d3-77b8-4242-8a97-dc5a8e2ecce5',
              data_type: 'format_typeOfInformation',
              children: [
                {
                  region: 'head',
                  text: 'factual',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_origPlace',
          path: '#document-TEI-text-body-msDesc-head-index',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'origPlace',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'origPlace_norm',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'origPlace_norm',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_origDate',
          path: '#document-TEI-text-body-msDesc-head-index',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'origDate',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'origDate_notBefore',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'origDate_notAfter',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'origDate_type',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_textLang',
          path: '#document-TEI-text-body-msDesc-head-index',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'textLang',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'textLang-ID',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_form',
          path: '#document-TEI-text-body-msDesc-head-index',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'form',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_status',
          path: '#document-TEI-text-body-msDesc-head-index',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'status',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_decoration',
          path: '#document-TEI-text-body-msDesc-head-index',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'decoration',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'index',
          region: 'head',
          data_indexName: 'norm_musicNotation',
          path: '#document-TEI-text-body-msDesc-head-index',
          children: [
            {
              data_origin: 'term',
              region: 'head',
              data_type: 'musicNotation',
              path: '#document-TEI-text-body-msDesc-head-index-term',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
      ],
    },
    physDesc: {
      // Komponente Äußeres
      allowedNumbers: '1',
      required: false,
      selfContaining: false,
      duplicate: false,
      allowedComponents: ['decoNoteform'],
      allowedIn: [
        'medieval',
        'msPartbinding',
        'msPartaccMat',
        'msPartbooklet',
        'msPartfragment',
      ],
      allowedFollower: [
        'msPartbinding',
        'history',
        'additional',
        'msContents',
        'msPartbooklet',
        'msPartaccMat',
        'msPartother',
      ],
      allowedPredecessor: ['msIdentifier', 'head'],
      defaultElement: {
        data_origin: 'physDesc',
        region: 'physDesc',
        component: 'physDesc',
      },
      defaultChildren: [
        {
          data_origin: 'p',
          children: [VolltextEditorElement.emptyVolltext()],
        },
      ],
    },
    decoNoteform: {
      // Komponente Äußeres (Kunst)
      allowedNumbers: 'multi',
      required: false,
      selfContaining: false,
      duplicate: false,
      allowedComponents: [],
      allowedIn: ['physDesc'],
      allowedFollower: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      allowedPredecessor: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      wrapperElement: {
        data_origin: 'decoDesc',
        region: 'decoNoteform',
        relevantIn: ['physDesc'],
      },
      defaultElement: {
        data_origin: 'decoNote',
        region: 'decoNoteform',
        component: 'decoNoteform',
        data_type: 'form',
      },
      defaultChildren: [VolltextEditorElement.emptyVolltext()],
    },
    history: {
      // Komponente Geschichte
      allowedNumbers: '1',
      required: false,
      selfContaining: false,
      duplicate: false,
      allowedComponents: [],
      allowedIn: [
        'medieval',
        'msPartbinding',
        'msPartaccMat',
        'msPartbooklet',
        'msPartfragment',
      ],
      allowedFollower: [
        'additional',
        'msContents',
        'msPartbooklet',
        'msPartaccMat',
        'msPartother',
      ],
      allowedPredecessor: ['msIdentifier', 'head', 'physDesc', 'msPartbinding'],
      defaultElement: {
        data_origin: 'history',
        region: 'history',
        component: 'history',
      },
      defaultChildren: [
        {
          data_origin: 'p',
          children: [VolltextEditorElement.emptyVolltext()],
        },
      ],
    },
    msPartbinding: {
      // Komponente Einband
      allowedNumbers: 'multi',
      required: false,
      selfContaining: true,
      duplicate: false,
      allowedComponents: [
        'msIdentifier',
        'head',
        'physDesc',
        'history',
        'msContents',
        'msPartfragment',
      ],
      allowedIn: ['medieval'],
      allowedFollower: [
        'msPartbinding',
        'history',
        'additional',
        'msContents',
        'msPartbooklet',
        'msPartaccMat',
        'msPartother',
      ],
      allowedPredecessor: ['msIdentifier', 'head', 'physDesc', 'msPartbinding'],
      defaultElement: {
        data_origin: 'msPart',
        region: 'msPart',
        component: 'msPartbinding',
        data_type: 'binding',
      },
      defaultChildren: [
        {
          data_origin: 'msIdentifier',
          region: 'msIdentifier',
          component: 'msIdentifier',
          children: [
            {
              data_origin: 'idno',
              region: 'msIdentifier',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'head',
          region: 'head',
          component: 'head',
          children: [
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_title',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'title',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'title',
              region: 'head',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'note',
              data_type: 'headline',
              region: 'head',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_material',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_measure',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'measure',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'measure_noOfLeaves',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_dimensions',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'dimensions',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'height',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'width',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'depth',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'dimensions_typeOfInformation',
                  children: [
                    {
                      text: 'factual',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_format',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'format',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'format_typeOfInformation',
                  children: [
                    {
                      text: 'factual',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_origPlace',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace_norm',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace_norm',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_origDate',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_notBefore',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_notAfter',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_textLang',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'textLang',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'textLang-ID',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_form',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'form',
                  children: [
                    {
                      text: 'binding',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_status',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'status',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_decoration',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'decoration',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_musicNotation',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'musicNotation',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    msContents: {
      // Komponente Inhalt
      allowedNumbers: '1',
      required: false,
      selfContaining: false,
      duplicate: false,
      allowedComponents: ['msItem'],
      allowedIn: [
        'medieval',
        'msPartbinding',
        'msPartaccMat',
        'msPartbooklet',
        'msPartfragment',
      ],
      allowedFollower: ['msPartfragment', 'msPartaccMat', 'msPartother'],
      allowedPredecessor: [
        'msIdentifier',
        'head',
        'physDesc',
        'msPartbinding',
        'history',
        'additional',
      ],
      defaultElement: {
        data_origin: 'msContents',
        region: 'msContents',
        component: 'msContents',
      },
      defaultChildren: [
        {
          data_origin: 'msItem',
          region: 'msItem',
          component: 'msItem',
          children: [
            {
              data_origin: 'note',
              region: 'note',
              component: 'notetext',
              data_type: 'text',
              children: [VolltextEditorElement.emptyVolltext()],
            },
          ],
        },
      ],
    },
    notetext: {
      // Komponente Inhalt (Text)
      allowedNumbers: 'multi',
      required: false,
      selfContaining: true,
      duplicate: true,
      allowedComponents: [],
      allowedIn: ['msItem'],
      allowedFollower: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      allowedPredecessor: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      defaultElement: {
        data_origin: 'note',
        region: 'note',
        component: 'notetext',
        data_type: 'text',
      },
      defaultChildren: [VolltextEditorElement.emptyVolltext()],
    },
    noteregister: {
      // Komponente Inhalt (Register)
      allowedNumbers: 'multi',
      required: false,
      selfContaining: true,
      duplicate: false,
      allowedComponents: [],
      allowedIn: ['msItem'],
      allowedFollower: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      allowedPredecessor: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      defaultElement: {
        data_origin: 'note',
        region: 'note',
        component: 'noteregister',
        data_type: 'register',
      },
      defaultChildren: [{ text: '' }],
    },
    msItem: {
      // Komponente Abschnitt
      allowedNumbers: 'multi',
      required: false,
      selfContaining: true,
      duplicate: false,
      allowedComponents: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      allowedIn: ['msContents'],
      allowedFollower: ['msItem'],
      allowedPredecessor: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      defaultElement: {
        data_origin: 'msItem',
        region: 'msItem',
        component: 'msItem',
      },
      defaultChildren: [
        {
          data_origin: 'note',
          region: 'note',
          component: 'notetext',
          data_type: 'text',
          children: [VolltextEditorElement.emptyVolltext()],
        },
      ],
    },
    decoNotecontent: {
      // Komponente Inhalt (Kunst)
      allowedNumbers: 'multi',
      required: false,
      selfContaining: true,
      duplicate: true,
      allowedComponents: [],
      allowedIn: ['msItem'],
      allowedFollower: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      allowedPredecessor: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      defaultElement: {
        data_origin: 'decoNote',
        region: 'decoNote',
        component: 'decoNotecontent',
        data_type: 'content',
      },
      defaultChildren: [VolltextEditorElement.emptyVolltext()],
    },
    msPartfragment: {
      // Komponente Fragment
      allowedNumbers: 'multi',
      required: false,
      selfContaining: true,
      duplicate: false,
      allowedComponents: [
        'msIdentifier',
        'head',
        'physDesc',
        'history',
        'msContents',
      ],
      allowedIn: ['medieval', 'msPartbinding', 'msPartbooklet'],
      allowedFollower: ['msPartfragment', 'msPartaccMat', 'msPartother'],
      allowedPredecessor: ['msContents', 'msPartbooklet', 'msPartfragment'],
      defaultElement: {
        data_origin: 'msPart',
        region: 'msPart',
        component: 'msPartfragment',
        data_type: 'fragment',
      },
      defaultChildren: [
        {
          data_origin: 'msIdentifier',
          region: 'msIdentifier',
          component: 'msIdentifier',
          children: [
            {
              data_origin: 'idno',
              region: 'msIdentifier',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'head',
          region: 'head',
          component: 'head',
          children: [
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_title',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'title',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'title',
              region: 'head',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'note',
              data_type: 'headline',
              region: 'head',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_material',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_measure',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'measure',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'measure_noOfLeaves',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_dimensions',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'dimensions',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'height',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'width',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'depth',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'dimensions_typeOfInformation',
                  children: [
                    {
                      text: 'factual',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_format',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'format',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'format_typeOfInformation',
                  children: [
                    {
                      text: 'factual',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_origPlace',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace_norm',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace_norm',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_origDate',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_notBefore',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_notAfter',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_textLang',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'textLang',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'textLang-ID',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_form',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'form',
                  children: [
                    {
                      text: 'fragment',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_status',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'status',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_decoration',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'decoration',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_musicNotation',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'musicNotation',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    msPartbooklet: {
      // Komponente Faszikel
      allowedNumbers: 'multi',
      required: false,
      selfContaining: true,
      duplicate: true,
      allowedComponents: [
        'msIdentifier',
        'head',
        'physDesc',
        'history',
        'msContents',
        'msPartfragment',
      ],
      allowedIn: ['medieval'],
      allowedFollower: [
        'msPartbooklet',
        'msPartfragment',
        'msPartaccMat',
        'msPartother',
      ],
      allowedPredecessor: [
        'msIdentifier',
        'head',
        'physDesc',
        'msPartbinding',
        'history',
        'additional',
        'msPartbooklet',
      ],
      defaultElement: {
        data_origin: 'msPart',
        region: 'msPart',
        component: 'msPartbooklet',
        data_type: 'booklet',
      },
      defaultChildren: [
        {
          data_origin: 'msIdentifier',
          region: 'msIdentifier',
          component: 'msIdentifier',
          children: [
            {
              data_origin: 'idno',
              region: 'msIdentifier',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'head',
          region: 'head',
          component: 'head',
          children: [
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_title',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'title',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'title',
              region: 'head',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'note',
              data_type: 'headline',
              region: 'head',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_material',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_measure',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'measure',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'measure_noOfLeaves',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_dimensions',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'dimensions',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'height',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'width',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'depth',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'dimensions_typeOfInformation',
                  children: [
                    {
                      text: 'factual',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_format',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'format',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'format_typeOfInformation',
                  children: [
                    {
                      text: 'factual',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_origPlace',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace_norm',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace_norm',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_origDate',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_notBefore',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_notAfter',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_textLang',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'textLang',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'textLang-ID',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_form',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'form',
                  children: [
                    {
                      text: 'booklet',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_status',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'status',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_decoration',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'decoration',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_musicNotation',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'musicNotation',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    msPartother: {
      // Komponente Sonstiges
      allowedNumbers: '1',
      required: false,
      selfContaining: true,
      duplicate: false,
      allowedComponents: [],
      allowedIn: ['medieval'],
      allowedFollower: [],
      allowedPredecessor: [
        'msIdentifier',
        'head',
        'physDesc',
        'msPartbinding',
        'history',
        'additional',
        'msContents',
        'msPartfragment',
        'msPartbooklet',
        'msPartaccMat',
      ],
      defaultElement: {
        data_origin: 'msPart',
        data_type: 'other',
        component: 'msPartother',
        region: 'msPart',
      },
      defaultChildren: [
        {
          data_origin: 'msIdentifier',
          children: [
            {
              data_origin: 'idno',
              children: [
                {
                  text: 'Sonstiges',
                },
              ],
            },
          ],
        },
        { data_origin: 'p', children: [VolltextEditorElement.emptyVolltext()] },
      ],
    },
    msPartaccMat: {
      // Komponente Beigabe
      allowedNumbers: 'multi',
      required: false,
      selfContaining: true,
      duplicate: false,
      allowedComponents: [
        'msIdentifier',
        'head',
        'physDesc',
        'history',
        'msContents',
      ],
      allowedIn: ['medieval'],
      allowedFollower: ['msPartaccMat', 'msPartother'],
      allowedPredecessor: [
        'msIdentifier',
        'head',
        'physDesc',
        'msPartbinding',
        'history',
        'additional',
        'msContents',
        'msPartfragment',
        'msPartbooklet',
        'msPartaccMat',
      ],
      defaultElement: {
        data_origin: 'msPart',
        region: 'msPart',
        component: 'msPartaccMat',
        data_type: 'accMat',
      },
      defaultChildren: [
        {
          data_origin: 'msIdentifier',
          region: 'msIdentifier',
          component: 'msIdentifier',
          children: [
            {
              data_origin: 'idno',
              region: 'msIdentifier',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
        {
          data_origin: 'head',
          region: 'head',
          component: 'head',
          children: [
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_title',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'title',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'title',
              region: 'head',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'note',
              data_type: 'headline',
              region: 'head',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_material',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'material_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_measure',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'measure',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'measure_noOfLeaves',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_dimensions',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'dimensions',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'height',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'width',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'depth',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'dimensions_typeOfInformation',
                  children: [
                    {
                      text: 'factual',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_format',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'format',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'format_typeOfInformation',
                  children: [
                    {
                      text: 'factual',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_origPlace',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace_norm',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origPlace_norm',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_origDate',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_notBefore',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_notAfter',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'origDate_type',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_textLang',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'textLang',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'textLang-ID',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_form',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'form',
                  children: [
                    {
                      text: 'loose insert',
                      region: 'head',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_status',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'status',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_decoration',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'decoration',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              data_origin: 'index',
              region: 'head',
              data_indexName: 'norm_musicNotation',
              children: [
                {
                  data_origin: 'term',
                  region: 'head',
                  data_type: 'musicNotation',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    notemusic: {
      // Komponente Inhalt (Musik)
      allowedNumbers: 'multi',
      required: false,
      duplicate: true,
      allowedComponents: [],
      allowedIn: ['msItem'],
      allowedFollower: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      allowedPredecessor: [
        'msItem',
        'decoNoteform',
        'notetext',
        'decoNotecontent',
        'notemusic',
      ],
      defaultElement: {
        data_origin: 'note',
        region: 'note',
        component: 'notemusic',
        data_type: 'music',
      },
      defaultChildren: [VolltextEditorElement.emptyVolltext()],
    },
    additional: {
      // Komponente Literatur
      allowedNumbers: '1',
      required: false,
      selfContaining: false,
      duplicate: false,
      allowedComponents: [],
      allowedIn: [
        'medieval',
        'msPartbinding',
        'msPartaccMat',
        'msPartfragment',
        'msPartbooklet',
      ],
      allowedFollower: [
        'msContents',
        'msPartbooklet',
        'msPartaccMat',
        'msPartother',
      ],
      allowedPredecessor: [
        'msIdentifier',
        'head',
        'physDesc',
        'msPartbinding',
        'history',
      ],
      defaultElement: {
        data_origin: 'additional',
        region: 'additional',
        component: 'additional',
      },
      defaultChildren: [
        {
          data_origin: 'listBibl',
          region: 'additional',
          children: [
            {
              data_origin: 'bibl',
              region: 'additional',
              children: [VolltextEditorElement.emptyVolltext()],
            },
          ],
        },
      ],
    },
    normdata: {
      allowedTypes: {
        person: {
          disabled: false,
          defaultElement: {
            data_origin: 'person',
            content: '',
            children: [
              {
                text: '',
              },
            ],
            box: {
              data_origin: 'persName',
              data_role: '',
              data_ref: '',
              children: [
                {
                  text: '',
                },
              ],
            },
          },
        },
        koerperschaft: {
          disabled: false,
          defaultElement: {
            data_origin: 'koerperschaft',
            content: '',
            children: [
              {
                text: '',
              },
            ],
            box: {
              data_origin: 'orgName',
              data_role: '',
              data_ref: '',
              children: [
                {
                  text: '',
                },
              ],
            },
          },
        },
        ort: {
          disabled: false,
          defaultElement: {
            data_origin: 'ort',
            content: '',
            children: [
              {
                text: '',
              },
            ],
            box: {
              data_origin: 'placeName',
              data_role: '',
              data_ref: '',
              children: [
                {
                  text: '',
                },
              ],
            },
          },
        },
        initium: {
          disabled: true,
          defaultElement: {
            data_origin: '__PLACEHOLDER__work',
            children: [
              {
                text: '',
              },
            ],
          },
        },
        buchkunde: {
          disabled: true,
          defaultElement: {
            data_origin: '__PLACEHOLDER__buchkunde',
            children: [
              {
                text: '',
              },
            ],
          },
        },
        buchschmuck: {
          disabled: true,
          defaultElement: {
            data_origin: '__PLACEHOLDER__buchschmuck',
            children: [
              {
                text: '',
              },
            ],
          },
        },
        schriftart: {
          disabled: true,
          defaultElement: {
            data_origin: '__PLACEHOLDER__font',
            children: [
              {
                text: '',
              },
            ],
          },
        },
        musiknotation: {
          disabled: true,
          defaultElement: {
            data_origin: '__PLACEHOLDER__musikNotation',
            children: [
              {
                text: '',
              },
            ],
          },
        },
        einband: {
          disabled: false,
          defaultElement: {
            data_origin: '__PLACEHOLDER__einband',
            children: [
              {
                text: '',
              },
            ],
          },
        },
        sprache: {
          disabled: true,
          defaultElement: {
            data_origin: '__PLACEHOLDER__language',
            children: [
              {
                text: '',
              },
            ],
          },
        },
        textgattung: {
          disabled: true,
          defaultElement: {
            data_origin: '__PLACEHOLDER__works',
            children: [
              {
                text: '',
              },
            ],
          },
        },
      },
    },
    allowedComponents: [
      'msIdentifier',
      'head',
      'msContents',
      'physDesc',
      'msItem',
      'history',
      'msPartfragment',
      'msPartbinding',
      'msPartbooklet',
      'msPartaccMat',
      'msPartother',
      'additional',
    ],
    wrapperElements: ['decoDesc'],
    erfassungsElemente: {
      'altIdentifierhsp-ID': {
        idno: {
          editable: false,
          repeatable: false,
          empty: false,
          required: true,
          allowedNumbers: '1',
        },
      },
      altIdentifiercorpus: {
        required: false,
        allowedNumbers: 'multi',
        collection: {
          editable: true,
          repeatable: false,
          empty: true,
          required: false,
          allowedNumbers: '1',
        },
        idno: {
          editable: true,
          repeatable: false,
          empty: false,
          required: true,
          allowedNumbers: '1',
        },
      },
      altIdentifierformer: {
        required: false,
        allowedNumbers: 'multi',
        settlement: {
          editable: true,
          repeatable: false,
          empty: true,
          required: false,
          allowedNumbers: 'multi',
        },
        repository: {
          editable: true,
          repeatable: false,
          empty: true,
          required: false,
          allowedNumbers: 'multi',
        },
        idno: {
          editable: true,
          repeatable: false,
          empty: true,
          required: true,
          allowedNumbers: '1',
        },
      },
      settlement: {
        editable: false,
        repeatable: false,
        empty: false,
        required: true,
        allowedNumbers: '1',
      },
      msPart: {
        settlement: {
          editable: false,
          repeatable: false,
          empty: false,
          required: false,
          allowedNumbers: '1',
        },
        repository: {
          editable: false,
          repeatable: false,
          empty: false,
          required: false,
          allowedNumbers: '1',
        },
      },
      repository: {
        editable: false,
        repeatable: false,
        empty: false,
        required: true,
        allowedNumbers: '1',
      },
      idno: {
        editable: true,
        repeatable: false,
        empty: true,
        required: true,
        allowedNumbers: '1',
      },
      indexnorm_format: {
        repeatable: true,
        required: true,
        term: {
          format: {
            repeatable: false,
            required: false,
          },
          format_typeOfInformation: {
            repeatable: false,
            required: false,
          },
        },
      },
      indexnorm_material: {
        repeatable: false,
        required: false,
        term: {
          material: {
            repeatable: false,
            required: false,
          },
          material_type: {
            repeatable: true,
            required: true,
          },
        },
      },
      indexnorm_dimensions: {
        repeatable: true,
        required: true,
        term: {
          dimensions: {
            repeatable: false,
            required: false,
          },
          height: {
            repeatable: false,
            required: false,
          },
          width: {
            repeatable: false,
            required: false,
          },
          depth: {
            repeatable: false,
            required: false,
          },
          dimensions_typeOfInformation: {
            repeatable: false,
            required: false,
          },
        },
      },
      indexnorm_origPlace: {
        repeatable: false,
        required: false,
        term: {
          origPlace: {
            repeatable: false,
            required: false,
          },
          origPlace_norm: {
            repeatable: true,
            required: true,
          },
        },
      },
      indexnorm_origDate: {
        repeatable: true,
        required: true,
        term: {
          origDate: {
            repeatable: false,
            required: false,
          },
          origDate_notBefore: {
            repeatable: false,
            required: false,
          },
          origDate_notAfter: {
            repeatable: false,
            required: false,
          },
          origDate_type: {
            repeatable: false,
            required: false,
          },
        },
      },
      indexnorm_form: {
        repeatable: false,
        required: false,
        term: {
          form: {
            repeatable: false,
            required: false,
          },
        },
      },
      indexnorm_status: {
        repeatable: false,
        required: false,
        term: {
          status: {
            repeatable: false,
            required: false,
          },
        },
      },
      indexnorm_measure: {
        repeatable: false,
        required: false,
        term: {
          measure: {
            repeatable: false,
            required: false,
          },
          measure_noOfLeaves: {
            repeatable: false,
            required: false,
          },
        },
      },
      indexnorm_decoration: {
        repeatable: false,
        required: false,
        term: {
          decoration: {
            repeatable: false,
            required: false,
          },
        },
      },
      indexnorm_musicNotation: {
        repeatable: false,
        required: false,
        term: {
          musicNotation: {
            repeatable: false,
            required: false,
          },
        },
      },
      indexnorm_textLang: {
        repeatable: false,
        required: false,
        term: {
          textLang: {
            repeatable: false,
            required: false,
          },
          'textLang-ID': {
            repeatable: true,
            required: true,
          },
        },
      },
      termform: {
        values: [
          '',
          'codex',
          'composite',
          'fragment',
          'binding',
          'booklet',
          'loose insert',
          'sammelband',
          'printWithManuscriptParts',
          'hostVolume',
          'collection',
          'singleSheet',
          'scroll',
          'leporello',
          'other',
        ],
      },
      termstatus: {
        values: [
          '',
          'existent',
          'missing',
          'destroyed',
          'dismembered',
          'unknown',
          'displaced',
        ],
      },
      termformat: {
        values: [
          '',
          'folio',
          'quarto',
          'octavo',
          'larger than folio',
          'smaller than octavo',
          'long and narrow',
          'oblong',
          'square',
          'other',
        ],
      },
      termmaterial_type: {
        values: ['', 'paper', 'parchment', 'papyrus', 'palm', 'linen', 'other'],
      },
      msPartbinding_termmaterial_type: {
        values: [
          '',
          'wood',
          'leather',
          'parchment',
          'textile materials',
          'gold',
          'silver',
          'copper',
          'brass',
          'other',
        ],
      },
      p: {
        defaultElement: {
          data_origin: 'p',
        },
        defaultChildren: [
          {
            text: '',
          },
        ],
      },
      lb: {
        defaultElement: {
          data_origin: 'lb',
        },
        defaultChildren: [
          {
            text: '',
          },
        ],
      },
      textLang: {
        defaultElement: {
          data_origin: 'textLang',
          data_mainLang: 'de',
          data_otherLangs: '',
        },
        defaultChildren: [
          {
            text: '',
          },
        ],
      },
    },
    elements: [
      'idno',
      'settlement',
      'repository',
      'collection',
      'altIdentifierformer',
      'altIdentifiercorpus',
      'altIdentifierhsp-ID',
    ],
    regionsSet: [
      'msIdentifier',
      'head',
      'msItem',
      'physDesc',
      'history',
      'msPart',
      'additional',
      'altIdentifier',
      'decoNoteform',
      'note',
      'msContents',
    ],
    components: [
      'msIdentifier',
      'head',
      'physDesc',
      'decoNoteform',
      'msContents',
      'msItem',
      'notetext',
      'notemusic',
      'decoNotecontent',
      'decoNoteform',
      'history',
      'msPartbinding',
      'msPartbooklet',
      'msPartaccMat',
      'msPartother',
      'additional',
    ],
    componentsInsertOrder: [
      'msIdentifier',
      'head',
      'physDesc',
      'msPartbinding',
      'history',
      'additional',
      'msContents',
      'msPartbooklet',
      'msPartfragment',
      'msPartaccMat',
      'msPartother',
      'msItem',
      'decoNoteform',
      'notetext',
      'decoNotecontent',
      'notemusic',
    ],
  },
} as Record<string, any>

export interface BeschreibungsKomponentenRule {
  allowedNumbers: '1' | 'multi'
  required: boolean
  allowedComponents: string[]
  allowedIn: string[]
  wrapperElement: Element
}

export const ErfassungsRuleWrapperFactory = (
  beschreibungsTyp: string,
  component: string
): Element | undefined => {
  return cloneDeep(
    ErfassungsRules[beschreibungsTyp]?.[component]?.wrapperElement
  )
}

export const ErfassungsRuleDefaultChildrenFactory = (
  beschreibungsTyp: string,
  component: string
): Element['children'] | undefined => {
  return cloneDeep(
    ErfassungsRules[beschreibungsTyp]?.[component]?.defaultChildren
  )
}

export const ErfassungsRuleDefaultChildrenOneElementFactory = (
  beschreibungsTyp: string,
  component: string,
  dataOrigin: string,
  dataType?: string
): Element | undefined => {
  return cloneDeep(
    ErfassungsRules[beschreibungsTyp]?.[component]?.defaultChildren.find(
      (child: Node) =>
        Element.isElement(child) &&
        child.data_origin === dataOrigin &&
        [undefined, dataType].includes((child as any).data_type)
    )
  )
}

export const ErfassungsRuleDefaultElementFactory = (
  beschreibungsTyp: string,
  component: string
): Omit<Element, 'children'> | undefined => {
  return cloneDeep(
    ErfassungsRules[beschreibungsTyp]?.[component]?.defaultElement
  )
}

export const ErfassungsRuleForComponent = (
  beschreibungsTyp: string,
  component: string
): BeschreibungsKomponentenRule | undefined => {
  return cloneDeep(ErfassungsRules[beschreibungsTyp]?.[component])
}

export const ErfassungsRuleForType = (
  beschreibungsTyp: string
): BeschreibungsKomponentenRule | undefined => {
  return cloneDeep(ErfassungsRules[beschreibungsTyp])
}

export const normdatumElementForType = (
  beschreibungsTyp: string,
  normdatumTyp: string,
  options: Partial<NormdatenTEIElement>
): Element | undefined => {
  if (
    !(beschreibungsTyp in ErfassungsRules) ||
    !(normdatumTyp in ErfassungsRules[beschreibungsTyp].normdata.allowedTypes)
  ) {
    return undefined
  }
  const result = cloneDeep(
    ErfassungsRules[beschreibungsTyp].normdata.allowedTypes[normdatumTyp]
      .defaultElement
  )
  const { role, gndIdentifierOption, normdatenText, identifier } = options
  if (role) {
    result.box.data_role = role
  }
  if (gndIdentifierOption) {
    result.box.data_ref = getUrlForGndId(gndIdentifierOption)
  }
  if (identifier) {
    result.box.data_key = identifier
  }
  if (normdatenText) {
    result.content = normdatenText
  }
  return result
}

export const ComponentTranslation: Record<string, string> = Object.freeze({
  msIdentifier: 'sidebar.identification',
  head: 'sidebar.head',
  physDesc: 'sidebar.physical',
  decoNoteform: 'sidebar.physical_art',
  history: 'sidebar.history',
  msPartbinding: 'sidebar.binding',
  notetext: 'sidebar.content_text',
  noteregister: 'sidebar.content_register',
  msItem: 'sidebar.section',
  decoNotecontent: 'sidebar.iconography',
  msPartfragment: 'sidebar.part',
  msPartbooklet: 'sidebar.booklet',
  msPartother: 'sidebar.other',
  msPartaccMat: 'sidebar.accompanying_material',
  notemusic: 'sidebar.music',
  additional: 'sidebar.literature',
  msContents: 'sidebar.content',
})
