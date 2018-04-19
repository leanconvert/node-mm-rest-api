/**
 * | Related documentation:
 * | http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/OAuth2.html
 */
const superagent = require('superagent');
const btoa = require('btoa');
const TOKEN_LIFETIME = 55 * 60 * 1000;

let token = {
  promise: new Promise((res, rej) => {}),
  releaseTime: new Date()
};

let releaseTime;

/**
 * Get request URL for getting the token
 * @param  {String} envHost   URL of the host environment (e.g. 'https://api-auth-eu.maxymiser.com')
 * @return {String}
 */
const getTokenURL = (envHost) => {
  return `${envHost}/tokens`
                .replace(/\/+/g, '/')
                .replace('https:/', 'https://');
};

/**
 * Get Basic Authorization token
 * @param  {string} clientId
 * @param  {string} clientSecret
 * @return {string}              Base64 encoded string
 */
const getBasicToken = (clientId, clientSecret) => {
  return btoa(`${clientId}:${clientSecret}`);
}

/**
 * Get access token based on the credentials:
 *

 *
 * @param {string} envHost        URL of the host environment (e.g. 'https://api-auth-eu.maxymiser.com')
 * @param  {Object} credentials
 *   1. clientId - obtained from the Maxymiser UI
 *   2. clientSecret - obtained from the Maxymiser UI
 *   3. username - Maxymiser UI username
 *   4. password - Maxymiser UI password
 * @return {Promise}
 */
const getAccessToken = (envHost, credentials) => {
  const TOKEN_URL = getTokenURL(envHost);
  const CONTENT_TYPE = 'application/x-www-form-urlencoded';
  const basicAuthToken = getBasicToken(credentials.clientId, credentials.clientSecret);
  const BASIC_AUTH_TOKEN = `Basic ${basicAuthToken}`;
  const GRANT_TYPE = 'password';



  return new Promise((resolve, reject) => {
    return superagent
      .post(TOKEN_URL)
      .set('Authorization', BASIC_AUTH_TOKEN)
      .set('Content-Type', CONTENT_TYPE)
      .send({
        grant_type: GRANT_TYPE,
        username: credentials.username,
        password: credentials.password
      })
      .end((err, res) => {
        const body = res.body;

        if (body.error) {
          reject({
            error: body.error,
            statusCode: body.statusCode,
            message: body.error_description
          });
        } else {
          try {
            resolve(body.access_token);
          } catch(err) {
            reject({
              message: err
            });
          }
        }
      });
  });
};

/**
 * Authorize user
 * @param  {undefined} token Variable to be used in closure
 * @return {[type]}       [description]
 */

/**
 * Authorize user
 * @param  {undefined} token    Variable to be used in closure
 * @param  {string} basePath
 * @param  {object} credentials
 * @return {function/Promise}
 */
const authorize = (basePath, credentials) => {
  token.releaseTime = new Date();
  token.promise = getAccessToken(basePath, credentials)
    .catch(() => {
      // Auth failed by some reason. Raise Exception or request token one more time?
      token.promise = getAccessToken(basePath, credentials);

      return token.promise;
    });

  return function () {
    let isExpired = (new Date() - token.releaseTime) > TOKEN_LIFETIME;

    if (isExpired) {
      token.releaseTime = new Date();
      token.promise = getAccessToken(basePath, credentials);
    }

    return token.promise;
  }
};

module.exports = {
  getTokenURL,
  getBasicToken,
  getAccessToken,
  authorize
};
