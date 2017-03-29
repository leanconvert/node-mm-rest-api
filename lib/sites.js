const superagent = require('superagent');

module.exports = (basePath, authorize) => {
  return {
    getAll() {
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
        })
    }
  };
}
