import { prisma } from '~/api/prisma'
import { Famille, Session } from '~/api/gestionnaire/gestionnaire.entities'
import { getFamille, getSession } from '~/api/gestionnaire/repository'
import cleanDb from '~/tests/api/clean_db'

describe('Gestionnaire - Repository', () => {
  afterEach(cleanDb)

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
                telephone: 33600000000
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
      expect(famille?.participants).toHaveLength(1)
    })

    it('devrait retourner undefined quand la famille n’existe pas', async () => {
      // When
      const famille = await getFamille(-1)

      // Then
      expect(famille).toBe(undefined)
    })
  })

  describe('Session', () => {
    it('devrait retourner undefined quand la session n’existe pas', async function () {
      // When
      const famille = await getSession(-1)

      // Then
      expect(famille).not.toBeDefined()
    })

    it('devrait retourner une Session', async function () {
      // Given
      const sessionInDb = await prisma.session.create({
        data: {
          name: 'Session de Noel'
        }
      })

      // When
      const famille = await getSession(sessionInDb.id)

      // Then
      expect(famille).toBeDefined()
      expect(famille).toBeInstanceOf(Session)
    })

    it('devrait retourner la liste des familles associées', async function () {
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
      const session = await getSession(sessionInDb.id)

      // Then
      expect(session).toBeDefined()
      expect(session?.nom).toEqual('Session de Noel')
      expect(session?.familles).toHaveLength(2)

      const premièreFamille = session?.familles[0]
      expect(premièreFamille?.nom).toEqual('Saunier')

      const secondeFamille = session?.familles[1]
      expect(secondeFamille?.nom).toEqual('Varnier')
    })

    it('devrait avoir un ID', async function () {
      // Given
      const sessionInDb = await prisma.session.create({
        data: {
          name: 'Session de Noel'
        }
      })

      // When
      const session = await getSession(sessionInDb.id)

      // Then
      expect(session).toBeDefined()
      expect(session?.nom).toEqual('Session de Noel')
      expect(session?.id).toEqual({ id: sessionInDb.id })
    })

    it('devrait retourner la liste des familles et leurs participants', async function () {
      // Given
      const sessionInDb = await prisma.session.create({
        data: {
          name: 'Session de Noel',
          familles: {
            create: [{
              name: 'His',
              participants: {
                create: [{
                  name: 'Jean',
                  telephone: 33600000000
                }, {
                  name: 'Clémence',
                  telephone: 33600000001
                }]
              }
            }]
          }
        }
      })

      // When
      const session = await getSession(sessionInDb.id)

      // Then
      expect(session).toBeDefined()

      const participants = session?.familles[0]?.participants
      expect(participants).toHaveLength(2)
      if (participants) {
        const jean = participants[0]
        expect(jean.prenom).toEqual('Jean')
        expect(jean.telephone).toStrictEqual(BigInt(33600000000))
        const clémence = participants[1]
        expect(clémence.prenom).toStrictEqual('Clémence')
        expect(clémence.telephone).toStrictEqual(BigInt(33600000001))
      }
    })
  })
})
