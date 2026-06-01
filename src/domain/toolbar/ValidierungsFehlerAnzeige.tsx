import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import type { FC } from 'react'
import { Fragment, memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { scroller } from 'react-scroll'
import { HSP_EDITOR_CONTAINER_ID } from 'src/domain/editor/HSPEditor'
import {
  selectConfiguration,
  selectValidationState,
} from 'src/domain/erfassung/ErfassungsState'
import { ClosableDialogTitle } from 'src/infrastructure/components/ClosableDialogTitle'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import type { ValidationError } from 'src/infrastructure/nachweis/ValidationResponse'
import { colors } from 'src/theme'

interface Props {}

export const ValidierungsFehlerAnzeige: FC<Props> = memo(
  function ValidierungsFehlerAnzeige() {
    const { t } = useTranslation()
    const { hideModal } = useGlobalModalContext()
    const validationErrors = useSelector(selectValidationState)
    const { language } = useSelector(selectConfiguration)
    const translate = useCallback(
      (validationError: ValidationError) => {
        const { error, diagnostics } = validationError
        const { de, en } = diagnostics
        return (
          (diagnostics[language] ?? de ?? en ?? error) ||
          t('toolbar.validation_error_view.missing_diagnostic_text')
        )
      },
      [t, language]
    )
    const scrollTo = useCallback((id: string) => {
      try {
        scroller.scrollTo(id, {
          containerId: HSP_EDITOR_CONTAINER_ID,
          smooth: true,
        })
      } catch (error) {
        console.error(`Can't scroll to element ${id}`, error)
      }
    }, [])

    useEffect(() => {
      if (validationErrors.length === 0) {
        hideModal()
      }
    }, [hideModal, validationErrors.length])

    return (
      <Drawer
        open
        variant="persistent"
        anchor="left"
        PaperProps={{
          elevation: 16,
          sx: { width: '25em' },
        }}
      >
        <ClosableDialogTitle onClose={hideModal}>
          {t('toolbar.validation_error_view.title')}
        </ClosableDialogTitle>
        <List>
          {validationErrors.map((error, index) => {
            return (
              <Fragment key={error.id}>
                {index > 0 && <Divider variant="inset" component="li" />}
                <ListItem disablePadding>
                  <ListItemButton
                    alignItems="flex-start"
                    onClick={() => scrollTo(error.id)}
                  >
                    <ListItemIcon sx={{ color: colors.primary.darkTerraCotta }}>
                      <ErrorOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={translate(error)} />
                  </ListItemButton>
                </ListItem>
              </Fragment>
            )
          })}
        </List>
      </Drawer>
    )
  }
)
