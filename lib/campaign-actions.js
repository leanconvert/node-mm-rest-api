module.exports = (basePath, authorize) => {
  const req = require('../util/req')(authorize);
  const util = require('../util/util');
  const campaigns = require('./campaigns.js')(basePath, authorize);

  /**
   * Get all Actions
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-actions-get.html
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   * `campaignId` (optional if `campaignName` provided) - ID of the campaign to be fetched
   * `campaignName` (optional if `campaignId` provided) - name of the campaign to be fetched
   *
   * Get all Actions of the given Campaigns;
   * `siteId` has priority over the `siteName`.
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const get = (options = {}) => {
    var {siteId, siteName, campaignId, campaignName} = options;

    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!campaignId && !campaignName) {
      return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
    }

    return campaigns.get({siteId, siteName})
      .then(campaigns => {
        var campaign = !campaignId ?
          util.getByName(campaigns, campaignName) :
          util.getById(campaigns, campaignId);

        var promise = req.get(
          `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/actions`,
          {campaignId: campaign.id});

        return promise;
      });
  };


  /**
   * Update Action by ID/Name
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-actions-%7Baction-id%7D-put.html
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   * `campaignId` (optional if `campaignName` provided) - ID of the campaign to be fetched
   * `campaignName` (optional if `campaignId` provided) - name of the campaign to be fetched
   *
   * `name` (required) - campaign name
   * `description` (optional) - campaign description
   *
   * Update an Action for the given campaign;
   * `siteId` has priority over the `siteName`.
   * `campaignId` has priority over the `campaignName`.
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const update = (options = {}) => {
    var {siteId, siteName, campaignId, campaignName, actionId, actionName, name, description, type, isPrimary} = options;
    var data = util.getUpdatedData(options);

    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!campaignId && !campaignName) {
      return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
    }

    if (!actionId && !actionName) {
      return Promise.reject({ error: '`actionId` must be provided!' });
    }

    return campaigns.get({siteId, siteName})
      .then(campaigns => {
        var campaign = !campaignId ?
          util.getByName(campaigns, campaignName) :
          util.getById(campaigns, campaignId);

        if (!actionId) {
          return get({siteId: campaign.siteId, campaignId: campaign.id})
            .then(actions => {
              var action = util.getByName(actions, data.actionName);

              return req.put(
                `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/actions/${action.id}`,
                data
              );
            });
        } else {
          return req.put(
            `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/actions/${actionId}`,
            data
          );
        }
      });
  };

  return {
    get,
    update
  }
};
