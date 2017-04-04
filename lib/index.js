const version = require('../package.json').version;
const auth = require('../lib/auth');
const sites = require('../lib/sites');
const siteScripts = require('../lib/site-scripts');
const siteActions = require('../lib/site-actions');
const campaigns = require('../lib/campaigns');
const elements = require('../lib/elements');
const variants = require('../lib/variants');
const campaignScripts = require('../lib/campaign-scripts');
const campaignActions = require('../lib/campaign-actions');

function MMRestApi(config = {}) {
  const authHost = config.authHost || 'https://api-auth-eu.maxymiser.com';
  const host = config.host || 'https://api-eu.maxymiser.com';
  const apiVersion = config.apiVersion || 1;
  const baseAuthPath = `${authHost}/v${apiVersion}`;
  const basePath = `${host}/v${apiVersion}`;
  const credentials = config.credentials;
  var authorize = auth.authorize(token, baseAuthPath, credentials);
  var token;

  return {
    host,
    version,
    apiVersion,
    basePath,
    sites: sites(basePath, authorize),
    siteScripts: siteScripts(basePath, authorize),
    siteActions: siteActions(basePath, authorize),
    campaigns: campaigns(basePath, authorize),
    elements: elements(basePath, authorize),
    variants: variants(basePath, authorize),
    campaignScripts: campaignScripts(basePath, authorize),
    campaignActions: campaignActions(basePath, authorize)
  };
}

module.exports = MMRestApi;
