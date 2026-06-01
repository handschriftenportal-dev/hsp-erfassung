import { act } from '@testing-library/react'
import { NachweisEvents } from 'src/infrastructure/nachweis/NachweisEvents'

describe('Nachweis Events', () => {
  const aktualisierenListener = jest.fn()
  const bearbeitenListener = jest.fn()
  const lesenListener = jest.fn()
  const speichernListener = jest.fn()
  beforeAll(() => {
    document.addEventListener(
      'BeschreibungAktualisierenEvent',
      aktualisierenListener
    )
    document.addEventListener('BeschreibungBearbeitenEvent', bearbeitenListener)
    document.addEventListener('BeschreibungLesenEvent', lesenListener)
    document.addEventListener('BeschreibungSpeichernEvent', speichernListener)
  })
  afterAll(() => {
    document.removeEventListener(
      'BeschreibungAktualisierenEvent',
      aktualisierenListener
    )
    document.removeEventListener(
      'BeschreibungBearbeitenEvent',
      bearbeitenListener
    )
    document.removeEventListener('BeschreibungLesenEvent', lesenListener)
    document.removeEventListener(
      'BeschreibungSpeichernEvent',
      speichernListener
    )
  })

  it('Beschreibung aktualisieren', () => {
    expect(aktualisierenListener).not.toHaveBeenCalled()
    act(() => NachweisEvents.beschreibungAktualisieren())
    expect(aktualisierenListener).toHaveBeenCalled()
  })
  it('Beschreibung bearbeiten', () => {
    expect(bearbeitenListener).not.toHaveBeenCalled()
    act(() => NachweisEvents.beschreibungBearbeiten())
    expect(bearbeitenListener).toHaveBeenCalled()
  })

  it('Beschreibung lesen', () => {
    expect(lesenListener).not.toHaveBeenCalled()
    act(() => NachweisEvents.beschreibungLesen())
    expect(lesenListener).toHaveBeenCalled()
  })

  it('Beschreibung speichern', () => {
    expect(speichernListener).not.toHaveBeenCalled()
    act(() => NachweisEvents.beschreibungSpeichern())
    expect(speichernListener).toHaveBeenCalled()
  })
})
