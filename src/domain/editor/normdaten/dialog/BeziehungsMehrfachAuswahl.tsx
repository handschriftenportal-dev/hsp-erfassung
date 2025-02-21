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

import { Autocomplete, Chip, TextField } from '@mui/material'
import { FC, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { VolltextSemantik } from '../../../erfassung/VolltextSemantik'
import {
  NormdatenBeziehungenPort,
  useBeziehungsUebersetzung,
} from '../NormdatenBeziehungenPort'

interface Props {
  normdatum: VolltextSemantik
  value: string[]
  onChange?: (beziehungen: string[]) => void
  readOnly?: boolean
}

export const BeziehungsMehrfachAuswahl: FC<Props> = ({
  value,
  normdatum,
  onChange,
  readOnly = false,
}) => {
  const { t } = useTranslation()
  const tBeziehung = useBeziehungsUebersetzung()
  const options = NormdatenBeziehungenPort.getBeziehungen(normdatum)

  const handleChange = (
    _event: SyntheticEvent,
    value: string | string[]
  ): void => {
    if (onChange) {
      onChange(Array.isArray(value) ? value : [value])
    }
  }

  return (
    <Autocomplete
      multiple
      fullWidth={true}
      readOnly={readOnly}
      options={options}
      value={value}
      onChange={handleChange}
      noOptionsText={t('text_tagging.referenz.dialog.no_roles')}
      getOptionLabel={(option) =>
        t(`text_tagging.referenz.role.${option}`, option)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant={'standard'}
          label={t('text_tagging.referenz.dialog.role')}
        />
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const [label, isTranslated] = tBeziehung(option)
          return (
            <Chip
              size="small"
              label={label || option}
              {...getTagProps({ index })}
              key={`${index}-${label}`}
              color={isTranslated ? 'default' : 'warning'}
            />
          )
        })
      }
    />
  )
}
