import { TirageAuSort } from '~/api/tirage-au-sort/tirageAuSort.entities'
import { Famille, Participant } from '~/api/gestionnaire/gestionnaire.entities'

describe('Tirage au sort', () => {
  describe('contraintes', () => {
    it('devrait être initié pour au moins une famille', () => {
      // When
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = new TirageAuSort([])
      } catch (e) {
        expect(e).toStrictEqual(new Error('Un tirage ne peut être démarrer sans aucune famille'))
      }
    })
  })

  describe('proceder', () => {
    it('devrait associer des duos entre deux personnes de familles différentes', () => {
      // Given
      const didier = new Participant('Didier')
      const adrien = new Participant('Adrien')

      const familles = [
        new Famille('His', [didier]), new Famille('Saunier', [adrien])
      ]

      // When
      const tirageAuSort = new TirageAuSort(familles)
      const resultat = tirageAuSort.proceder()

      // Then
      expect(resultat.pour(didier)).toBe(adrien)
      expect(resultat.pour(adrien)).toBe(didier)
    })

    it('devrait choisir dans une autre famille basé sur le shuffle', () => {
      // Given
      const shuffle = (array: Array<undefined>) => array.reverse()

      const didier = new Participant('Didier')
      const adrien = new Participant('Adrien')
      const maelle = new Participant('Maëlle')

      const familles = [
        new Famille('His', [didier]), new Famille('Saunier', [adrien]), new Famille('Varnier', [maelle])
      ]

      // When
      const tirageAuSort = new TirageAuSort(familles, shuffle)
      const resultat = tirageAuSort.proceder()

      // Then
      expect(resultat.pour(didier)).toBe(maelle)
    })

    it('devrait choisir aléatoirement dans une autre famille, basé sur le shuffle', () => {
      // Given
      const shuffle = (array: Array<undefined>) => array.reverse()

      const didier = new Participant('Didier')
      const adrien = new Participant('Adrien')
      const alix = new Participant('Alix')

      const familles = [
        new Famille('His', [didier]), new Famille('Saunier', [adrien, alix])
      ]

      // When
      const tirageAuSort = new TirageAuSort(familles, shuffle)
      const resultat = tirageAuSort.proceder()

      // Then
      expect(resultat.pour(didier)).toBe(alix)
    })

    it('ne doit pas choisir choisir un participant déjà sélectionné', () => {
      // Given
      const shuffle = (array: Array<undefined>) => array

      const didier = new Participant('Didier')
      const patricia = new Participant('Patricia')
      const adrien = new Participant('Adrien')
      const alix = new Participant('Alix')

      const familles = [
        new Famille('Saunier', [adrien, alix]), new Famille('His', [didier, patricia])
      ]

      // When
      const tirageAuSort = new TirageAuSort(familles, shuffle)
      const resultat = tirageAuSort.proceder()

      // Then
      expect(resultat.pour(adrien)).toBe(didier)
      expect(resultat.pour(alix)).toBe(patricia)
      expect(resultat.pour(didier)).toBe(adrien)
      expect(resultat.pour(patricia)).toBe(alix)
    })

    it('choisit dans la même famille quand personne n’est disponible', () => {
      // Given
      const shuffle = (array: Array<undefined>) => array

      const adrien = new Participant('Adrien')
      const alix = new Participant('Alix')

      const familles = [
        new Famille('Saunier', [adrien, alix])
      ]

      // When
      const tirageAuSort = new TirageAuSort(familles, shuffle)
      const resultat = tirageAuSort.proceder()

      // Then
      expect(resultat.pour(adrien)).toBe(alix)
      expect(resultat.pour(alix)).toBe(adrien)
    })
  })
})
