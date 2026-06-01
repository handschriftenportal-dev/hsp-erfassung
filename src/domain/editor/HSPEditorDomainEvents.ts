function sendMouseDownToElementWithId(id: string): void {
  const event = new MouseEvent('mousedown', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  window.document.getElementById(id)?.dispatchEvent(event)
}

export function sendDocumentSpeichernEvent(): void {
  sendMouseDownToElementWithId('speichernButton')
}

export function sendValidateTEIEvent(): void {
  sendMouseDownToElementWithId('validateTEIButton')
}

export function sendReloadEvent(): void {
  sendMouseDownToElementWithId('ladenButton')
}
