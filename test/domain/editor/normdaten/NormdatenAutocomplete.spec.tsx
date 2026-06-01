import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import React from 'react'
import { Slate } from 'slate-react'
import { NormdatenAutocomplete } from 'src/domain/editor/normdaten/NormdatenAutocomplete'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { NormdatenService } from 'src/domain/erfassung/NormdatenService'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('NormdatenAutocomplete Test', () => {
  const editor = createErfassungsEditor()
  const noop = jest.fn()
  test('renderes a combobox', () => {
    const value: GNDEntityFact = {
      preferredName: 'EinsZweiDrei',
      gndIdentifier: '123',
      variantName: [],
      id: '1',
      typeName: 'Place',
    }
    const element = {
      data_origin: 'xxx',
      children: [{ text: '' }],
    }
    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <NormdatenAutocomplete
            gndOptions={[]}
            gndOptionsSetter={noop}
            origin={NormdatenService.nodeLabel.ort}
            termElement={element}
            editor={editor}
            autoCompleteGndEntity={value}
            setAutoCompleteGndEntity={noop}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.findByRole('combobox')).toBeTruthy()
  })
})
