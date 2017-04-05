module.exports = (basePath, authorize) => {
  const req = require('../util/req')(authorize);
  const util = require('../util/util');
  const sites = require('../sites');

  /**
   * Publish to Sandbox
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/api-Publishing.html
   *
   * Possible options:
   * -----------------
   * `siteId` (optional) - ID of the site to be fetched
   * `siteName` (optional) - name of the site to be fetched
   *
   * `siteId` has priority over the `siteName` otherwise.
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const publish = ({siteId, siteName}) => {
    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (siteId) {
      return req.put(`${basePath}/sites/${siteId}/sandbox/publish`);
    } else {
      sites.get({siteName})
        .then(site => {
          return req.put(`${basePath}/sites/${site.id}/sandbox/publish`);
        })
    }
  }
};
