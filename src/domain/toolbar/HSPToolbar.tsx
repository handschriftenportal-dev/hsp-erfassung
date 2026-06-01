import { Toolbar } from '@mui/material'
import type { FC } from 'react'
import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Editor } from 'slate'
import {
  selectReadOnly,
  selectSaveAllowed,
  updateAlertMessage,
} from 'src/domain/erfassung/ErfassungsState'

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
      {readOnly ? (
        <>
          <ViewModeToggleButtonGroup />
          <XMLVorschauButton />
          <WorkspaceVorschauButton />
          <ToolbarDivider />
          <LoadingCircleIcon />
          <ToggleFullscreenButton />
          <LesenBearbeitenButton />
        </>
      ) : (
        <>
          <XMLVorschauButton />
          <ToolbarDivider />
          <LoadingCircleIcon />
          <ToggleSonderzeichenButton />
          <ExpandAllComponentsButton />
          <ToggleFullscreenButton />
          <ValidateTEIButton withODD editor={editor} />
          <ValidateTEIButton withODD={false} editor={editor} />
          <TEIDokumentLadenButton editor={editor} />
          <TEISpeichernButton />
          <LesenBearbeitenButton />
        </>
      )}
    </Toolbar>
  )
})
