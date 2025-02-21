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
import { FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { NormdatenDialogTitle } from '../dialog/NormdatenDialogTitle'
import { EditNormdatumDialogBody } from './EditNormdatumDialogBody'
import { NormdatumDialogAction } from './NormdatumDialogAction'
import { NormdatumDialogState } from './NormdatumDialogState'
import { ReadOnlyNormdatumDialogBody } from './ReadOnlyNormdatumDialogBody'

interface Props {
  initialState: NormdatumDialogState
  onAction: (action: NormdatumDialogAction, state: NormdatumDialogState) => void
}

export const NormdatumDialog: FC<Props> = memo(({ initialState, onAction }) => {
  const { t } = useTranslation()
  const { view, type } = initialState

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      if (key === 'Escape') {
        event.preventDefault()
        onAction('cancel', initialState)
      }
    }
    document.addEventListener('keydown', handleKeyDown, {
      capture: true,
      once: true,
    })
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onAction, initialState])

  return (
    <Dialog maxWidth="lg" fullWidth open={true}>
      <NormdatenDialogTitle
        title={t(`text_tagging.referenz.type.${type}`)}
        clickHandler={() => onAction('back', initialState)}
      />
      {view === 'read' ? (
        <ReadOnlyNormdatumDialogBody state={initialState} />
      ) : (
        <EditNormdatumDialogBody
          initialState={initialState}
          onAction={onAction}
        />
      )}
    </Dialog>
  )
})
