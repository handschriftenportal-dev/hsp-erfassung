import { uniq } from 'lodash'
import { SonderzeichenExport } from 'skripte/utility/SonderzeichenExport'
import { SonderzeichenAPI } from 'src/domain/sonderzeichen/SonderzeichenAPI'

describe('SonderzeichenExport', () => {
  it('can show fields which is a non-empty array with uniq entries', () => {
    const fields = SonderzeichenExport.fields()
    expect(fields).not.toHaveLength(0)
    expect(fields).toMatchObject(uniq(fields))
  })

  it('can show header which has a description for each field', () => {
    const fields = SonderzeichenExport.fields()
    const header = SonderzeichenExport.header()
    fields.forEach((field) => expect(header[field]).not.toBeUndefined())
  })

  it('can show sonderzeichen for key which has a description for each field', () => {
    const fields = SonderzeichenExport.fields()
    const sonderzeichen = SonderzeichenExport.keyToRow('U+2022')
    fields.forEach((field) => expect(sonderzeichen[field]).not.toBeUndefined())
  })

  it('iterates over all keys', () => {
    const callback = jest.fn()
    SonderzeichenExport.iterateSonderzeichen(callback)
    expect(callback).toHaveBeenCalledTimes(SonderzeichenAPI.getList().length)
  })
})
