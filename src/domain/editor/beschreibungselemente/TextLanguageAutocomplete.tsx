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

import { Delete } from '@mui/icons-material'
import { Autocomplete, Grid, IconButton, TextField } from '@mui/material'
import { createFilterOptions } from '@mui/material/useAutocomplete'
import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { FullscreenPopper } from '../../erfassung/FullscreenPopper'
import { GNDEntityFact } from '../../erfassung/GNDEntityFact'
import { createOptionLabel } from '../beschreibungskomponenten/BeschreibungsKomponentenCustomHooks'
import { getUrlForGndId } from '../normdaten/dialog/NormdatenDialogUtilities'

export interface Props {
  title: string
  options: GNDEntityFact[]
  value: any
  onOpen: any
  onChange: any
  position?: number
  deleteCallback?: any
}

export const TextLanguageAutocomplete: FC<Props> = ({
  title,
  options,
  value,
  onOpen,
  onChange,
  position,
  deleteCallback,
}) => {
  const { t } = useTranslation()

  const notFound = -1
  const onChangeDecorator = useCallback(
    (event: any, value: any, reason: any, details?: any) => {
      if (position !== notFound) {
        onChange(event, value, reason, position)
      }
      onChange(event, value, reason, details)
    },
    []
  )

  return (
    <Grid className={'small-bottom-gab'} container>
      <Grid item xs={3} style={{ display: 'table', paddingLeft: '24px' }}>
        <span className={'align-display-table-cell-vertical-align'}>
          {title}
        </span>
      </Grid>
      <Grid item xs={8}>
        <Autocomplete
          options={options}
          value={value}
          isOptionEqualToValue={() => true}
          onOpen={onOpen}
          getOptionLabel={createOptionLabel}
          onChange={onChangeDecorator}
          filterOptions={createFilterOptions({
            stringify: (option: GNDEntityFact) => option.preferredName,
          })}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              variant="filled"
              data-testid={'languageInput'}
              slotProps={{
                input: {
                  ...params.InputProps,
                  className: 'autocomplete-input-style',
                  'aria-label': 'languageinput',
                },

                inputLabel: {
                  className: 'label-styles-text-field-input-label',
                },
              }}
            />
          )}
          renderOption={(props: object, option: GNDEntityFact) => (
            <li {...props} key={option.gndIdentifier}>
              {option.preferredName}
              <a
                className={'hsp-autocomplete-link-color'}
                onClick={(event) => {
                  event.stopPropagation()
                  window.open(getUrlForGndId(option.gndIdentifier), '_blank')
                }}
              >
                {option.gndIdentifier}
              </a>
            </li>
          )}
          slots={{
            popper: FullscreenPopper,
          }}
        />
      </Grid>
      {deleteCallback && (
        <Grid item xs={1}>
          <IconButton
            title={t('editor.delete')}
            disableTouchRipple={true}
            style={{ color: 'black' }}
            onMouseDown={(event) => {
              deleteCallback(event, position)
            }}
            size="large"
          >
            <Delete />
          </IconButton>
        </Grid>
      )}
    </Grid>
  )
}
