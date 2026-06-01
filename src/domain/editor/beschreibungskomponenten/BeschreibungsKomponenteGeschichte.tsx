import type { FC } from 'react'
import type { RenderElementProps } from 'slate-react'

import { ComponentSection } from './ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteGeschichte: FC<Props> = ({
  attributes,
  children,
  element,
}) => {
  return (
    <ComponentSection
      attributes={attributes}
      element={element}
      headlineKey={'sidebar.history'}
      helpTextKey={'editor.help_text.history'}
    >
      {children}
    </ComponentSection>
  )
}
