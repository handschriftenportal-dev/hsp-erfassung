import { PassThrough } from 'node:stream'

import { CSVStream } from 'skripte/utility/CSVStream'

describe('CSVStream', () => {
  it('closing it directly yields empty stream', () => {
    const stream = new PassThrough()
    stream.on('data', (_) => {
      expect(true).toBe(false)
    })
    stream.on('end', () => {
      expect(true).toBe(true)
    })
    const csv = CSVStream(stream, [])
    csv.end()
  })

  it("adding rows add's chunks called", () => {
    const stream = new PassThrough()
    stream.on('data', (chunk) => {
      expect(chunk.toString()).toBe('"1","2","3"\n')
    })
    stream.on('end', () => {
      expect(true).toBe(true)
    })
    const csv = CSVStream(stream, ['a', 'b', 'c'])
    csv.addRow({
      a: '1',
      b: '2',
      c: '3',
    })
    csv.end()
  })

  it('delimiter and new row can be configured', () => {
    const stream = new PassThrough()
    stream.on('data', (chunk) => {
      expect(chunk.toString()).toBe('"1"$"2"$"3"\t')
    })
    stream.on('end', () => {
      expect(true).toBe(true)
    })
    const csv = CSVStream(stream, ['a', 'b', 'c'], {
      delimiter: '$',
      rowEnd: '\t',
    })
    csv.addRow({
      a: '1',
      b: '2',
      c: '3',
    })
    csv.end()
  })

  it('escapes csv specifics', () => {
    const stream = new PassThrough()
    stream.on('data', (chunk) => {
      expect(chunk.toString()).toBe('""""," ","3 6"\n')
    })
    const csv = CSVStream(stream, ['a', 'b', 'c'])
    csv.addRow({
      a: '"',
      b: '\n',
      c: '3     6',
    })
    csv.end()
  })
})
