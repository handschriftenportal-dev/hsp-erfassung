import { Typography } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { isRetroBeschreibung } from 'src/domain/erfassung/ErfassungsState'

interface Props {}

export const RetroDisclaimer: FC<Props> = memo(function RetroDisclaimer() {
  const { t } = useTranslation()
  const isRetro = useSelector(isRetroBeschreibung)

  return (
    isRetro && (
      <div className="hsp-retro-disclaimer">
        <Typography variant="h5" gutterBottom>
          {t('retro.heading')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t('retro.disclaimer')}
        </Typography>
      </div>
    )
  )
})
