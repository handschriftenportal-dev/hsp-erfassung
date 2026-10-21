import { ValidationResponse } from "src/infrastructure/nachweis/ValidationResponse";

describe("ValidationResponse", () => {
  it("diagnostics to diagnostic message", () => {
    expect(
      ValidationResponse.diagnosticsToDiagnosticMessage([
        { languageCode: "de", message: "Deutsch" },
        { languageCode: "de", message: "Duplikat" },
        { languageCode: "en", message: "English" },
      ])
    ).toMatchObject({
      de: "Duplikat",
      en: "English",
    });
  });

  const validationResponse = {
    column: "1",
    line: "1",
    message: "1",
    valid: true,
    details: [],
  };

  it("accepts well-formed validation response", () => {
    expect(ValidationResponse.isValidationResponse(validationResponse)).toBe(
      true
    );
  });

  it.each([
    { ...validationResponse, valid: "false" },
    1,
    [validationResponse],
    { ...validationResponse, details: [1, 2, 3] },
  ])("rejects %p as malformed validation result", (response) => {
    expect(ValidationResponse.isValidationResponse(response)).toBe(false);
  });
});
