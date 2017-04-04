module.exports = (basePath, authorize) => {
  const superagent = require('superagent');
  const req = require('../util/req')(authorize);
  const util = require('../util/util');
  const sites = require('./sites.js')(basePath, authorize);

  /**
   * Get Campaign(s)
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-get.html
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   *
   * Get all Campaigns of the given site;
   * `siteId` has priority over the `siteName`.
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const get = ({siteId, siteName} = {}) => {
    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!siteId && siteName) {
      return sites.get({siteName: siteName})
        .then(site => {
          return req.get(`${basePath}/sites/${site.id}/sandbox/campaigns`, {siteId: site.id});
        });
    } else {
      return req.get(`${basePath}/sites/${siteId}/sandbox/campaigns`, {siteId});
    }
  }

  /**
   * Create Campaign
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-post.html#request
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   *
   * `name` (required) - campaign name
   * `description` (optional) - campaign description
   *
   * Get all Campaigns of the given site;
   * `siteId` has priority over the `siteName`.
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const create = (options = {}) => {
    var {siteId, siteName, name, description} = options;
    var data = { name, description };

    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!data.name) {
      return Promise.reject({ error: '`name` must be provided!' });
    }

    if (!siteId && siteName) {
      return sites.get({siteName: siteName})
        .then(site => {
          return req.post(`${basePath}/sites/${site.id}/sandbox/campaigns`, data);
        });
    } else {
      return req.post(`${basePath}/sites/${siteId}/sandbox/campaigns`, data);
    }
  };

  /**
   * Campaign Elements
   * @type {Object}
   */
  const elements = {
    /**
     * Get Elements(s)
     *
     * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-elements-get.html
     *
     * Possible options:
     * -----------------
     * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
     * `siteName` (optional if `siteId` provided) - name of the site to be fetched
     * `campaignId` (optional if `campaignName` provided) - ID of the campaign to be fetched
     * `campaignName` (optional if `campaignId` provided) - name of the campaign to be fetched
     *
     * Get all Elements of the given Campaigns;
     * `siteId` has priority over the `siteName`.
     *
     * @param  {Object} options
     * @return {Promise}
     */
    get(options = {}) {
      var {siteId, siteName, campaignId, campaignName} = options;
      var promise;

      if (!siteId && !siteName) {
        return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
      }

      if (!campaignId && !campaignName) {
        return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
      }

      promise = siteId ? get({siteId}) : get({siteName});

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
    },


    /**
     * Create Element
     *
     * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-elements-post.html
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
     * Create new Element for the given campaign;
     * `siteId` has priority over the `siteName`.
     * `campaignId` has priority over the `campaignName`.
     *
     * @param  {Object} options
     * @return {Promise}
     */
    create(options = {}) {
      var {siteId, siteName, campaignId, campaignName, name, description} = options;
      var data = { name, description };
      var promise;

      if (!siteId && !siteName) {
        return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
      }

      if (!campaignId && !campaignName) {
        return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
      }

      if (!data.name) {
        return Promise.reject({ error: '`name` must be provided!' });
      }

      promise = siteId ? get({siteId}) : get({siteName});

      return promise
        .then(campaigns => {
          var campaign = !campaignId ?
            util.getByName(campaigns, campaignName) :
            util.getById(campaigns, campaignId);

          var promise = req.post(
            `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/elements`,
            data
          );

          return promise;
        });
    }
  };

  /**
   * Campaign Actions
   * @type {Object}
   */
  const actions = {
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
    get(options = {}) {
      var {siteId, siteName, campaignId, campaignName} = options;
      var promise;

      if (!siteId && !siteName) {
        return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
      }

      if (!campaignId && !campaignName) {
        return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
      }

      promise = siteId ? get({siteId}) : get({siteName});

      return promise
        .then(campaigns => {
          var campaign = !campaignId ?
            util.getByName(campaigns, campaignName) :
            util.getById(campaigns, campaignId);

          var promise = req.get(
            `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/actions`,
            {campaignId: campaign.id});

          return promise;
        });
    },


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
    update(options = {}) {
      var {siteId, siteName, campaignId, campaignName, actionId, actionName, name, description, type, isPrimary} = options;
      var data = util.getUpdatedData(options);

      if (!siteId && !siteName) {
        return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
      }

      if (!campaignId && !campaignName) {
        return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
      }

      if (!data.actionId && !data.actionName) {
        return Promise.reject({ error: '`actionId` must be provided!' });
      }

      return get({siteId, siteName})
        .then(campaigns => {
          var campaign = !campaignId ?
            util.getByName(campaigns, campaignName) :
            util.getById(campaigns, campaignId);

          if (!data.actionId) {
            return this.get({siteId: campaign.siteId, campaignId: campaign.id})
              .then(actions => {
                var action = util.getByName(actions, data.actionName);

                return req.put(
                  `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/actions/${action.id}`,
                  data
                );
              });
          } else {
            return req.put(
              `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/actions/${data.actionId}`,
              data
            );
          }
        });
    }
  };

  /**
   * Campaign Elements
   * @type {Object}
   */
  const scripts = {
    /**
     * Get all Campaign Scripts
     *
     * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-%7Bconfiguration%7D-campaigns-%7Bcampaign-id%7D-scripts-get.html
     *
     * Possible options:
     * -----------------
     * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
     * `siteName` (optional if `siteId` provided) - name of the site to be fetched
     * `campaignId` (optional if `campaignName` provided) - ID of the campaign to be fetched
     * `campaignName` (optional if `campaignId` provided) - name of the campaign to be fetched
     *
     * Get all Scripts of the given Campaigns;
     * `siteId` has priority over the `siteName`.
     *
     * @param  {Object} options
     * @return {Promise}
     */
    get(options = {}) {
      var {siteId, siteName, campaignId, campaignName} = options;
      var promise;

      if (!siteId && !siteName) {
        return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
      }

      if (!campaignId && !campaignName) {
        return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
      }

      promise = siteId ? get({siteId}) : get({siteName});

      return promise
        .then(campaigns => {
          var campaign = !campaignId ?
            util.getByName(campaigns, campaignName) :
            util.getById(campaigns, campaignId);

          var promise = req.get(
            `${basePath}/sites/${campaign.siteId}/sandbox/campaigns/${campaign.id}/scripts`,
            {campaignId: campaign.id});

          return promise;
        });
    },


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
    create(options = {}) {
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

      return get({siteId, siteName})
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
    },

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
    update(options = {}) {
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

      return get({siteId, siteName})
        .then(campaigns => {
          var campaign = !campaignId ?
            util.getByName(campaigns, campaignName) :
            util.getById(campaigns, campaignId);

          if (!scriptId) {
            return this.get({siteId: campaign.siteId, campaignId: campaign.id})
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
    }
  };

  return {
    get,
    create,
    elements,
    actions,
    scripts
  };
}
