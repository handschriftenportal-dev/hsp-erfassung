import { MoreVert } from '@mui/icons-material'
import { Stack } from '@mui/material'
import type { FC } from 'react'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Editor } from 'slate'
import { TagTextIcon } from 'src/domain/editor/icons/TagTextIcon'
import { TextDecorationIcon } from 'src/domain/editor/icons/TextDecorationIcon'
import { CancelIcon } from 'src/domain/toolbar/icons/CancelWhiteIcon'
import { ToolbarButton } from 'src/infrastructure/components/ToolbarButton'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { removeFormatierung } from 'src/infrastructure/slate/SlateBoundary'

import { AuszeichnungAuswahlDialog } from './AuszeichnungAuswahlDialog'
import type { AuszeichnungsArten } from './SelectionToolbarCustomHooks'
import { allowedTaggings } from './SelectionToolbarCustomHooks'

interface Props {
  editor: Editor
}

export const SelectionToolbarActions: FC<Props> = ({ editor }) => {
  const { t } = useTranslation()
  const { hideModal, showModal } = useGlobalModalContext()

  const handleClick = useCallback(
    (type: AuszeichnungsArten) => () => {
      if (type === 'formatierungLoeschen') {
        removeFormatierung(editor)
        hideModal()
      } else {
        showModal(<AuszeichnungAuswahlDialog editor={editor} type={type} />)
      }
    },
    [showModal, hideModal, editor]
  )

  const { referenz, formatierung, andere, formatierungLoeschen } =
    allowedTaggings(editor)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { shiftKey, altKey, key } = event
      if (referenz && shiftKey && altKey && key === 'N') {
        event.preventDefault()
        handleClick('referenz')()
      } else if (formatierung && shiftKey && altKey && key === 'S') {
        event.preventDefault()
        handleClick('formatierung')()
      } else if (andere && shiftKey && altKey && key === 'W') {
        event.preventDefault()
        handleClick('andere')()
      }
    }
    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClick, referenz, formatierung, andere])

  return (
    <Stack direction="row" spacing={1}>
      <ToolbarButton
        title={t('selection_toolbar.normdaten_auszeichnung')}
        onClick={handleClick('referenz')}
        disabled={!referenz}
      >
        <TagTextIcon />
      </ToolbarButton>
      {formatierungLoeschen ? (
        <ToolbarButton
          title={t('selection_toolbar.formatierung_loeschen')}
          onClick={handleClick('formatierungLoeschen')}
          className="deletion-button"
        >
          <CancelIcon />
        </ToolbarButton>
      ) : (
        <ToolbarButton
          title={t('selection_toolbar.semantische_auszeichnung')}
          onClick={handleClick('formatierung')}
          disabled={!formatierung}
        >
          <TextDecorationIcon />
        </ToolbarButton>
      )}
      <ToolbarButton
        title={t('selection_toolbar.weitere_auszeichnung')}
        onClick={handleClick('andere')}
        disabled={!andere}
      >
        <MoreVert />
      </ToolbarButton>
    </Stack>
  )
}
