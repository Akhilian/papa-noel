import { TransactionalSMSApi, TransactionalSMSApiApiKeys, SendTransacSms } from '@sendinblue/client'

// FIXME Do not commit before testing correctly
export class SMS {
  public static envoyer () {
    const API_KEY = process.env.SMS_API_KEY || ''

    const apiInstance = new TransactionalSMSApi()
    apiInstance.setApiKey(TransactionalSMSApiApiKeys.apiKey, API_KEY)

    const sendTransacSms = new SendTransacSms()
    sendTransacSms.sender = 'PapaNoel'
    sendTransacSms.recipient = ''
    sendTransacSms.content = 'Papa Noel - Votre cadeau secret sera pour Catherine'
    sendTransacSms.webUrl = 'https://papa-noel.osc-fr1.scalingo.io/'

    // eslint-disable-next-line no-console
    apiInstance.sendTransacSms(sendTransacSms).then(console.log, console.error)
  }
}
