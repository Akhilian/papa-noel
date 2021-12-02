import supertest from 'supertest'
import api from '~/api'

describe('Tirage au sort', () => {
  describe('Lancer', () => {
    describe('Interface REST', () => {
      it('devrait exposer un endpoint', async () => {
        // When
        await supertest(api)
          .post('/session/1/tirage-au-sort')
          .expect(204)
      })
    })
  })
})
