import type { JSX, ReactElement } from 'react'
import type { RenderElementProps, RenderLeafProps } from 'slate-react'
import { Block } from 'src/domain/editor/volltext/components/Block'
import { Box } from 'src/domain/editor/volltext/components/Box'
import { Formatierung } from 'src/domain/editor/volltext/components/Formatierung'
import { Leaf } from 'src/domain/editor/volltext/components/Leaf'
import { Referenz } from 'src/domain/editor/volltext/components/Referenz'
import type {
  VolltextBlock,
  VolltextBox,
  VolltextFormatierung,
  VolltextReferenz,
} from 'src/infrastructure/slate/volltext/VolltextElement'
import { VolltextElement } from 'src/infrastructure/slate/volltext/VolltextElement'

export const Renderer = {
  element({ attributes, children, element }: RenderElementProps): ReactElement {
    const typ = VolltextElement.typ(element)
    if (typ === undefined) {
      throw new Error('Unerwartetes Element für Volltext', { cause: element })
    }
    switch (typ) {
      case 'box':
        return (
          <Box element={element as VolltextBox} attributes={attributes}>
            {children}
          </Box>
        )
      case 'block':
        return (
          <Block element={element as VolltextBlock} attributes={attributes}>
            {children}
          </Block>
        )
      case 'referenz':
        return (
          <Referenz
            element={element as VolltextReferenz}
            attributes={attributes}
          >
            {children}
          </Referenz>
        )
      case 'formatierung':
        return (
          <Formatierung
            element={element as VolltextFormatierung}
            attributes={attributes}
          >
            {children}
          </Formatierung>
        )
    }
  },
  leaf({ children, ...props }: RenderLeafProps): JSX.Element {
    return <Leaf {...props}>{children}</Leaf>
  },
}
