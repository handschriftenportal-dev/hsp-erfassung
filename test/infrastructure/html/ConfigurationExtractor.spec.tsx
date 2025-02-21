/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { render, screen } from '@testing-library/react'

import { HSP_ERFASSUNGS_EDITOR_ID } from '../../../src/domain/editor/HSPEditor'
import { Configuration } from '../../../src/domain/erfassung/Configuration'
import { extractConfiguration } from '../../../src/infrastructure/html/ConfigurationExtractor'

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
