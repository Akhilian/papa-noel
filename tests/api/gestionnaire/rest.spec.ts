import supertest from 'supertest'
import api from '~/api'
import { prisma } from '~/api/prisma'
import cleanDb from '~/tests/api/clean_db'

describe('Gestionnaire', () => {
  describe('Afficher la session', () => {
    afterEach(cleanDb)

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
          .expect((res) => {
            expect(res.body).toEqual({
              id: `${sessionInDb.id}`,
              data: {
                nom: 'Première session',
                familles: [
                  {
                    nom: 'Saunier',
                    participants: []
                  },
                  {
                    nom: 'Dupont',
                    participants: []
                  }
                ]
              },
              links: {
                self: `/session/${sessionInDb.id}`
              }
            })
          })
          .expect(200)
      })

      it('retourne la session en incluant les participants', async () => {
        // Given
        const sessionInDb = await prisma.session.create({
          data: {
            name: 'Première session',
            familles: {
              create: [
                {
                  name: 'Saunier',
                  participants: {
                    create: [
                      {
                        name: 'Adrien',
                        telephone: 33600000000
                      }
                    ]
                  }
                }
              ]
            }
          }
        })

        // When
        await supertest(api)
          .get(`/session/${sessionInDb.id}`)
          .expect('Content-Type', /json/)
          .expect((res) => {
            expect(res.body).toEqual({
              id: `${sessionInDb.id}`,
              data: {
                nom: 'Première session',
                familles: [
                  {
                    nom: 'Saunier',
                    participants: [{
                      prenom: 'Adrien',
                      telephone: '********000'
                    }]
                  }
                ]
              },
              links: {
                self: `/session/${sessionInDb.id}`
              }
            })
          })
          .expect(200)
      })
    })
  })
})
