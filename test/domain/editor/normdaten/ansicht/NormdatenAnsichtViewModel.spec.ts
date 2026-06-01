import { isNormdatumAnsichtViewModel } from 'src/domain/editor/normdaten/ansicht/NormdatenAnsichtViewModel'

describe('NormdatenAnsichtViewModel', () => {
  const emptyRole = {
    type: 'person',
    roles: [],
    text: 'Robert',
    id: '123',
    ref: 'url://123',
  }
  const singleRole = {
    type: 'person',
    roles: ['author'],
    text: 'Robert',
    id: '123',
    ref: 'url://123',
  }
  const multipleRoles = {
    type: 'person',
    roles: ['author', 'commissionedBy'],
    text: 'Robert',
    id: '123',
    ref: 'url://123',
  }
  const unknownRole = {
    type: 'person',
    roles: ['INVALID'],
    text: 'Robert',
    id: '123',
    ref: 'url://123',
  }
  const invalidType = {
    type: 'INVALID',
    role: ['author'],
    text: 'Robert',
    id: '123',
    ref: 'url://123',
  }

  it.each([emptyRole, singleRole, unknownRole, multipleRoles])(
    'recognizes %o as valid',
    (value) => {
      expect(isNormdatumAnsichtViewModel(value)).toBe(true)
    }
  )

  it.each([invalidType, null, 42, 'invalid'])(
    'recognizes %o as invalid',
    (value) => {
      expect(isNormdatumAnsichtViewModel(value)).toBe(false)
    }
  )
})
