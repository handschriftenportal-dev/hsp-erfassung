import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SonderzeichenAPI } from 'src/domain/sonderzeichen/SonderzeichenAPI'
import { SonderzeichenTooltip } from 'src/domain/sonderzeichen/SonderzeichenTooltip'

async function testSetup(key: string) {
  render(
    <SonderzeichenTooltip sonderzeichen={key}>
      <button>Hello World</button>
    </SonderzeichenTooltip>
  )
  await userEvent.hover(screen.getByRole('button'))
  return screen.findByRole('tooltip')
}

describe('SonderzeichenTooltip', () => {
  it('shows codepoint and description text for known key', async () => {
    const key = 'U+2020'
    const tip = await testSetup(key)
    expect(tip).toBeVisible()
    expect(tip.textContent).toContain(key)
    expect(tip.textContent).toContain(
      SonderzeichenAPI.getSonderzeichen(key).description
    )
  })

  it('shows key, but no description text for unknown key', async () => {
    jest.spyOn(console, 'warn').mockImplementation(() => null)
    const key = 'INVALID'
    const tip = await testSetup(key)
    expect(tip).toBeVisible()
    expect(tip.textContent).toContain(key)
    expect(tip.textContent).not.toContain(
      SonderzeichenAPI.getSonderzeichen(key).description
    )
  })
})
