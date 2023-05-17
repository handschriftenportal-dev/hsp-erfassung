/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { waitFor } from '@testing-library/react'
import {
  BeschreibungBearbeitenEvent,
  fetchDataFromNachweis,
  findBeschreibungSperren,
  findKODSignaturen,
  sendNachweisEventToDocument,
  speichern,
  validateTEI
} from '../../../src/infrastructure/nachweis/NachweisServiceAdapter'

const testXML = '<TEI><teiHeader>Test</teiHeader></TEI>'
const signaturen = ['Ms1', 'Ms2']
const nachweisResponseSuccess = '{"success":true,"message":"Speichern wurde erfolgreich durchgeführt.","level":"info"}'
const nachweisResponseValidationSuccess = '{"success":true,"message":"TEI Validierung wurde erfolgreich durchgeführt.","level":"info"}'
const nachweisResponseError = '{"success":false,"message":"Fehler","level":"error"}'
const nachweisSperrenResponse = '[\n' +
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

const server = setupServer(
  rest.get('/test', (req, res, ctx) => {
    return res(ctx.xml(testXML))
  }),
  rest.get('/sperren', (req, res, ctx) => {
    return res(ctx.json(nachweisSperrenResponse))
  }),
  rest.get('/test/signaturen', (req, res, ctx) => {
    return res(ctx.json(signaturen))
  }),
  rest.post('/validate', (req, res, ctx) => {
    if (req.body === testXML) {
      return res(ctx.json(nachweisResponseValidationSuccess))
    } else {
      return res(ctx.json(nachweisResponseError))
    }
  }),
  rest.post('/test', (req, res, ctx) => {
    if (req.body === testXML) {
      return res(ctx.json(nachweisResponseSuccess))
    } else {
      return res(ctx.json(nachweisResponseError))
    }
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('NachweisServicePort', () => {
  it('<NachweisServicePort /> Get Signaturen', async () => {

    const dispatch = jest.fn()

    findKODSignaturen('/test', dispatch)

    await waitFor(() => {
      expect(dispatch.mock.calls.length).toBe(1)
    })

  })
  it('<NachweisServicePort /> Get Sperren', async () => {

    const callback = jest.fn(sperren => {
      return sperren
    })

    findBeschreibungSperren('', callback)

    await waitFor(() => {
      expect(callback.mock.calls.length).toBe(1)
      expect(callback.mock.results[0].value).toBe(nachweisSperrenResponse)
    })
  })
  it('<NachweisServicePort /> Get XML', async () => {

    const dispatch = jest.fn()
    const setLoadSidebar = jest.fn()
    const parser = new DOMParser()
    const doc = parser.parseFromString(testXML, 'text/xml')

    fetchDataFromNachweis('/test', dispatch, setLoadSidebar, true)

    await waitFor(() => {
      expect(dispatch.mock.calls.length).toBe(2)
      expect(setLoadSidebar.mock.calls.length).toBe(1)
      expect(setLoadSidebar.mock.calls[0][0]).toBe(false)
    })

  })
  it('<NachweisServicePort /> Post XML Success', async () => {

    const nachweisCallback = jest.fn()

    speichern('/test', testXML, nachweisCallback)

    await waitFor(() => {
      expect(nachweisCallback.mock.calls.length).toBe(1)
      expect(nachweisCallback.mock.calls[0][0]).toStrictEqual(nachweisResponseSuccess)
    })

  })
  it('<NachweisServicePort /> Post XML Error', async () => {

    const nachweisCallback = jest.fn()

    speichern('/test', '<Error>', nachweisCallback)

    await waitFor(() => {
      expect(nachweisCallback.mock.calls.length).toBe(1)
      expect(nachweisCallback.mock.calls[0][0]).toStrictEqual(nachweisResponseError)
    })

  })
  test('validate TEI', async () => {

    const nachweisCallback = jest.fn()
    const dispatch = jest.fn()

    validateTEI('/validate', testXML, dispatch, nachweisCallback, false)

    await waitFor(() => {
      expect(nachweisCallback.mock.calls.length).toBe(1)
      expect(nachweisCallback.mock.calls[0][0]).toStrictEqual(nachweisResponseValidationSuccess)
    })

  })
  test('validate TEI Error', async () => {

    const nachweisCallback = jest.fn()
    const dispatch = jest.fn()

    validateTEI('/validate', '<Error>', dispatch, nachweisCallback, false)

    await waitFor(() => {
      expect(nachweisCallback.mock.calls.length).toBe(1)
      expect(nachweisCallback.mock.calls[0][0]).toStrictEqual(nachweisResponseError)
    })

  })

  test('Send Nachweis Event', async () => {

    const erfassungsEditorEventHandler = jest.fn()

    document.addEventListener(BeschreibungBearbeitenEvent, erfassungsEditorEventHandler)

    sendNachweisEventToDocument(BeschreibungBearbeitenEvent, {})

    await waitFor(() => {
      expect(erfassungsEditorEventHandler.mock.calls.length).toBe(1)
    })

  })
})
