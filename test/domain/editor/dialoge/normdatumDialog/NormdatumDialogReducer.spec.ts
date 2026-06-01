import { NormdatumDialogReducer } from 'src/domain/editor/dialoge/normdatumDialog/NormdatumDialogReducer'

describe('Normdatum Dialog Reducer', () => {
  describe('set text', () => {
    it('does not change text in read mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'read',
            type: 'person',
            status: 'idle',
            text: 'old text',
            rollen: [],
            identifier: '123',
          },
          { type: 'set_text', text: 'new text' }
        )
      ).toMatchObject({ text: 'old text' })
    })

    it('does change text in edit mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'edit',
            type: 'person',
            status: 'idle',
            text: 'old text',
            rollen: [],
            normdatum: {
              gndIdentifier: '123',
              preferredName: 'Pythagoras',
            },
          },
          { type: 'set_text', text: 'new text' }
        )
      ).toMatchObject({ text: 'new text' })
    })
    it('does change text in create mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'create',
            type: 'person',
            status: 'filled',
            text: 'old text',
            rollen: [],
            normdatum: {
              gndIdentifier: '123',
              preferredName: 'Pythagoras',
            },
          },
          { type: 'set_text', text: 'new text' }
        )
      ).toMatchObject({ text: 'new text' })
    })
  })

  describe('set rollen', () => {
    const rollen = ['alpha', 'beta', 'gamma']

    it('does not change rollen in read mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'read',
            type: 'person',
            status: 'idle',
            text: 'old text',
            rollen: [],
            identifier: '123',
          },
          { type: 'set_rollen', rollen }
        )
      ).toMatchObject({
        rollen: [],
      })
    })
    it('does change change in edit mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'edit',
            type: 'person',
            status: 'idle',
            text: 'old text',
            rollen: [],
            normdatum: {
              gndIdentifier: '123',
              preferredName: 'Pythagoras',
            },
          },
          { type: 'set_rollen', rollen }
        )
      ).toMatchObject({ rollen })
    })
    it('does not change rollen in create mode', () => {
      expect(
        NormdatumDialogReducer(
          {
            view: 'create',
            type: 'person',
            status: 'filled',
            text: 'old text',
            rollen: [],
            normdatum: {
              gndIdentifier: '123',
              preferredName: 'Pythagoras',
            },
          },
          { type: 'set_rollen', rollen }
        )
      ).toMatchObject({ rollen })
    })
  })
})
