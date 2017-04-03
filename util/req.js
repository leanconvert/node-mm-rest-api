const superagent = require('superagent');

module.exports = (authorize) => {
  const get = (path) => {
    return authorize()
      .then(token => {
        return new Promise((resolve, reject) => {
          superagent
            .get(path)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              if (err) {
                reject(err);
              } else {
                res.body.items ? resolve(res.body.items) : resolve(res.body);
              }
            });
        });
      });
  };

  const put = (path, data) => {
    return authorize()
      .then(token => {
        return new Promise((resolve, reject) => {
          superagent
            .put(path)
            .send(data)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res.body);
              }
            });
        });
      });
  }

  return {
    get,
    put
  }
}
