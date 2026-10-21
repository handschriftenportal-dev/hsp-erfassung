import type { Path } from "slate";
import type { Configuration } from "src/domain/erfassung/Configuration";
import { DetailError } from "src/domain/erfassung/transformation/DetailError";

export type Diagnostics = Array<{
  languageCode: Configuration["language"];
  message: string;
}>;

export type DiagnosticMessage = {
  [key in Configuration["language"]]?: string;
};

export interface ValidationResponse {
  column: string;
  line: string;
  message: string;
  valid: boolean;
  details: DetailError[];
}

export interface ValidationError {
  id: string;
  error: string;
  path: Path;
  diagnostics: DiagnosticMessage;
}

export const ValidationResponse = Object.freeze({
  diagnosticsToDiagnosticMessage(diagnostics: Diagnostics): DiagnosticMessage {
    return Object.fromEntries(
      diagnostics.map(({ languageCode, message }) => [languageCode, message])
    );
  },
  isValidationResponse(data: unknown): data is ValidationResponse {
    return (
      typeof data === "object" &&
      data !== null &&
      "column" in data &&
      typeof data.column === "string" &&
      "line" in data &&
      typeof data.line === "string" &&
      "message" in data &&
      typeof data.message === "string" &&
      "valid" in data &&
      typeof data.valid === "boolean" &&
      "details" in data &&
      Array.isArray(data.details) &&
      data.details.every(DetailError.isDetailError)
    );
  },
});
