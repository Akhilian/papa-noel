import { Participant } from '~/api/gestionnaire/domain/models/participant'

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

  describe('estIdentiqueA', function () {
    it('n’est pas équivalent quand le prénom est différent', () => {
      // Given
      const adrien = new Participant('Adrien', 33600000000)
      const antoine = new Participant('Antoine', 33600000000)

      // When
      const estIdentique = adrien.estIdentiqueA(antoine)

      // Then
      expect(estIdentique).toEqual(false)
    })

    it('n’est pas équivalent quand le téléphone est différent', () => {
      // Given
      const antoine1 = new Participant('Antoine', 33600000001)
      const antoine2 = new Participant('Antoine', 33600000002)

      // When
      const estIdentique = antoine1.estIdentiqueA(antoine2)

      // Then
      expect(estIdentique).toEqual(false)
    })

    it('repose l’équivalence sur le prénom et le téléphone', () => {
      // Given
      const antoine1 = new Participant('Antoine', 33600000000)
      const antoine2 = new Participant('Antoine', 33600000000)

      // When
      const estIdentique = antoine1.estIdentiqueA(antoine2)

      // Then
      expect(estIdentique).toEqual(true)
    })
  })
})
