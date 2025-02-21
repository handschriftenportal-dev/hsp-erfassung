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
import { FC, Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobalModalContext } from '../../infrastructure/modal/GlobalModal'
import { colors } from '../../theme'
import { NormdatenDialogTitle } from '../editor/normdaten/dialog/NormdatenDialogTitle'
import { SerializationError } from '../erfassung/transformation/SerializationError'

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
        open={true}
        variant="persistent"
        anchor="left"
        PaperProps={{
          elevation: 16,
        }}
      >
        <NormdatenDialogTitle
          title={t('toolbar.serialization_error_view.title')}
          clickHandler={hideModal}
        />
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
