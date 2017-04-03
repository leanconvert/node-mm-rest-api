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
          return req.get(`${basePath}/sites/${site.id}/sandbox/campaigns`);
        });
    } else {
      return req.get(`${basePath}/sites/${siteId}/sandbox/campaigns`);
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
  }

  return {
    get,
    create
  };
}
