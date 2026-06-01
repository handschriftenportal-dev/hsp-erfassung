import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import type { FC, MouseEventHandler } from 'react'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import {
  HilfeButton,
  HilfeText,
} from 'src/domain/editor/beschreibungskomponenten/hilfetexte'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { createInsertTextChangeEventHandler } from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  element: Element
}

export const Decoration: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic()
  const { t } = useTranslation()
  const [showHelpText, setShowHelpText] = useState(false)
  const [termElement] = element.children as [Element]
  const { id = '' } = termElement

  const handleDecorationEvent = createInsertTextChangeEventHandler(
    editor,
    termElement
  )
  const helpText = t('editor.help_text.decoration')
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      setShowHelpText(!showHelpText)
    },
    [showHelpText]
  )

  const value = HSPNode.extractFirstText(termElement)

  return (
    <div id={id} key={id}>
      <Grid className={'big-top-gab'} container>
        <Grid className={'align-display-flex-align-items-center'} item xs={3}>
          {t('editor.decoration')}:{' '}
          {helpText && (
            <HilfeButton onClick={handleClick} activated={showHelpText} />
          )}
        </Grid>
        <Grid item xs={8}>
          {showHelpText && <HilfeText helpText={helpText} />}
          <FormControl
            variant="standard"
            style={{ display: 'flex' }}
            component="fieldset"
          >
            <RadioGroup
              value={value}
              row
              aria-label={t('editor.decoration')}
              name="decoration-row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ marginRight: '50px' }}
                value=""
                control={<Radio onChange={handleDecorationEvent} />}
                label={t('editor.not_specified')}
              />
              <FormControlLabel
                style={{ marginRight: '50px' }}
                value="yes"
                control={<Radio onChange={handleDecorationEvent} />}
                label={t('editor.yes')}
              />
              <FormControlLabel
                value="no"
                control={<Radio onChange={handleDecorationEvent} />}
                label={t('editor.no')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
})
