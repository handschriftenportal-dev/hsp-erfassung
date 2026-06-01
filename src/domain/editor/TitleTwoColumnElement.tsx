import type { FC } from 'react'
import { memo } from 'react'
import type { Element } from 'slate'

import { DeleteSlateNodeButton } from './DeleteSlateNodeButton'
import { HeadLine } from './HeadLine'

interface Props {
  element: Element
  title: string
  showDelete?: boolean
  helpText: string | undefined
}

export const TitleTwoColumnElement: FC<Props> = memo(
  ({ element, title, showDelete = false, helpText }) => {
    return (
      <HeadLine label={title} labelSize="h4" helpText={helpText}>
        {showDelete && <DeleteSlateNodeButton element={element} />}
      </HeadLine>
    )
  }
)
