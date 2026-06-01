import type { FC } from 'react'
import { memo } from 'react'
import type { RenderElementProps } from 'slate-react'

import { ComponentSection } from './ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteInhaltRegister: FC<Props> = memo(
  ({ attributes, children, element }) => {
    return (
      <ComponentSection
        attributes={attributes}
        element={element}
        headlineKey={'sidebar.content_register'}
        helpTextKey={'editor.help_text.note_register'}
      >
        <div style={{ padding: 13 }}>{children}</div>
      </ComponentSection>
    )
  }
)
