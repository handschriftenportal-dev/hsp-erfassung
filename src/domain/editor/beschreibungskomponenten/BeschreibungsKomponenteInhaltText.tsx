import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'

import { useTextelementChangedForSidebarEvent } from './BeschreibungsKomponentenCustomHooks'
import { ComponentSection } from './ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteInhaltText: FC<Props> = memo(
  ({ attributes, children, element }) => {
    useTextelementChangedForSidebarEvent(element)
    return (
      <ComponentSection
        attributes={attributes}
        element={element}
        headlineKey={'sidebar.content_text'}
        helpTextKey={'editor.help_text.note_text'}
      >
        {children}
      </ComponentSection>
    )
  }
)
