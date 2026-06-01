import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Element } from 'slate'
import { Editable, Slate } from 'slate-react'
import { AddElementButtonForIdentification } from 'src/domain/editor/beschreibungskomponenten/identifikation/AddElementButtonForIdentification'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('AddElementButtonForIdentification', () => {
  it('renders button with label', () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()

    render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            type={'vorbesitzer'}
            path={'msIdentifier'}
            msIdentifierChildren={[]}
          >
            Label
          </AddElementButtonForIdentification>
        </Slate>
      </TestContext>
    )

    expect(screen.getByRole('button', { name: 'Label' })).toBeTruthy()
  })

  const identifier = {
    data_origin: 'msIdentifier',
  }
  const ort = {
    data_origin: 'settlement',
    children: [{ text: 'Berlin' }],
  }
  const koerperschaft = {
    data_origin: 'repository',
    children: [{ text: 'Staatsbibliothek zu Berlin' }],
  }
  const idno = {
    data_origin: 'idno',
    children: [
      {
        text: 'dolor sit amet',
      },
    ],
  }
  const hspId = {
    data_origin: 'altIdentifier',
    data_type: 'hsp-ID',
    children: [
      {
        data_origin: 'collection',
        children: [
          {
            text: 'Handschriftenportal Kulturobjektdokument-ID',
          },
        ],
      },
      {
        data_origin: 'idno',
        children: [
          {
            text: 'HSP_123456-a7891234-a56789',
          },
        ],
      },
    ],
  }
  const sammlung = {
    data_origin: 'altIdentifier',
    data_type: 'corpus',
    children: [
      {
        data_origin: 'collection',
        children: [
          {
            text: 'Sammlung lorem Ipsum',
          },
        ],
      },
      {
        data_origin: 'idno',
        children: [
          {
            text: 'dolor sit amet',
          },
        ],
      },
    ],
  }
  const vorbesitzer = {
    data_origin: 'altIdentifier',
    data_type: 'former',
    children: [
      {
        data_origin: 'settlement',
        data_key: '26cf9267-82fe-3bf1-a37-c9960658499f',
        children: [
          {
            text: 'Regensburg',
          },
        ],
      },
      {
        data_origin: 'repository',
        data_key: '654a4abc-3191-3e68-995b-4fdbd157cf9d',
        children: [
          {
            region: 'altIdentifierformer',
            text: 'Sankt Emmeran',
          },
        ],
      },
      {
        data_origin: 'idno',
        children: [
          {
            text: 'St. Emm 57',
          },
        ],
      },
    ],
  }

  it('add new former to the end of hsp-id, corpus, former', async () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true,
    })
    const element = {
      ...identifier,
      children: [ort, koerperschaft, idno, hspId, sammlung, vorbesitzer],
    }

    render(
      <TestContext store={store}>
        <Slate initialValue={[element]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            msIdentifierChildren={element.children}
            type={'vorbesitzer'}
            path={'msIdentifier'}
          >
            Vorbesitzersignatur
          </AddElementButtonForIdentification>
        </Slate>
      </TestContext>
    )

    let identifikation = editor.children[0] as Element

    expect(identifikation.children.length).toBe(6)
    expect(identifikation.children).toMatchObject([
      { data_origin: 'settlement' },
      { data_origin: 'repository' },
      { data_origin: 'idno' },
      { data_origin: 'altIdentifier', data_type: 'hsp-ID' },
      { data_origin: 'altIdentifier', data_type: 'corpus' },
      { data_origin: 'altIdentifier', data_type: 'former' },
    ])

    await userEvent.click(
      screen.getByRole('button', { name: 'Vorbesitzersignatur' })
    )

    identifikation = editor.children[0] as Element

    expect(identifikation.children.length).toBe(7)
    expect(identifikation.children).toMatchObject([
      { data_origin: 'settlement' },
      { data_origin: 'repository' },
      { data_origin: 'idno' },
      { data_origin: 'altIdentifier', data_type: 'hsp-ID' },
      { data_origin: 'altIdentifier', data_type: 'corpus' },
      { data_origin: 'altIdentifier', data_type: 'former' },
      { data_origin: 'altIdentifier', data_type: 'former' },
    ])
  })

  it('add new former to the end of hsp-id, corpus', async () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true,
    })
    const element = {
      ...identifier,
      children: [ort, koerperschaft, idno, hspId, sammlung],
    }
    render(
      <TestContext store={store}>
        <Slate initialValue={[element]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            msIdentifierChildren={element.children}
            type={'vorbesitzer'}
            path={'msIdentifier'}
          >
            Vorbesitzersignatur
          </AddElementButtonForIdentification>
        </Slate>
      </TestContext>
    )

    let identifikation = editor.children[0] as Element

    expect(identifikation.children.length).toBe(5)
    expect(identifikation.children).toMatchObject([
      { data_origin: 'settlement' },
      { data_origin: 'repository' },
      { data_origin: 'idno' },
      { data_origin: 'altIdentifier', data_type: 'hsp-ID' },
      { data_origin: 'altIdentifier', data_type: 'corpus' },
    ])

    await userEvent.click(
      screen.getByRole('button', { name: 'Vorbesitzersignatur' })
    )

    identifikation = editor.children[0] as Element

    expect(identifikation.children.length).toBe(6)
    expect(identifikation.children).toMatchObject([
      { data_origin: 'settlement' },
      { data_origin: 'repository' },
      { data_origin: 'idno' },
      { data_origin: 'altIdentifier', data_type: 'hsp-ID' },
      { data_origin: 'altIdentifier', data_type: 'corpus' },
      { data_origin: 'altIdentifier', data_type: 'former' },
    ])
  })

  it('add new corpus to hsp-id, corpus, former', async () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true,
    })
    const element = {
      ...identifier,
      children: [ort, koerperschaft, idno, hspId, sammlung, vorbesitzer],
    }
    render(
      <TestContext>
        <Slate initialValue={[element]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            msIdentifierChildren={element.children}
            type={'sammlung'}
            path={'msIdentifier'}
          >
            Corpus
          </AddElementButtonForIdentification>
        </Slate>
      </TestContext>
    )

    let identifikation = editor.children[0] as Element

    expect(identifikation.children.length).toBe(6)
    expect(identifikation.children).toMatchObject([
      { data_origin: 'settlement' },
      { data_origin: 'repository' },
      { data_origin: 'idno' },
      { data_origin: 'altIdentifier', data_type: 'hsp-ID' },
      { data_origin: 'altIdentifier', data_type: 'corpus' },
      { data_origin: 'altIdentifier', data_type: 'former' },
    ])

    await userEvent.click(screen.getByRole('button', { name: 'Corpus' }))

    identifikation = editor.children[0] as Element

    expect(identifikation.children.length).toBe(7)
    expect(identifikation.children).toMatchObject([
      { data_origin: 'settlement' },
      { data_origin: 'repository' },
      { data_origin: 'idno' },
      { data_origin: 'altIdentifier', data_type: 'hsp-ID' },
      { data_origin: 'altIdentifier', data_type: 'corpus' },
      { data_origin: 'altIdentifier', data_type: 'corpus' },
      { data_origin: 'altIdentifier', data_type: 'former' },
    ])
  })

  it('add new former without any alternative identifer', async () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true,
    })

    const element = {
      ...identifier,
      children: [ort, koerperschaft, idno],
    }
    render(
      <TestContext>
        <Slate initialValue={[element]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            msIdentifierChildren={element.children}
            type={'vorbesitzer'}
            path={'msIdentifier'}
          >
            Vorbesitzersignatur
          </AddElementButtonForIdentification>
        </Slate>
      </TestContext>
    )

    let identifikation = editor.children[0] as Element

    expect(identifikation.children.length).toBe(3)
    expect(identifikation.children).toMatchObject([
      { data_origin: 'settlement' },
      { data_origin: 'repository' },
      { data_origin: 'idno' },
    ])

    await userEvent.click(
      screen.getByRole('button', { name: 'Vorbesitzersignatur' })
    )

    identifikation = editor.children[0] as Element

    expect(identifikation.children.length).toBe(4)
    expect(identifikation.children).toMatchObject([
      { data_origin: 'settlement' },
      { data_origin: 'repository' },
      { data_origin: 'idno' },
      { data_origin: 'altIdentifier', data_type: 'former' },
    ])
  })

  it('add new corpus without any alternative identifier', async () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()
    store.dispatch({
      type: 'erfassung/writeDocument',
      payload: true,
    })
    const element = {
      data_origin: 'msIdentifier',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier',
      component: 'msIdentifier',
      level: 1,
      id: 'c6fa173f-dcf2-4ce0-ad1f-1f4c74bd0bf9',
      children: [
        {
          data_origin: 'settlement',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
          component: '',
          level: 1,
          id: 'd3b60e07-47d9-4005-9ae1-e406ac55c7dd',
          data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
          children: [
            {
              region: 'msIdentifier',
              text: 'Berlin',
            },
          ],
        },
        {
          data_origin: 'repository',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
          component: '',
          level: 1,
          id: 'ba18e596-36cd-4492-bf67-7f22c8c4e789',
          data_key: '6790851b-9519-3874-a9fd-0839d494a3c9',
          children: [
            {
              region: 'msIdentifier',
              text: 'Staatsbibliothek zu\n            Berlin',
            },
          ],
        },
        {
          data_origin: 'idno',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
          component: '',
          level: 1,
          id: '65e26a8f-3d81-439a-b2de-a0b1c108740c',
          children: [
            {
              region: 'msIdentifier',
              text: 'dolor sit amet',
            },
          ],
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={[element]} editor={editor}>
          <Editable />
          <AddElementButtonForIdentification
            msIdentifierChildren={element.children}
            type={'sammlung'}
            path={'msIdentifier'}
          >
            Corpus
          </AddElementButtonForIdentification>
        </Slate>
      </TestContext>
    )

    let identifikation = editor.children[0] as Element

    expect(identifikation.children.length).toBe(3)
    expect(identifikation.children).toMatchObject([
      { data_origin: 'settlement' },
      { data_origin: 'repository' },
      { data_origin: 'idno' },
    ])

    await userEvent.click(screen.getByRole('button', { name: 'Corpus' }))

    identifikation = editor.children[0] as Element
    expect(identifikation.children.length).toBe(4)
    expect(identifikation.children).toMatchObject([
      { data_origin: 'settlement' },
      { data_origin: 'repository' },
      { data_origin: 'idno' },
      { data_origin: 'altIdentifier', data_type: 'corpus' },
    ])
  })
})
