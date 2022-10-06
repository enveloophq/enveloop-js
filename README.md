# Enveloop

enveloop-js is a node wrapper for the Enveloop API. It allows easy use of the API to send messages.

## Installation

Add via Yarn:

```
yarn add 'enveloop'
```

Add via NPM:

```
npm install --save 'enveloop'
```

## Usage

```js
const Enveloop = require('enveloop')
const enveloop = new Enveloop({ apiKey: process.env.ENVELOOP_API_TOKEN })

enveloop.sendMessage({
  template: 'welcome-email',
  to: 'user@email.com',
  from: 'welcome@myapp.com',
  subject: 'Welcome to MyApp',
  userVariables: {
    first_name: 'John',
  }
)
.then(res => console.log(res))
.catch(err => console.log(err))
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/enveloophq/enveloop-js. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/enveloophq/enveloop-js/blob/master/CODE_OF_CONDUCT.md).


## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Enveloop project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/enveloophq/enveloop-js/blob/master/CODE_OF_CONDUCT.md).