import type { FC } from 'react'
import type { RenderElementProps } from 'slate-react'

import { ComponentSection } from './ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteLiteratur: FC<Props> = ({
  attributes,
  children,
  element,
}) => {
  return (
    <ComponentSection
      attributes={attributes}
      element={element}
      headlineKey={'sidebar.literature'}
      helpTextKey={'editor.help_text.literature'}
    >
      {children}
    </ComponentSection>
  )
}
