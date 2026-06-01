import { Tooltip } from '@mui/material'
import type { CSSProperties, FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { RenderElementProps } from 'slate-react'
import type { VolltextFormatierung } from 'src/infrastructure/slate/volltext/VolltextElement'

interface Props extends RenderElementProps {
  element: VolltextFormatierung
}

const styles: Partial<
  Record<VolltextFormatierung['data_origin'], CSSProperties>
> = {
  incipit: {
    fontStyle: 'italic',
  },
  explicit: {
    fontStyle: 'italic',
  },
  zitat: {
    fontStyle: 'italic',
  },
  autor: {
    fontVariant: 'small-caps',
  },
  werktitel: {
    fontVariant: 'small-caps',
  },
}

export const Formatierung: FC<Props> = ({ attributes, children, element }) => {
  const { data_origin: type } = element
  const { t } = useTranslation()
  const style = styles[type] ?? {}
  return (
    <Tooltip title={t(`text_tagging.formatierung.type.${type}`)}>
      <span {...attributes} style={style}>
        {children}
      </span>
    </Tooltip>
  )
}
