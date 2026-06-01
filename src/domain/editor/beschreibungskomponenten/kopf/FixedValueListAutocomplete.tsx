import { Grid, TextField } from '@mui/material'
import type { FC, MouseEventHandler, SyntheticEvent } from 'react'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Element as ScrollAnchor } from 'react-scroll'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { getOptionStr } from 'src/domain/editor/beschreibungskomponenten/BeschreibungsKomponentenCustomHooks'
import {
  HilfeButton,
  HilfeText,
} from 'src/domain/editor/beschreibungskomponenten/hilfetexte'
import { DeleteSlateNodeButton } from 'src/domain/editor/DeleteSlateNodeButton'
import { FullscreenPopper } from 'src/domain/erfassung/FullscreenPopper'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import {
  findPath,
  insertSlateText,
} from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  termElement: Element
  leftSidelabel: string
  optionsArray: Readonly<string[]>
  useDeleteButton?: boolean
  paddingLeft?: string
  disabled?: boolean
  helpText?: string
  helpTextContainer?: string
}

export const FixedValueListAutocomplete: FC<Props> = memo(
  ({
    termElement,
    leftSidelabel,
    optionsArray,
    useDeleteButton,
    paddingLeft,
    disabled,
    helpText,
  }) => {
    const [showHelpText, setShowHelpText] = useState(false)
    const { t } = useTranslation()
    const { error, id = '', data_type } = termElement

    const [termElementTEITextValue, setTermElementTEITextValue] = useState(
      HSPNode.extractFirstText(termElement)
    )
    const editor = useSlateStatic()

    const insertTextAutoComplete = useCallback(
      (event: SyntheticEvent, value: string | null) => {
        event.preventDefault()
        value = value || ''

        const path = findPath(editor, termElement)
        if (path) {
          insertSlateText(editor, value, path)
          setTermElementTEITextValue(value)
        }
      },
      [editor, setTermElementTEITextValue, termElement]
    )

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        event.preventDefault()
        event.stopPropagation()
        setShowHelpText(!showHelpText)
      },
      [showHelpText]
    )

    if (
      data_type === 'format' ||
      data_type === 'material_type' ||
      data_type === 'status' ||
      data_type === 'form'
    ) {
      return (
        <Grid container className={'small-bottom-gab'}>
          <Grid
            item
            xs={3}
            style={{
              display: 'table',
              paddingLeft: paddingLeft ?? 0,
            }}
          >
            <span
              className={
                !showHelpText
                  ? 'align-display-table-cell-vertical-align'
                  : undefined
              }
              style={{
                color: !error ? 'inherit' : '#aa2e25',
              }}
            >
              <ScrollAnchor name={id}>
                {leftSidelabel}:{' '}
                {helpText && (
                  <HilfeButton onClick={handleClick} activated={showHelpText} />
                )}
              </ScrollAnchor>
            </span>
          </Grid>
          <Grid item xs={8}>
            {showHelpText && <HilfeText helpText={helpText} />}
            {
              <TranslatedAutocomplete
                options={optionsArray}
                classes={{
                  option: 'autocomplete-option-style',
                  paper: 'autocomplete-paper-style',
                }}
                value={termElementTEITextValue}
                getOptionLabel={(option: string) =>
                  t(data_type + '.' + getOptionStr(option))
                }
                isOptionEqualToValue={() => true}
                disabled={disabled}
                onChange={insertTextAutoComplete}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    variant="filled"
                    title={data_type}
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
            }
          </Grid>
          <Grid item xs={1}>
            {useDeleteButton && <DeleteSlateNodeButton element={termElement} />}
          </Grid>
        </Grid>
      )
    }
    return null
  }
)
