import { melange } from '../../../api/tirage-au-sort/melange'

describe('Melange', () => {
  it('devrait modifier l’ordre du tableau', () => {
    // Given
    const tableau = [1, 2, 3, 4, 5]

    // When
    const tableauMelangé = melange(tableau)

    // Then
    expect(tableauMelangé).not.toEqual(tableau)
  })
})
