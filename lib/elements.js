module.exports = (basePath, authorize) => {
  const superagent = require('superagent');
  const req = require('../util/req')(authorize);
  const util = require('../util/util');
  const campaigns = require('./campaigns.js')(basePath, authorize);

  const get = (options = {}) => {
    var {siteId, siteName, campaignId, campaignName} = options;
    var promise;

    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!campaignId && !campaignName) {
      return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
    }

    promise = siteId ? campaigns.get({siteId}) : campaigns.get({siteName});

    return promise
      .then(campaigns => {
        var campaign = !campaignId ?
          util.getByName(campaigns, campaignName) :
          util.getById(campaigns, campaignId);

        var promise = req.get(
          `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/elements`,
          {campaignId: campaign.id});

        return promise;
      });
  };

  return {
    get
  };
};
