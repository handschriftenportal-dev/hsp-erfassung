import type { RenderElementProps, RenderLeafProps } from 'slate-react'

const element = {
  id: 'element-marker',
  'data-slate-node': 'element',
  ref: null,
} as RenderElementProps['attributes']

const leaf = {
  id: 'leaf-marker',
  'data-slate-leaf': true,
} as RenderLeafProps['attributes']

export const TestSlateAttributes = Object.freeze({
  element,
  leaf,
})
