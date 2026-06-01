import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { Element } from 'slate'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'

interface Props {
  element: Element
}

export const TitleIndex: FC<Props> = memo(({ element }) => {
  const [termElement] = element.children as Element[]
  const { t } = useTranslation()

  return (
    <LabelledTextField
      label={t('editor.norm_title')}
      element={termElement}
      deletable={false}
      error={false}
      marginBottom={'12px'}
    />
  )
})
