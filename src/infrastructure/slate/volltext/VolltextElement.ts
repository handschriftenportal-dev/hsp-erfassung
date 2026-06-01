import type { CSSProperties } from 'react'
import { Element, Text } from 'slate'
import type { Initium } from 'src/domain/erfassung/Initium'
import type { Identifier } from 'src/domain/erfassung/ThemenbereicheAPI'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import type { EmptyText } from 'src/infrastructure/slate/HSPText'
import { colors } from 'src/theme'

export type VolltextElementTyp = 'box' | 'block' | 'formatierung' | 'referenz'
const typeDiscrimination: Record<VolltextSemantik, VolltextElementTyp> =
  Object.freeze({
    person: 'referenz',
    koerperschaft: 'referenz',
    ort: 'referenz',
    buchkunde: 'referenz',
    buchschmuck: 'referenz',
    ueberlieferungsform: 'referenz',
    einband: 'referenz',
    initium: 'referenz',
    musiknotation: 'referenz',
    schriftart: 'referenz',
    schreibsprache: 'referenz',
    textgattung: 'referenz',
    externerLink: 'referenz',
    autor: 'formatierung',
    werktitel: 'formatierung',
    incipit: 'formatierung',
    explicit: 'formatierung',
    zitat: 'formatierung',
    superskript: 'formatierung',
    box: 'box',
    paragraph: 'block',
    literatur: 'referenz',
  })

interface VolltextBaseElement extends Element {
  data_origin: VolltextSemantik
}

export interface VolltextBlock extends VolltextBaseElement {
  data_origin: 'paragraph'
  children: (VolltextFormatierung | VolltextBox | VolltextReferenz | Text)[]
}
export interface VolltextBox extends VolltextBaseElement {
  data_origin: 'box'
  content: string
  box: Element
  children: [EmptyText]
}
export interface VolltextNormdatum extends VolltextBaseElement {
  data_origin: 'person' | 'koerperschaft' | 'ort'
  box: Element
  content: string
  children: [EmptyText]
}
export interface VolltextThemenbereich extends VolltextBaseElement {
  data_origin:
    | 'buchkunde'
    | 'buchschmuck'
    | 'einband'
    | 'musiknotation'
    | 'schreibsprache'
    | 'schriftart'
    | 'textgattung'
    | 'ueberlieferungsform'
  auswahl: Pick<Identifier, 'id' | 'uri'>[]
  content: string
  children: [EmptyText]
}
export interface VolltextLink extends VolltextBaseElement {
  data_origin: 'externerLink'
  box: Element
  content: string
  children: [EmptyText]
}
export interface VolltextInitium extends VolltextBaseElement {
  data_origin: 'initium'
  initium: Pick<Initium, 'id' | 'uri'>
  content: string
  children: [EmptyText]
}
export interface VolltextLiteratur extends VolltextBaseElement {
  data_origin: 'literatur'
  content: string
  uri: string
  children: [EmptyText]
}

export type VolltextReferenz =
  | VolltextLink
  | VolltextThemenbereich
  | VolltextNormdatum
  | VolltextInitium
  | VolltextLiteratur
export interface VolltextFormatierung extends VolltextBaseElement {
  data_origin: 'autor' | 'werktitel' | 'incipit' | 'explicit' | 'zitat'
  box: Element
  children: (VolltextBox | VolltextReferenz | Text)[]
}

export type VolltextElement =
  | VolltextBox
  | VolltextReferenz
  | VolltextFormatierung
  | VolltextBlock

function typ(e: Element): VolltextElementTyp | undefined {
  const { data_origin } = e
  return typeDiscrimination[data_origin as VolltextSemantik]
}

function volltextTypeGuard<T extends Element>(
  elementType: VolltextElementTyp
): (e: unknown) => e is T {
  return function typeGuard(e: unknown): e is T {
    return Element.isElement(e) && typ(e) === elementType
  }
}

const isVolltextReferenz = volltextTypeGuard<VolltextReferenz>('referenz')
const isVolltextBlock = volltextTypeGuard<VolltextBlock>('block')
const isVolltextFormatierung =
  volltextTypeGuard<VolltextFormatierung>('formatierung')
const isVolltextBox = volltextTypeGuard<VolltextBox>('box')

function isVoid(element: Element): boolean {
  return (
    VolltextElement.isVolltextReferenz(element) ||
    VolltextElement.isVolltextBox(element)
  )
}

function isInline(element: Element): boolean {
  return isVoid(element) || VolltextElement.isVolltextFormatierung(element)
}

function isBlock(element: Element): boolean {
  return (
    VolltextElement.isVolltextBlock(element) &&
    element.children.every((child) => Text.isText(child) || isInline(child))
  )
}

function isAuthor(element: VolltextReferenz): boolean {
  return (
    element.data_origin === 'person' &&
    (element.box.data_role?.includes('author') ?? false)
  )
}

const colorLookup: Partial<Record<VolltextReferenz['data_origin'], string>> = {
  person: colors.special.sunnyYellow,
  ort: colors.special.sunnyYellow,
  koerperschaft: colors.special.sunnyYellow,
  externerLink: colors.secondary.turquoise,
  buchkunde: colors.special.earth,
  buchschmuck: colors.special.earth,
  einband: colors.special.earth,
  musiknotation: colors.special.earth,
  schreibsprache: colors.special.earth,
  schriftart: colors.special.earth,
  textgattung: colors.special.earth,
  ueberlieferungsform: colors.special.earth,
  initium: colors.special.earth,
  literatur: colors.secondary.electricBlue,
}

function style(element: VolltextReferenz): CSSProperties {
  const result: CSSProperties = {
    padding: '1px 4px',
    borderRadius: 1,
    backgroundColor: 'inherit',
  }

  if (colorLookup[element.data_origin]) {
    result.backgroundColor = colorLookup[element.data_origin]
  }
  if (isAuthor(element)) {
    result.fontVariant = 'small-caps'
  }
  if (element.data_origin === 'initium') {
    result.fontStyle = 'italic'
  }

  return result
}

export const VolltextElement = Object.freeze({
  isVolltextReferenz,
  isVolltextBlock,
  isVolltextFormatierung,
  isVolltextBox,
  typ,
  isVoid,
  isInline,
  isBlock,
  style,
})
