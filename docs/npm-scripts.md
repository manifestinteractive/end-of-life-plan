![Logo](img/logo.png "Logo")

**[↤ Developer Overview](../README.md)**

NPM Scripts
===

Development Scripts:

| command                    | description                                                                                             |
|----------------------------|---------------------------------------------------------------------------------------------------------|
| `npm start`                | Starts Local Server and Opens Browser to [http://localhost:8081](http://localhost:8081) for Development |
| `npm test`                 | Executes both npm run lint:js && npm run lint:html                                                      |
| `npm run build:production` | Compiles Website for Production to ./dist on Local Server                                               |
| `npm run build:staging`    | Compiles Website for Staging to ./dist on Local Server                                                  |
| `npm run lint:js`          | Verifies all JS Code used in ./src is free from errors                                                  |
| `npm run lint:html`        | Verifies all HTML Code used in ./src is free from errors                                                |
| `npm run cdn`              | Uploads Static Assets to CDN ( this is automated remotely and not needed to run locally )               |
| `npm run help`             | Generates List of NPM Scripts you can run                                                               |
