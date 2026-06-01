import { flatMap } from 'lodash'
import * as de from 'src/infrastructure/i18n/translation_de.json'
import * as en from 'src/infrastructure/i18n/translation_en.json'

type TranslationMap = string | { [key: string]: TranslationMap }

function collectKeys(map: TranslationMap) {
  function prefixKeys(prefix: string, map: TranslationMap): string[] {
    return flatMap(Object.entries(map), ([key, value]) =>
      typeof value === 'string'
        ? [`${prefix}.${key}`]
        : prefixKeys(`${prefix}.${key}`, value)
    )
  }
  return prefixKeys('', map).sort()
}

describe('Translation keys are matching', () => {
  const deKeys = collectKeys(de)
  const enKeys = collectKeys(en)
  test('german and english keys are matching', () => {
    expect(deKeys).toEqual(enKeys)
  })
})
