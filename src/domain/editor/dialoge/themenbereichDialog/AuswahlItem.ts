import type { Begriff } from 'src/domain/erfassung/ThemenbereicheAPI'

type Menge = {
  id: string
  elemente: readonly string[]
}

type Beziehungen = {
  auswahl: Set<string>
  notwendig: readonly string[]
  optional: readonly string[]
  einzelAuswahlMengen: readonly Menge[]
  mehrfachAuswahlMengen: readonly Menge[]
}

export type FachbegriffItem = {
  id: string
  beziehungen: Beziehungen
}

type BegriffItem = {
  id: string
}

export type AuswahlItem = FachbegriffItem | BegriffItem

function isFachbegriffItem(item: AuswahlItem): item is FachbegriffItem {
  return 'beziehungen' in item
}

function newBegriffItem(id: string): BegriffItem {
  return { id }
}

function newFachbegriffItem(
  id: string,
  prototyp: Partial<Beziehungen> = {}
): FachbegriffItem {
  const {
    auswahl = [],
    notwendig = [],
    optional = [],
    einzelAuswahlMengen = [],
    mehrfachAuswahlMengen = [],
  } = prototyp
  return {
    id,
    beziehungen: {
      auswahl: new Set([...auswahl, ...notwendig]),
      notwendig,
      optional,
      einzelAuswahlMengen,
      mehrfachAuswahlMengen,
    },
  }
}

function isValid(item: AuswahlItem): boolean {
  if (!isFachbegriffItem(item)) {
    return true
  }
  const {
    auswahl,
    notwendig = [],
    einzelAuswahlMengen = [],
    mehrfachAuswahlMengen = [],
  } = item.beziehungen
  return (
    notwendig.every((id) => auswahl.has(id)) &&
    einzelAuswahlMengen.every(
      ({ elemente }) => elemente.filter((id) => auswahl.has(id)).length === 1
    ) &&
    mehrfachAuswahlMengen.every(({ elemente }) =>
      elemente.some((id) => auswahl.has(id))
    )
  )
}

function isNonEmpty<T>(x: readonly T[]): boolean {
  return x.length > 0
}

function fromBegriff(begriff: Begriff): AuswahlItem {
  const {
    identifier: { id },
    notwendigeBegriffe: notwendig,
    optionaleBegriffe: optional,
    einzelAuswahlBegriffMengen: einzelAuswahlMengen,
    mehrfachAuswahlBegriffMengen: mehrfachAuswahlMengen,
  } = begriff
  if (
    isNonEmpty(notwendig) ||
    isNonEmpty(optional) ||
    isNonEmpty(einzelAuswahlMengen) ||
    isNonEmpty(mehrfachAuswahlMengen)
  ) {
    return AuswahlItem.newFachbegriffItem(id, {
      notwendig,
      optional,
      einzelAuswahlMengen,
      mehrfachAuswahlMengen,
    })
  }
  return AuswahlItem.newBegriffItem(id)
}

export const AuswahlItem = {
  isFachbegriffItem,
  isValid,
  fromBegriff,
  newBegriffItem,
  newFachbegriffItem,
}
