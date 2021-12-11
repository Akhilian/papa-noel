import supertest from 'supertest'
import api from '~/api'
import { prisma } from '~/api/prisma'
import cleanDb from '~/tests/api/clean_db'

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
    })
  })
})
