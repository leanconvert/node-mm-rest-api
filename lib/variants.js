module.exports = (basePath, authorize) => {
  const superagent = require('superagent');
  const req = require('../util/req')(authorize);
  const util = require('../util/util');
  const elements = require('./elements.js')(basePath, authorize);

  /**
   * Get all variant of the given element
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-%7Bconfiguration%7D-campaigns-%7Bcampaign-id%7D-elements-%7Belement-id%7D-variants-get.html
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   * `campaignId` (optional if `campaignName` provided) - ID of the campaign to be fetched
   * `campaignName` (optional if `campaignId` provided) - name of the campaign to be fetched
   * `elementId` (optional if `elementName` provided) - ID of the element to be fetched
   * `elementName` (optional if `elementId` provided) - name of the element to be fetched
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const get = (options = {}) => {
    var {siteId, siteName, campaignId, campaignName, elementId, elementName} = options;

    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!campaignId && !campaignName) {
      return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
    }

    if (!elementId && !elementName) {
      return Promise.reject({ error: '`elementId` or `elementName` must be provided!' });
    }

    return elements.get({siteId, siteName, campaignId, campaignName})
      .then(elements => {
        var element = !elementId ?
          util.getByName(elements, elementName) :
          util.getById(elements, elementId);

        return req.get(
          `${basePath}/sites/${element.siteId}/sandbox/campaigns/${element.campaignId}/elements/${element.id}/variants`
        );
      });
  };


  /**
   * Create Campaign Script
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-%7Bconfiguration%7D-campaigns-%7Bcampaign-id%7D-scripts-post.html
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   * `campaignId` (optional if `campaignName` provided) - ID of the campaign to be fetched
   * `campaignName` (optional if `campaignId` provided) - name of the campaign to be fetched
   *
   * `name` (required) - campaign name
   * `content` (required) - campaign script content
   * `description` (optional) - campaign description
   *
   * Create new Element for the given campaign;
   * `siteId` has priority over the `siteName`.
   * `campaignId` has priority over the `campaignName`.
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const create = (options = {}) => {
    var {siteId, siteName, campaignId, campaignName, name, description, content} = options;
    var data = { name, description, content };

    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!campaignId && !campaignName) {
      return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
    }

    if (!data.name) {
      return Promise.reject({ error: '`name` must be provided!' });
    }

    if (!data.content) {
      return Promise.reject({ error: '`content` must be provided!' });
    }

    return campaigns.get({siteId, siteName})
      .then(campaigns => {
        var campaign = !campaignId ?
          util.getByName(campaigns, campaignName) :
          util.getById(campaigns, campaignId);

        var promise = req.post(
          `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/scripts`,
          data
        );

        return promise;
      });
  };

  /**
   * Update Campaign Script by ID/Name
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-scripts-%7Bscript-id%7D-put.html
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   * `campaignId` (optional if `campaignName` provided) - ID of the campaign to be fetched
   * `campaignName` (optional if `campaignId` provided) - name of the campaign to be fetched
   *
   * `name` - campaign name
   * `description` - campaign description
   * `content` - campaign description
   *
   * Update Campaign Script for the given campaign;
   * `siteId` has priority over the `siteName`.
   * `campaignId` has priority over the `campaignName`.
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const update = (options = {}) => {
    var {siteId, siteName, campaignId, campaignName, scriptId, scriptName, name, description, type, isPrimary} = options;
    var data = util.getUpdatedData(options);

    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!campaignId && !campaignName) {
      return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
    }

    if (!scriptId && !scriptName) {
      return Promise.reject({ error: '`scriptId` must be provided!' });
    }

    return campaigns.get({siteId, siteName})
      .then(campaigns => {
        var campaign = !campaignId ?
          util.getByName(campaigns, campaignName) :
          util.getById(campaigns, campaignId);

        if (!scriptId) {
          return get({siteId: campaign.siteId, campaignId: campaign.id})
            .then(scripts => {
              var script = util.getByName(scripts, scriptName);

              return req.put(
                `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/scripts/${script.id}`,
                data
              );
            });
        } else {
          return req.put(
            `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/scripts/${scriptId}`,
            data
          );
        }
      });
  };

  return {
    get,
    create,
    update
  }
}
