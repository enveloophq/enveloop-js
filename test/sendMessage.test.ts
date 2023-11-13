
import Enveloop from "../src"
const enveloop = new Enveloop({ apiKey: "team-seas-development-token", apiHost: "localhost:4000", ssl: false })

describe('sendMessage', () => {
  it('sends email via test api token', async () => {
    const response = await enveloop.sendMessage({
      template: "welcome-to-the-seas",
      to: "bob@test.com",
      from: "Northwind App <app@northwind.com>",
      subject: "Welcome to Northwind Seas",
      templateVariables: {
        name: "Bob Vance",
      }
    })

    console.log({response})

    expect(response.status).toBe(200)
    expect(response.message).toEqual(
      expect.objectContaining({
        from: 'Northwind App <app@northwind.com>',
        to: 'bob@test.com',
        body: expect.stringContaining('#TeamSeas'),
      })
    )
  })
})
