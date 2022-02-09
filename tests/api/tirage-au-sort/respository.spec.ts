import { prisma } from '~/api/prisma'
import { TirageAuSortRepository } from '~/api/tirage-au-sort/repository'
import { Resultat, TirageAuSort } from '~/api/tirage-au-sort/tirageAuSort.entities'
import cleanDb from '~/tests/api/clean_db'
import { Participant } from '~/api/gestionnaire/domain/models/participant'
import { Famille } from '~/api/gestionnaire/domain/models/famille'

describe('Tirage au sort - Repository', () => {
  let tirageAuSortRepository: TirageAuSortRepository

  beforeEach(() => {
    tirageAuSortRepository = new TirageAuSortRepository()
  })

  afterEach(cleanDb)

  describe('sauvegarderTirageAuSort', function () {
    it('devrait enregistrer le tirage au sort et les duos associés', async () => {
      // Given
      await prisma.participant.createMany({
        data: [
          {
            prenom: 'Didier',
            telephone: 33600000001
          },
          {
            prenom: 'Adrien',
            telephone: 33600000002
          }
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
      await tirageAuSortRepository.sauvegarderTirageAuSort(tirageAuSort)

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

  describe('recupererTirageAuSort', () => {
    it('devrait renvoyer null quand le tirage au sort n’existe pas', async () => {
      // Given
      // When
      const result = await tirageAuSortRepository.recupererTirageAuSort(-1)

      // Then
      expect(result).toEqual(null)
    })

    it('devrait retourner une instance de TirageAuSort', async () => {
      // Given
      const session = await prisma.session.create({
        data: {
          name: 'Session',
          familles: {
            create: [
              {
                name: 'Saunier',
                participants: {
                  create: [{
                    prenom: 'Adrien',
                    telephone: 33600000001
                  }, {
                    prenom: 'Catherine',
                    telephone: 33600000002
                  }]
                }
              }
            ]
          },
          tirages: {
            create: [{
              duos: {
                create: [
                  {
                    participantId: 33600000001,
                    beneficiaireId: 33600000002
                  },
                  {
                    participantId: 33600000002,
                    beneficiaireId: 33600000001
                  }
                ]
              }
            }]
          }
        },
        include: {
          tirages: true
        }
      })

      // When
      const tirageAuSort = await tirageAuSortRepository.recupererTirageAuSort(session.tirages[0].id)

      // Then
      expect(tirageAuSort).toBeInstanceOf(TirageAuSort)
      expect(tirageAuSort?.sessionId).toEqual({ id: session.id })

      const resultatDuTirageAuSort = tirageAuSort?.resultat
      expect(resultatDuTirageAuSort).toBeInstanceOf(Resultat)
      expect(resultatDuTirageAuSort?.pour(new Participant('Adrien', 33600000001)))
        .toEqual(new Participant('Catherine', 33600000002))
      expect(resultatDuTirageAuSort?.pour(new Participant('Catherine', 33600000002)))
        .toEqual(new Participant('Adrien', 33600000001))
    })
  })
})
