import { prisma } from '~/api/prisma'
import { Famille, Participant, Session } from '~/api/gestionnaire/gestionnaire.entities'
import { getFamille, getSession } from '~/api/gestionnaire/repository'

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
                  telephone: '0'
                }, {
                  name: 'Clémence',
                  telephone: '1'
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
      const premièreFamille = session?.familles[0]
      expect(premièreFamille?.participants).toHaveLength(2)
      expect(premièreFamille?.participants).toEqual([new Participant('Jean', '0'), new Participant('Clémence', '1')])
    })
  })
})
