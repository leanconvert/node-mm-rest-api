module.exports = (basePath, authorize) => {
  const req = require('../util/req')(authorize);
  const util = require('../util/util');

  /**
   * Get Site Action(s)
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   *
   * Get all Site Scripts of the given site;
   * `siteId` has priority over the `siteName`.
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const get = ({siteId, siteName}) => {
    var path;

    if (!siteId && !siteName) {
      return Promise.resolve({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!siteId && siteName) {
      return req.get(`${basePath}/sites`).then(sites => {
        var site = util.getByName(sites, siteName);
        return req.get(`${basePath}/sites/${site.id}/sandbox/actions`);
      });
    } else {
      return req.get(`${basePath}/sites/${siteId}/sandbox/actions`);
    }
  };

  return {
    get
  }
};
