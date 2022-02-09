import { Duo } from '~/api/tirage-au-sort/domain/models/resultat'

export class SMS {
  public static envoyer = jest.fn().mockImplementation((_: Duo) => {
  })
}
