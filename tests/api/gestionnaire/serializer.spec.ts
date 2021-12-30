import { Famille, Participant, Session } from '../../../api/gestionnaire/gestionnaire.entities'
import { ParticipantSerializer, SessionSerializer } from '../../../api/gestionnaire/serializer'
import { prisma } from '~/api/prisma'
import cleanDb from '~/tests/api/clean_db'

describe('Gestionnaire', () => {
  describe('Serializer', () => {
    describe('Session', () => {
      it('devrait serializer pour REST', () => {
        // Given
        const familles = [
          new Famille('Saunier', []),
          new Famille('His', [])
        ]
        const session = new Session({ id: 1 }, '2021', familles)

        // When
        const json = SessionSerializer.toRest(session)

        // Then
        expect(json).toEqual({
          nom: '2021',
          familles: [
            {
              nom: 'Saunier',
              participants: []
            },
            {
              nom: 'His',
              participants: []
            }
          ]
        })
      })

      it('devrait masquer le numéro de téléphone', () => {
        // Given
        const familles = [
          new Famille('Saunier', [
            new Participant('Adrien', 33600000058)
          ])
        ]
        const session = new Session({ id: 1 }, '2021', familles)

        // When
        const json = SessionSerializer.toRest(session)

        // Then
        expect(json).toEqual({
          nom: '2021',
          familles: [
            {
              nom: 'Saunier',
              participants: [{
                prenom: 'Adrien',
                telephone: '********058'
              }]
            }
          ]
        })
      })
    })

    describe('Participant', function () {
      describe('fromORM', function () {
        afterEach(cleanDb)

        it('retourne un Participant depuis le stockage en DB', async () => {
          // Given
          const participantInDb = await prisma.participant.create({
            data: {
              telephone: 33600000001,
              prenom: 'Adrien'
            }
          })

          // When
          const participant = ParticipantSerializer.fromORM(participantInDb)

          // Then
          expect(participant).toBeInstanceOf(Participant)
          expect(participant.prenom).toEqual('Adrien')
          expect(participant.telephone).toEqual(33600000001)
        })
      })

      describe('fromREST', () => {
        it('devrait construire un participant', () => {
          // Given
          const json = {
            telephone: '33600000000',
            prenom: 'Adrien'
          }

          // When
          const participant = ParticipantSerializer.fromRest(json)

          // Then
          expect(participant).toBeInstanceOf(Participant)
          expect(participant.telephone).toEqual(33600000000)
          expect(participant.prenom).toEqual('Adrien')
        })
      })
    })
  })
})
