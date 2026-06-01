import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
} from '@mui/material'
import type { FC, MouseEventHandler } from 'react'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HSP_ERFASSUNGS_EDITOR_ID } from 'src/domain/editor/HSPEditor'
import type { BeschreibungsKomponenteOption } from 'src/domain/erfassung/ErfassungsGuideline'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import type { Komponente } from 'src/infrastructure/slate/ErfassungsRegeln'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'

import type { SidebarEintragModel } from './SidebarEintragFactory'

interface Props {
  type: 'child' | 'component'
  beschreibung: SidebarEintragModel
  komponentOptions: BeschreibungsKomponenteOption[]
  insert: (beschreibung: SidebarEintragModel, element: Komponente) => void
}

export const KomponentenAuswahlDialog: FC<Props> = memo(
  ({ type, beschreibung, komponentOptions, insert }) => {
    const { hideModal } = useGlobalModalContext()
    const { t } = useTranslation()
    const title =
      type === 'child'
        ? t('sidebar.add_new_child_component')
        : t('sidebar.add_new_component')
    const [komponente, setKomponente] = useState('')

    const handleAddAction = useCallback(
      (komponente: string): MouseEventHandler =>
        (event) => {
          event.preventDefault()
          if (ErfassungsRegeln.isKomponente(komponente)) {
            insert(beschreibung, komponente)
          }
          hideModal()
        },
      [beschreibung, hideModal, insert]
    )

    return (
      <Dialog
        open
        sx={{
          minHeight: '50vh',
          minWidth: '50vw',
        }}
        container={document.getElementById(HSP_ERFASSUNGS_EDITOR_ID)}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <form>
            <FormControl variant="standard">
              <Select
                variant="standard"
                native
                value={komponente}
                onChange={(event) => setKomponente(event.target.value)}
              >
                <option disabled key={'none'} aria-label="None" value="">
                  {t('sidebar.selection')}
                </option>
                {komponentOptions?.map(({ element, label }) => (
                  <option key={element + type} value={element}>
                    {t(label)}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideModal} color="primary">
            {t('sidebar.cancel')}
          </Button>
          <Button
            autoFocus
            onClick={handleAddAction(komponente)}
            color="primary"
          >
            {t('sidebar.add')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)
