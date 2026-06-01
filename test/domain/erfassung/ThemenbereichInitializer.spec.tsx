import { render, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import { ThemenbereichInitializer } from 'src/domain/erfassung/ThemenbereichInitializer'
import { ThemenbereichService } from 'src/infrastructure/normdaten/ThemenbereichService'
import { MockNormdatenService } from 'test/infrastructure/normdaten/MockNormdatenService'
import { regEx } from 'test/regEx'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('ThemenbereichInitializer', () => {
  describe('service available', () => {
    const service = MockNormdatenService('/')
    beforeAll(() => service.listen())
    afterEach(() => service.resetHandlers())
    afterAll(() => service.close())

    it('loads subject area "BNDG" successfully', async () => {
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

    it('shows warning', async () => {
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
        level: 'warning',
        message: regEx.nonEmptyString,
      })
    })
  })

  describe('service timeouts', () => {
    const service = setupServer(http.post('/', () => HttpResponse.error()))
    beforeAll(() => service.listen())
    afterEach(() => service.resetHandlers())
    afterAll(() => service.close())

    it('shows warning', async () => {
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
        message: regEx.nonEmptyString,
      })
    })
  })
})
