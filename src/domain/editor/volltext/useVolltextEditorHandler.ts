import type { KeyboardEvent, KeyboardEventHandler, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Ancestor, Descendant } from "slate";
import { Editor, Range } from "slate";
import { ReactEditor } from "slate-react";
import { useDialog } from "src/domain/editor/dialoge/useDialog";
import { LiteraturService } from "src/infrastructure/literatur/LiteraturService";
import { HSPEditor } from "src/infrastructure/slate/HSPEditor";
import { insertLiteratur } from "src/infrastructure/slate/SlateBoundary";
import { VolltextElement } from "src/infrastructure/slate/volltext/VolltextElement";
import type { Literatur } from "src/types/Literatur";

type SlateChangeHandler = (content: Descendant[]) => void;

interface UseVolltextLiteratureResult {
  handleKeyDown: KeyboardEventHandler;
  handleChange: SlateChangeHandler;

  literatureList: Literatur[];
  showLiteratureSelection: boolean;
  insertLiteratureByIndex: (i: number) => void;
  literaturePortalRef: RefObject<HTMLDivElement | null>;
  selectedLiteratureIndex: number;
}

export function useVolltextEditorHandler(
  editor: Editor,
  onChange: (content: Descendant[]) => void
): UseVolltextLiteratureResult {
  const literaturePortalRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState<Range | null>(null);
  const [selectedLiteratureIndex, setSelectedLiteratureIndex] = useState(0);
  const { openEditDialogHandler } = useDialog(editor);

  const literatureList = LiteraturService.findByTitle(search).slice(0, 10);
  const showLiteratureSelection = target !== null && literatureList.length > 0;

  const handleLiteratureSelectionKeyDown = useCallback(
    (event: KeyboardEvent): boolean => {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          const prevIndex =
            selectedLiteratureIndex >= literatureList.length - 1
              ? 0
              : selectedLiteratureIndex + 1;
          setSelectedLiteratureIndex(prevIndex);
          return true;
        }
        case "ArrowUp": {
          event.preventDefault();
          const nextIndex =
            selectedLiteratureIndex <= 0
              ? literatureList.length - 1
              : selectedLiteratureIndex - 1;
          setSelectedLiteratureIndex(nextIndex);
          return true;
        }
        case "Tab":
        case "Enter": {
          event.preventDefault();
          if (target) {
            insertLiteratur(
              editor,
              target,
              literatureList[selectedLiteratureIndex]
            );
          }
          setTarget(null);
          return true;
        }
        case "Escape": {
          event.preventDefault();
          setTarget(null);
          return true;
        }
        default:
          return false;
      }
    },
    [editor, literatureList, selectedLiteratureIndex, target]
  );

  const handleVolltextBlockKeyDown = useCallback(
    (event: KeyboardEvent, node: Ancestor): void => {
      if (event.key === "Enter" && VolltextElement.isVolltextReferenz(node)) {
        event.preventDefault();
        openEditDialogHandler(node)();
        return;
      }
      if (!VolltextElement.isVolltextBlock(node)) {
        return;
      }
      if (event.key === "+" && event.ctrlKey) {
        HSPEditor.toggleSuperskript(editor);
        event.preventDefault();
      }
      if (event.key === "Escape" || event.key === "Enter") {
        HSPEditor.removeSuperskript(editor);
      }
    },
    [editor, openEditDialogHandler]
  );

  const handleKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      const entry = Editor.above(editor);
      if (!entry) {
        return;
      }
      if (showLiteratureSelection && handleLiteratureSelectionKeyDown(event)) {
        return;
      }

      const [node, _] = entry;
      handleVolltextBlockKeyDown(event, node);
    },
    [
      editor,
      showLiteratureSelection,
      handleLiteratureSelectionKeyDown,
      handleVolltextBlockKeyDown,
    ]
  );

  const handleChange = useCallback(
    (value: Descendant[]) => {
      onChange(value);
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const [start] = Range.edges(selection);
        const wordBefore = Editor.before(editor, start, { unit: "word" });
        const before = wordBefore && Editor.before(editor, wordBefore);
        const beforeRange = before && Editor.range(editor, before, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        const beforeMatch = beforeText?.match(/^@(\w+)$/);
        const after = Editor.after(editor, start);
        const afterRange = Editor.range(editor, start, after);
        const afterText = Editor.string(editor, afterRange);
        const afterMatch = afterText.match(/^(\s|$)/);

        if (beforeMatch && afterMatch) {
          setTarget(beforeRange!);
          setSearch(beforeMatch[1]);
          setSelectedLiteratureIndex(0);
          return;
        }
      }
      setTarget(null);
    },
    [editor, onChange]
  );

  useEffect(() => {
    if (target && literatureList.length > 0 && literaturePortalRef.current) {
      const el = literaturePortalRef.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [literatureList.length, editor, selectedLiteratureIndex, search, target]);

  const insertLiteratureByIndex = useCallback(
    (i: number) => {
      if (target) {
        insertLiteratur(editor, target, literatureList[i]);
        setTarget(null);
      }
    },
    [editor, literatureList, target]
  );

  return {
    literatureList,
    handleKeyDown,
    handleChange,
    insertLiteratureByIndex,
    selectedLiteratureIndex,
    literaturePortalRef,
    showLiteratureSelection,
  };
}
