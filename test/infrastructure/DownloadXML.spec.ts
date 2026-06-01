import { downloadXML } from 'src/infrastructure/DownloadXML'

describe('downloadXML', () => {
  const xml = '<hello>world</hello>'
  const filename = 'hello.xml'

  // Mock DOM APIs
  let mockLink: HTMLAnchorElement
  let mockBlob: Blob
  let mockObjectURL: string

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()

    // Mock Blob constructor
    mockBlob = new Blob([xml], { type: 'application/xml' })
    global.Blob = jest.fn().mockReturnValue(mockBlob)

    // Mock URL.createObjectURL and revokeObjectURL
    mockObjectURL = 'blob:mock-url'
    global.URL.createObjectURL = jest.fn().mockReturnValue(mockObjectURL)
    global.URL.revokeObjectURL = jest.fn()

    // Mock document.createElement
    mockLink = {
      href: '',
      download: '',
      click: jest.fn(),
      remove: jest.fn(),
    } as unknown as HTMLAnchorElement

    jest.spyOn(document, 'createElement').mockReturnValue(mockLink)

    // Mock console.error to avoid noise in tests
    jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('successful download', () => {
    it('creates blob with correct content and MIME type', () => {
      downloadXML(xml, filename)

      expect(global.Blob).toHaveBeenCalledWith([xml], {
        type: 'application/xml',
      })
    })

    it('creates object URL from blob', () => {
      downloadXML(xml, filename)

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob)
    })

    it('creates anchor element with correct attributes', () => {
      downloadXML(xml, filename)

      expect(document.createElement).toHaveBeenCalledWith('a')
      expect(mockLink.href).toBe(mockObjectURL)
      expect(mockLink.download).toBe(filename)
    })

    it('triggers download by clicking the link', () => {
      downloadXML(xml, filename)

      expect(mockLink.click).toHaveBeenCalledTimes(1)
    })

    it('cleans up object URL after download', () => {
      downloadXML(xml, filename)

      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(mockObjectURL)
    })
  })

  describe('error handling', () => {
    it('handles blob creation failure gracefully', () => {
      const error = new Error('Blob creation failed')
      global.Blob = jest.fn().mockImplementation(() => {
        throw error
      })

      downloadXML(xml, filename)

      expect(console.error).toHaveBeenCalledWith('XML download failed:', error)
      expect(global.URL.createObjectURL).not.toHaveBeenCalled()
    })
  })
})
