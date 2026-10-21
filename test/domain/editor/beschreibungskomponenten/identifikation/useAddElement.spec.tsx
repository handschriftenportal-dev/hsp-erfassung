import { renderHook } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import type { Element } from "slate";
import { Slate } from "slate-react";
import {
  elementPositionBehavior,
  useAddElement,
} from "src/domain/editor/beschreibungskomponenten/identifikation/useAddElement";
import { createErfassungsEditor } from "src/infrastructure/slate/ErfassungsEditorFactory";
import { TestContext } from "test/TestContext";

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const editor = createErfassungsEditor();

  return (
    <TestContext>
      <Slate initialValue={[]} editor={editor}>
        {children}
      </Slate>
    </TestContext>
  );
};

type FindPositionTest = {
  type: "sammlung" | "vorbesitzer" | "koerperschaft" | "ort";
  element: Element;
  expected: {
    ancestor: boolean;
    descendant: boolean;
    same: boolean;
  };
};

describe("useAddElementButtonForIdentification", () => {
  const path = "some-string";

  const signatur = { data_origin: "idno", children: [{ text: "Signatur" }] };
  const ort = {
    data_origin: "settlement",
    data_key: "NORM-e286adb5-e0fb-3f4b-8f0d-af5e42241217",
    data_ref: "https://d-nb.info/gnd/1136096078",
    children: [{ text: "Ort" }],
  };
  const koerperschaft = {
    data_origin: "repository",
    data_key: "NORM-6bdb4e34-f876-3423-b84d-ea40bd710fc1",
    data_ref: "https://d-nb.info/gnd/4842851-6",
    children: [{ text: "Ort" }],
  };

  it.each([
    ["sammlung", true],
    ["vorbesitzer", true],
    ["koerperschaft", false],
    ["ort", false],
  ] as const)("isAltIdentifier for %s is %p", (type, expected) => {
    const { result } = renderHook(() => useAddElement(type, path, []), {
      wrapper: Wrapper,
    });
    const { isAltIdentifier } = result.current;
    expect(isAltIdentifier).toBe(expected);
  });

  describe.each([
    {
      type: "ort",
      element: signatur,
      expected: { ancestor: false, descendant: true, same: false },
    },
    {
      type: "ort",
      element: koerperschaft,
      expected: { ancestor: false, descendant: true, same: false },
    },
    {
      type: "ort",
      element: ort,
      expected: { ancestor: true, descendant: false, same: true },
    },
    {
      type: "koerperschaft",
      element: signatur,
      expected: { ancestor: false, descendant: true, same: false },
    },
    {
      type: "koerperschaft",
      element: koerperschaft,
      expected: { ancestor: false, descendant: false, same: true },
    },
    {
      type: "koerperschaft",
      element: ort,
      expected: { ancestor: true, descendant: false, same: false },
    },
  ] as FindPositionTest[])(
    "position behavior of $type to $element.data_origin",
    ({ type, element, expected }) => {
      const positionBehavior = elementPositionBehavior[type];
      const { ancestor, descendant, same } = expected;

      it(`is${descendant ? "" : " not"} descendant`, () => {
        expect(positionBehavior.matchDescendant(element)).toBe(descendant);
      });

      it(`is${ancestor ? "" : " not"} ancestor ${element.data_origin}`, () => {
        expect(positionBehavior.matchAncestor(element)).toBe(ancestor);
      });

      it(`is${same ? "" : " not"} same`, () => {
        expect(positionBehavior.matchSame(element)).toBe(same);
      });
    }
  );
});
