import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import {
  selectBeschreibung,
  selectIsFullscreen,
  selectReadOnly,
} from './ErfassungsState'

interface Props {}

function translationKeys(readOnly: boolean, isFullscreen: boolean) {
  const prefix = `editing_status.${readOnly ? 'read' : 'edit'}`
  return {
    heading: `${prefix}_heading${isFullscreen ? '_fullscreen' : ''}`,
    anchorText: `${prefix}_help_anchor_text`,
    uri: `${prefix}_help_anchor_uri`,
  }
}

export const BearbeitungsStatus: FC<Props> = () => {
  const { t } = useTranslation()
  const readOnly = useSelector(selectReadOnly)
  const isFullscreen = useSelector(selectIsFullscreen)
  const { signature } = useSelector(selectBeschreibung)
  const keys = translationKeys(readOnly, isFullscreen)
  return (
    <div>
      <h4 className="bearbeitungs-status-heading">
        {t(keys.heading, { signature })}
      </h4>
      <a
        className="bearbeitungs-status-anchor"
        href={t(keys.uri)}
        target="hsp-docs"
      >
        {t(keys.anchorText)}
      </a>
    </div>
  )
}
