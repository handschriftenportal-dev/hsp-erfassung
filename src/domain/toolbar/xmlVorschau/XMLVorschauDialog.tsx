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

import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import { FC, memo, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobalModalContext } from '../../../infrastructure/modal/GlobalModal'
import { XMLNode } from '../../../infrastructure/slate/transformation/XMLNode'
import { NormdatenDialogTitle } from '../../editor/normdaten/dialog/NormdatenDialogTitle'
import { XMLNodeVorschau } from './nodes/XMLNodeVorschau'

interface Props {
  document: XMLNode[]
}

export const XMLVorschauDialog: FC<Props> = memo(({ document }) => {
  const { t } = useTranslation()
  const { hideModal } = useGlobalModalContext()
  const ref = useRef<HTMLDivElement | null>(null)
  const copyAll = useCallback(() => {
    if (ref.current && navigator.clipboard) {
      void navigator.clipboard.writeText(ref.current.innerText)
    }
  }, [])
  return (
    <Dialog open={true} scroll="paper" maxWidth={'lg'} fullWidth={true}>
      <NormdatenDialogTitle
        title={t('xml_preview_dialog.title')}
        clickHandler={hideModal}
      />
      <DialogContent>
        <code ref={ref} className="xml-preview-container">
          {document.map((node, idx) => (
            <XMLNodeVorschau node={node} key={idx} level={0} />
          ))}
        </code>
      </DialogContent>
      <DialogActions>
        <Button onClick={copyAll} disabled={!navigator.clipboard}>
          {t('xml_preview_dialog.copy_action')}
        </Button>
        <Button onClick={hideModal} variant="contained">
          {t('xml_preview_dialog.close_action')}
        </Button>
      </DialogActions>
    </Dialog>
  )
})
