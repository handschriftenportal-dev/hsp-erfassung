import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'

import { ComponentSection } from './ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteBeigabe: FC<Props> = memo(
  ({ element, attributes, children }) => {
    return (
      <ComponentSection
        attributes={attributes}
        element={element}
        headlineKey={'sidebar.accompanying_material'}
        helpTextKey={'editor.help_text.accompanying_material'}
      >
        {children}
      </ComponentSection>
    )
  }
)
