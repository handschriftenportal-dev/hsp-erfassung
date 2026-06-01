import { uniq } from 'lodash'
import type { SubjectArea } from 'src/domain/erfassung/SubjectArea'
import { regEx } from 'test/regEx'

import fixture from './einband.json'

type IsoString = {
  isoCode: string
  text: string
}

type Concept = {
  id: string
  notation: string
  topConcept: boolean
  narrower: string[] | null
}

function improveLabels(labels: IsoString[]): Record<string, string> {
  return Object.fromEntries(labels.map(({ isoCode, text }) => [isoCode, text]))
}

function createConceptMap(
  concepts: readonly Concept[]
): Record<string, Concept> {
  return Object.fromEntries(concepts.map((concept) => [concept.id, concept]))
}
function createInitialDepthMap(
  concepts: readonly Concept[]
): Record<string, number> {
  return Object.fromEntries(
    concepts.map(({ id, topConcept }) => [id, topConcept ? 0 : -1])
  )
}

function createIdDepthMap(
  concepts: readonly Concept[],
  path: string
): [errors: string[], depthMap: Record<string, number>] {
  const errors: string[] = []
  const depthMap = createInitialDepthMap(concepts)
  const conceptMap = createConceptMap(concepts)

  function walkTree(concept: Concept | undefined, path: string): void {
    if (concept === undefined) {
      errors.push(`Undefined concept at path "${path}"`)
      return
    }
    const { id, notation: parentNotation, narrower } = concept
    const depth = depthMap[id]
    if (depth < 0) {
      errors.push(
        `Invalid tree entry point: Depth has to be positive at ${path}:${parentNotation}`
      )
      return
    } else if (narrower === null) {
      return
    } else {
      narrower.forEach((id) => {
        const node = conceptMap[id]
        if (node === undefined) {
          errors.push(`Undefined node with ${id}`)
        } else if (depthMap[id] >= 0) {
          errors.push(
            `Invalid graph: contains cycle at ${path}:${parentNotation}:${node.notation}`
          )
        } else {
          depthMap[id] = depth + 1
          walkTree(conceptMap[id], `${path}:${parentNotation}:${node.notation}`)
        }
      })
    }
  }

  const topConcepts = concepts.filter((concept) => concept.topConcept)
  if (topConcepts.length === 0) {
    errors.push(`No top concepts in ${path}`)
  } else {
    topConcepts.forEach((concept) => walkTree(concept, path))
  }
  return [errors, depthMap]
}

describe('Einband Fixture', () => {
  const themenbereich: SubjectArea = fixture.data.findSubjectArea
  const themenbereichNotation = themenbereich.notation
  const thesauri = themenbereich.thesauri

  it('has german and english labels', () => {
    expect(improveLabels(themenbereich.labels)).toMatchObject({
      de: regEx.nonEmptyString,
      en: regEx.nonEmptyString,
    })
  })

  it('has currently 12 thesauri', () => {
    expect(thesauri).toHaveLength(12)
  })

  describe.each(thesauri)(
    'thesaurus "$notation"',
    ({ concepts, notation: thesaurusNotation, labels }) => {
      it(`starts with "${themenbereichNotation}"`, () => {
        expect(thesaurusNotation.startsWith(themenbereichNotation)).toBeTruthy()
      })

      it('has german and english labels', () => {
        expect(improveLabels(labels)).toMatchObject({
          de: regEx.nonEmptyString,
          en: regEx.nonEmptyString,
        })
      })

      it('has top concepts', () => {
        expect(
          concepts.filter((konzept) => konzept.topConcept)
        ).not.toHaveLength(0)
      })

      const [errors, depthMap] = createIdDepthMap(concepts, thesaurusNotation)

      it('there are no errors', () => {
        expect(errors).toHaveLength(0)
      })

      describe.each(concepts)(
        'concept "$notation',
        ({
          id,
          notation,
          labels,
          definition,
          hasOneKeyFeatureFrom,
          hasSomeKeyFeaturesFrom,
          hasAdditionalFeature,
          hasKeyFeature,
        }) => {
          it(`depth ${depthMap[id]} is not -1 (i.e. concept is reachable)`, () => {
            expect(depthMap[id]).not.toBe(-1)
          })

          it.skip(`has translated definition`, () => {
            expect(improveLabels(definition)).toMatchObject({
              de: regEx.nonEmptyString,
              en: regEx.nonEmptyString,
            })
          })

          it(`starts with ${thesaurusNotation}`, () => {
            expect(notation.startsWith(thesaurusNotation)).toBeTruthy()
          })

          it('has german and english labels', () => {
            expect(improveLabels(labels)).toMatchObject({
              de: regEx.nonEmptyString,
              en: regEx.nonEmptyString,
            })
          })

          it('has unique key features', () => {
            expect(uniq(hasKeyFeature)).toMatchObject(hasKeyFeature)
          })

          it('has unique additional features', () => {
            expect(uniq(hasAdditionalFeature)).toMatchObject(
              hasAdditionalFeature
            )
          })

          it('members of one key feature from bags are unique', () => {
            hasOneKeyFeatureFrom.forEach(({ members }) => {
              expect(uniq(members)).toMatchObject(members)
            })
          })

          it('members of some key feature from bags are unique', () => {
            hasSomeKeyFeaturesFrom.forEach(({ members }) => {
              expect(uniq(members)).toMatchObject(members)
            })
          })

          it('all features of a concept are unique', () => {
            const features = [
              ...hasKeyFeature,
              ...hasAdditionalFeature,
              ...hasOneKeyFeatureFrom.flatMap(({ members }) => members),
              ...hasSomeKeyFeaturesFrom.flatMap(({ members }) => members),
            ]
            expect(uniq(features)).toMatchObject(features)
          })
        }
      )
    }
  )
})
