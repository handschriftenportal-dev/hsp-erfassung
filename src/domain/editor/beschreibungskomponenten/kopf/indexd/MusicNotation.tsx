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
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import { FC, memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import {
  createInsertTextChangeEventHandler,
  extractFirstText,
} from '../../../../../infrastructure/slate/SlateBoundary'
import { HilfeButton, HilfeText } from '../../hilfetexte'

interface Props {
  element: Element
}

export const MusicNotation: FC<Props> = memo(({ element }) => {
  const [showHelpText, setShowHelpText] = useState(false)
  const editor = useSlateStatic()
  const { t } = useTranslation()

  const [termElement] = element.children as [Element]
  const { id } = termElement as any

  const handleMusicNotationEvent = useCallback(
    createInsertTextChangeEventHandler(editor, termElement),
    [editor, termElement]
  )

  const helpText = t('editor.help_text.music_notation')
  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      setShowHelpText(!showHelpText)
    },
    [showHelpText]
  )

  return (
    <div id={id} key={id}>
      <Grid className={'big-top-gab'} container>
        <Grid className={'align-display-flex-align-items-center'} item xs={3}>
          <span>{t('editor.music_notation')}:</span>
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
              value={extractFirstText(termElement)}
              row
              aria-label={t('editor.music_notation')}
              name="musicNotation-row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ marginRight: '50px' }}
                value=""
                control={<Radio onChange={handleMusicNotationEvent} />}
                label={t('editor.not_specified')}
              />
              <FormControlLabel
                style={{ marginRight: '50px' }}
                value="yes"
                control={<Radio onChange={handleMusicNotationEvent} />}
                label={t('editor.yes')}
              />
              <FormControlLabel
                value="no"
                control={<Radio onChange={handleMusicNotationEvent} />}
                label={t('editor.no')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
})
