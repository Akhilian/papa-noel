import supertest from 'supertest'
import api from '~/api'
import { prisma } from '~/api/prisma'

describe('Gestionnaire', () => {
  describe('Afficher la session', () => {
    afterEach(async () => {
      await prisma.session.deleteMany({})
    })

    describe('Interface REST', () => {
      it('retourne 404 quand la session n’est pas trouvé', async () => {
        // When
        await supertest(api)
          .get('/session/-1')
          .expect(404)
      })

      it('retourne la session', async () => {
        // Given
        const sessionInDb = await prisma.session.create({
          data: {
            name: 'Première session',
            familles: {
              create: [
                {
                  name: 'Saunier'
                },
                {
                  name: 'Dupont'
                }
              ]
            }
          }
        })

        // When
        await supertest(api)
          .get(`/session/${sessionInDb.id}`)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: `${sessionInDb.id}`,
            nom: 'Première session',
            links: {
              self: `/session/${sessionInDb.id}`
            }
          })
      })
    })
  })
})
