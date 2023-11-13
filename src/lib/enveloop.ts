import fetch from 'node-fetch'
import { version } from '../../package.json'

type EnveloopOptions = {
  apiKey: string
  apiHost?: string
  ssl?: boolean
}

type EnveloopMessageOptions = {
  template?: string
  html?: string
  to: string
  from: string
  subject: string
  templateVariables?: object
}

type EnveloopTemplateOptions = {
  template: string
}

type EnveloopMessageResponse = {
  to: string
  from: string
  body: string
}

type EnveloopTemplateResponse = {
  templateVariables: [string]
  body: string
}

class Enveloop {
  private endpoint: string
  private apiKey: string

  constructor ({ apiKey, apiHost = 'api.enveloop.com', ssl = true }: EnveloopOptions) {
    if (!apiKey) {
      throw new Error('apiKey value must be defined!')
    }

    this.endpoint = `${ssl ? 'https' : 'http'}://${apiHost}`
    this.apiKey = apiKey
  }

  async sendMessage ({ template, html, to, from, subject, templateVariables = {} }: EnveloopMessageOptions): Promise<{ status: number, message: EnveloopMessageResponse }> {
    const data = { template, html, to, from, subject, templateVariables }

    const response = await fetch(`${this.endpoint}/messages`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${this.apiKey}`,
        "Sdk-Version": `js-${version}`
      },
    })
    const message = await response.json()

    if (response.status !== 200 && message.error) {
      throw new Error(message.error)
    }

    return { status: response.status, message }
  }
  
  async templateInfo ({ template }: EnveloopTemplateOptions): Promise<{ status: number, template: EnveloopTemplateResponse }> {
    const response = await fetch(`${this.endpoint}/templates/${template}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${this.apiKey}`,
      },
    })
    const templateInfo = await response.json()

    if (response.status !== 200 && templateInfo.error) {
      throw new Error(templateInfo.error)
    }

    console.log({templateInfo})

    return { status: response.status, template: templateInfo }
  }
}

export { Enveloop }
