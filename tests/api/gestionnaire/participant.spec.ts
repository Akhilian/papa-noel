import { Participant } from '~/api/gestionnaire/gestionnaire.entities'

describe('Participant', () => {
  describe('validation', () => {
    it('devrait lever une erreur quand le prénom n’est pas saisi', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Participant('', 33600000000)
      }).toThrowError(new Error('Le champ prénom est obligatoire'))
    })

    it('devrait lever une erreur quand le téléphone n’est pas saisi', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Participant('Adrien', 0)
      }).toThrowError(new Error('Le champ téléphone est obligatoire et doit être valide'))
    })

    it('devrait lever une erreur quand le téléphone n’est pas valide', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Participant('Adrien', 1111)
      }).toThrowError(new Error('Le champ téléphone est obligatoire et doit être valide'))
    })
  })
})
