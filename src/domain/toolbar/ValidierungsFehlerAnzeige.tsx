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
import { FC, Fragment, memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { scroller } from 'react-scroll'

import { useGlobalModalContext } from '../../infrastructure/modal/GlobalModal'
import { ValidationError } from '../../infrastructure/nachweis/ValidationResponse'
import { colors } from '../../theme'
import { HSP_EDITOR_CONTAINER_ID } from '../editor/HSPEditor'
import { NormdatenDialogTitle } from '../editor/normdaten/dialog/NormdatenDialogTitle'
import {
  selectConfiguration,
  selectValidationState,
} from '../erfassung/ErfassungsState'

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
        open={true}
        variant="persistent"
        anchor="left"
        PaperProps={{
          elevation: 16,
          sx: { width: '25em' },
        }}
      >
        <NormdatenDialogTitle
          title={t('toolbar.validation_error_view.title')}
          clickHandler={hideModal}
        />
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
