import { render, screen } from '@testing-library/react'
import React from 'react'
import { Slate } from 'slate-react'
import { OrigPlaceNormdatenVerknuepfung } from 'src/domain/editor/beschreibungskomponenten/kopf/OrigPlaceNormdatenVerknuepfung'
import { writeDocument } from 'src/domain/erfassung/ErfassungsState'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import type { OrigPlaceNormTermElement } from 'src/infrastructure/slate/HSPElement'
import { configureTestStore, TestContext } from 'test/TestContext'

const origPlaceGndId = {
  data_origin: 'term',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index-term',
  component: '',
  level: 1,
  id: 'a7c26131-d40d-47c8-8227-f941e58a9b8d',
  data_type: 'origPlace_norm',
  data_ref: '123',
  data_key: '123',
  children: [
    {
      region: 'head',
      text: '4007405-5',
    },
  ],
} as unknown as OrigPlaceNormTermElement

describe('OrigPlaceNormdatenVerknuepfung Test', () => {
  const editor = createErfassungsEditor()

  it('OrigPlaceNormdatenVerknuepfung', () => {
    const store = configureTestStore()
    store.dispatch(writeDocument())

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <OrigPlaceNormdatenVerknuepfung element={origPlaceGndId} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Normdaten', { exact: false })).toBeTruthy()
  })
})
