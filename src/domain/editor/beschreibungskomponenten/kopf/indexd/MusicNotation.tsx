/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React, { useCallback } from 'react'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { Transforms } from 'slate'
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core'
import i18next from 'i18next'

/**
 * Author: Christoph Marten on 28.01.2022 at 13:43
 */
interface MusicNotationProps {
  element: any,
}

export const MusicNotation = React.memo(({ element }: MusicNotationProps) => {

  const editor = useSlateStatic()

  const termElements = element.children

  const handleMusicNotationEvent = useCallback((event: any) => {
    event.preventDefault()
    Transforms.insertText(
      editor, event.target.value,
      { at: ReactEditor.findPath(editor as ReactEditor, termElements[0]) }
    )
  }, [])

  return <div id={termElements[0].id} key={termElements[0].id} contentEditable={false}>
    <Grid className={'big-top-gab'} container contentEditable={false}>
      <Grid className={'align-display-flex-align-items-center'} item contentEditable={false} xs={3}><span>{i18next.t('editor.musicNotation')}:</span></Grid>
      <Grid item contentEditable={false} xs={7}>
        <FormControl style={{ display: 'flex' }} component="fieldset">
          <RadioGroup value={termElements[0].children[0].children[0].text} row
                      aria-label={i18next.t('editor.musicNotation')} name="musicNotation-row-radio-buttons-group">
            <FormControlLabel style={{ marginRight: '50px' }} value=""
                              control={<Radio onChange={handleMusicNotationEvent}/>}
                              label={i18next.t('editor.not_specified')}/>
            <FormControlLabel style={{ marginRight: '50px' }} value="yes"
                              control={<Radio onChange={handleMusicNotationEvent}/>} label={i18next.t('editor.yes')}/>
            <FormControlLabel value="no" control={<Radio onChange={handleMusicNotationEvent}/>}
                              label={i18next.t('editor.no')}/>
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  </div>
})
