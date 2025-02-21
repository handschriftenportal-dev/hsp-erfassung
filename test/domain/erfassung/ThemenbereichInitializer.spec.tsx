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

import { render, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { ThemenbereicheAPI } from '../../../src/domain/erfassung/ThemenbereicheAPI'
import { ThemenbereichInitializer } from '../../../src/domain/erfassung/ThemenbereichInitializer'
import { ThemenbereichService } from '../../../src/infrastructure/normdaten/ThemenbereichService'
import { MockNormdatenService } from '../../infrastructure/normdaten/MockNormdatenService'
import { configureTestStore, TestContext } from '../../TestContext'

describe('ThemenbereichInitializer', () => {
  describe('service available', () => {
    const service = MockNormdatenService('/')
    beforeAll(() => service.listen())
    afterEach(() => service.resetHandlers())
    afterAll(() => service.close())

    test('loads subject area "BNDG" successfully', async () => {
      const store = configureTestStore()
      const api = ThemenbereicheAPI.new('de')
      render(
        <TestContext store={store}>
          <ThemenbereichService api={api}>
            <ThemenbereichInitializer />
          </ThemenbereichService>
        </TestContext>
      )
      await waitFor(() => {
        expect(store.getState().erfassung.taggableNormdaten).toMatchObject({
          einband: true,
        })
      })
      expect(api.themenbereich({ notation: 'BNDG' })).not.toBeUndefined()
    })
  })

  describe('service returning null', () => {
    const service = setupServer(
      http.post('/', () => HttpResponse.json({ findSubjectArea: null }))
    )
    beforeAll(() => service.listen())
    afterEach(() => service.resetHandlers())
    afterAll(() => service.close())
    test('shows error message', async () => {
      const store = configureTestStore()
      const api = ThemenbereicheAPI.new('de')
      render(
        <TestContext store={store}>
          <ThemenbereichService api={api}>
            <ThemenbereichInitializer />
          </ThemenbereichService>
        </TestContext>
      )
      await waitFor(() => {
        expect(store.getState().erfassung.alertMessage).toBeTruthy()
      })
      expect(store.getState().erfassung.alertMessage).toMatchObject({
        level: 'error',
        message: 'Themenbereich mit Notation BNDG konnte nicht geladen werden',
      })
    })
  })
})
