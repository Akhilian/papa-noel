import { getFamille } from '~/api/tirage-au-sort/repository'
import { Famille } from '~/api/tirage-au-sort/entities'
import { prisma } from '~/api/prisma'

describe('Repository', () => {
  afterEach(async () => {
    await prisma.participant.deleteMany({})
    await prisma.famille.deleteMany({})
  })

  describe('get Famille', () => {
    it('devrait retourner une Famille', async function () {
      // Given
      const familleInDb = await prisma.famille.create({
        data: {
          name: 'Saunier',
          participants: {
            create: [
              {
                name: 'Adrien',
                telephone: '0'
              }
            ]
          }
        }
      })

      // When
      const famille = await getFamille(familleInDb.id)

      // Then
      expect(famille).toBeDefined()
      expect(famille).toBeInstanceOf(Famille)
      expect(famille?.nom).toBe('Saunier')
      expect(famille?.membres).toHaveLength(1)
    })

    it('devrait retourner undefined quand la famille n’existe pas', async () => {
      // When
      const famille = await getFamille(-1)

      // Then
      expect(famille).toBe(undefined)
    })
  })
})
