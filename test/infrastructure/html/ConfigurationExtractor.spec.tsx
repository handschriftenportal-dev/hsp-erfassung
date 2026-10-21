import { render, screen } from "@testing-library/react";
import type { Configuration } from "src/domain/erfassung/Configuration";
import { extractConfiguration } from "src/infrastructure/html/ConfigurationExtractor";

describe("ConfigurationExtractor", () => {
  it("extract exact config values when valid", () => {
    const config: Configuration = {
      beschreibungsUrl: "abc",
      validationUrl: "def/",
      workspaceUrl: "ghi",
      normdatenUrl: "jkl",
      startInReadOnly: true,
      isEditable: true,
      language: "en",
      standalone: false,
      authorizationToken: "xyz",
    };
    render(
      <div
        role="test"
        data-url={config.beschreibungsUrl}
        data-validation-url={config.validationUrl}
        data-workspace-url={config.workspaceUrl}
        data-normdaten-url={config.normdatenUrl}
        data-start-in-read-only={config.startInReadOnly}
        data-enable-hsp-tool-bar={config.isEditable}
        data-language={config.language}
        data-standalone={config.standalone}
        data-authorization-token={config.authorizationToken}
      />
    );
    expect(extractConfiguration(screen.getByRole("test"))).toEqual(config);
  });

  it("normalizes validation-uri", () => {
    render(<div role="test" data-validation-url={"  http://validate  "} />);
    expect(extractConfiguration(screen.getByRole("test"))).toMatchObject({
      validationUrl: "http://validate/",
    });
  });
});
