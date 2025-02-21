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

import {
  extractNormdatumLinks,
  extractText,
} from '../../../src/infrastructure/slate/SlateBoundary'

const msIdentifier = {
  data_origin: 'msIdentifier',
  region: 'msIdentifier',
  path: '#document-TEI-text-body-msDesc-msIdentifier',
  component: 'msIdentifier',
  level: 5,
  id: '3ccd3f2c-9cf6-4416-8924-2e7fb0eec00e',
  children: [
    {
      data_origin: 'settlement',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
      component: '',
      level: 6,
      id: '5f03a690-5923-4fd1-acf8-1cd10a49ea2c',
      data_key: '0bea98de-2838-374d-8a56-16ef6c9a39f2',
      data_ref: '4011077-1',
      children: [
        {
          region: 'msIdentifier',
          text: 'Darmstadt',
        },
      ],
    },
    {
      data_origin: 'repository',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
      component: '',
      level: 6,
      id: '2a974608-7c37-4032-9f5e-31fcf031851c',
      data_key: '1eb44b0f-430d-36c7-9b4e-39af3472714d',
      data_ref: '10073682-8',
      children: [
        {
          region: 'msIdentifier',
          text: 'Universitäts- und Landesbibliothek Darmstadt',
        },
      ],
    },
    {
      data_origin: 'idno',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
      component: '',
      level: 6,
      id: '742c7003-bda9-442b-99ad-eb68be454d4b',
      children: [
        {
          region: 'msIdentifier',
          text: 'Hs 1004',
        },
      ],
    },
    {
      data_origin: 'altIdentifier',
      region: 'altIdentifierhsp-ID',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
      component: '',
      level: 6,
      id: '11b71e11-9538-42b6-bb02-09e75543f46a',
      data_type: 'hsp-ID',
      children: [
        {
          data_origin: 'collection',
          region: 'altIdentifierhsp-ID',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
          component: '',
          level: 7,
          id: '70ec927a-44f6-4bd4-81dc-bdd94ff889df',
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
          level: 7,
          id: 'a5055678-aa0a-4896-b075-6f9df171d515',
          children: [
            {
              region: 'altIdentifierhsp-ID',
              text: 'HSP-3bbfb69a-88c2-3c50-8e79-e86a2b7a15e0',
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
  level: 5,
  id: 'ba0f49d5-ddc6-4a54-a019-77bbd17348b5',
  children: [
    {
      data_origin: 'index',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index',
      component: '',
      level: 6,
      id: '97b74f41-8f67-435a-806d-b388bf2e6663',
      data_indexName: 'norm_title',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'fc801026-4b0c-441b-81b5-d8a360d48831',
          data_type: 'title',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
      ],
    },
    {
      data_origin: 'title',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-title',
      component: '',
      level: 6,
      id: 'e313b885-14bf-4471-bee7-0688d75ea976',
      children: [
        {
          region: 'head',
          text: '',
        },
      ],
    },
    {
      data_origin: 'note',
      region: 'noteheadline',
      path: '#document-TEI-text-body-msDesc-head-note',
      component: '',
      level: 6,
      id: 'c5ed8ef1-7ca2-4435-ad68-358daf501c25',
      data_type: 'headline',
      children: [
        {
          region: 'noteheadline',
          text: '',
        },
      ],
    },
    {
      data_origin: 'index',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index',
      component: '',
      level: 6,
      id: '17b68327-7ebf-430e-8de9-ff41d06cbaac',
      data_indexName: 'norm_material',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '29c130c3-f756-466a-a7f2-d592aca9b57b',
          data_type: 'material',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'f9716759-0b34-4a65-8a53-87fdaeb3440c',
          data_type: 'material_type',
          children: [
            {
              region: 'head',
              text: '',
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
      level: 6,
      id: '7256732c-f1e8-469f-8d61-fdeb001c965f',
      data_indexName: 'norm_measure',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'a84ef010-a42b-461a-bdf1-d2aaff688212',
          data_type: 'measure',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '109bfe49-715d-4411-b14f-e23f3a011187',
          data_type: 'measure_noOfLeaves',
          children: [
            {
              region: 'head',
              text: '',
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
      level: 6,
      id: '1a346c2a-eb55-4114-8dae-7d1583535361',
      data_indexName: 'norm_dimensions',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'aacc79da-3530-44a1-8d2d-fa8e2aa2fba4',
          data_type: 'dimensions',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '955ece18-2880-48b8-aac2-6818616cb925',
          data_type: 'height',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'a38d024d-a0ce-479f-9a7c-d5af66bd8272',
          data_type: 'width',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '519463d2-d6a3-4415-bc17-64ad2ce1f7a8',
          data_type: 'depth',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'a5690048-15e9-4603-ba23-5652eac404be',
          data_type: 'dimensions_typeOfInformation',
          children: [
            {
              region: 'head',
              text: '',
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
      level: 6,
      id: '2062d265-583b-4113-9c67-bc6307b109b3',
      data_indexName: 'norm_format',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '3b0dd956-e893-4700-8b97-76d55f7b4ea8',
          data_type: 'format',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '415f8454-13ce-49c1-8517-1d8aa89aec91',
          data_type: 'format_typeOfInformation',
          children: [
            {
              region: 'head',
              text: '',
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
      level: 6,
      id: '7abf2778-a1b8-489f-a93f-65124e8236d4',
      data_indexName: 'norm_origPlace',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '26e395a3-8c3b-40e3-bfa5-5dc88a5c1dd1',
          data_type: 'origPlace',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'd6311de6-18fd-4462-bd10-ea1d2b0304c3',
          data_key: '__hsp_uuid__',
          data_ref: '__gnd-id__',
          data_type: 'origPlace_norm',
          children: [
            {
              region: 'head',
              text: '',
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
      level: 6,
      id: 'eaff9cde-607c-4e6a-b527-76e011bce205',
      data_indexName: 'norm_origDate',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'fd9e70a1-3775-4a2f-8514-757291910a51',
          data_type: 'origDate',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '4b2956f3-5bcd-475d-8113-9d3c1c27cff1',
          data_type: 'origDate_notBefore',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '96b7b60a-c884-42fb-a6e9-717a2903cf45',
          data_type: 'origDate_notAfter',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '64cff3f6-6185-4a8a-8d1d-4079c06fb371',
          data_type: 'origDate_type',
          children: [
            {
              region: 'head',
              text: '',
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
      level: 6,
      id: '98768196-b90c-4c7d-ba7c-060fe22ed1b7',
      data_indexName: 'norm_textLang',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '3cea922e-1df3-41f9-a5f5-33be73a36a65',
          data_type: 'textLang',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'bccbf5bc-83fd-4cf7-80da-ae180a19c43a',
          data_type: 'textLang-ID',
          children: [
            {
              region: 'head',
              text: '',
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
      level: 6,
      id: '730ced4d-0f16-4056-a08d-06ad4a522f9c',
      data_indexName: 'norm_form',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '665c1637-eb71-4726-a2b8-d9ed10cb76c8',
          data_type: 'form',
          children: [
            {
              region: 'head',
              text: '',
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
      level: 6,
      id: '71131bf0-10c9-448e-9ea7-ae0c99aa94e9',
      data_indexName: 'norm_status',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'd06aa139-32f2-4870-aa98-0f728f85efd6',
          data_type: 'status',
          children: [
            {
              region: 'head',
              text: '',
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
      level: 6,
      id: '19a38201-3218-4aaa-afaa-d2c4cf2f8818',
      data_indexName: 'norm_decoration',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: '385c6162-e02f-40f1-bd33-67ed90f61c9d',
          data_type: 'decoration',
          children: [
            {
              region: 'head',
              text: '',
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
      level: 6,
      id: '03ec6c92-9a61-4ce5-9c1e-bf23dd0d4010',
      data_indexName: 'norm_musicNotation',
      children: [
        {
          data_origin: 'term',
          region: 'head',
          path: '#document-TEI-text-body-msDesc-head-index-term',
          component: '',
          level: 7,
          id: 'f62d8a17-5542-40a6-ab17-737997d500e0',
          data_type: 'musicNotation',
          children: [
            {
              region: 'head',
              text: '',
            },
          ],
        },
      ],
    },
  ],
}
const volltext = {
  data_origin: 'Volltext',
  children: [
    {
      data_origin: 'paragraph',
      children: [
        {
          text: ' Ein ',
        },
        {
          data_origin: 'ort',
          content: 'Ort',
          children: [{ text: '' }],
          box: {
            data_origin: 'placeName',
            children: [
              {
                text: 'Ort',
              },
            ],
            data_role: 'origin',
            data_ref: 'http://d-nb.info/gnd/4005728-8',
          },
        },
        {
          text: ', eine ',
        },
        {
          data_origin: 'person',
          content: 'Person',
          children: [{ text: '' }],
          box: {
            data_origin: 'persName',
            children: [
              {
                text: 'Person',
              },
            ],
            data_role: 'commissionedBy',
            data_ref: 'http://d-nb.info/gnd/1228671265',
          },
        },
        {
          text: ' und eine ',
        },
        {
          data_origin: 'koerperschaft',
          content: 'Organisation',
          children: [{ text: '' }],
          box: {
            data_origin: 'orgName',
            children: [
              {
                text: 'Organisation',
              },
            ],
            data_role: 'commissionedBy',
            data_ref: 'http://d-nb.info/gnd/5036103-X',
          },
        },
      ],
    },
  ],
}
const multipleRoleNode = {
  data_origin: 'person',
  box: {
    data_role: 'commissionedBy          author',
    data_ref: 'http://d-nb.info/gnd/1228671265',
  },
  content: 'Person',
  children: [
    {
      text: '',
    },
  ],
}
const unknownRoleNode = {
  data_origin: 'person',
  content: 'Person',
  box: {
    data_role: 'UNKNOWN_DATA_ROLE',
    data_ref: 'http://d-nb.info/gnd/1228671265',
  },
  children: [
    {
      text: '',
    },
  ],
}
const invalidRoleNode = {
  data_origin: 'INVALID_DATA_ORIGIN',
  content: 'Person',
  box: {
    data_role: 'UNKNOWN_DATA_ROLE',
    data_ref: 'http://d-nb.info/gnd/1228671265',
  },
  children: [
    {
      text: '',
    },
  ],
}

describe('Extract text from slate value', () => {
  test('msIdentifier contains "Darmstadt"', () => {
    expect(extractText(msIdentifier)).toContain('Darmstadt')
  })
})

describe('Extracting from valid node', () => {
  test('msIdentifier contains two normdata', () => {
    expect(extractNormdatumLinks(msIdentifier).length).toBe(2)
  })
  test('freetext normdata get recognized', () => {
    expect(extractNormdatumLinks(volltext).length).not.toBe(0)
  })
  test('head has no normdatum', () => {
    expect(extractNormdatumLinks(head).length).toBe(0)
  })
  test('returns empty list of normdata', () => {
    expect(extractNormdatumLinks(unknownRoleNode)).toMatchObject([
      { roles: ['UNKNOWN_DATA_ROLE'] },
    ])
  })
})

describe('Extracting multiple roles', () => {
  test('splits roles correctly', () => {
    expect(extractNormdatumLinks(multipleRoleNode)[0].roles.length).toBe(2)
  })
})

describe('Extracting from invalid node', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
  })
  test('does not throw', () => {
    expect(() => extractNormdatumLinks(invalidRoleNode)).not.toThrow()
  })
})
