import supertest from 'supertest'
import api from '~/api'
import { prisma } from '~/api/prisma'
import cleanDb from '~/tests/api/clean_db'
import { SMS } from '~/api/tirage-au-sort/notifications/sms'

jest.mock('../../../api/tirage-au-sort/notifications/sms')

describe('Tirage au sort', () => {
  afterEach(cleanDb)

  describe('Lancer', () => {
    describe('Interface REST', () => {
      it('devrait retourner 404 quand la session n’existe pas', async () => {
        // When
        await supertest(api)
          .post('/session/-1/tirage-au-sort')
          .expect(404)
      })

      it('devrait retourner 200 quand la session existe', async () => {
        // Given
        const sessionInDb = await prisma.session.create({
          data: {
            name: 'Session de Noel',
            familles: {
              create: [{
                name: 'Saunier'
              }, {
                name: 'Varnier'
              }]
            }
          }
        })

        // When
        await supertest(api)
          .post(`/session/${sessionInDb.id}/tirage-au-sort`)
          .expect(200)
      })

      it('genere et sauvegarde un tirage au sort', async () => {
        // Given
        const sessionInDb = await prisma.session.create({
          data: {
            name: 'Session de Noel',
            familles: {
              create: [{
                name: 'Saunier',
                participants: {
                  create: [{
                    name: 'Adrien',
                    telephone: 33600000000
                  }]
                }
              }, {
                name: 'Varnier',
                participants: {
                  create: [{
                    name: 'Guillaume',
                    telephone: 33600000001
                  }]
                }
              }]
            }
          }
        })

        // When
        await supertest(api)
          .post(`/session/${sessionInDb.id}/tirage-au-sort`)
          .expect(200)

        // Then
        const tirageAuSort = await prisma.tirageAuSort.findFirst({
          where: {
            sessionId: sessionInDb.id
          }
        })
        expect(tirageAuSort).toBeTruthy()
      })

      it('renvoi le résultat du tirage au sort', async () => {
        // Given
        const sessionInDb = await prisma.session.create({
          data: {
            name: 'Session de Noel',
            familles: {
              create: [{
                name: 'Saunier',
                participants: {
                  create: [{
                    name: 'Adrien',
                    telephone: 33600000000
                  }]
                }
              }, {
                name: 'Varnier',
                participants: {
                  create: [{
                    name: 'Guillaume',
                    telephone: 33600000001
                  }]
                }
              }]
            }
          }
        })

        // When
        const response = await supertest(api)
          .post(`/session/${sessionInDb.id}/tirage-au-sort`)
          .expect(200)

        // Then
        expect(response.body).toStrictEqual({
          data: {
            resultat: [
              {
                participant: 'Adrien',
                bénéficiaire: 'Guillaume'
              },
              {
                participant: 'Guillaume',
                bénéficiaire: 'Adrien'
              }
            ]
          },
          links: {
            session: `/session/${sessionInDb.id}`
          }
        })
      })
    })
  })

  describe('Finaliser', function () {
    describe('Interface REST', function () {
      it('devrait retourner 404 quand le tirage au sort n’existe pas', async () => {
        // When
        await supertest(api)
          .post('/tirage-au-sort/-1/finaliser')
          .expect(404)
      })

      it('devrait retourner 200 quand le tirage au sort existe', async () => {
        // Given
        const session = await prisma.session.create({
          data: {
            name: 'Session',
            tirages: {
              create: [{}]
            }
          },
          include: {
            tirages: true
          }
        })

        const tirageAuSortId = session.tirages[0].id

        // When
        await supertest(api)
          .post(`/tirage-au-sort/${tirageAuSortId}/finaliser`)
          .expect(200)
      })

      it('devrait notifier chaque participant par SMS quand tirage au sort existe', async () => {
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
                      name: 'Adrien',
                      telephone: 1
                    }, {
                      name: 'Catherine',
                      telephone: 2
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
                      participantId: 1,
                      beneficiaireId: 2
                    },
                    {
                      participantId: 2,
                      beneficiaireId: 1
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

        const tirageAuSortId = session.tirages[0].id

        // When
        await supertest(api)
          .post(`/tirage-au-sort/${tirageAuSortId}/finaliser`)
          .expect(200)

        // Then
        expect(SMS.envoyer).toHaveBeenCalledTimes(2)
        expect(SMS.envoyer).toHaveBeenCalledWith({
          beneficiaire: {
            prenom: 'Catherine',
            telephone: 2
          },
          participant: {
            prenom: 'Adrien',
            telephone: 1
          }
        })
        expect(SMS.envoyer).toHaveBeenCalledWith({
          beneficiaire: {
            prenom: 'Adrien',
            telephone: 1
          },
          participant: {
            prenom: 'Catherine',
            telephone: 2
          }
        })
      })
    })
  })
})
