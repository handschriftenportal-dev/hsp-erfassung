import { Search } from '@mui/icons-material'
import { Checkbox, Chip, TextField } from '@mui/material'
import { createFilterOptions } from '@mui/material/useAutocomplete'
import type { FC } from 'react'
import { memo } from 'react'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { CheckboxIcons } from 'src/infrastructure/components/CheckboxIcons'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'

interface Props {
  auswahl: GNDEntityFact[]
  normdaten: GNDEntityFact[]
  onChange?: (values: GNDEntityFact[]) => void
  'aria-labelledby'?: string | undefined
  limit?: number
  variant?: 'filled' | 'outlined' | 'standard'
  label?: string | undefined
}

export const NormdatenMehrfachAuswahl: FC<Props> = memo(
  function NormdatenMehrfachAuswahl({
    auswahl,
    normdaten,
    onChange,
    'aria-labelledby': ariaLabeledBy,
    limit = 100,
    variant = 'filled',
    label,
  }) {
    const isLimited = normdaten.length > limit
    return (
      <TranslatedAutocomplete
        multiple
        fullWidth
        options={normdaten}
        onChange={(_, value) => {
          if (onChange) {
            onChange(Array.isArray(value) ? value : [value])
          }
        }}
        value={auswahl}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(normdatum) => normdatum.preferredName}
        filterOptions={createFilterOptions({
          matchFrom: 'start',
          stringify: (option) => option.preferredName,
          limit: isLimited ? limit : undefined,
        })}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            aria-labelledby={ariaLabeledBy}
            label={label}
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLimited && <Search />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
        renderTags={(values, getTagProps) =>
          values.map((normdatum, index) => {
            const { key, ...props } = getTagProps({ index })
            return (
              <Chip
                key={key}
                {...props}
                variant="outlined"
                label={normdatum.preferredName}
              />
            )
          })
        }
        renderOption={(props, normdatum, { selected }) => {
          const { key, ...optionProps } = props
          const { preferredName, gndIdentifier } = normdatum
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={CheckboxIcons.unchecked}
                checkedIcon={CheckboxIcons.checked}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {preferredName}
              {gndIdentifier != null && (
                <a
                  className={'hsp-autocomplete-link-color'}
                  onClick={(event) => {
                    event.stopPropagation()
                    window.open(
                      NormdatenUtilities.idToUrl(gndIdentifier),
                      '_blank'
                    )
                  }}
                >
                  {gndIdentifier}
                </a>
              )}
            </li>
          )
        }}
      />
    )
  }
)
