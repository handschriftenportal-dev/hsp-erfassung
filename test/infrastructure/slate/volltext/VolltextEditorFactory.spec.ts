import { createVolltextEditor } from 'src/infrastructure/slate/volltext/VolltextEditorFactory'

describe('Volltext Editor', () => {
  const baseElement = {
    children: [{ text: '' }],
  }
  const box = { ...baseElement, data_origin: 'box' }
  const block = { ...baseElement, data_origin: 'paragraph' }
  const formatierung = { ...baseElement, data_origin: 'autor' }
  const referenz = { ...baseElement, data_origin: 'person' }
  const sonstiges = { ...baseElement, data_origin: 'xxxx' }
  const editor = createVolltextEditor()

  it('can be created', () => {
    expect(editor).toBeTruthy()
  })

  describe('isInline', () => {
    it.each([box, formatierung, referenz])(
      '%p is an inline element',
      (element) => {
        expect(editor.isInline(element)).toBe(true)
      }
    )
    it.each([block, sonstiges])('%p is not an inline element', (element) => {
      expect(editor.isInline(element)).toBe(false)
    })
  })

  describe('isVoid', () => {
    it.each([box, referenz])('%p is a void element', (element) => {
      expect(editor.isVoid(element)).toBe(true)
    })
    it.each([block, formatierung, sonstiges])(
      '%p is not a void element',
      (element) => {
        expect(editor.isVoid(element)).toBe(false)
      }
    )
  })

  describe('markableVoid', () => {
    it.each([box, referenz])('%p is markable void', (element) => {
      expect(editor.markableVoid(element)).toBe(true)
    })
    it.each([block, formatierung, sonstiges])(
      '%p is markable void',
      (element) => {
        expect(editor.markableVoid(element)).toBe(false)
      }
    )
  })
})
