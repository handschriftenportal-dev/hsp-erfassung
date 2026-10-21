function sendClickEvent(id: string): void {
  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  window.document.getElementById(id)?.dispatchEvent(event);
}

export function sendDocumentSpeichernEvent(): void {
  sendClickEvent("speichernButton");
}

export function sendValidateTEIEvent(): void {
  sendClickEvent("validateTEIButton");
}
