import { render, screen } from '@testing-library/react'
import React from 'react'
import { ComponentSection } from 'src/domain/editor/beschreibungskomponenten/ComponentSection'
import { updateMode } from 'src/domain/erfassung/ErfassungsState'
import ConfigureReduxStore from 'src/infrastructure/ConfigureReduxStore'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Create Test', () => {
  const attributes = TestSlateAttributes.element
  const store = ConfigureReduxStore
  const element = {
    id: '5',
    data_origin: '',
    children: [{ text: '' }],
  }
  it('Render content in preview mode', () => {
    store.dispatch(updateMode('previewMode'))
    render(
      <TestContext>
        <ComponentSection
          attributes={attributes}
          element={element}
          headlineKey={'invalidKey'}
          helpTextKey={'invalidHelpTextKey'}
        >
          <h1 title={'content'}>there</h1>
        </ComponentSection>
      </TestContext>
    )
    expect(screen.getByTitle('content')).toBeTruthy()
  })
  it('Render content in edit mode', () => {
    store.dispatch(updateMode('editMode'))
    render(
      <TestContext>
        <ComponentSection
          attributes={attributes}
          element={element}
          headlineKey={'invalidKey'}
          helpTextKey={'invalidHelpTextKey'}
        >
          <h1 title={'content'}>there</h1>
        </ComponentSection>
      </TestContext>
    )
    expect(screen.getByTitle('content')).toBeTruthy()
  })
})
