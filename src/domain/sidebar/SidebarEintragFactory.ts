import type { Path } from 'slate'
import type { Komponente } from 'src/infrastructure/slate/ErfassungsRegeln'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'

export interface SidebarEintragModel {
  id: string
  label: string
  teiElement: Komponente
  children: SidebarEintragModel[]
  path: Path
  xmlpath: string
  level: number
  parentId: string
  wrapperId: string
}

export default function SidebarEintragFactory(
  id: string,
  teiElement: Komponente,
  path: Path,
  xmlpath: string,
  level: number,
  parentId: string,
  wrapperId: string
): SidebarEintragModel {
  return {
    id,
    label: ErfassungsRegeln.komponentenLabel(teiElement),
    teiElement,
    children: [],
    path,
    xmlpath,
    level,
    parentId,
    wrapperId,
  }
}
