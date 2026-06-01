import type { Decorator, StoryContext } from '@storybook/react-webpack5'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import {
  updateConfiguration,
  updateMode,
} from 'src/domain/erfassung/ErfassungsState'
import type { SubjectArea } from 'src/domain/erfassung/SubjectArea'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import { GlobalModal } from 'src/infrastructure/modal/GlobalModal'
import { ThemenbereichService } from 'src/infrastructure/normdaten/ThemenbereichService'

import { GlobalDisabledModal } from './infrastructure/modal/GlobalDisabledModal'

export const WithEditMode: Decorator = (Story) => {
  const dispatch = useDispatch()
  dispatch(updateConfiguration({ isEditable: true }))
  dispatch(updateMode('editMode'))
  return <Story />
}

function ThemenbereichAPIProvider({
  Story,
  context,
  subjectAreas,
}: {
  Story: FC
  context: StoryContext
  subjectAreas: SubjectArea[]
}) {
  const locale = context.globals.locale || 'de'
  const api = useMemo(() => {
    const api = ThemenbereicheAPI.new(locale)
    subjectAreas.forEach((sa) => api.addSubjectArea(sa))
    return api
  }, [locale, subjectAreas])

  return (
    <ThemenbereichService api={api}>
      <Story />
    </ThemenbereichService>
  )
}

export const WithThemenbereichAPI =
  (subjectAreas: SubjectArea[]): Decorator =>
  (Story, context) => (
    <ThemenbereichAPIProvider
      Story={Story}
      context={context}
      subjectAreas={subjectAreas}
    />
  )

export const WithModal =
  (enabled: boolean): Decorator =>
  (Story) => {
    return enabled ? (
      <GlobalModal>
        <Story />
      </GlobalModal>
    ) : (
      <GlobalDisabledModal>
        <Story />
      </GlobalDisabledModal>
    )
  }
