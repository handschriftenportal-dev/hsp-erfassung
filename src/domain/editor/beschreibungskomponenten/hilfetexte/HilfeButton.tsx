import styled from '@emotion/styled'
import { HelpRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import type { FC, MouseEventHandler } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from 'src/theme'

interface Props {
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  activated?: boolean
}

export const HilfeButtonUnstyled: FC<Props> = memo(
  ({ className, onClick }: Props) => {
    const { t } = useTranslation()

    return (
      <IconButton
        size={'small'}
        aria-label={t('editor.show_help')}
        onClick={onClick}
        disableRipple
        className={className}
      >
        <HelpRounded />
      </IconButton>
    )
  }
)

export const HilfeButton = styled(HilfeButtonUnstyled)(({ activated }) => ({
  color: activated ? colors.primary.darkTerraCotta : colors.greyscale.black,
  ':hover': {
    color: colors.primary.darkTerraCotta,
  },
  ':focus': {
    color: colors.primary.darkTerraCotta,
  },
}))
