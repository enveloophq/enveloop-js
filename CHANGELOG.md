# Changelog

> ## Version 0.1.0
> Initial Release.

* Adds support for sending emails

> ## Version 0.1.1

* change send method from `send` -> `sendMessage` to match ruby SDK

> ## Version 0.1.2

* add `templateInfo` to fetch the template body and see waht variables are defined on a template

> ## Version 0.1.3

* change `userVariables` to `templateVariables` in API call

> ## Version 0.1.4

* Do not require `from` in api call to allow for default from in template
* Do not require `subject` in api call to allow for default subject in template
* send `Sdk-Version` header for tracking of SDK usage and future deprection warnings

> ## Version 0.1.5

* Use new `/messages` endpoint

> ## Version 0.1.6

* Throw errors on API failure

> ## Version 0.1.7

* Fix bug on templateInfo not returning proper error when template not found