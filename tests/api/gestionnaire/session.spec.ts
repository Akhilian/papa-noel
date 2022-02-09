import { Session } from '~/api/gestionnaire/domain/models/session'
import { TirageAuSort } from '~/api/tirage-au-sort/domain/models/tirageAuSort'
import { Famille } from '~/api/gestionnaire/domain/models/famille'

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
