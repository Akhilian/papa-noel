import { Famille, Participant, Session } from '../../../api/gestionnaire/gestionnaire.entities'
import { SessionSerializer } from '../../../api/gestionnaire/serializer'

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
  })
})
