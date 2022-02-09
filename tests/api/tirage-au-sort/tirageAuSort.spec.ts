import { TirageAuSort } from '~/api/tirage-au-sort/domain/models/tirageAuSort'
import { Participant } from '~/api/gestionnaire/domain/models/participant'
import { Famille } from '~/api/gestionnaire/domain/models/famille'

describe('Tirage au sort', () => {
  describe('contraintes', () => {
    it('devrait être initié pour au moins une famille', () => {
      // When
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = new TirageAuSort({ id: 1 }, [])
      } catch (e) {
        expect(e).toStrictEqual(new Error('Un tirage ne peut être démarrer sans aucune famille'))
      }
    })
  })

  describe('proceder', () => {
    it('devrait associer des duos entre deux personnes de familles différentes', () => {
      // Given
      const didier = new Participant('Didier', 33600000001)
      const adrien = new Participant('Adrien', 33600000002)

      const familles = [
        new Famille('His', [didier]), new Famille('Saunier', [adrien])
      ]

      // When
      const tirageAuSort = new TirageAuSort({ id: 1 }, familles)
      const resultat = tirageAuSort.proceder()

      // Then
      expect(resultat.pour(didier)).toBe(adrien)
      expect(resultat.pour(adrien)).toBe(didier)
    })

    it('devrait choisir dans une autre famille basé sur le shuffle', () => {
      // Given
      const shuffle = (array: Array<undefined>) => array.reverse()

      const didier = new Participant('Didier', 33600000001)
      const adrien = new Participant('Adrien', 33600000002)
      const maelle = new Participant('Maëlle', 33600000003)

      const familles = [
        new Famille('His', [didier]), new Famille('Saunier', [adrien]), new Famille('Varnier', [maelle])
      ]

      // When
      const tirageAuSort = new TirageAuSort({ id: 1 }, familles, shuffle)
      const resultat = tirageAuSort.proceder()

      // Then
      expect(resultat.pour(didier)).toBe(maelle)
    })

    it('devrait choisir aléatoirement dans une autre famille, basé sur le shuffle', () => {
      // Given
      const shuffle = (array: Array<undefined>) => array.reverse()

      const didier = new Participant('Didier', 33600000001)
      const adrien = new Participant('Adrien', 33600000002)
      const alix = new Participant('Alix', 33600000003)

      const familles = [
        new Famille('His', [didier]), new Famille('Saunier', [adrien, alix])
      ]

      // When
      const tirageAuSort = new TirageAuSort({ id: 1 }, familles, shuffle)
      const resultat = tirageAuSort.proceder()

      // Then
      expect(resultat.pour(didier)).toBe(alix)
    })

    it('ne doit pas choisir choisir un participant déjà sélectionné', () => {
      // Given
      const shuffle = (array: Array<undefined>) => array

      const didier = new Participant('Didier', 33600000001)
      const patricia = new Participant('Patricia', 33600000002)
      const adrien = new Participant('Adrien', 33600000003)
      const alix = new Participant('Alix', 33600000004)

      const familles = [
        new Famille('Saunier', [adrien, alix]), new Famille('His', [didier, patricia])
      ]

      // When
      const tirageAuSort = new TirageAuSort({ id: 1 }, familles, shuffle)
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

      const adrien = new Participant('Adrien', 33600000001)
      const alix = new Participant('Alix', 33600000002)

      const familles = [
        new Famille('Saunier', [adrien, alix])
      ]

      // When
      const tirageAuSort = new TirageAuSort({ id: 1 }, familles, shuffle)
      const resultat = tirageAuSort.proceder()

      // Then
      expect(resultat.pour(adrien)).toBe(alix)
      expect(resultat.pour(alix)).toBe(adrien)
    })

    it('permet de trouver le résultat pour un participant à partir du téléphone', () => {
      // Given
      const familles = [
        new Famille(
          'His',
          [new Participant('Didier', 33600000001)]
        ),
        new Famille(
          'Saunier',
          [new Participant('Adrien', 33600000002)]
        )
      ]

      // When
      const tirageAuSort = new TirageAuSort(
        { id: 1 }, familles
      )
      tirageAuSort.proceder()

      // Then
      const resultat = tirageAuSort.resultat
      expect(resultat?.pour(new Participant('Didier', 33600000001)))
        .toEqual(new Participant('Adrien', 33600000002))
      expect(resultat?.pour(new Participant('Adrien', 33600000002)))
        .toEqual(new Participant('Didier', 33600000001))
    })
  })

  describe('finaliser', function () {
    it('ne devrait pas être possible de procéder à un tirage au sort déjà finalisé', function () {
      // Given
      const didier = new Participant('Didier', 33600000001)
      const adrien = new Participant('Adrien', 33600000002)

      const familles = [
        new Famille('His', [didier]), new Famille('Saunier', [adrien])
      ]
      const tirageAuSort = new TirageAuSort({ id: 1 }, familles)

      // When
      tirageAuSort.proceder()
      tirageAuSort.finaliser()

      // Then
      try {
        tirageAuSort.proceder()
      } catch (error) {
        expect(error).toEqual(new Error('Impossible de procéder, le tirage au sort a été finalisé.'))
      }
    })
  })
})
