import type { Element } from 'slate'
import type { NormdatenTEIElement } from 'src/domain/editor/normdaten/NormdatenTEIElement'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import type { VolltextNormdatum } from 'src/infrastructure/slate/volltext/VolltextElement'

import { VolltextEditorElement } from './volltext/VolltextEditorElement'

const komponenten = [
  'msIdentifier',
  'head',
  'physDesc',
  'decoNoteform',
  'history',
  'msPartbinding',
  'msContents',
  'notetext',
  'noteregister',
  'msItem',
  'decoNotecontent',
  'msPartfragment',
  'msPartbooklet',
  'msPartother',
  'msPartaccMat',
  'notemusic',
  'additional',
] as const

export type Komponente = (typeof komponenten)[number]

type Normdatum = 'person' | 'koerperschaft' | 'ort'

type KomponentenRegel = Readonly<{
  allowedNumbers: '1' | 'multi'
  required: boolean
  duplicate: boolean
  allowedComponents: Komponente[]
  allowedIn: Komponente[]
  allowedFollower: Komponente[]
  allowedPredecessor: Komponente[]
  wrapperElement?: {
    data_origin: string
    inKomponente: Set<Komponente>
  }
}>

type IndexTermRegel = Readonly<{
  repeatable: boolean
  required: boolean
}>

type ErfassungsElementRegel = {
  empty: boolean
  required: boolean
}

export type ErfassungsRegeln = {
  komponenteElement(komponente: Komponente): Element
  komponentenLabel(komponente: string): string
  komponentenRegel(komponente: Komponente): KomponentenRegel
  wrappedElement(komponente: Komponente): Element | undefined
  rootKomponenten(): Readonly<Komponente[]>
  normdatumElement(
    normdatum: Normdatum,
    options?: Partial<NormdatenTEIElement>
  ): VolltextNormdatum
  komponentenReihenfolge(a: Komponente, b: Komponente): number
  indexRegel(indexName: string): IndexTermRegel
  termRegel(indexName: string, termName: string): IndexTermRegel
  termValues(termName: string): Readonly<string[]>
  regionRegel(regionName: string): ErfassungsElementRegel
  regionElementRegel(
    regionName: string,
    elementName: string
  ): ErfassungsElementRegel
  isRegion(regionName: string): boolean
  isWrapperElement(element: Element): boolean
  isKomponente(s: string): s is Komponente
}

