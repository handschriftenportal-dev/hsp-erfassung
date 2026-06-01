import { Button, DialogActions, DialogContent } from '@mui/material'
import type { FC } from 'react'
import { memo, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import type { XMLNode } from 'src/infrastructure/slate/transformation/XMLNode'

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
    <DraggableDialog title={t('xml_preview_dialog.title')} onClose={hideModal}>
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
    </DraggableDialog>
  )
})
