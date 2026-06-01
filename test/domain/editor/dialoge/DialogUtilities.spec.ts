import { DialogUtilities } from 'src/domain/editor/dialoge/DialogUtilities'

describe('DialogUtilities', () => {
  it('has function openInNewTab', () => {
    expect('openInNewTab' in DialogUtilities).toBeTruthy()
  })

  it('openInNewTab calls window.open', () => {
    window.open = jest.fn()
    DialogUtilities.openInNewTab('http://example.com')
    expect(open).toHaveBeenCalled()
  })
})
