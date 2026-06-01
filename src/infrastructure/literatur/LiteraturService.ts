import json from 'src/infrastructure/literatur/literature.json'
import type { Literatur } from 'src/types/Literatur'

type LiteraturService = {
  all: () => Literatur[]
  findByTitle: (s: string) => Literatur[]
  findByUri: (uri: string) => Literatur | undefined
}

type TitleLiteratureTuple = [string, Literatur]

const nonGermanCharRegex = /[^a-zA-ZäöüßÄÖÜ]/g

function sortLiterature(a: Literatur, b: Literatur): number {
  const aLettersOnly = a.title.replace(nonGermanCharRegex, '')
  const bLettersOnly = b.title.replace(nonGermanCharRegex, '')

  const comparison = aLettersOnly.localeCompare(bLettersOnly, 'de', {
    sensitivity: 'accent',
  })
  if (comparison === 0) {
    return a.title.localeCompare(b.title, 'de', { sensitivity: 'accent' })
  }
  return comparison
}

function createLiteraturService(
  literature: readonly Literatur[]
): LiteraturService {
  const sortedLiterature: Readonly<Literatur[]> = Object.freeze(
    literature
      .map(({ uri, title, description }) =>
        Object.freeze({
          uri: uri.trim(),
          title: title.trim(),
          description: description.trim(),
        })
      )
      .sort(sortLiterature)
  )

  const uriLookup = Object.fromEntries(sortedLiterature.map((l) => [l.uri, l]))
  const titleTuple: TitleLiteratureTuple[] = sortedLiterature.map((l) => [
    l.title.toLowerCase().trim(),
    l,
  ])

  return Object.freeze({
    all() {
      return [...sortedLiterature]
    },
    findByTitle(search) {
      search = search.toLowerCase().trim()
      return titleTuple.reduce<Literatur[]>((acc, [title, literature]) => {
        if (
          title.startsWith(search) ||
          title.replace(nonGermanCharRegex, '').startsWith(search)
        ) {
          acc.push(literature)
        }
        return acc
      }, [])
    },
    findByUri(uri) {
      return uriLookup[uri]
    },
  })
}

export const LiteraturService = createLiteraturService(json.literature)
