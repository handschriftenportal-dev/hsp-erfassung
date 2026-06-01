import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectSlateState } from 'src/domain/erfassung/ErfassungsState'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { XMLPipeline } from 'src/infrastructure/slate/transformation/XMLPipeline'

import { XMLVorschauDialog } from './dialog/XMLVorschauDialog'
import { TEIEncodingIcon } from './icons/TEIEncodingIcon'
import { HSPToolbarButton } from './styles/HSPToolbarButton'

export const XMLVorschauButton = memo(() => {
  const { t } = useTranslation()
  const slate = useSelector(selectSlateState)
  const { showModal } = useGlobalModalContext()

  return (
    <HSPToolbarButton
      color="secondary"
      title={t('toolbar.show_tei')}
      onClick={() => {
        showModal(
          <XMLVorschauDialog
            document={XMLPipeline.xmlToKomponenten.invert({ data: slate }).data}
          />
        )
      }}
    >
      <TEIEncodingIcon />
    </HSPToolbarButton>
  )
})
