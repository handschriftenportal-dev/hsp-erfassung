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

import { FC, JSX, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { RenderElementProps } from 'slate-react'

import { useAPICallTranslation } from '../../../../infrastructure/normdaten/APICall'
import { extractNormdatumLinksFromVolltextEditorElement } from '../../../../infrastructure/slate/SlateBoundary'
import { VolltextEditorElement } from '../../../../infrastructure/slate/volltext/VolltextEditorElement'
import { GNDEntityFact } from '../../../erfassung/GNDEntityFact'
import { useBeziehungsUebersetzung } from '../NormdatenBeziehungenPort'
import { useFetchNormdaten } from '../useNormdaten'
import { NormdatenAnsichtViewModel } from './NormdatenAnsichtViewModel'

interface Props extends RenderElementProps {
  element: VolltextEditorElement
}

export const NormdatenAnsicht: FC<Props> = memo(
  ({ element, attributes, children }) => {
    const { t } = useTranslation()
    const normdatumLinks =
      extractNormdatumLinksFromVolltextEditorElement(element)
    return normdatumLinks.length == 0 ? (
      <span className={'normdata-empty-component'} {...attributes}>
        {t('editor.normdata_view.empty_component')}
        {children}
      </span>
    ) : (
      <>
        <table className={'normdata-table'} {...attributes}>
          <thead hidden>
            <tr>
              <th>{t('editor.normdata_view.header.type')}</th>
              <th>{t('editor.normdata_view.header.role')}</th>
              <th>{t('editor.normdata_view.header.text')}</th>
            </tr>
          </thead>
          <tbody>{normdatumLinks.map(NormdatumZeile)}</tbody>
        </table>
        {children}
      </>
    )
  }
)

function NormdatumZeile(
  normdatum: NormdatenAnsichtViewModel,
  index: number
): JSX.Element {
  const { text, id, ref, roles, type } = normdatum
  const { t } = useTranslation()
  const apiCall = useFetchNormdaten(id)
  const beziehungsUebersetzung = useBeziehungsUebersetzung()
  const preferredName = useAPICallTranslation<GNDEntityFact>()(
    apiCall,
    (value) => value.preferredName
  )

  return (
    <tr key={`${index}:${id}-${text}`}>
      <td>{t(`text_tagging.referenz.type.${type}`)}</td>
      <td>
        {roles.length === 0
          ? '-'
          : roles.map((role) => beziehungsUebersetzung(role)[0]).join(', ')}
      </td>
      <td>
        {text}
        {` [ ${preferredName}; `}
        <a href={ref} target={'_blank'}>
          GND {id}
        </a>
        {' ]'}
      </td>
    </tr>
  )
}
