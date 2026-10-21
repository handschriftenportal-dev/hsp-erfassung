import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { Element } from "slate";
import { ChangeEvent } from "src/domain/erfassung/ChangeEvent";
import { addChangeToHistory } from "src/domain/erfassung/ErfassungsState";
import type { GNDEntityFact } from "src/domain/erfassung/GNDEntityFact";

export function useTextelementChangedForSidebarEvent(element: Element): void {
  const dispatch = useDispatch();
  useEffect(() => {
    const { data_origin, id = "" } = element;
    dispatch(addChangeToHistory(ChangeEvent.edit_node(id, data_origin)));
  }, [dispatch, element]);
}

export function createOptionLabel(option: GNDEntityFact): string {
  const { preferredName, gndIdentifier } = option;
  if (preferredName && gndIdentifier) {
    return `${preferredName} ${gndIdentifier}`;
  }
  if (gndIdentifier) {
    return gndIdentifier;
  }
  if (preferredName) {
    return preferredName;
  }
  return "";
}

export function getOptionStr(option: string) {
  const EMPTY_VALUE = "empty_value";

  const str = option.toString();
  if (str === "") return EMPTY_VALUE;
  return str.replace(/ /g, "_");
}
