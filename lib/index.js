const version = require('../package.json').version;
const auth = require('../lib/auth');
var sites = require('../lib/sites');
var siteScripts = require('../lib/site-scripts');
var siteActions = require('../lib/site-actions');
var campaigns = require('../lib/campaigns');
var elements = require('../lib/elements');
var variants = require('../lib/variants');
var campaignScripts = require('../lib/campaign-scripts');
var campaignActions = require('../lib/campaign-actions');
var publish = require('../lib/publish');

function MMRestApi(config = {}) {
  const authHost = config.authHost || 'https://api-auth-eu.maxymiser.com/oauth2';
  const host = config.host || 'https://api-eu.maxymiser.com';
  const apiVersion = config.apiVersion || 1;
  const baseAuthPath = `${authHost}/v${apiVersion}`;
  const basePath = `${host}/v${apiVersion}`;
  const credentials = config.credentials;
  var authorize = auth.authorize(token, baseAuthPath, credentials);
  var token;

  // add authorization to the api methods
  sites = sites(basePath, authorize);
  siteScripts = siteScripts(basePath, authorize);
  siteActions = siteActions(basePath, authorize);
  campaigns = campaigns(basePath, authorize);
  elements = elements(basePath, authorize);
  variants = variants(basePath, authorize);
  campaignScripts = campaignScripts(basePath, authorize);
  campaignActions = campaignActions(basePath, authorize);
  publish = publish(basePath, authorize).publish;

  sites.actions = siteActions;
  sites.scripts = siteScripts;
  campaigns.elements = elements;
  campaigns.variants = variants;
  campaigns.scripts = campaignScripts;
  campaigns.actions = campaignActions;

  return {
    host,
    version,
    apiVersion,
    basePath,
    sites,
    campaigns,
    publish
  };
}

module.exports = MMRestApi;
