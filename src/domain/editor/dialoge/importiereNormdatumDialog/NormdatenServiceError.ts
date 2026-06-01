type NormdatenServiceError = {
  status: string
  reason: {
    data: object
    error: string
  }
}

export const NormdatenServiceError = Object.freeze({
  isNormdatenServiceError(error: unknown): error is NormdatenServiceError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'reason' in error
    )
  },
})
