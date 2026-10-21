import { last } from "lodash";
import { type MouseEventHandler, useCallback } from "react";
import { useDispatch } from "react-redux";
import type { Descendant } from "slate";
import { type Element, type Node, Path } from "slate";
import { useSlateStatic } from "slate-react";
import {
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_ALT_IDENTIFIER,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_IDNO,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT,
  VORBESITZER_DATA_TYPE,
} from "src/domain/erfassung/TEIConstants";
import { ErfassungsRegeln } from "src/infrastructure/slate/ErfassungsRegeln";
import { HSPElement } from "src/infrastructure/slate/HSPElement";
import {
  findPath,
  insertSlateNodes,
} from "src/infrastructure/slate/SlateBoundary";

type ElementType = "sammlung" | "vorbesitzer" | "koerperschaft" | "ort";

type ElementPositionBehavior = Readonly<{
  matchAncestor: (node: Node) => node is Element;
  matchDescendant: (node: Node) => node is Element;
  matchSame: (node: Node) => node is Element;
  origin: string;
}>;

type CheckPredicate = (node: Element) => boolean;

function guard(
  checks: CheckPredicate | CheckPredicate[]
): (n: Node) => n is Element {
  if (Array.isArray(checks)) {
    return (node: Node): node is Element =>
      HSPElement.isElement(node) && checks.some((check) => check(node));
  }
  return (node: Node): node is Element =>
    HSPElement.isElement(node) && checks(node);
}

const checkOrt = HSPElement.checkOrigin(TEI_ELEMENT_SETTLEMENT);
const checkKoerperschaft = HSPElement.checkOrigin(TEI_ELEMENT_REPOSITORY);
const checkIdno = HSPElement.checkOrigin(TEI_ELEMENT_IDNO);
const checkSammlung = HSPElement.checkAttributes({
  origin: TEI_ELEMENT_ALT_IDENTIFIER,
  type: SAMMLUNG_DATA_TYPE,
});
const checkVorbesitzer = HSPElement.checkAttributes({
  origin: TEI_ELEMENT_ALT_IDENTIFIER,
  type: VORBESITZER_DATA_TYPE,
});

export const elementPositionBehavior: Record<
  ElementType,
  ElementPositionBehavior
> = {
  ort: {
    matchAncestor: guard(checkOrt),
    matchDescendant: guard([checkKoerperschaft, checkIdno]),
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
    matchAncestor: guard([checkIdno, checkSammlung]),
    matchDescendant: guard(checkVorbesitzer),
    matchSame: guard(checkVorbesitzer),
    origin: TEI_ELEMENT_ALT_IDENTIFIER,
  },
};

export const useAddElement = (
  type: ElementType,
  path: string,
  children: Descendant[]
) => {
  const editor = useSlateStatic();
  const dispatch = useDispatch();

  const { matchAncestor, matchDescendant, matchSame, origin } =
    elementPositionBehavior[type];
  const isAltIdentifier = origin === TEI_ELEMENT_ALT_IDENTIFIER;

  const findPosition = useCallback((): Path | undefined => {
    const sameElements = children.filter(matchSame);
    if (sameElements.length !== 0) {
      const path = findPath(editor, last(sameElements)!);
      return path && Path.next(path);
    }

    const ancestors = children.filter(matchAncestor);
    if (ancestors.length !== 0) {
      const path = findPath(editor, last(ancestors)!);
      return path && Path.next(path);
    }

    const descendant = children.find(matchDescendant);
    if (descendant) {
      return findPath(editor, descendant);
    }

    const path = findPath(editor, children[0]);
    return path && Path.next(path);
  }, [children, editor, matchAncestor, matchDescendant, matchSame]);

  const addElement: MouseEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      const pos = findPosition();
      if (!pos) {
        return;
      }
      const element = ErfassungsRegeln.komponenteElement(
        TEI_ELEMENT_IDENTIFICATION
      ).children.find(matchSame);

      if (element) {
        element.path = `${path}-${origin}`;
        insertSlateNodes(editor, element, pos, dispatch);
      }
    },
    [dispatch, editor, findPosition, matchSame, origin, path]
  );

  return { isAltIdentifier, addElement };
};
