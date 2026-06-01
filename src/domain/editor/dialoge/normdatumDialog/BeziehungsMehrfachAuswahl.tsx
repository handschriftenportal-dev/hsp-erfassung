import { Chip, TextField } from '@mui/material'
import type { FC, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
  NormdatenBeziehungenPort,
  useBeziehungsUebersetzung,
} from 'src/domain/editor/normdaten/NormdatenBeziehungenPort'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'

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
    <TranslatedAutocomplete
      multiple
      noOptionsText={t('text_tagging.referenz.dialog.no_roles')}
      getOptionLabel={(option) =>
        t(`text_tagging.referenz.role.${option}`, option)
      }
      fullWidth
      readOnly={readOnly}
      options={options}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={'standard'}
          label={t('text_tagging.referenz.dialog.role', {
            count: value.length,
          })}
          placeholder={
            readOnly || value.length > 0
              ? undefined
              : t('text_tagging.referenz.dialog.role_placeholder')
          }
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
