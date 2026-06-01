import json from 'src/infrastructure/literatur/literature.json'
import { LiteraturService } from 'src/infrastructure/literatur/LiteraturService'

function partition<T>(xs: T[]): [T, T][] {
  const result: [T, T][] = []
  for (let i = 0; i < xs.length - 2; i++) {
    result.push([xs[i], xs[i + 1]])
  }
  return result
}

describe('LiteraturService', () => {
  describe('all', () => {
    const count = json.literature.length
    it(`has ${count} elements`, () => {
      expect(LiteraturService.all()).toHaveLength(count)
    })
  })

  describe('findByTitle', () => {
    const title = json.literature[0].title
    const partOfTitle = title.substring(0, title.length - 1)
    const upperTitle = json.literature[1].title.toUpperCase()
    const lowerTitle = json.literature[1].title.toLowerCase()
    const nonGermanCharRegex = /[^a-zA-ZäöüßÄÖÜ]/g

    it('does return empty list with unmatching string', () => {
      expect(LiteraturService.findByTitle('invalid')).toHaveLength(0)
    })

    it.each([title, partOfTitle])('does find result for "%s"', () => {
      expect(LiteraturService.findByTitle(title)).toMatchObject([
        json.literature[0],
      ])
    })

    it.each([upperTitle, lowerTitle])('does find result for "%s"', () => {
      expect(LiteraturService.findByTitle(upperTitle)).toMatchObject([
        json.literature[1],
      ])
    })

    const count = json.literature.length

    it(`does find all ${count} literatures for empty string`, () => {
      expect(LiteraturService.findByTitle('')).toHaveLength(count)
    })

    it('literatures are sorted by title', () => {
      const all = LiteraturService.findByTitle('')
      partition(all).filter(([entry, compare]) => {
        expect(
          entry.title
            .replace(nonGermanCharRegex, '')
            .localeCompare(
              compare.title.replace(nonGermanCharRegex, ''),
              'de',
              { sensitivity: 'accent' }
            )
        ).not.toBe(1)
      })
    })
  })

  describe('findByUri', () => {
    const uri = json.literature[0].uri
    const partOfUri = uri.substring(0, uri.length - 1)

    it(`does find result for "${uri}"`, () => {
      expect(LiteraturService.findByUri(uri)).toMatchObject(json.literature[0])
    })

    it(`does not find result for "${partOfUri}"`, () => {
      expect(LiteraturService.findByUri(partOfUri)).toBeUndefined()
    })
  })
})
