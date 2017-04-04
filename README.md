# node-mm-rest-api

Node.js wrapper for the Oracle Maxymiser REST API

## Install

SSH:

```
npm i git+ssh://git@gitlab.com/LeanConvert/node-mm-rest-api --save
```

HTTPS:

```
npm i https://gitlab.com/LeanConvert/node-mm-rest-api --save
```

## Instantiate

```javascript
const MMRestApi = require('node-mm-rest-api');
const api = MMRestApi({
  // default values:
  // authHost: 'https://api-auth-eu.maxymiser.com/oauth2',
  // host: 'https://api-eu.maxymiser.com',
  // apiVersion: 1,
  credentials: {
    clientId: '<clientId>',
    clientSecret: '<clientSecret>',
    username: '<login for UI>',
    password: '<password for UI>'
  }
});
```

```
api:

{ host: 'https://api-eu.maxymiser.com',
  version: '1.0.0',
  apiVersion: 1,
  basePath: 'https://api-eu.maxymiser.com/v1',
  sites: { get: [Function] },
  siteScripts: { get: [Function], update: [Function] },
  siteActions: { get: [Function] },
  campaigns: { get: [Function], create: [Function] },
  elements: { get: [Function], create: [Function] },
  variants: { get: [Function], create: [Function], update: [Function] },
  campaignScripts: { get: [Function], create: [Function], update: [Function] },
  campaignActions: { get: [Function], update: [Function] } }
```
