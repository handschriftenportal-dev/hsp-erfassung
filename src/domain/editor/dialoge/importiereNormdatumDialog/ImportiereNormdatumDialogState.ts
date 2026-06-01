import type { LobidEntity } from 'src/infrastructure/normdaten/LobidEntity'

export type ImportiereNormdatumDialogState = {
  searchTerm: string
  page: number
  rowsPerPage: number
  status: 'success' | 'loading' | 'failed' | 'not_found' | 'import_failed'
  error?: string
  items: LobidEntity[]
  total: number
  selected: number
}

const status = Object.freeze({
  success: 'success',
  loading: 'loading',
  failed: 'failed',
  not_found: 'not_found',
  import_failed: 'import_failed',
} as const)

export const ImportiereNormdatumDialogState = Object.freeze({
  status,
})
