import { prisma } from '~/api/prisma'
import { sauvegarderTirageAuSort } from '~/api/tirage-au-sort/repository'
import { TirageAuSort } from '~/api/tirage-au-sort/tirageAuSort.entities'
import { Famille, Participant } from '~/api/gestionnaire/gestionnaire.entities'
import cleanDb from '~/tests/api/clean_db'

describe('Tirage au sort - Repository', () => {
  afterEach(cleanDb)

  describe('sauvegarderTirageAuSort', function () {
    it('devrait enregistrer le tirage au sort et les duos associés', async () => {
      // Given
      await prisma.participant.createMany({
        data: [
          { name: 'Didier', telephone: 33600000001 },
          { name: 'Adrien', telephone: 33600000002 }
        ]
      })
      const sessionInDb = await prisma.session.create({
        data: {
          name: 'Session de Noel'
        }
      })

      const sessionId = { id: sessionInDb.id }
      const didier = new Participant('Didier', 33600000001)
      const adrien = new Participant('Adrien', 33600000002)

      const familles = [
        new Famille('His', [didier]), new Famille('Saunier', [adrien])
      ]
      const tirageAuSort = new TirageAuSort(sessionId, familles)
      tirageAuSort.proceder()

      // When
      await sauvegarderTirageAuSort(tirageAuSort)

      // Then
      const tirageAuSortInDb = await prisma.tirageAuSort.findMany({
        where: {
          sessionId: sessionInDb.id
        },
        include: {
          duos: true
        }
      })
      expect(tirageAuSortInDb).toHaveLength(1)
      expect(tirageAuSortInDb[0].duos).toHaveLength(2)
    })
  })
})
