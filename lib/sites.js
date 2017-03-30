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

  /**
   * Site Scripts
   * @type {Object}
   */
  const scripts = {
    /**
     * Get Site Script(s)
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
    get({siteId, siteName}) {
      if (!siteId && !siteName) {
        return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
      }

      if (!siteId && siteName) {
        return req.get(`${basePath}/sites`).then(sites => {
          var site = util.getByName(sites, siteName);
          return req.get(util.getScriptPath(basePath, site.id, ''));
        });
      } else {
        return req.get(util.getScriptPath(basePath, siteId, ''));
      }
    },

    /**
     * Update Site Script
     *
     * Possible options:
     * -----------------
     * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
     * `siteName` (optional if `siteId` provided) - name of the site to be fetched
     * `scriptId` (optional if `scriptName` provided) - ID of the script to be fetched
     * `scriptName` (optional if `scriptId` provided) - name of the script to be fetched
     *
     * Update Site Script for the given site and of the given ID/Name;
     * `siteId` has priority over the `siteName`.
     * `scriptId` has priority over the `scriptName`.
     *
     * @param  {Object} options
     * @return {Promise}
     */
    update(options) {
      let {siteId, siteName, scriptId, scriptName, name, description, content} = options;

      if (!siteId && !siteName) {
        return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
      }

      if (!scriptId && !scriptName) {
        return Promise.reject({ error: '`scriptId` or `scriptName` must be provided!' });
      }

      let updatedData = util.getUpdatedData(options);
      let promise;
      let path;

      if (!siteId && siteName) {
        promise = get().then(sites => getByName(sites, siteName))

        return promise
          .then(site => {
            if (!scriptId && scriptName) {
              return this.get({siteId: site.id})
                .then(scripts => getByName(scripts, scriptName))
                .then(script => {
                  return req.put(util.getScriptPath(basePath, site.id, script.id));
                });
            } else {
              return req.put(util.getScriptPath(basePath, site.id, scriptId));
            }
          });
      } else {
        if (!scriptId && scriptName) {
          return this.get({siteId: siteId})
            .then(scripts => getByName(scripts, scriptName))
            .then(script => {
              return req.put(util.getScriptPath(basePath, siteId, script.id));
            });
        } else {
          return req.put(util.getScriptPath(basePath, siteId, scriptId));
        }
      }
    }
  };

  /**
   * Site Actions
   * @type {Object}
   */
  const actions = {
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
    get({siteId, siteName}) {
      var path;

      if (siteId) {
        path = `${basePath}/sites/${siteId}/sandbox/actions`;
      }

      if (!siteId && siteName) {
        return req.get(path).then(sites => {
          return util.getByName(sites, siteName);
        });
      } else {
        return req.get(path);
      }
    }
  };

  // exports
  return {
    get,
    scripts,
    actions
  };
};
