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

import { MoreVert } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Editor } from 'slate'

import { ToolbarButton } from '../../../infrastructure/components/ToolbarButton'
import { useGlobalModalContext } from '../../../infrastructure/modal/GlobalModal'
import { removeFormatierung } from '../../../infrastructure/slate/SlateBoundary'
import { CancelIcon } from '../../toolbar/icons/CancelWhiteIcon'
import { TagTextIcon } from '../icons/TagTextIcon'
import { TextDecorationIcon } from '../icons/TextDecorationIcon'
import { AuszeichnungAuswahlDialog } from './AuszeichnungAuswahlDialog'
import {
  allowedTaggings,
  AuszeichnungsArten,
} from './SelectionToolbarCustomHooks'

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
