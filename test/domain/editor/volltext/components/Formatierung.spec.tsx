import { render, screen } from '@testing-library/react'
import { Formatierung } from 'src/domain/editor/volltext/components/Formatierung'
import de from 'src/infrastructure/i18n/translation_de.json'
import type { VolltextFormatierung } from 'src/infrastructure/slate/volltext/VolltextElement'
import { TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

describe('Formatierung', () => {
  const formatierungTyp: VolltextFormatierung['data_origin'][] = [
    'incipit',
    'explicit',
    'zitat',
    'autor',
    'werktitel',
  ]
  const attributes = TestSlateAttributes.element
  const box = { data_origin: 'box', children: [{ text: '' }] }

  it.each(formatierungTyp)(
    'renders element %s with translated label',
    (typ) => {
      const element = {
        data_origin: typ,
        children: [{ text: typ }],
        box,
      }
      render(
        <TestContext>
          <Formatierung attributes={attributes} element={element}>
            {typ}
          </Formatierung>
        </TestContext>
      )
      const label = (
        de.text_tagging.formatierung.type as Record<string, string>
      )[typ]
      expect(screen.getByLabelText(label)).toBeVisible()
    }
  )
})
