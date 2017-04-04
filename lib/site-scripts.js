module.exports = (basePath, authorize) => {
  const superagent = require('superagent');
  const req = require('../util/req')(authorize);
  const util = require('../util/util');
  const sites = require('./sites.js')(basePath, authorize);

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
  const get = ({siteId, siteName}) => {
    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!siteId && siteName) {
      return sites.get({siteName})
        .then(site => {
          return req.get(util.getScriptPath(basePath, site.id, ''));
        });
    } else {
      return req.get(util.getScriptPath(basePath, siteId, ''));
    }
  };

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
  const update = (options) => {
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
      return sites.get({siteName})
        .then(site => {
          if (!scriptId && scriptName) {
            return get({siteId: site.id})
              .then(scripts => util.getByName(scripts, scriptName))
              .then(script => {
                return req.put(util.getScriptPath(basePath, site.id, script.id), updatedData);
              });
          } else {
            return req.put(util.getScriptPath(basePath, site.id, scriptId), updatedData);
          }
        });
    } else {
      if (!scriptId && scriptName) {
        return get({siteId: siteId})
          .then(scripts => util.getByName(scripts, scriptName))
          .then(script => {
            return req.put(util.getScriptPath(basePath, siteId, script.id), updatedData);
          });
      } else {
        return req.put(util.getScriptPath(basePath, siteId, scriptId), updatedData);
      }
    }
  };

  return {
    get,
    update
  }
}
