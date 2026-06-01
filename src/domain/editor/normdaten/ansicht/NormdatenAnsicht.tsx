import type { FC, JSX } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { RenderElementProps } from 'slate-react'
import { useBeziehungsUebersetzung } from 'src/domain/editor/normdaten/NormdatenBeziehungenPort'
import { useFetchNormdaten } from 'src/domain/editor/normdaten/useNormdaten'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { HSPLink } from 'src/infrastructure/components/HSPLink'
import { useAPICallTranslation } from 'src/infrastructure/normdaten/APICall'
import { extractNormdatumLinksFromVolltextEditorElement } from 'src/infrastructure/slate/SlateBoundary'
import type { VolltextEditorElement } from 'src/infrastructure/slate/volltext/VolltextEditorElement'

import type { NormdatenAnsichtViewModel } from './NormdatenAnsichtViewModel'

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
        <HSPLink url={ref}>GND {id}</HSPLink>
        {' ]'}
      </td>
    </tr>
  )
}
