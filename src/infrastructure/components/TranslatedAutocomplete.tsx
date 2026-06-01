import type { AutocompleteProps } from '@mui/material'
import { Autocomplete } from '@mui/material'
import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export function TranslatedAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>
): ReactElement {
  const { t } = useTranslation()

  const defaultProps = {
    openText: t('autocomplete.open_text'),
    clearText: t('autocomplete.clear_text'),
    closeText: t('autocomplete.close_text'),
    noOptionsText: t('autocomplete.no_option'),
  }
  return <Autocomplete {...defaultProps} {...props} />
}
