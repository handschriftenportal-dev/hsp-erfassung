import { isEmpty } from 'lodash'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { Element } from 'slate'
import type { RenderElementProps } from 'slate-react'
import { BaseElement } from 'src/domain/editor/BaseElement'
import { getOptionStr } from 'src/domain/editor/beschreibungskomponenten/BeschreibungsKomponentenCustomHooks'
import { Beschreibstoff } from 'src/domain/editor/beschreibungskomponenten/kopf/indexd/Beschreibstoff'
import { Ueberlieferungsform } from 'src/domain/editor/beschreibungskomponenten/kopf/indexd/Ueberlieferungsform'
import { NoneEditableTwoColumnElement } from 'src/domain/editor/NoneEditableTwoColumnElement'
import { selectReadOnly } from 'src/domain/erfassung/ErfassungsState'
import { ErfassungTEITermTypen } from 'src/domain/erfassung/ErfassungTEITermTypen'
import { TEI_ELEMENT_HEAD } from 'src/domain/erfassung/TEIConstants'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

import { Decoration } from './Decoration'
import { Dimensions } from './Dimensions'
import { Entstehungsort } from './Entstehungsort'
import { Format } from './Format'
import { Grundsprache } from './Grundsprache'
import { Measure } from './Measure'
import { MusicNotation } from './MusicNotation'
import { OrigDate } from './OrigDate'
import { Status } from './Status'
import { TitleIndex } from './TitleIndex'

interface Props extends RenderElementProps {}

const IndexReadOnly: FC<Pick<Props, 'element'>> = ({ element }) => {
  const { t } = useTranslation()
  const [termElement] = element.children as Element[]
  const { data_type = '' } = termElement
  const content = HSPNode.extractText(termElement)

  if (isEmpty(content.trim()) && data_type !== 'title') {
    return null
  }
  if (['decoration', 'musicNotation'].includes(data_type)) {
    const childrenValue =
      content === 'not specified'
        ? t('editor.not_specified')
        : content === 'yes'
          ? t('editor.yes')
          : content === 'no'
            ? t('editor.no')
            : undefined
    const i18TextSuffix =
      data_type === 'decoration' ? 'decoration' : 'music_notation'

    return (
      <NoneEditableTwoColumnElement label={t('editor.' + i18TextSuffix)}>
        {childrenValue}
      </NoneEditableTwoColumnElement>
    )
  }
  if (ErfassungTEITermTypen.isTermTyp(data_type)) {
    const childrenText =
      data_type === 'status'
        ? t(data_type + '.' + getOptionStr(content))
        : content
    const title =
      data_type === 'title'
        ? t('editor.norm_title')
        : data_type === 'origPlace'
          ? t('editor.orig_place')
          : data_type === 'origDate'
            ? t('editor.orig_date')
            : t('editor.' + data_type)

    return (
      <NoneEditableTwoColumnElement label={title}>
        {childrenText}
      </NoneEditableTwoColumnElement>
    )
  }
  return null
}

const IndexEditMode: FC<Pick<Props, 'element'>> = ({ element }) => {
  const [termElement] = element.children as [Element]
  const { data_type } = termElement

  switch (data_type) {
    case 'measure':
      return <Measure element={element} />
    case 'format':
      return <Format element={element} />
    case 'origPlace':
      return <Entstehungsort element={element} />
    case 'origDate':
      return <OrigDate element={element} />
    case 'textLang':
      return <Grundsprache element={element} />
    case 'form':
      return <Ueberlieferungsform element={element} />
    case 'status':
      return <Status element={element} />
    case 'decoration':
      return <Decoration element={element} />
    case 'musicNotation':
      return <MusicNotation element={element} />
    case 'dimensions':
      return <Dimensions element={element} />
    case 'material':
      return <Beschreibstoff element={element} />
    case 'title':
      return <TitleIndex element={element} />
    default:
      return null
  }
}
export const Index: FC<Props> = ({ element, children, attributes }) => {
  const readOnly = useSelector(selectReadOnly)
  const { path = '' } = element

  if (!path.includes(TEI_ELEMENT_HEAD)) {
    return <BaseElement attributes={attributes}>{children}</BaseElement>
  }

  return readOnly ? (
    <IndexReadOnly element={element} />
  ) : (
    <IndexEditMode element={element} />
  )
}
