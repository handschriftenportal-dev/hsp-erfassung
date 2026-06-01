import { SkriptExport } from 'skripte/utility/SkriptExport'

describe('SkriptExport', () => {
  it('has method writeStream', () => {
    expect('writeStream' in SkriptExport).toBeTruthy()
  })
})
