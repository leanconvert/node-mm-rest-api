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
  var authSites = sites(basePath, authorize);
  var authSiteScripts = siteScripts(basePath, authorize);
  var authSiteActions = siteActions(basePath, authorize);
  var authCampaigns = campaigns(basePath, authorize);
  var authElements = elements(basePath, authorize);
  var authVariants = variants(basePath, authorize);
  var authCampaignScripts = campaignScripts(basePath, authorize);
  var authCampaignActions = campaignActions(basePath, authorize);
  var authPublish = publish(basePath, authorize).publish;

  authSites.actions = siteActions;
  authSites.scripts = siteScripts;
  authCampaigns.elements = elements;
  authCampaigns.variants = variants;
  authCampaigns.scripts = campaignScripts;
  authCampaigns.actions = campaignActions;

  return {
    host,
    version,
    apiVersion,
    basePath,
    sites: authSites,
    campaigns: authCampaigns,
    publish: authPublish
  };
}

module.exports = MMRestApi;
