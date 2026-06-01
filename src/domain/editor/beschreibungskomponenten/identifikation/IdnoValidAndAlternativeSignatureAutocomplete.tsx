import { Grid, TextField } from '@mui/material'
import type { FC, SyntheticEvent } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import type { RenderElementProps } from 'slate-react'
import { useSlateStatic } from 'slate-react'
import { DeleteSlateNodeButton } from 'src/domain/editor/DeleteSlateNodeButton'
import { NoneEditableTwoColumnElement } from 'src/domain/editor/NoneEditableTwoColumnElement'
import type { BeschreibungsObject } from 'src/domain/erfassung/Erfassung'
import {
  selectBeschreibung,
  selectReadOnly,
  updateSaveAllowed,
} from 'src/domain/erfassung/ErfassungsState'
import { FullscreenPopper } from 'src/domain/erfassung/FullscreenPopper'
import { TEI_ELEMENT_ALT_IDENTIFIER } from 'src/domain/erfassung/TEIConstants'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import {
  findPath,
  insertSlateText,
} from 'src/infrastructure/slate/SlateBoundary'

interface Props extends RenderElementProps {}

export const IdnoValidAndAlternativeSignatureAutocomplete: FC<Props> = memo(
  ({ children, element }) => {
    const { path } = element
    const [firstChild] = element.children
    const { t } = useTranslation()
    const readOnly = useSelector(selectReadOnly)
    const beschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
    const editor = useSlateStatic()
    const dispatch = useDispatch()
    const text = HSPNode.extractText(element)
    const signaturen: string[] =
      !beschreibung.kodsignaturen || beschreibung.kodsignaturen.length > 0
        ? beschreibung.kodsignaturen
        : children
          ? [text]
          : [t('editor.signature_not_found')]
    const [error, setError] = useState(!children || text === '')

    const insertValueAutocompleteForIdno = useCallback(
      (event: SyntheticEvent) => {
        event.preventDefault()
        const at = findPath(editor, firstChild)
        const target = event.target as HTMLElement
        if (at && target.innerText) {
          insertSlateText(editor, target.outerText, at)
        }
      },
      []
    )

    const insertTextForIdno = useCallback((event: SyntheticEvent) => {
      event.preventDefault()
      const at = findPath(editor, firstChild)
      const target = event.target as HTMLInputElement
      if (at && target && target.value !== '') {
        setError(false)
        insertSlateText(editor, target.value, at)
      } else {
        setError(true)
      }
    }, [])

    useEffect(() => {
      if (error && !readOnly) {
        const stringToCut = '#document-TEI-text-body-'
        dispatch(
          updateSaveAllowed({
            allowed: false,
            errorMessage: t('editor.invalid_fields', {
              path: path?.slice(stringToCut.length) ?? '',
            }),
          })
        )
      } else {
        dispatch(updateSaveAllowed({ allowed: true, errorMessage: '' }))
      }
    }, [error, readOnly])

    return readOnly ? (
      <NoneEditableTwoColumnElement label={t('editor.idno')}>
        {children}
      </NoneEditableTwoColumnElement>
    ) : (
      <Grid container className={'small-bottom-gab'}>
        <Grid item xs={3} style={{ display: 'table' }}>
          <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            {t('editor.idno')}:{' '}
          </span>
        </Grid>
        <Grid item xs={8}>
          <TranslatedAutocomplete
            onChange={insertValueAutocompleteForIdno}
            value={HSPNode.extractText(element)}
            options={signaturen}
            freeSolo={!path || path.includes(TEI_ELEMENT_ALT_IDENTIFIER)}
            fullWidth={false}
            disableClearable
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                autoFocus
                {...params}
                error={error}
                onChange={insertTextForIdno}
                helperText={error ? t('editor.idno_not_empty') : ''}
                variant="filled"
                size="small"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    className: 'autocomplete-input-style',
                  },
                }}
              />
            )}
            slots={{
              popper: FullscreenPopper,
            }}
          />
          <span style={{ display: 'none' }}>{children}</span>
        </Grid>
        <Grid item xs={1}>
          {!path || path.includes(TEI_ELEMENT_ALT_IDENTIFIER) ? (
            <DeleteSlateNodeButton element={element} />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    )
  }
)
