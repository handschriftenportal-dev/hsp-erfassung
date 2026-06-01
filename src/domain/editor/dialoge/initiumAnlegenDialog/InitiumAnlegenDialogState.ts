import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import type { Initium } from 'src/domain/erfassung/Initium'

const MINIMAL_INITIUM_LENGTH = 10

type BaseState = {
  unknownLanguage: GNDEntityFact
  languages: GNDEntityFact[]
  text: string
}

export type InitiumAnlegenDialogState =
  | (BaseState & { type: 'entering_initium' })
  | (BaseState & { type: 'confirming_unknown_language' })
  | (BaseState & { type: 'checking_for_duplicates' })
  | (BaseState & { type: 'resolving_duplicates'; duplicates: Initium[] })
  | (BaseState & { type: 'creating_initium' })
  | (BaseState & { type: 'apply_initium'; initium: Initium })
  | (BaseState & { type: 'error'; message: string })
  | (BaseState & { type: 'cancel' })

function isSubmittable(state: InitiumAnlegenDialogState): boolean {
  return (
    state.text.length > MINIMAL_INITIUM_LENGTH && state.languages.length > 0
  )
}

export const InitiumAnlegenDialogState = Object.freeze({
  initialState(
    text: string = '',
    unknownLanguage: GNDEntityFact
  ): InitiumAnlegenDialogState {
    return {
      type: 'entering_initium',
      text,
      languages: [unknownLanguage],
      unknownLanguage,
    }
  },
  isUnknownLanguageState(state: InitiumAnlegenDialogState): boolean {
    const { languages } = state
    return (
      languages.length === 0 ||
      languages.some((language) => language.id === state.unknownLanguage.id)
    )
  },
  isSubmittable,
})
