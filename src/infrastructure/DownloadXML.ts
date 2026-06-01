import { MimeTypes } from './MimeTypes'

export function downloadXML(xml: string, name: string) {
  try {
    const blob = new Blob([xml], { type: MimeTypes.applicationXML })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = name
    link.click()

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('XML download failed:', error)
  }
}
