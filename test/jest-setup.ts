import '@testing-library/jest-dom'

import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from 'node:stream/web'
import { TextDecoder, TextEncoder } from 'node:util'

import { BroadcastChannel } from 'worker_threads'

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
  TransformStream: { value: TransformStream },
  BroadcastChannel: { value: BroadcastChannel },
  WritableStream: { value: WritableStream },
})

import { Blob, File } from 'node:buffer'

import { fetch, FormData, Headers, Request, Response } from 'undici'

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true, configurable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request, configurable: true },
  Response: { value: Response, configurable: true },
})

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
