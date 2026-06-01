import { render, screen } from '@testing-library/react'
import { XMLVorschauDialog } from 'src/domain/toolbar/dialog/XMLVorschauDialog'
import de from 'src/infrastructure/i18n/translation_de.json'
import { XMLTransformation } from 'src/infrastructure/slate/transformation/XMLTransformation'
import Loader from 'test/LoadPublic'
import { TestContext } from 'test/TestContext'

describe('XML Vorschau Dialog', () => {
  const { transform } = XMLTransformation
  const { data: document } = transform({ data: Loader.loremIpsum() })

  it('renders a dialog', () => {
    render(
      <TestContext>
        <XMLVorschauDialog document={document} />
      </TestContext>
    )
    expect(screen.getByRole('dialog')).toBeVisible()
  })

  it('title is translated', () => {
    render(
      <TestContext>
        <XMLVorschauDialog document={document} />
      </TestContext>
    )
    expect(
      screen.getByRole('heading', { name: de.xml_preview_dialog.title })
    ).toBeVisible()
  })
  it('close action is translated', () => {
    render(
      <TestContext>
        <XMLVorschauDialog document={document} />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.xml_preview_dialog.close_action })
    ).toBeVisible()
  })
  it('copy action is translated', () => {
    render(
      <TestContext>
        <XMLVorschauDialog document={document} />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.xml_preview_dialog.copy_action })
    ).toBeVisible()
  })
})
