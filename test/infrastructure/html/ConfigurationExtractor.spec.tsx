import { render, screen } from '@testing-library/react'
import { HSP_ERFASSUNGS_EDITOR_ID } from 'src/domain/editor/HSPEditor'
import type { Configuration } from 'src/domain/erfassung/Configuration'
import { extractConfiguration } from 'src/infrastructure/html/ConfigurationExtractor'

describe('Extracting Editor Configuration from HTML Element Attributes', () => {
  test('extract', () => {
    const config: Configuration = {
      beschreibungsUrl: 'abc',
      validationUrl: 'def',
      workspaceUrl: 'ghi',
      normdatenUrl: 'jkl',
      startInReadOnly: true,
      isEditable: true,
      language: 'en',
      standalone: false,
      authorizationToken: 'xyz',
    }
    render(
      <div
        role="test"
        id={HSP_ERFASSUNGS_EDITOR_ID}
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
    )
    expect(extractConfiguration(screen.getByRole('test'))).toEqual(config)
  })
})
