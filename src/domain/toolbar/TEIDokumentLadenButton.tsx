import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { Editor } from 'slate'
import { Transforms } from 'slate'
import {
  selectConfiguration,
  selectUnsavedDocument,
} from 'src/domain/erfassung/ErfassungsState'
import { NeuladenWarnungDialog } from 'src/domain/toolbar/dialog/NeuladenWarnungDialog'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import {
  useFetchBeschreibung,
  useSpeichern,
} from 'src/infrastructure/nachweis/NachweisServiceHooks'

import { AutoRenewWhiteIcon } from './icons/AutoRenewWhiteIcon'
import { HSPToolbarButton } from './styles/HSPToolbarButton'

interface Props {
  editor: Editor
}

export const TEIDokumentLadenButton: FC<Props> = memo(({ editor }) => {
  const { t } = useTranslation()
  const fetchBeschreibung = useFetchBeschreibung()
  const { showModal } = useGlobalModalContext()
  const unsavedDocument = useSelector(selectUnsavedDocument)
  const { standalone } = useSelector(selectConfiguration)
  const speichern = useSpeichern()

  return (
    <HSPToolbarButton
      id="ladenButton"
      title={t('toolbar.reload')}
      disableTouchRipple
      onClick={(event) => {
        const reload = () => {
          event.preventDefault()
          fetchBeschreibung()
          Transforms.deselect(editor)
        }
        if (!unsavedDocument || standalone) {
          reload()
          return
        }
        const save = () =>
          speichern().then((result) => {
            if (result.success) {
              reload()
            }
            return result
          })

        showModal(<NeuladenWarnungDialog onDiscard={reload} onSave={save} />)
      }}
    >
      <AutoRenewWhiteIcon />
    </HSPToolbarButton>
  )
})
