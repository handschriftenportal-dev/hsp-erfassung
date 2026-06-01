import { Add } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import { last } from 'lodash'
import type { FC, MouseEventHandler, PropsWithChildren } from 'react'
import { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import type { Descendant, Element, Node } from 'slate'
import { Path } from 'slate'
import { useSlateStatic } from 'slate-react'
import {
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_ALT_IDENTIFIER,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_IDNO,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT,
  VORBESITZER_DATA_TYPE,
} from 'src/domain/erfassung/TEIConstants'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import {
  findPath,
  insertSlateNodes,
} from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  msIdentifierChildren: Descendant[]
  type: 'sammlung' | 'vorbesitzer' | 'koerperschaft' | 'ort'
  path: string
  gab?: 'small' | 'mid'
}

type AddInfo = {
  matchAncestor: (node: Node) => node is Element
  matchDescendant: (node: Node) => node is Element
  matchSame: (node: Node) => node is Element
  origin: string
}

function guard(check: (e: Element) => boolean): (n: Node) => n is Element {
  return (node: Node): node is Element =>
    HSPElement.isElement(node) && check(node)
}

const checkOrt = HSPElement.checkOrigin(TEI_ELEMENT_SETTLEMENT)
const checkKoerperschaft = HSPElement.checkOrigin(TEI_ELEMENT_REPOSITORY)
const checkIdno = HSPElement.checkOrigin(TEI_ELEMENT_IDNO)
const checkSammlung = HSPElement.checkAttributes({
  origin: TEI_ELEMENT_ALT_IDENTIFIER,
  type: SAMMLUNG_DATA_TYPE,
})
const checkVorbesitzer = HSPElement.checkAttributes({
  origin: TEI_ELEMENT_ALT_IDENTIFIER,
  type: VORBESITZER_DATA_TYPE,
})

const addInfoLookup: Record<Props['type'], AddInfo> = {
  ort: {
    matchAncestor: guard(checkOrt),
    matchDescendant: guard(checkKoerperschaft),
    matchSame: guard(checkOrt),
    origin: TEI_ELEMENT_SETTLEMENT,
  },
  koerperschaft: {
    matchAncestor: guard(checkOrt),
    matchDescendant: guard(checkIdno),
    matchSame: guard(checkKoerperschaft),
    origin: TEI_ELEMENT_REPOSITORY,
  },
  sammlung: {
    matchAncestor: guard(checkIdno),
    matchDescendant: guard(checkVorbesitzer),
    matchSame: guard(checkSammlung),
    origin: TEI_ELEMENT_ALT_IDENTIFIER,
  },
  vorbesitzer: {
    matchAncestor: guard((node) => checkIdno(node) || checkSammlung(node)),
    matchDescendant: guard(checkVorbesitzer),
    matchSame: guard(checkVorbesitzer),
    origin: TEI_ELEMENT_ALT_IDENTIFIER,
  },
}

export const AddElementButtonForIdentification: FC<PropsWithChildren<Props>> =
  memo(({ msIdentifierChildren, type, children, path, gab = 'small' }) => {
    const editor = useSlateStatic()
    const dispatch = useDispatch()

    const addInfo = addInfoLookup[type]
    const isAltIdentifier = addInfo.origin === TEI_ELEMENT_ALT_IDENTIFIER

    const findPosition = useCallback(
      ({
        matchAncestor,
        matchDescendant,
        matchSame,
      }: AddInfo): Path | undefined => {
        const sameElements = msIdentifierChildren.filter(matchSame)
        if (sameElements.length !== 0) {
          const path = findPath(editor, last(sameElements)!)
          return path && Path.next(path)
        }

        const ancestors = msIdentifierChildren.filter(matchAncestor)
        if (ancestors.length !== 0) {
          const path = findPath(editor, last(ancestors)!)
          return path && Path.next(path)
        }

        const descendants = msIdentifierChildren.filter(matchDescendant)
        if (descendants.length !== 0) {
          return findPath(editor, descendants[0])
        }

        const path = findPath(editor, msIdentifierChildren[0])
        return path && Path.next(path)
      },
      [msIdentifierChildren, editor]
    )

    const addElement: MouseEventHandler = useCallback(
      (event) => {
        event.preventDefault()
        const pos = findPosition(addInfo)
        if (!pos) {
          return
        }
        const { matchSame, origin } = addInfo
        const element = ErfassungsRegeln.komponenteElement(
          TEI_ELEMENT_IDENTIFICATION
        ).children.find(matchSame)

        if (pos && element) {
          element.path = `${path}-${origin}`
          insertSlateNodes(editor, element, pos, dispatch)
        }
      },
      [addInfo, dispatch, editor, findPosition, path]
    )

    return (
      <Grid
        style={{ marginBottom: '12px', justifyContent: 'end' }}
        item
        xs={11}
        container
      >
        <Grid
          className={gab === 'small' ? 'small-bottom-gab' : 'mid-bottom-gab'}
          item
          xs={3}
        >
          <Button
            startIcon={<Add />}
            className={
              isAltIdentifier
                ? 'black-add-button-style'
                : 'grey-add-button-style'
            }
            onClick={addElement}
            size="small"
            variant="text"
          >
            {children}
          </Button>
        </Grid>
      </Grid>
    )
  })
