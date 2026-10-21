import type { GNDEntityFact } from "src/domain/erfassung/GNDEntityFact";
import { APICall } from "src/infrastructure/normdaten/APICall";
import { LobidEntity } from "src/infrastructure/normdaten/LobidEntity";
import type { LobidResult } from "src/infrastructure/normdaten/LobidService";
import { LobidService } from "src/infrastructure/normdaten/LobidService";
import { SBBNormdatenServiceAdapter } from "src/infrastructure/normdaten/SBBNormdatenServiceAdapter";

import { ImportiereNormdatumDialogState } from "./ImportiereNormdatumDialogState";

const MIN_SEARCH_TERM_LENGTH = 4;

export const ImportiereNormdatumDialogUtility = Object.freeze({
  async search(
    state: ImportiereNormdatumDialogState,
    normdatumTyp: "person" | "ort" | "koerperschaft"
  ): Promise<APICall<LobidResult>> {
    if (state.status === ImportiereNormdatumDialogState.status.loading) {
      throw new Error("Dialog not in loading state", { cause: state });
    }
    if (state.searchTerm.length < MIN_SEARCH_TERM_LENGTH) {
      throw new Error(
        `Search term too short (minimal length ${MIN_SEARCH_TERM_LENGTH}`,
        { cause: state.searchTerm }
      );
    }
    LobidService.updateConfiguration({
      type: normdatumTyp,
      from: state.rowsPerPage * state.page,
      size: state.rowsPerPage,
    });
    return LobidService.search(state.searchTerm);
  },
  canSubmit(state: ImportiereNormdatumDialogState) {
    return (
      state.selected < state.items.length &&
      state.status === ImportiereNormdatumDialogState.status.success
    );
  },
  async submit(item: LobidEntity): Promise<GNDEntityFact> {
    const result = await SBBNormdatenServiceAdapter.fetchEntityById(
      item.gndIdentifier
    );
    if (APICall.isSuccess(result)) {
      return result.value;
    }
    if (!APICall.isNotFound(result)) {
      throw new Error("Failed to fetch entity by id", { cause: result });
    }

    const entityFact = LobidEntity.toGNDEntityFact(item);
    const putResult = await SBBNormdatenServiceAdapter.putGNDEntity(entityFact);

    if (APICall.isSuccess(putResult)) {
      return putResult.value;
    }

    throw new Error("Failed to put GND entity", { cause: putResult });
  },
});
