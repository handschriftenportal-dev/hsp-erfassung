import {
  Checkbox,
  Chip,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material'
import { createFilterOptions } from '@mui/material/useAutocomplete'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NotationChip } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/NotationChip'
import { selectTaggableNormdaten } from 'src/domain/erfassung/ErfassungsState'
import type { Begriff, Leveled } from 'src/domain/erfassung/ThemenbereicheAPI'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import { CheckboxIcons } from 'src/infrastructure/components/CheckboxIcons'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'
import { useThemenbereich } from 'src/infrastructure/normdaten/ThemenbereichService'

type EinfachAuswahlProps = {
  disabled?: boolean
  multiple?: false
  'aria-labelledby'?: string | undefined
  thesaurus: string
  auswahl?: undefined | string | string[]
  onChange?: (value: Begriff | undefined) => void
}

type MehrfachAuswahlProps = {
  disabled?: boolean
  multiple: true
  'aria-labelledby'?: string | undefined
  thesaurus: string
  auswahl: string[]
  onChange?: (begriffe: Begriff[]) => void
}

type Props = EinfachAuswahlProps | MehrfachAuswahlProps

function filterOneOptions(
  options: Leveled<Begriff>[],
  auswahl: undefined | string | string[]
): Leveled<Begriff> | null {
  if (auswahl === undefined) {
    return null
  }
  if (typeof auswahl === 'string') {
    return options.find(({ item }) => item.identifier.id === auswahl) ?? null
  }
  const auswahlLookup = new Set(auswahl)
  return (
    options.find(({ item }) => auswahlLookup.has(item.identifier.id)) ?? null
  )
}

function filterAllOptions(
  options: Leveled<Begriff>[],
  auswahl: string[]
): Leveled<Begriff>[] {
  const auswahlLookup = new Set(auswahl)
  return options.filter(({ item }) => auswahlLookup.has(item.identifier.id))
}

const ThesaurusEinfachAuswahl: FC<EinfachAuswahlProps> = ({
  auswahl,
  'aria-labelledby': ariaLabeledBy,
  disabled = false,
  onChange,
  thesaurus,
}) => {
  const api = useThemenbereich()
  const { t } = useTranslation()
  const taggable = useSelector(selectTaggableNormdaten)
  const [error, options] = useMemo(() => {
    const result = ThemenbereicheAPI.thesaurusToList(api, thesaurus)
    return [result === undefined, result ?? []]
    // The loading of the Themenbereich can happen after the first render, hence
    // we need to update the options accordingly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, thesaurus, taggable])
  const value = filterOneOptions(options, auswahl)

  return (
    <TranslatedAutocomplete
      disabled={disabled || error}
      options={options}
      value={value}
      onChange={(_, value) => {
        if (onChange) {
          onChange(value?.item)
        }
      }}
      getOptionLabel={({ item }) => item.label}
      filterOptions={createFilterOptions({
        ignoreCase: true,
        stringify: ({ item }) => `${item.identifier.notation} ${item.label}`,
      })}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          aria-labelledby={ariaLabeledBy}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: params.InputProps.endAdornment,
            },
          }}
          error={error}
          helperText={
            error && t('thesaurus_auswahl.unknown_thesaurus', { thesaurus })
          }
        />
      )}
      renderOption={(props, { level, item }) => {
        const { key, ...optionProps } = props
        const {
          label,
          identifier: { notation, uri },
        } = item
        return (
          <ListItem
            {...optionProps}
            dense
            key={key}
            disablePadding
            secondaryAction={<NotationChip notation={notation} uri={uri} />}
          >
            <ListItemText sx={{ ml: level * 5 }} primary={label} />
          </ListItem>
        )
      }}
      renderTags={(values, getTagProps) =>
        values.map(({ item }, index) => {
          const { key, ...props } = getTagProps({ index })
          return (
            <Chip key={key} {...props} variant="outlined" label={item.label} />
          )
        })
      }
    />
  )
}

const ThesaurusMehrfachAuswahl: FC<MehrfachAuswahlProps> = ({
  auswahl,
  'aria-labelledby': ariaLabeledBy,
  disabled = false,
  onChange,
  thesaurus,
}) => {
  const api = useThemenbereich()
  const { t } = useTranslation()
  const taggable = useSelector(selectTaggableNormdaten)
  const [error, options] = useMemo(() => {
    const result = ThemenbereicheAPI.thesaurusToList(api, thesaurus)
    return [result === undefined, result ?? []]
    // The loading of the Themenbereich can happen after the first render, hence
    // we need to update the options accordingly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, thesaurus, taggable])
  const value = filterAllOptions(options, auswahl)

  return (
    <TranslatedAutocomplete
      multiple
      disableCloseOnSelect
      disabled={disabled || error}
      options={options}
      value={value}
      onChange={(_, value) => {
        if (onChange) {
          onChange(value.map(({ item }) => item))
        }
      }}
      getOptionLabel={({ item }) => item.label}
      filterOptions={createFilterOptions({
        ignoreCase: true,
        stringify: ({ item }) => `${item.identifier.notation} ${item.label}`,
      })}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          aria-labelledby={ariaLabeledBy}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: params.InputProps.endAdornment,
            },
          }}
          error={error}
          helperText={
            error && t('thesaurus_auswahl.unknown_thesaurus', { thesaurus })
          }
        />
      )}
      renderOption={(props, { level, item }, { selected }) => {
        const { key, ...optionProps } = props
        const {
          label,
          identifier: { notation, uri },
        } = item
        return (
          <ListItem
            {...optionProps}
            dense
            key={key}
            disablePadding
            secondaryAction={<NotationChip notation={notation} uri={uri} />}
          >
            <ListItemText
              sx={{ ml: level * 5 }}
              primary={
                <>
                  <Checkbox
                    icon={CheckboxIcons.unchecked}
                    checkedIcon={CheckboxIcons.checked}
                    checked={selected}
                  />
                  {label}
                </>
              }
            />
          </ListItem>
        )
      }}
      renderTags={(values, getTagProps) =>
        values.map(({ item }, index) => {
          const { key, ...props } = getTagProps({ index })
          return (
            <Chip key={key} {...props} variant="outlined" label={item.label} />
          )
        })
      }
    />
  )
}

export const ThesaurusAuswahl = (props: Props) => {
  return props.multiple ? (
    <ThesaurusMehrfachAuswahl {...props} />
  ) : (
    <ThesaurusEinfachAuswahl {...props} />
  )
}
