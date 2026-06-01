import type { FC } from 'react'
import { memo } from 'react'
import type { Element } from 'slate'
import type { RenderElementProps } from 'slate-react'

import {
  anderesZitatStyle,
  explizitStyle,
  incipitStyle,
} from './SemantischeAuszeichnungStyle'

export const TEI_ELEMENT_QUOTE = 'quote'

interface Props extends RenderElementProps {}

function styleForElement(element: Element) {
  const { data_type } = element
  switch (data_type) {
    case 'incipit':
      return incipitStyle
    case 'explizit':
      return explizitStyle
    default:
      return anderesZitatStyle
  }
}

export const SemantischeZitate: FC<Props> = memo(function Quote({
  element,
  children,
  attributes,
}) {
  return (
    <q {...attributes} style={styleForElement(element)}>
      {children}
    </q>
  )
})
