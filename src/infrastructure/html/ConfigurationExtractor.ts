import { HSP_ERFASSUNGS_EDITOR_ID } from 'src/domain/editor/HSPEditor'
import type {
  Configuration,
  ConfigurationExtractor,
} from 'src/domain/erfassung/Configuration'
import { DEFAULT_CONFIGURATION } from 'src/domain/erfassung/Configuration'

type TransformAttribute<A> = (s: string) => A
const asString: TransformAttribute<string> = (s) => s
const asBoolean: TransformAttribute<boolean> = (s) => s === 'true'
const asLanguage: TransformAttribute<Configuration['language']> = (s) =>
  s === 'en' ? 'en' : 'de'

export const extractConfiguration: ConfigurationExtractor = (element) => {
  if (!element) {
    console.error(
      `Wrong usage: you need an DOM-Node with id="${HSP_ERFASSUNGS_EDITOR_ID}"`,
      element
    )
    return DEFAULT_CONFIGURATION
  }
  const getter = getAttributesWithDefault(element, DEFAULT_CONFIGURATION)
  return Object.fromEntries([
    getter('data-url', 'beschreibungsUrl', asString),
    getter('data-validation-url', 'validationUrl', asString),
    getter('data-workspace-url', 'workspaceUrl', asString),
    getter('data-normdaten-url', 'normdatenUrl', asString),
    getter('data-authorization-token', 'authorizationToken', asString),
    getter('data-start-in-read-only', 'startInReadOnly', asBoolean),
    getter('data-enable-hsp-tool-bar', 'isEditable', asBoolean),
    getter('data-standalone', 'standalone', asBoolean),
    getter('data-language', 'language', asLanguage),
  ])
}

export function getAttributesWithDefault<O extends object>(
  element: HTMLElement,
  defaultConfig: O
) {
  return function asEntry<K extends keyof O>(
    fromAttribute: string,
    toKey: K,
    transform: TransformAttribute<O[K]>
  ): [K, O[K]] {
    const attribute = element.getAttribute(fromAttribute)
    return attribute !== null
      ? [toKey, transform(attribute)]
      : [toKey, defaultConfig[toKey]]
  }
}
