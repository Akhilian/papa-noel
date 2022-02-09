import { TirageAuSort } from '~/api/tirage-au-sort/tirageAuSort.entities'
import { TirageAuSortSerializer } from '~/api/tirage-au-sort/serializer'
import { Participant } from '~/api/gestionnaire/domain/models/participant'
import { Famille } from '~/api/gestionnaire/domain/models/famille'

describe('TirageAuSort Serializer', function () {
  it('devrait retourner un tirage sans résultat', () => {
    // Given
    const tirageAuSort = new TirageAuSort(
      { id: 1 },
      [new Famille('Saunier', [
        new Participant('Adrien', 33600000000),
        new Participant('Alix', 33600000001)
      ])]
    )

    // When
    const json = TirageAuSortSerializer.toRest(tirageAuSort)

    // Then
    expect(json).toEqual({
      resultat: []
    })
  })

  it('devrait retourner le statut sur tirage au sort', () => {
    // Given
    const tirageAuSort = new TirageAuSort(
      { id: 1 },
      [new Famille('Saunier', [
        new Participant('Adrien', 33600000000),
        new Participant('Alix', 33600000001)
      ])]
    )
    tirageAuSort.proceder()

    // When
    const json = TirageAuSortSerializer.toRest(tirageAuSort)

    // Then
    expect(json).toEqual({
      resultat: [
        { participant: 'Adrien', bénéficiaire: 'Alix' },
        { participant: 'Alix', bénéficiaire: 'Adrien' }
      ]
    })
  })
})
