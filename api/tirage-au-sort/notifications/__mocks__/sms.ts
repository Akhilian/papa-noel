import { Duo } from '../../tirageAuSort.entities'

export class SMS {
  public static envoyer = jest.fn().mockImplementation((_: Duo) => {
  })
}
