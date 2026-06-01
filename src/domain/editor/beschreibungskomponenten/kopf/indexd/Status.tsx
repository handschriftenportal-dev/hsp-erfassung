import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { Element } from 'slate'
import { FixedValueListAutocomplete } from 'src/domain/editor/beschreibungskomponenten/kopf/FixedValueListAutocomplete'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'

interface Props {
  element: Element
}

export const Status: FC<Props> = memo(({ element }) => {
  const { t } = useTranslation()
  const [termElement] = element.children as Element[]
  const { data_type = '' } = termElement

  return (
    <div className={'big-top-gab small-bottom-gab'}>
      <FixedValueListAutocomplete
        leftSidelabel={t('editor.status')}
        termElement={termElement}
        helpText={t('editor.help_text.status')}
        optionsArray={ErfassungsRegeln.termValues(data_type)}
      />
    </div>
  )
})
