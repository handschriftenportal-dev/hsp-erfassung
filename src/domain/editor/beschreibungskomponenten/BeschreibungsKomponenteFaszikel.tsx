import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'

import { ComponentSection } from './ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteFaszikel: FC<Props> = memo(
  ({ element, children, attributes }) => {
    return (
      <ComponentSection
        attributes={attributes}
        element={element}
        headlineKey={'sidebar.booklet'}
        helpTextKey={'editor.help_text.booklet'}
      >
        {children}
      </ComponentSection>
    )
  }
)
