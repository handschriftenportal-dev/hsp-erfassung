import { render } from '@testing-library/react'
import { XMLCommentVorschau } from 'src/domain/toolbar/dialog/nodes/XMLCommentVorschau'

describe('XMLCommentVorschau', () => {
  it('renders comment', () => {
    const { baseElement } = render(
      <XMLCommentVorschau node={{ comment: 'hello world' }} level={0} />
    )
    expect(baseElement.textContent).toBe('<!--hello world-->\n')
  })
  it('indents', () => {
    const { baseElement } = render(
      <XMLCommentVorschau node={{ comment: 'hello world' }} level={1} />
    )
    expect(baseElement.textContent).toBe('  <!--hello world-->\n')
  })
})
