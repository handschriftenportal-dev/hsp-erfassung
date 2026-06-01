import type { Editor } from 'slate'
import type { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import type { GlobalModalInterface } from 'src/infrastructure/modal/GlobalModalInterface'
import type { VolltextReferenz } from 'src/infrastructure/slate/volltext/VolltextElement'

type StrategyContext = {
  editor: Editor
  modalContext: GlobalModalInterface
  themenbereiche: ThemenbereicheAPI
  readOnly: boolean
}

export type DialogStrategy<E = VolltextReferenz, T = VolltextSemantik> = {
  createDialog: (type: T, context: StrategyContext) => void
  editDialog: (element: E, context: StrategyContext) => void
}
