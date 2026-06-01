import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'

import { ComponentSection } from './ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteAuesseres: FC<Props> = memo(
  ({ element, children, attributes }) => {
    return (
      <ComponentSection
        attributes={attributes}
        element={element}
        headlineKey={'sidebar.physical'}
        helpTextKey={'editor.help_text.physical'}
      >
        {children}
      </ComponentSection>
    )
  }
)
