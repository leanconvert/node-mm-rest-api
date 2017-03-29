const auth = require('../lib/auth');
const site = require('../lib/site');

function MMRestApi(config = {}) {
  const host = config.host || 'https://api-eu.maxymiser.com';
  const version = config.version || 1;
  const basePath = `${host}/v${version}`;
  const credentials = config.credentials;

  var promisedAccessToken = auth.getAccessToken(basePath, credentials);

  return {
    host,
    version,
    basePath,
    authorize
  };

  function authorize() {
    return promisedAccessToken.catch(() => {
      return (promisedAccessToken = auth.getAccessToken(basePath, credentials));
    });
  }
}

module.exports = MMRestApi;
