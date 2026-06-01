import type { Dispatch } from 'react'
import type { InitiumAnlegenDialogAction } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogReducer'
import type { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'

export interface Props {
  state: InitiumAnlegenDialogState
  dispatch: Dispatch<InitiumAnlegenDialogAction>
}

export type PropsOf<T extends InitiumAnlegenDialogState['type']> = {
  state: Extract<InitiumAnlegenDialogState, { type: T }>
  dispatch: Dispatch<InitiumAnlegenDialogAction>
}
