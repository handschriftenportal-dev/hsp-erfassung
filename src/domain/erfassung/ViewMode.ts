export const ViewModes = {
  preview: 'previewMode',
  edit: 'editMode',
  normdata: 'normdataMode',
} as const
export type ViewMode = (typeof ViewModes)[keyof typeof ViewModes]

const readOnly = new Set<ViewMode>(['previewMode', 'normdataMode'])

export const isReadOnly = (mode: ViewMode) => readOnly.has(mode)
