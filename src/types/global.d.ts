import type { createHspWorkspace } from 'hsp-fo-workspace/declaration/src/HspWorkspace'

declare global {
  interface Window {
    createHspWorkspace: typeof createHspWorkspace
  }
  interface Navigator {
    msSaveOrOpenBlob?: (string) => boolean
  }
}
