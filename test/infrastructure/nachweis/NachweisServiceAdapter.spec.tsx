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

import { waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import {
  fetchBearbeiterConfig,
  fetchDataFromNachweis,
  findBeschreibungSperren,
  findKODSignaturen,
  handleValidationResponse,
  saveBearbeiterConfig,
  speichern,
  validateTEI,
} from '../../../src/infrastructure/nachweis/NachweisServiceAdapter'
import { SBBNormdatenServiceAdapter } from '../../../src/infrastructure/normdaten/SBBNormdatenServiceAdapter'

const testXML =
  '<TEI><text><body><msDesc><p>Erfassungscontext</p></msDesc></body></text></TEI>'
const signaturen = ['Ms1', 'Ms2']
const nachweisResponseSuccess = {
  success: true,
  message: 'Speichern wurde erfolgreich durchgeführt.',
  level: 'info',
}
const nachweisServiceValidationSuccess = {
  success: true,
  message: 'TEI Validierung wurde erfolgreich durchgeführt.',
  level: 'info',
  content: {
    column: '',
    line: '',
    message: 'TEI Validierung wurde erfolgreich durchgeführt.',
    valid: true,
  },
}
const nachweisResponseError = {
  success: false,
  message: 'Fehler',
  level: 'error',
}
const nachweisSperrenResponse =
  '[\n' +
  '  {\n' +
  '    "id": "e9284e81-7cc4-4795-80bd-91c0150e0254",\n' +
  '    "bearbeiter": {\n' +
  '      "id": "b-rg102",\n' +
  '      "bearbeitername": "b-rg102",\n' +
  '      "vorname": "Robert",\n' +
  '      "nachname": "Giel",\n' +
  '      "email": "Robert.Giel@sbb.spk-berlin.de",\n' +
  '      "rolle": "Redakteur",\n' +
  '      "name": "Robert Giel"\n' +
  '    },\n' +
  '    "start_datum": "2022-02-09T09:40:12.884802",\n' +
  '    "sperre_typ": "MANUAL",\n' +
  '    "sperre_grund": "BeschreibungBearbeiten",\n' +
  '    "sperre_eintraege": [\n' +
  '      {\n' +
  '        "target_id": "HSP-60437a87-ae3e-3b52-b346-59d3352325cc",\n' +
  '        "target_type": "BESCHREIBUNG"\n' +
  '      }\n' +
  '    ]\n' +
  '  }\n' +
  ']'

const authorizationToken = 'secure-token'
const authorizationHeader = `Bearer ${authorizationToken}`

const server = setupServer(
  http.get('/test', ({ request }) => {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== authorizationHeader) {
      return HttpResponse.json(nachweisResponseError)
    } else {
      return HttpResponse.xml(testXML)
    }
  }),

  http.get<object, object, any>('/beschreibung/sperren', ({ request }) => {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== authorizationHeader) {
      return HttpResponse.json(nachweisResponseError)
    } else {
      return HttpResponse.json(nachweisSperrenResponse)
    }
  }),
  http.get<object, object, any>('/test/signaturen', ({ request }) => {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== authorizationHeader) {
      return HttpResponse.json(nachweisResponseError)
    } else {
      return HttpResponse.json(signaturen)
    }
  }),
  http.post('/validate', async ({ request }) => {
    const validate = await request.text()
    if (validate === testXML) {
      return HttpResponse.json(nachweisServiceValidationSuccess)
    } else {
      return HttpResponse.json(nachweisResponseError)
    }
  }),
  http.post('/test', async ({ request }) => {
    const validate = await request.text()
    if (validate === testXML) {
      return HttpResponse.json(nachweisResponseSuccess)
    } else {
      return HttpResponse.json(nachweisResponseError)
    }
  }),
  http.get('/rest/bearbeiter/config', () => {
    return HttpResponse.json({
      sonderzeichen: ['a', 'b', 'c'],
    })
  }),
  http.post('/rest/bearbeiter/config', () => HttpResponse.json())
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('NachweisServicePort', () => {
  it('<NachweisServicePort /> Get Signaturen', async () => {
    const dispatch = jest.fn()

    findKODSignaturen('/test', authorizationToken, dispatch)

    await waitFor(() => {
      expect(dispatch.mock.calls.length).toBe(1)
    })
  })
  it('<NachweisServicePort /> Get Sperren', async () => {
    const sperren = await findBeschreibungSperren(
      '/beschreibung',
      authorizationToken
    )
    expect(sperren).toBe(nachweisSperrenResponse)
  })
  it('<NachweisServicePort /> Get XML', async () => {
    const dispatch = jest.fn()
    SBBNormdatenServiceAdapter.updateConfiguration({ normdatenUrl: '/test' })

    fetchDataFromNachweis('/test', authorizationToken, dispatch)

    await waitFor(() => {
      expect(dispatch.mock.calls.length).toBe(5)
    })
  })
  it('<NachweisServicePort /> Post XML Success', async () => {
    const nachweisCallback = jest.fn()

    speichern('/test', authorizationToken, 'de', testXML).then(nachweisCallback)

    await waitFor(() => {
      expect(nachweisCallback.mock.calls.length).toBe(1)
      expect(nachweisCallback.mock.calls[0][0]).toStrictEqual(
        nachweisResponseSuccess
      )
    })
  })
  it('<NachweisServicePort /> Post XML Error', async () => {
    const nachweisCallback = jest.fn()

    speichern('/test', authorizationToken, 'de', '<Error>').then(
      nachweisCallback
    )

    await waitFor(() => {
      expect(nachweisCallback.mock.calls.length).toBe(1)
      expect(nachweisCallback.mock.calls[0][0]).toStrictEqual(
        nachweisResponseError
      )
    })
  })
  it('validate TEI', async () => {
    const response = await validateTEI('/validate', testXML, false)
    expect(response.valid).toBe(true)
  })
  it('validate TEI Error', async () => {
    const response = await validateTEI('/validate', '<Error>', false)
    expect(response.valid).toBe(false)
  })

  it('fetch bearbeiter config', async () => {
    const response = await fetchBearbeiterConfig('token')
    expect(response).toMatchObject({
      sonderzeichen: ['a', 'b', 'c'],
    })
  })

  it('save bearbeiter config', async () => {
    const response = await saveBearbeiterConfig({ sonderzeichen: [] }, 'token')
    expect(response.status).toBe(200)
  })
})

