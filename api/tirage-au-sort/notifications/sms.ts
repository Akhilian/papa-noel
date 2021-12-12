import { TransactionalSMSApi, TransactionalSMSApiApiKeys, SendTransacSms } from '@sendinblue/client'
import { Duo } from '../tirageAuSort.entities'

// FIXME Do not commit before testing correctly
export class SMS {
  public static envoyer (duo: Duo) {
    const API_KEY = process.env.SMS_API_KEY || ''

    const apiInstance = new TransactionalSMSApi()
    apiInstance.setApiKey(TransactionalSMSApiApiKeys.apiKey, API_KEY)

    const sendTransacSms = new SendTransacSms()
    sendTransacSms.sender = 'PapaNoel'
    sendTransacSms.recipient = String(duo.participant.telephone)
    sendTransacSms.content = `Hello ${duo.participant.prenom}. Pour le secret santa de la famille His, ton cadeau secret sera pour ${duo.beneficiaire.prenom}. Bisous, Adrien`
    sendTransacSms.webUrl = 'https://papa-noel.osc-fr1.scalingo.io/'

    // eslint-disable-next-line no-console
    return apiInstance.sendTransacSms(sendTransacSms)
  }
}