const komponentenElemente = {
  msIdentifier: {
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
    data_origin: 'head',
    region: 'head',
    component: 'head',
    children: [
      {
        data_origin: 'index',
        region: 'head',
        data_indexName: 'norm_title',
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
        path: '#document-TEI-text-body-msDesc-head-index',
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
                text: '',
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
    data_origin: 'physDesc',
    region: 'physDesc',
    component: 'physDesc',
    children: [
      {
        data_origin: 'p',
        children: [VolltextEditorElement.emptyVolltext()],
      },
    ],
  },
  decoNoteform: {
    data_origin: 'decoNote',
    region: 'decoNoteform',
    component: 'decoNoteform',
    data_type: 'form',
    children: [VolltextEditorElement.emptyVolltext()],
  },
  history: {
    data_origin: 'history',
    region: 'history',
    component: 'history',
    children: [
      {
        data_origin: 'p',
        children: [VolltextEditorElement.emptyVolltext()],
      },
    ],
  },
  msPartbinding: {
    data_origin: 'msPart',
    region: 'msPart',
    component: 'msPartbinding',
    data_type: 'binding',
    children: [
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
                    text: '',
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
      {
        data_origin: 'physDesc',
        region: 'physDesc',
        component: 'physDesc',
        children: [
          {
            data_origin: 'p',
            children: [VolltextEditorElement.emptyVolltext()],
          },
        ],
      },
    ],
  },
  msContents: {
    data_origin: 'msContents',
    region: 'msContents',
    component: 'msContents',
    children: [
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
    data_origin: 'note',
    region: 'note',
    component: 'notetext',
    data_type: 'text',
    children: [VolltextEditorElement.emptyVolltext()],
  },
  noteregister: {
    data_origin: 'note',
    region: 'note',
    component: 'noteregister',
    data_type: 'register',
    children: [{ text: '' }],
  },
  msItem: {
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
  decoNotecontent: {
    data_origin: 'decoNote',
    region: 'decoNote',
    component: 'decoNotecontent',
    data_type: 'content',
    children: [VolltextEditorElement.emptyVolltext()],
  },
  msPartfragment: {
    data_origin: 'msPart',
    region: 'msPart',
    component: 'msPartfragment',
    data_type: 'fragment',
    children: [
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
                    text: '',
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
    data_origin: 'msPart',
    region: 'msPart',
    component: 'msPartbooklet',
    data_type: 'booklet',

    children: [
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
                    text: '',
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
    data_origin: 'msPart',
    data_type: 'other',
    component: 'msPartother',
    region: 'msPart',
    children: [
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
      {
        data_origin: 'p',
        children: [VolltextEditorElement.emptyVolltext()],
      },
    ],
  },
  msPartaccMat: {
    data_origin: 'msPart',
    region: 'msPart',
    component: 'msPartaccMat',
    data_type: 'accMat',
    children: [
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
                    text: '',
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
    data_origin: 'note',
    region: 'note',
    component: 'notemusic',
    data_type: 'music',
    children: [VolltextEditorElement.emptyVolltext()],
  },
  additional: {
    data_origin: 'additional',
    region: 'additional',
    component: 'additional',
    children: [
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
}

const defaultNormdatum: Record<Normdatum, () => VolltextNormdatum> = {
  person() {
    return {
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
    }
  },
  koerperschaft() {
    return {
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
    }
  },
  ort() {
    return {
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
    }
  },
}

const komponentenRegeln: Readonly<Record<Komponente, KomponentenRegel>> = {
  msIdentifier: {
    // Komponente Identifikation
    allowedNumbers: '1',
    required: true,
    duplicate: false,
    allowedComponents: [],
    allowedIn: [
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
  },
  head: {
    // Komponente Kopf
    allowedNumbers: '1',
    required: true,
    duplicate: false,
    allowedComponents: [],
    allowedIn: [
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
  },
  physDesc: {
    // Komponente Äußeres
    allowedNumbers: '1',
    required: false,
    duplicate: false,
    allowedComponents: ['decoNoteform'],
    allowedIn: [
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
  },
  decoNoteform: {
    // Komponente Äußeres (Kunst)
    allowedNumbers: 'multi',
    required: false,
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
      inKomponente: new Set(['physDesc']),
    },
  },
  history: {
    // Komponente Geschichte
    allowedNumbers: '1',
    required: false,
    duplicate: false,
    allowedComponents: [],
    allowedIn: [
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
  },
  msPartbinding: {
    // Komponente Einband
    allowedNumbers: 'multi',
    required: false,
    duplicate: false,
    allowedComponents: [
      'msIdentifier',
      'head',
      'physDesc',
      'history',
      'msContents',
      'msPartfragment',
    ],
    allowedIn: [],
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
  },
  msContents: {
    // Komponente Inhalt
    allowedNumbers: '1',
    required: false,
    duplicate: false,
    allowedComponents: ['msItem'],
    allowedIn: [
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
  },
  notetext: {
    // Komponente Inhalt (Text)
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
  },
  noteregister: {
    // Komponente Inhalt (Register)
    allowedNumbers: 'multi',
    required: false,
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
  },
  msItem: {
    // Komponente Abschnitt
    allowedNumbers: 'multi',
    required: false,
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
  },
  decoNotecontent: {
    // Komponente Inhalt (Kunst)
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
  },
  msPartfragment: {
    // Komponente Fragment
    allowedNumbers: 'multi',
    required: false,
    duplicate: true,
    allowedComponents: [
      'msIdentifier',
      'head',
      'physDesc',
      'history',
      'msContents',
    ],
    allowedIn: ['msPartbinding', 'msPartbooklet'],
    allowedFollower: ['msPartfragment', 'msPartaccMat', 'msPartother'],
    allowedPredecessor: ['msContents', 'msPartbooklet', 'msPartfragment'],
  },
  msPartbooklet: {
    // Komponente Faszikel
    allowedNumbers: 'multi',
    required: false,
    duplicate: true,
    allowedComponents: [
      'msIdentifier',
      'head',
      'physDesc',
      'history',
      'msContents',
      'msPartfragment',
    ],
    allowedIn: [],
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
  },
  msPartother: {
    // Komponente Sonstiges
    allowedNumbers: '1',
    required: false,
    duplicate: false,
    allowedComponents: [],
    allowedIn: [],
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
  },
  msPartaccMat: {
    // Komponente Beigabe
    allowedNumbers: 'multi',
    required: false,
    duplicate: false,
    allowedComponents: [
      'msIdentifier',
      'head',
      'physDesc',
      'history',
      'msContents',
    ],
    allowedIn: [],
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
  },
  additional: {
    // Komponente Literatur
    allowedNumbers: '1',
    required: false,
    duplicate: false,
    allowedComponents: [],
    allowedIn: [
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
  },
}

const rootKomponenten: Komponente[] = [
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
]

const wrapperElements = new Set(['decoDesc'])
const reihenfolge: Record<Komponente, number> = {
  msIdentifier: 0,
  head: 1,
  physDesc: 2,
  msPartbinding: 3,
  history: 4,
  additional: 5,
  msContents: 6,
  msPartbooklet: 7,
  msPartfragment: 8,
  msPartaccMat: 9,
  msPartother: 10,
  msItem: 11,
  decoNoteform: 12,
  notetext: 13,
  decoNotecontent: 14,
  notemusic: 15,
  noteregister: 16,
}

const defaultIndexTermRegel: IndexTermRegel = {
  repeatable: false,
  required: false,
}

const indexTermRegeln: Record<
  string,
  { regel: IndexTermRegel; term: Record<string, IndexTermRegel> }
> = {
  norm_format: {
    regel: {
      repeatable: true,
      required: true,
    },
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
  norm_material: {
    regel: {
      repeatable: false,
      required: false,
    },
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
  norm_dimensions: {
    regel: {
      repeatable: true,
      required: true,
    },
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
  norm_origPlace: {
    regel: {
      repeatable: false,
      required: false,
    },
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
  norm_origDate: {
    regel: {
      repeatable: true,
      required: true,
    },
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
  norm_form: {
    regel: {
      repeatable: false,
      required: false,
    },
    term: {
      form: {
        repeatable: false,
        required: false,
      },
    },
  },
  norm_status: {
    regel: {
      repeatable: false,
      required: false,
    },
    term: {
      status: {
        repeatable: false,
        required: false,
      },
    },
  },
  norm_measure: {
    regel: {
      repeatable: false,
      required: false,
    },
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
  norm_decoration: {
    regel: {
      repeatable: false,
      required: false,
    },
    term: {
      decoration: {
        repeatable: false,
        required: false,
      },
    },
  },
  norm_musicNotation: {
    regel: {
      repeatable: false,
      required: false,
    },
    term: {
      musicNotation: {
        repeatable: false,
        required: false,
      },
    },
  },
  norm_textLang: {
    regel: {
      repeatable: false,
      required: false,
    },
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
}

const defaultErfassungsElementRegel: ErfassungsElementRegel = {
  empty: false,
  required: false,
}

const regionRegeln: Record<
  string,
  {
    regel?: ErfassungsElementRegel
    element?: Record<string, ErfassungsElementRegel>
  }
> = {
  'altIdentifierhsp-ID': {
    element: {
      idno: {
        empty: false,
        required: true,
      },
    },
  },
  altIdentifiercorpus: {
    regel: {
      empty: false,
      required: false,
    },
    element: {
      collection: {
        empty: true,
        required: false,
      },
      idno: {
        empty: false,
        required: true,
      },
    },
  },
  altIdentifierformer: {
    regel: {
      empty: false,
      required: false,
    },
    element: {
      settlement: {
        empty: true,
        required: false,
      },
      repository: {
        empty: true,
        required: false,
      },
      idno: {
        empty: true,
        required: true,
      },
    },
  },
  settlement: {
    regel: {
      empty: false,
      required: true,
    },
  },
  msPart: {
    element: {
      settlement: {
        empty: false,
        required: false,
      },
      repository: {
        empty: false,
        required: false,
      },
    },
  },
  repository: {
    regel: {
      empty: false,
      required: true,
    },
  },
  idno: {
    regel: {
      empty: true,
      required: true,
    },
  },
}

const termValues: Record<string, Readonly<string[]>> = {
  form: [
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
  status: [
    '',
    'existent',
    'missing',
    'destroyed',
    'dismembered',
    'unknown',
    'displaced',
  ],
  format: [
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
  material_type: [
    '',
    'paper',
    'parchment',
    'papyrus',
    'palm',
    'linen',
    'other',
  ],
  msPartbinding_material_type: [
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
}

const regionsSet = new Set([
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
])

const komponentenSet = new Set<string>(komponenten)

const komponentenLabel: Record<string, string> = Object.freeze({
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

const wrappedElemente: Partial<Record<Komponente, Element>> = {
  decoNoteform: {
    data_origin: 'decoDesc',
    children: [komponentenElemente.decoNoteform],
  },
}

export const ErfassungsRegeln: ErfassungsRegeln = {
  komponentenLabel(komponente) {
    return komponentenLabel[komponente] ?? komponente
  },
  komponenteElement(komponente) {
    return HSPElement.copy(komponentenElemente[komponente])
  },
  wrappedElement(komponente) {
    return (
      wrappedElemente[komponente] &&
      HSPElement.copy(wrappedElemente[komponente])
    )
  },
  komponentenRegel(komponente) {
    return komponentenRegeln[komponente]
  },
  normdatumElement(normdatum, options) {
    const result = defaultNormdatum[normdatum]()
    if (!options) {
      return result
    }
    const { role, gndIdentifierOption, normdatenText, identifier } = options
    const box = result.box
    if (role) {
      box.data_role = role
    }
    if (gndIdentifierOption) {
      box.data_ref = NormdatenUtilities.idToUrl(gndIdentifierOption)
    }
    if (identifier) {
      box.data_key = identifier
    }
    if (normdatenText) {
      result.content = normdatenText
    }
    return result
  },
  komponentenReihenfolge(a, b) {
    return reihenfolge[a] - reihenfolge[b]
  },
  indexRegel(indexName) {
    return indexTermRegeln[indexName]?.regel ?? defaultIndexTermRegel
  },
  termRegel(indexName, termName) {
    return indexTermRegeln[indexName]?.term?.[termName] ?? defaultIndexTermRegel
  },
  termValues(termName) {
    return termValues[termName] ?? []
  },
  regionRegel(regionName) {
    return regionRegeln[regionName]?.regel ?? defaultErfassungsElementRegel
  },
  regionElementRegel(regionName, elementName) {
    return (
      regionRegeln[regionName]?.element?.[elementName] ??
      defaultErfassungsElementRegel
    )
  },
  isRegion(regionName) {
    return regionsSet.has(regionName)
  },
  rootKomponenten() {
    return rootKomponenten
  },
  isWrapperElement(element) {
    return wrapperElements.has(element.data_origin)
  },
  isKomponente(s): s is Komponente {
    return komponentenSet.has(s)
  },
}
