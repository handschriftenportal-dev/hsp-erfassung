import type { FC, PropsWithChildren } from 'react'
import { createContext, memo, useContext } from 'react'
import type { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'

const initialState: ThemenbereicheAPI = {
  themenbereiche() {
    return []
  },
  themenbereich() {
    return undefined
  },
  thesaurus() {
    return undefined
  },
  begriff() {
    return undefined
  },
  addSubjectArea() {
    return
  },
  search() {
    return []
  },
}

const ThemenbereichContext = createContext(initialState)
export const useThemenbereich = () => useContext(ThemenbereichContext)

interface Props {
  api: ThemenbereicheAPI
}

export const ThemenbereichService: FC<PropsWithChildren<Props>> = memo(
  function ThemenbereichService({ children, api }) {
    return (
      <ThemenbereichContext.Provider value={api}>
        {children}
      </ThemenbereichContext.Provider>
    )
  }
)
