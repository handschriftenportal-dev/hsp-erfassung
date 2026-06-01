import type { DetailError } from './DetailError'
import type { SerializationError } from './SerializationError'

export type WithErrors<T> = {
  data: T
  detailErrors?: DetailError[]
  serializationErrors?: SerializationError[]
}
