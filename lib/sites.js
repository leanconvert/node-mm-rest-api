const superagent = require('superagent');

module.exports = (basePath, authorize) => {
  /**
   * Get all available sites
   * @return {Promise}
   */
  const getAll = () => {
    return authorize()
      .then(token => {
        return new Promise((resolve, reject) => {
          superagent
            .get(`${basePath}/sites`)
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
   * Get site by name
   * @param  {string} name
   * @return {Promise}
   */
  const getByName = (name) => {
    return getAll()
            .then(sites => sites.filter((site) => site.name === name)[0]);
  }

  return {
    getAll,
    getByName
  };
}
