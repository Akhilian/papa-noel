import { Session } from '~/api/gestionnaire/domain/models/session'
import { Famille } from '~/api/gestionnaire/domain/models/famille'

export abstract class InterfaceGestionnaireRepository {
  abstract getSession (id: number): Promise<Session | undefined>

  abstract getFamille: (_: number) => Promise<undefined | Famille>
}
