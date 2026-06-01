export interface ChangedComponent {
  dataOrigin: string
  method: string
  id: string
}

export const INITIAL_LOAD = 'INITIAL_LOAD'
export const INSERT_NODE = 'INSERT_NODE'
export const EDIT_NODE = 'EDIT_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const HANDLE_YES_SAVE_DIALOG = 'HANDLE_YES_SAVE_DIALOG'
export const HANDLE_NO_SAVE_DIALOG = 'HANDLE_NO_SAVE_DIALOG'