describe('Handle validation responses', () => {
  const importResponse = {
    line: '',
    column: '',
    message: 'Dokument ist valide',
    valid: true,
    details: [],
  }

  it('from nachweis service', () => {
    const nachweisResponse = {
      success: true,
      message: 'Dokument ist valide',
      level: 'info',
      content: {
        line: '',
        column: '',
        message: 'Dokument ist valide',
        valid: true,
      },
    } as const
    expect(handleValidationResponse({ data: nachweisResponse })).toEqual(
      importResponse
    )
  })
  it('from import service', () => {
    expect(handleValidationResponse({ data: importResponse })).toEqual(
      importResponse
    )
  })
  it('from import service with empty diagnostics', () => {
    const withDiagnostics = Object.assign({}, importResponse, {
      details: [
        {
          xpath: 'x',
          error: 'not valid',
          diagnostics: [],
        },
      ],
    })
    expect(handleValidationResponse({ data: withDiagnostics })).toEqual(
      withDiagnostics
    )
  })
  it('from import service with diagnostics', () => {
    const withDiagnostics = Object.assign({}, importResponse, {
      details: [
        {
          xpath: 'x',
          error: 'not valid',
          diagnostics: [{ languageCode: 'de', message: 'y' }],
        },
      ],
    })
    expect(handleValidationResponse({ data: withDiagnostics })).toEqual(
      withDiagnostics
    )
  })
})

describe('Handle malformed validation responses:', () => {
  const apiErrorMsg = 'API Error: Unexpected response format'
  it('random data', () => {
    expect(handleValidationResponse({ data: { x: 1 } }).message).toEqual(
      apiErrorMsg
    )
  })
  it('missing content', () => {
    expect(
      handleValidationResponse({
        data: {
          success: false,
          message: 'Missing content',
          level: 'error',
        },
      }).message
    ).toEqual(apiErrorMsg)
  })
  it('invalid level', () => {
    expect(
      handleValidationResponse({
        data: {
          success: false,
          message: 'INVALID level',
          level: 'invalid',
          content: {
            line: '',
            column: '',
            message: 'Dokument ist valide',
            valid: true,
          },
        },
      }).message
    ).toEqual(apiErrorMsg)
  })
  it('column and line numbers are numbers', () => {
    expect(
      handleValidationResponse({
        data: {
          column: 1,
          line: 2,
          message: 'Column and Line are numbers',
          valid: false,
          details: [],
        },
      }).message
    ).toEqual(apiErrorMsg)
  })
  it('details missing', () => {
    expect(
      handleValidationResponse({
        data: {
          column: '1',
          line: '2',
          message: 'Missing Details',
          valid: false,
        },
      }).message
    ).toEqual(apiErrorMsg)
  })
  it('missing diagnostics', () => {
    expect(
      handleValidationResponse({
        data: {
          column: '1',
          line: '2',
          message: 'Missing diagnostics',
          valid: false,
          details: [{ xpath: '', message: '' }],
        },
      }).message
    ).toEqual(apiErrorMsg)
  })
})
