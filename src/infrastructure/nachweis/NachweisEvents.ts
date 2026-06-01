type EventType =
  | 'BeschreibungBearbeitenEvent'
  | 'BeschreibungLesenEvent'
  | 'BeschreibungSpeichernEvent'
  | 'BeschreibungAktualisierenEvent'
  | 'BeschreibungSessionAktualisierenEvent'

function dispatcherForType(eventType: EventType) {
  const event = new CustomEvent(eventType, {
    detail: {},
    bubbles: true,
    cancelable: false,
    composed: false,
  })
  return function dispatchNachweisEvent(): void {
    document.dispatchEvent(event)
  }
}

export const NachweisEvents = Object.freeze({
  beschreibungBearbeiten: dispatcherForType('BeschreibungBearbeitenEvent'),
  beschreibungLesen: dispatcherForType('BeschreibungLesenEvent'),
  beschreibungSpeichern: dispatcherForType('BeschreibungSpeichernEvent'),
  beschreibungAktualisieren: dispatcherForType(
    'BeschreibungAktualisierenEvent'
  ),
  beschreibungSessionAktualisieren: dispatcherForType(
    'BeschreibungSessionAktualisierenEvent'
  ),
})
