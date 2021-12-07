import { Famille, Session, TirageAuSort } from '~/api/tirage-au-sort/entities'

describe('Session', () => {
  describe('initierUnTirageAuSort', () => {
    it('devrait retourner un tirage au sort', () => {
      // Given
      const session = new Session([new Famille('Saunier', [])])

      // When
      const tirageAuSort = session.initierUnTirageAuSort()

      // Then
      expect(tirageAuSort).toBeInstanceOf(TirageAuSort)
    })
  })
})
