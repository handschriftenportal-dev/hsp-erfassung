import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'

import { ComponentSection } from './ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteFragment: FC<Props> = memo(
  ({ element, children, attributes }) => {
    return (
      <ComponentSection
        attributes={attributes}
        element={element}
        headlineKey={'sidebar.part'}
        helpTextKey={'editor.help_text.part'}
      >
        {children}
      </ComponentSection>
    )
  }
)
