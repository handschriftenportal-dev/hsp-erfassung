export type ChangeEvent =
  | {
      method: "INITIAL_LOAD";
    }
  | {
      method: "INITIAL_FAIL";
    }
  | {
      method: "HANDLE_YES_SAVE_DIALOG";
    }
  | {
      method: "HANDLE_NO_SAVE_DIALOG";
    }
  | {
      method: "INSERT_NODE" | "EDIT_NODE" | "DELETE_NODE";
      dataOrigin: string;
      id: string;
    };

export const ChangeEvent = {
  initial_load: (): ChangeEvent => ({ method: "INITIAL_LOAD" }),
  initial_fail: (): ChangeEvent => ({ method: "INITIAL_FAIL" }),
  handle_yes_save_dialog: (): ChangeEvent => ({
    method: "HANDLE_YES_SAVE_DIALOG",
  }),
  handle_no_save_dialog: (): ChangeEvent => ({
    method: "HANDLE_NO_SAVE_DIALOG",
  }),
  insert_node: (id: string, dataOrigin: string): ChangeEvent => ({
    method: "INSERT_NODE",
    id,
    dataOrigin,
  }),
  edit_node: (id: string, dataOrigin: string): ChangeEvent => ({
    method: "EDIT_NODE",
    id,
    dataOrigin,
  }),
  delete_node: (id: string, dataOrigin: string): ChangeEvent => ({
    method: "DELETE_NODE",
    id,
    dataOrigin,
  }),
} as const;
