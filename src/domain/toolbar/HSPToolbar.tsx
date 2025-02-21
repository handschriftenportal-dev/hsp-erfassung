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

import { Toolbar } from '@mui/material'
import { FC, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from 'slate'

import {
  selectReadOnly,
  selectSaveAllowed,
  updateAlertMessage,
} from '../erfassung/ErfassungsState'
import { ExpandAllComponentsButton } from './ExpandAllComponentsButton'
import { LesenBearbeitenButton } from './LesenBearbeitenButton'
import { LoadingCircleIcon } from './LoadingCircleIcon'
import { TEIDokumentLadenButton } from './TEIDokumentLadenButton'
import { TEISpeichernButton } from './TEISpeichernButton'
import { ToggleFullscreenButton } from './ToggleFullscreenButton'
import { ToggleSonderzeichenButton } from './ToggleSonderzeichenButton'
import { ToolbarDivider } from './ToolbarDivider'
import { ValidateTEIButton } from './ValidateTEIButton'
import { ViewModeToggleButtonGroup } from './ViewModeToggleButtonGroup'
import { WorkspaceVorschauButton } from './WorkspaceVorschauButton'
import { XMLVorschauButton } from './XMLVorschauButton'

interface Props {
  editor: Editor
}

export const HSPToolbar: FC<Props> = memo(({ editor }) => {
  const readOnly = useSelector(selectReadOnly)
  const saveAllowed = useSelector(selectSaveAllowed)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!saveAllowed.allowed) {
      dispatch(
        updateAlertMessage({
          message: saveAllowed.errorMessage,
          level: 'warning',
          hideAfter: saveAllowed.allowed ? 6000 : undefined,
        })
      )
    }
  }, [dispatch, saveAllowed])

  return (
    <Toolbar disableGutters sx={{ display: 'inline-flex', gap: 1 }}>
      {readOnly && <ViewModeToggleButtonGroup />}
      <XMLVorschauButton />
      {readOnly && <WorkspaceVorschauButton />}
      <ToolbarDivider />
      <LoadingCircleIcon />
      {!readOnly && (
        <>
          <ToggleSonderzeichenButton />
          <ExpandAllComponentsButton />
          <ToggleFullscreenButton />
          <ValidateTEIButton withODD={true} editor={editor} />
          <ValidateTEIButton withODD={false} editor={editor} />
          <TEIDokumentLadenButton editor={editor} />
          <TEISpeichernButton />
        </>
      )}
      <LesenBearbeitenButton />
    </Toolbar>
  )
})
