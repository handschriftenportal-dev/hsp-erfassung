/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { HSP_ERFASSUNGS_EDITOR_ID } from '../../domain/editor/HSPEditor'
import {
  Configuration,
  ConfigurationExtractor,
  DEFAULT_CONFIGURATION,
} from '../../domain/erfassung/Configuration'

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
