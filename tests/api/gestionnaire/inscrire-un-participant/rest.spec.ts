import supertest from 'supertest'
import api from '~/api'
/* import { prisma } from '~/api/prisma' */
import cleanDb from '~/tests/api/clean_db'
import { prisma } from '~/api/prisma'

describe('Gestionnaire', () => {
  afterEach(cleanDb)

  describe('Inscrire un participant', () => {
    describe('Interface REST', () => {
      it('retourne 404 quand la session n’est pas trouvé', async () => {
        // When
        await supertest(api)
          .post('/session/-1/participant')
          .expect(404)
      })

      it('retourne 400 quand la session n’existe mais des données sont manquantes', async () => {
        // Given
        const sessionInDb = await prisma.session.create({
          data: {
            name: 'Nouvelle session'
          }
        })

        // When
        await supertest(api)
          .post(`/session/${sessionInDb.id}/participant`)
          .send({})
          .expect((res) => {
            expect(res.body).toEqual({
              errors: [
                { title: 'Le champ telephone est obligatoire' },
                { title: 'Le champ prenom est obligatoire' }
              ]
            })
          })
          .expect(400)
      })
    })
  })
})
