import type { FC } from 'react'
import type { RenderElementProps } from 'slate-react'
import { ComponentSection } from 'src/domain/editor/beschreibungskomponenten/ComponentSection'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteKopf: FC<Props> = ({
  element,
  children,
  attributes,
}) => {
  return (
    <ComponentSection
      attributes={attributes}
      element={element}
      headlineKey={'sidebar.head'}
      helpTextKey={'editor.help_text.head'}
    >
      {children}
    </ComponentSection>
  )
}
