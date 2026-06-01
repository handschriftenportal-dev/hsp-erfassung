import type { Element } from 'slate'
import { NormdatumDialogState } from 'src/domain/editor/dialoge/normdatumDialog/NormdatumDialogState'
import type { VolltextReferenz } from 'src/infrastructure/slate/volltext/VolltextElement'

describe('Normdatum Dialog State', () => {
  const identifier = '118597248'
  const element: VolltextReferenz = {
    data_origin: 'person',
    content: 'Pythagoras',
    box: {
      data_origin: 'xxx',
      data_ref: `http://some-url/${identifier}`,
      children: [{ text: 'Pythagoras' }],
    } as Element,
    children: [{ text: '' }],
  }
  const states = {
    createEmpty: NormdatumDialogState.new.create('person', ''),
    createSearch: NormdatumDialogState.new.create('ort', 'Berlin'),
    read: NormdatumDialogState.new.read(element),
    edit: NormdatumDialogState.new.edit(element),
  }

  describe('can construct', () => {
    it('new empty create state', () => {
      expect(states.createEmpty).toMatchObject({
        view: 'create',
        status: 'empty',
      })
    })
    it('new search create state', () => {
      expect(states.createSearch).toMatchObject({
        view: 'create',
        status: 'search',
      })
    })
    it('new read state from referenz', () => {
      expect(states.read).toMatchObject({
        view: 'read',
        status: 'idle',
        identifier,
      })
    })
    it('new edit state from referenz', () => {
      expect(states.edit).toMatchObject({
        view: 'edit',
        status: 'init',
        identifier,
      })
    })
  })

  describe('is deletable', () => {
    it('not in create view', () => {
      expect(NormdatumDialogState.is.deletable(states.createEmpty)).toBe(false)
      expect(NormdatumDialogState.is.deletable(states.createSearch)).toBe(false)
    })
    it('not in read view', () => {
      expect(NormdatumDialogState.is.deletable(states.read)).toBe(false)
    })
    it('in edit view', () => {
      expect(NormdatumDialogState.is.deletable(states.edit)).toBe(true)
    })
  })

  describe('is submittable', () => {
    const normdatum = {
      preferredName: 'Pythagors',
      gndIdentifier: identifier,
    }
    const rollen = ['author']

    it('not with empty roles', () => {
      expect(NormdatumDialogState.is.submittable(states.read)).toBe(false)
      expect(NormdatumDialogState.is.submittable(states.edit)).toBe(false)
      expect(NormdatumDialogState.is.submittable(states.createSearch)).toBe(
        false
      )
      expect(NormdatumDialogState.is.submittable(states.createEmpty)).toBe(
        false
      )
    })
    it('read view not even with roles', () => {
      const read = { ...states.read, rollen }
      expect(NormdatumDialogState.is.submittable(read)).toBe(false)
    })
    it('not edit view with empty text', () => {
      const edit = { ...states.edit, rollen, text: ' ', normdatum }
      expect(NormdatumDialogState.is.submittable(edit)).toBe(false)
    })
    it('not edit view without normdatum', () => {
      const edit = { ...states.edit }
      expect(NormdatumDialogState.is.submittable(edit)).toBe(false)
    })
    it('edit view with roles, normdatum and non-empty text', () => {
      const edit = { ...states.edit, rollen, normdatum }
      expect(NormdatumDialogState.is.submittable(edit)).toBe(true)
    })
    it('not create view with empty text', () => {
      const create = { ...states.createSearch, rollen, text: ' ', normdatum }
      expect(NormdatumDialogState.is.submittable(create)).toBe(false)
    })
    it('not create view without normdatum', () => {
      const create = { ...states.createSearch, rollen }
      expect(NormdatumDialogState.is.submittable(create)).toBe(false)
    })
    it('create view with roles, normdatum and non-empty text', () => {
      const create = { ...states.createSearch, rollen, normdatum }
      expect(NormdatumDialogState.is.submittable(create)).toBe(true)
    })
  })
})
