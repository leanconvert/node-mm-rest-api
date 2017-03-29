const superagent = require('superagent');

module.exports = (basePath, authorize) => {
  /**
   * Get all available campaigns for the given site
   * @return {Promise}
   */
  const getAll = (siteId) => {
    return authorize()
      .then(token => {
        return new Promise((resolve, reject) => {
          superagent
            .get(`${basePath}/sites/${siteId}/sandbox/campaigns`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res.body.items);
              }
            });
        });
      });
  };

  /**
   * Get campaign by name
   * @param  {string} name
   * @return {Promise}
   */
  const getByName = (name) => {
    return getAll()
            .then(campaigns => campaigns.filter((campaign) => site.name === name)[0]);
  }

  const getElements = (siteId, campaignId) => {

  }

  return {
    getAll,
    getByName
  };
}
