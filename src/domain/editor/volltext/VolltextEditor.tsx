import type { FC } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { Descendant } from "slate";
import { Editable, Slate } from "slate-react";
import { useSelectionToolbar } from "src/domain/editor/selectiontoolbar/SelectionToolbarCustomHooks";
import { Renderer } from "src/domain/editor/volltext/Renderer";
import { useVolltextEditorHandler } from "src/domain/editor/volltext/useVolltextEditorHandler";
import { selectReadOnly } from "src/domain/erfassung/ErfassungsState";
import { Portal } from "src/infrastructure/components/Portal";
import { useGlobalerEinfuegeContext } from "src/infrastructure/slate/einfuegeservice/GlobalerEinfuegeService";
import { createVolltextEditor } from "src/infrastructure/slate/volltext/VolltextEditorFactory";
import type { VolltextBlock } from "src/infrastructure/slate/volltext/VolltextElement";

interface Props {
  initialValue: VolltextBlock[];
  onChange?: (content: Descendant[]) => void;
}

export const VolltextEditor: FC<Props> = ({
  initialValue,
  onChange = console.log,
}) => {
  const readOnly = useSelector(selectReadOnly);
  const editor = useMemo(() => createVolltextEditor(), []);

  const { handleSelection, handleBlur } = useSelectionToolbar(editor);
  const { setTargetToEditor } = useGlobalerEinfuegeContext();

  const {
    literaturePortalRef,
    selectedLiteratureIndex,
    literatureList,
    insertLiteratureByIndex,
    handleKeyDown,
    handleChange,
    showLiteratureSelection,
  } = useVolltextEditorHandler(editor, onChange);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={handleChange}
      onSelectionChange={handleSelection}
    >
      <Editable
        onKeyDown={handleKeyDown}
        renderElement={Renderer.element}
        renderLeaf={Renderer.leaf}
        readOnly={readOnly}
        className={"rich-text-editor"}
        onBlur={(event) => {
          handleBlur(event);
          setTargetToEditor(editor);
        }}
      />
      {showLiteratureSelection && (
        <Portal>
          <div
            ref={literaturePortalRef}
            style={{
              top: "-9999px",
              left: "-9999px",
              position: "absolute",
              zIndex: 1,
              padding: "3px",
              background: "white",
              borderRadius: "4px",
              boxShadow: "0 1px 5px rgba(0,0,0,.2)",
            }}
            data-cy="mentions-portal"
          >
            {literatureList.map((lit, i) => (
              <div
                key={lit.uri}
                onClick={() => insertLiteratureByIndex(i)}
                style={{
                  padding: "1px 3px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  background:
                    i === selectedLiteratureIndex ? "#B4D5FF" : "transparent",
                }}
              >
                {lit.title}
              </div>
            ))}
          </div>
        </Portal>
      )}
    </Slate>
  );
};
