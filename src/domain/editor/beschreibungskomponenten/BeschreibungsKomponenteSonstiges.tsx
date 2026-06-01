import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'

import { ComponentSection } from './ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteSonstiges: FC<Props> = memo(
  ({ attributes, children, element }) => {
    return (
      <ComponentSection
        attributes={attributes}
        element={element}
        headlineKey={'sidebar.other'}
        helpTextKey={'editor.help_text.other'}
      >
        {children}
      </ComponentSection>
    )
  }
)
