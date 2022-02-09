import { TirageAuSort } from '~/api/tirage-au-sort/domain/models/tirageAuSort'

export abstract class InterfaceTirageAuSortRepository {
  abstract sauvegarderTirageAuSort (tirageAuSort: TirageAuSort): Promise<null>

  abstract recupererTirageAuSort (id: number): Promise<null | TirageAuSort>
}
