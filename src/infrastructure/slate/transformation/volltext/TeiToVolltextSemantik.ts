import type { Element } from 'slate'
import { ThemenbereichNotationen } from 'src/domain/erfassung/ThemenbereicheAPI'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

type Interpreter = (element: Element) => VolltextSemantik | undefined

const notationToType = Object.fromEntries(
  Object.entries(ThemenbereichNotationen).map(([k, v]) => [v, k])
) as Record<string, VolltextSemantik>

const lookup: Record<string, Interpreter> = {
  persName: ({ data_ref, data_role }) => {
    if (data_ref) {
      return 'person'
    } else if (data_role?.includes('author')) {
      return 'autor'
    }
  },
  orgName: ({ data_ref }) => {
    if (data_ref) {
      return 'koerperschaft'
    }
  },
  placeName: ({ data_ref }) => {
    if (data_ref) {
      return 'ort'
    }
  },
  quote: (element) => {
    if (HSPElement.isTEIInitiumKodierung(element)) {
      return 'initium'
    }
    const { data_type } = element
    if (data_type === 'incipit') {
      return 'incipit'
    }
    if (data_type === 'explicit') {
      return 'explicit'
    }
    return 'zitat'
  },
  ref: (element) => {
    const { data_target, data_type } = element
    if (data_type === 'subjectArea') {
      const indexTerm = HSPNode.findFirstElement(element, ['index'])
      if (indexTerm === undefined) {
        return 'box'
      }
      const { data_indexName = '' } = indexTerm
      return notationToType[data_indexName] ?? 'box'
    } else if (data_type === 'bibliography') {
      return 'literatur'
    } else if (data_target !== undefined) {
      return 'externerLink'
    }
    return 'box'
  },
  hi: (element) => {
    const { data_rend } = element
    return data_rend === 'sup' ? 'superskript' : 'box'
  },
  title: (_) => {
    return 'werktitel'
  },
}

export const teiToVolltextSemantik = (element: Element): VolltextSemantik => {
  const { data_origin: origin } = element
  return (origin in lookup && lookup[origin](element)) || 'box'
}
