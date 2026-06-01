import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import type { Element } from 'slate'
import type { ChangedComponent } from 'src/domain/erfassung/ChangedComponent'
import { EDIT_NODE } from 'src/domain/erfassung/ChangedComponent'
import { updateComponentChangedHistory } from 'src/domain/erfassung/ErfassungsState'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'

export function useTextelementChangedForSidebarEvent(element: Element): void {
  const dispatch = useDispatch()
  useEffect(() => {
    const { data_origin, id } = element
    dispatch(
      updateComponentChangedHistory({
        dataOrigin: data_origin,
        method: EDIT_NODE,
        id: id,
      } as ChangedComponent)
    )
  }, [element])
}

export function createOptionLabel(option: GNDEntityFact): string {
  const { preferredName, gndIdentifier } = option
  if (preferredName && gndIdentifier) {
    return `${preferredName} ${gndIdentifier}`
  }
  if (gndIdentifier) {
    return gndIdentifier
  }
  if (preferredName) {
    return preferredName
  }
  return ''
}

export function getOptionStr(option: string) {
  const EMPTY_VALUE = 'empty_value'

  const str = option.toString()
  if (str === '') return EMPTY_VALUE
  return str.replace(/ /g, '_')
}
