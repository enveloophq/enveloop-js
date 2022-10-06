const fetch = require('node-fetch')

class Enveloop {
  constructor ({ apiKey, apiHost = 'api.enveloop.com', ssl = true }) {
    if (!apiKey) {
      throw new Error('apiKey value must be defined!')
    }

    this.endpoint = `${ssl ? 'https' : 'http'}://${apiHost}`
    this.apiKey = apiKey
  }

  async sendMessage ({ template, to, from, subject, userVariables }) {
    const data = { to, from, subject, userVariables }

    try {
      const response = await fetch(`${this.endpoint}/templates/${template}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${this.apiKey}`,
        },
      })
      const message = await response.json()
      return { status: 200, message }
    } catch (err) {
      return { status: 500, error: err.message }
    }
  }
}

module.exports = Enveloop