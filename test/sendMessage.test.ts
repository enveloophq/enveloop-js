
import { Enveloop } from "../src"
const enveloop = new Enveloop({ apiKey: "team-seas-development-token", apiHost: "localhost:4000", ssl: false })

describe('sendMessage', () => {
  it('sends email from template via test api token', async () => {
    const response = await enveloop.sendMessage({
      template: "welcome-to-the-seas",
      to: "bob@test.com",
      from: "Northwind App <app@northwind.com>",
      subject: "Welcome to Northwind Seas",
      templateVariables: {
        name: "Bob Vance",
      }
    })

    expect(response.status).toBe(200)
    expect(response.message).toEqual(
      expect.objectContaining({
        from: 'Northwind App <app@northwind.com>',
        to: 'bob@test.com',
        body: expect.stringContaining('#TeamSeas'),
      })
    )
  })

  it('sends email from html via test api token', async () => {
    const response = await enveloop.sendMessage({
      html: "<h1>Welcome to the Seas HTML VERSION</h1",
      to: "bob@test.com",
      from: "Northwind App <app@northwind.com>",
      subject: "Welcome to Northwind Seas",
      templateVariables: {
        name: "Bob Vance",
      }
    })

    expect(response.status).toBe(200)
    expect(response.message).toEqual(
      expect.objectContaining({
        from: 'Northwind App <app@northwind.com>',
        to: 'bob@test.com',
        body: expect.stringContaining('HTML VERSION'),
      })
    )
  })

  it('fails to send via test api token', async () => {
    await expect(async () => {
      await enveloop.sendMessage({
        template: "welcome-to-the-seas",
        html: "<h1>Welcome to the Seas HTML VERSION</h1",
        to: "bob@test.com",
        from: "Northwind App <app@northwind.com>",
        subject: "Welcome to Northwind Seas",
        templateVariables: {
          name: "Bob Vance",
        }
      })
    }).rejects.toThrow("You cannot provide both a template and html")
  })

  it('gets template via test api token', async () => {
    const response = await enveloop.templateInfo({
      template: "welcome-to-the-seas",
    })

    console.log({response})

    expect(response.status).toBe(200)
    expect(response.template).toEqual(
      expect.objectContaining({
        templateVariables: [],
        body: expect.stringContaining('#TeamSeas'),
      })
    )
  })
})
