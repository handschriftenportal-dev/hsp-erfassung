import { uniq } from 'lodash'
import { BeschreibungenAnalyse } from 'skripte/utility/BeschreibungenAnalyse'

describe('BeschreibungenAnalyse', () => {
  it('has non-empty list of (unique) fields', () => {
    const fields = BeschreibungenAnalyse.fields()
    expect(fields).not.toHaveLength(0)
    expect(fields).toMatchObject(uniq(fields))
  })

  it('can show header which has a description for each field', () => {
    const fields = BeschreibungenAnalyse.fields()
    const header = BeschreibungenAnalyse.header()
    fields.forEach((field) => expect(header[field]).not.toBeUndefined())
  })

  describe('iterates over report', () => {
    const report = {
      codepoints: {
        [0x2022]: 1,
        [0xbeef]: 3,
        [0xfffd]: 2,
        [0x12ab]: 2,
        [0x1ceef]: 4,
      },
      parsing_errors: {},
      unknown_entities: {},
    }

    it('calls the callback #codepoints times', () => {
      const callback = jest.fn()
      BeschreibungenAnalyse.iterateCodepointRows(report, callback)
      expect(callback).toHaveBeenCalledTimes(
        Object.keys(report.codepoints).length
      )
    })

    it('anzahl is increasing sequence', () => {
      const callback = jest.fn()
      BeschreibungenAnalyse.iterateCodepointRows(report, callback)
      const calls = callback.mock.calls
      let vorhergehende_anzahl = 0
      calls.forEach(([{ anzahl }]) => {
        expect(anzahl >= vorhergehende_anzahl).toBeTruthy()
        vorhergehende_anzahl = anzahl
      })
    })

    it('calls match format', () => {
      const callback = jest.fn()
      BeschreibungenAnalyse.iterateCodepointRows(report, callback)
      const calls = callback.mock.calls
      calls.forEach(([row]) => {
        expect(row).toMatchObject({
          codepoint: expect.stringMatching(/^U\+[\dA-F]+$/),
          codepoint_dez: expect.stringMatching(/^\d+$/),
          anzahl: expect.stringMatching(/^\d+$/),
          im_editor: expect.stringMatching(/^(Ja|Nein)$/),
          zeichen: expect.stringMatching(/^..?$/), // Maximal two char codes
        })
      })
    })
  })
})
