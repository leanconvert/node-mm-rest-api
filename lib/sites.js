module.exports = (basePath, authorize) => {
  const superagent = require('superagent');
  const req = require('../util/req')(authorize);
  const util = require('../util/util');

  /**
   * Get site(s)
   *
   * Possible options:
   * -----------------
   * `siteId` (optional) - ID of the site to be fetched
   * `siteName` (optional) - name of the site to be fetched
   *
   * Get all sites in the account if no options provided,
   * `siteId` has priority over the `siteName` otherwise.
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const get = ({siteId, siteName} = {}) => {
    var path = `${basePath}/sites`;

    if (siteId) {
      path = `${basePath}/sites/${siteId}`
    }

    if (!siteId && siteName) {
      return req.get(path).then(sites => {
        return util.getByName(sites, siteName);
      });
    } else {
      return req.get(path);
    }
  };

  // exports
  return {
    get
  };
};
