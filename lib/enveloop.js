const fetch = require('node-fetch')
const { version } = require('../package')

class Enveloop {
  constructor ({ apiKey, apiHost = 'api.enveloop.com', ssl = true }) {
    if (!apiKey) {
      throw new Error('apiKey value must be defined!')
    }

    this.endpoint = `${ssl ? 'https' : 'http'}://${apiHost}`
    this.apiKey = apiKey
  }

  async sendMessage ({ template, to, from, subject, templateVariables = {} }) {
    const data = { to, from, subject, template, templateVariables }

    try {
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
      return { status: 200, message }
    } catch (err) {
      return { status: 500, error: err.message }
    }
  }
  
  async templateInfo ({ template }) {
    try {
      const response = await fetch(`${this.endpoint}/templates/${template}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${this.apiKey}`,
        },
      })
      const templateInfo = await response.json()
      return { status: 200, template: templateInfo }
    } catch (err) {
      return { status: 500, error: err.message }
    }
  }
}

module.exports = Enveloop
