import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  name: string
  titel: string
}

export const SidebarEintragTextLabel: FC<Props> = ({ name, titel }) => {
  const { t } = useTranslation()
  const section = t('sidebar.section')

  return name === section ? (
    <div dangerouslySetInnerHTML={{ __html: name + ' ' + titel }} />
  ) : (
    <>
      <div dangerouslySetInnerHTML={{ __html: name }} />
      <span dangerouslySetInnerHTML={{ __html: titel }} />
    </>
  )
}
