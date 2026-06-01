import {
  ErrorOutline,
  InfoOutlined,
  ReportProblemOutlined,
} from '@mui/icons-material'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import type { FC } from 'react'
import { Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { SerializationError } from 'src/domain/erfassung/transformation/SerializationError'
import { ClosableDialogTitle } from 'src/infrastructure/components/ClosableDialogTitle'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { colors } from 'src/theme'

interface Props {
  serializationError: SerializationError[]
}

const errorColor = {
  info: colors.secondary.green,
  warning: colors.special.earth,
  error: colors.primary.darkTerraCotta,
} as const
const ErrorIcon = {
  info: InfoOutlined,
  warning: ReportProblemOutlined,
  error: ErrorOutline,
} as const

const replacer = (key: string, value: unknown) => {
  return key === '' || typeof value !== 'object' ? value : '...'
}

export const SerialisierungsFehlerAnzeige: FC<Props> = memo(
  function SerialisierungsFehlerAnzeige({ serializationError }) {
    const { t } = useTranslation()
    const { hideModal } = useGlobalModalContext()

    return (
      <Drawer
        open
        variant="persistent"
        anchor="left"
        PaperProps={{
          elevation: 16,
        }}
      >
        <ClosableDialogTitle onClose={hideModal}>
          {t('toolbar.serialization_error_view.title')}
        </ClosableDialogTitle>
        <List>
          {serializationError.map((error, index) => {
            const { level, errorCode, detail, tag } = error
            const Icon = ErrorIcon[level]
            const color = errorColor[level]
            const secondary =
              typeof detail === 'string'
                ? detail
                : JSON.stringify(detail, replacer, 2)

            return (
              <Fragment key={index}>
                {index > 0 && <Divider variant="inset" component="li" />}
                <ListItem>
                  <ListItemIcon sx={{ color }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={t(
                      `toolbar.serialization_error_view.errorCode.${errorCode}`,
                      { tag }
                    )}
                    secondary={secondary}
                    slotProps={{
                      secondary: {
                        style: {
                          whiteSpace:
                            typeof detail === 'string' ? 'normal' : 'pre',
                        },
                      },
                    }}
                  />
                </ListItem>
              </Fragment>
            )
          })}
        </List>
      </Drawer>
    )
  }
)
