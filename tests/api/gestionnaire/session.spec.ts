import { Famille, Session } from '~/api/gestionnaire/gestionnaire.entities'
import { TirageAuSort } from '~/api/tirage-au-sort/tirageAuSort.entities'

describe('Session', () => {
  describe('initierUnTirageAuSort', () => {
    it('devrait retourner un tirage au sort', () => {
      // Given
      const session = new Session({ id: 1 }, '', [new Famille('Saunier', [])])

      // When
      const tirageAuSort = session.initierUnTirageAuSort()

      // Then
      expect(tirageAuSort).toBeInstanceOf(TirageAuSort)
    })
  })
})
