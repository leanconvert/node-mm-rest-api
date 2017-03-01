const superagent = require('superagent');
const mock = require('superagent-mocker')(superagent);

mock.get('https://api-auth-eu.maxymiser.com/oauth2/v1/tokens', req => {
  return {
    content: 'Response goes here...',
    headers: req.headers
  }
});

module.exports = mock;
