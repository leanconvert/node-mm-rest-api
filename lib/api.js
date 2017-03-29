const auth = require('../lib/auth');
const sites = require('../lib/sites');

function MMRestApi(config = {}) {
  const host = config.host || 'https://api-eu.maxymiser.com';
  const version = config.version || 1;
  const basePath = `${host}/v${version}`;
  const credentials = config.credentials;
  var token;
  var authorize = auth.authorize(token, basePath, credentials);

  return {
    host,
    version,
    basePath,
    sites: sites(basePath, authorize)
  };
}

module.exports = MMRestApi;
