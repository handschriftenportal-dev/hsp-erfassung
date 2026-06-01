import { render } from '@testing-library/react'
import { XMLDocumentTypeVorschau } from 'src/domain/toolbar/dialog/nodes/XMLDocumentTypeVorschau'

describe('XMLDocumentTypeVorschau', () => {
  it('renders public document type', () => {
    const { baseElement } = render(
      <XMLDocumentTypeVorschau
        node={{
          doctype: {
            name: 'name',
            systemId: 'system',
            publicId: 'public',
          },
        }}
        level={0}
      />
    )
    expect(baseElement.textContent).toBe(
      '<!DOCTYPE name PUBLIC "public" "system">\n'
    )
  })
  it('renders system document type', () => {
    const { baseElement } = render(
      <XMLDocumentTypeVorschau
        node={{
          doctype: {
            name: 'name',
            systemId: 'system',
            publicId: '',
          },
        }}
        level={0}
      />
    )
    expect(baseElement.textContent).toBe('<!DOCTYPE name SYSTEM "system">\n')
  })
})
