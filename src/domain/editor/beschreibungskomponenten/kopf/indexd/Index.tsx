/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { isEmpty } from 'lodash'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Element } from 'slate'
import { RenderElementProps } from 'slate-react'

import { extractText } from '../../../../../infrastructure/slate/SlateNormdataBoundary'
import { selectReadOnly } from '../../../../erfassung/ErfassungsState'
import { erfassungTEITermTypen } from '../../../../erfassung/ErfassungTEITermTypen'
import { TEI_ELEMENT_HEAD } from '../../../../erfassung/TEIConstants'
import { BaseElement } from '../../../BaseElement'
import { NoneEditableTwoColumnElement } from '../../../NoneEditableTwoColumnElement'
import { getOptionStr } from '../../BeschreibungsKomponentenCustomHooks'
import { Decoration } from './Decoration'
import { Dimensions } from './Dimensions'
import { Form } from './Form'
import { Format } from './Format'
import { Material } from './Material'
import { Measure } from './Measure'
import { MusicNotation } from './MusicNotation'
import { OrigDate } from './OrigDate'
import { OrigPlace } from './OrigPlace'
import { Status } from './Status'
import { TextLang } from './TextLang'
import { TitleIndex } from './TitleIndex'

interface Props extends RenderElementProps {}

const IndexReadOnly: FC<Pick<Props, 'element'>> = ({ element }) => {
  const { t } = useTranslation()
  const [termElement] = element.children as [Element]
  const { data_type } = termElement as any
  const content = extractText(termElement)

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
  if (erfassungTEITermTypen.includes(data_type)) {
    const childrenText = ['format', 'form', 'status'].includes(data_type)
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
  const { data_type } = termElement as any

  switch (data_type) {
    case 'measure':
      return <Measure element={element} />
    case 'format':
      return <Format element={element} />
    case 'origPlace':
      return <OrigPlace element={element} />
    case 'origDate':
      return <OrigDate element={element} />
    case 'textLang':
      return <TextLang element={element} />
    case 'form':
      return <Form element={element} />
    case 'status':
      return <Status element={element} />
    case 'decoration':
      return <Decoration element={element} />
    case 'musicNotation':
      return <MusicNotation element={element} />
    case 'dimensions':
      return <Dimensions element={element} />
    case 'material':
      return <Material element={element} />
    case 'title':
      return <TitleIndex element={element} />
    default:
      return null
  }
}
export const Index: FC<Props> = ({ element, children, attributes }) => {
  const readOnly = useSelector(selectReadOnly)
  const { path = '' } = element as any

  if (!path.includes(TEI_ELEMENT_HEAD)) {
    return <BaseElement attributes={attributes}>{children}</BaseElement>
  }

  return readOnly ? (
    <IndexReadOnly element={element} />
  ) : (
    <IndexEditMode element={element} />
  )
}
