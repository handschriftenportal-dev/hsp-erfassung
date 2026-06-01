import { render } from '@testing-library/react'
import { XMLCharacterDataVorschau } from 'src/domain/toolbar/dialog/nodes/XMLCharacterDataVorschau'

describe('XMLCharacterDataVorschau', () => {
  it('renders data', () => {
    const { baseElement } = render(
      <XMLCharacterDataVorschau node={{ data: 'hello world' }} level={0} />
    )
    expect(baseElement.textContent).toBe('<![CDATA[hello world]]>\n')
  })
  it('indents', () => {
    const { baseElement } = render(
      <XMLCharacterDataVorschau node={{ data: 'hello world' }} level={2} />
    )
    expect(baseElement.textContent).toBe('    <![CDATA[hello world]]>\n')
  })
})
