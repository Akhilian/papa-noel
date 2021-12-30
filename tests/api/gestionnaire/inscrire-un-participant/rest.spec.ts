import supertest from 'supertest'
import api from '~/api'
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
                { title: 'Le champ prénom est obligatoire' }
              ]
            })
          })
          .expect(400)
      })

      it('retourne 400 quand la session n’existe mais le telephone est manquant', async () => {
        // Given
        const sessionInDb = await prisma.session.create({
          data: {
            name: 'Nouvelle session'
          }
        })

        // When
        await supertest(api)
          .post(`/session/${sessionInDb.id}/participant`)
          .send({
            prenom: 'Adrien'
          })
          .expect((res) => {
            expect(res.body).toEqual({
              errors: [
                { title: 'Le champ téléphone est obligatoire et doit être valide' }
              ]
            })
          })
          .expect(400)
      })
    })
  })
})
