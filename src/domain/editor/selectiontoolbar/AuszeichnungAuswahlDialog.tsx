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

import { Dialog } from '@mui/material'
import { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Editor } from 'slate'
import { ReactEditor } from 'slate-react'

import { useGlobalModalContext } from '../../../infrastructure/modal/GlobalModal'
import { NormdatenDialogTitle } from '../normdaten/dialog/NormdatenDialogTitle'
import { AndereAuszeichnungActions } from './AndereAuszeichnungActions'
import { FormatierungAuszeichnungActions } from './FormatierungAuszeichnungActions'
import { ReferenzAuszeichnungActions } from './ReferenzAuszeichnungActions'
import { SelectionToolbar } from './SelectionToolbar'

interface Props {
  editor: Editor
  type: 'referenz' | 'formatierung' | 'andere'
}

const ActionComponentLookup: Record<
  Props['type'],
  typeof ReferenzAuszeichnungActions
> = {
  referenz: ReferenzAuszeichnungActions,
  formatierung: FormatierungAuszeichnungActions,
  andere: AndereAuszeichnungActions,
}

export const AuszeichnungAuswahlDialog: FC<Props> = ({ editor, type }) => {
  const { t } = useTranslation()
  const ActionComponent = ActionComponentLookup[type]
  const { hideModal, showModal } = useGlobalModalContext()

  const handleClose = useCallback(() => {
    hideModal()
    setTimeout(() => {
      ReactEditor.focus(editor)
      showModal(<SelectionToolbar editor={editor} />)
    }, 0)
  }, [editor, hideModal, showModal])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      if (key === 'Escape') {
        event.preventDefault()
        handleClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose])

  return (
    <Dialog open={true} maxWidth={'lg'}>
      <NormdatenDialogTitle
        title={t(`text_tagging.${type}.dialog.title`)}
        clickHandler={handleClose}
      />
      <ActionComponent editor={editor} />
    </Dialog>
  )
}
