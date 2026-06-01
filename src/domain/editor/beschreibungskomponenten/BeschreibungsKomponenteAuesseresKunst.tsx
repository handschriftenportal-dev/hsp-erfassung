import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'

import { useTextelementChangedForSidebarEvent } from './BeschreibungsKomponentenCustomHooks'
import { ComponentSection } from './ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteAuesseresKunst: FC<Props> = memo(
  ({ element, attributes, children }) => {
    useTextelementChangedForSidebarEvent(element)
    return (
      <ComponentSection
        attributes={attributes}
        element={element}
        headlineKey={'sidebar.physical_art'}
        helpTextKey={'editor.help_text.physical_art'}
      >
        {children}
      </ComponentSection>
    )
  }
)
