const superagent = require('superagent');
const btoa = require('btoa');

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
 * Get access token
 * @param  {Object} credentials clientId, clientSecret, username, password
 * @return {Promise}
 */
const getAccessToken = (credentials) => {
  const basicAuthToken = getBasicToken(credentials.clientId, credentials.clientSecret);

  return new Promise((resolve, reject) => {
    superagent
      .get('https://api-auth-eu.maxymiser.com/oauth2/v1/tokens')
      .set('Authorization', `Basic ${basicAuthToken}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        grant_type: 'password',
        username: credentials.username,
        password: credentials.password
      })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(res.text).access_token);
        }
      });
  });
};

/**
 * MMRestApi Object
 * @param {Object} credentials
 * @return {Object} MmRestApi
 */
function MMRestApi(credentials) {
  const BASE_URL = 'https://api-eu.maxymiser.com';
  const accessTokenPromise = getAccessToken(credentials);

  return {
    /**
     * Get all available sites for the account
     * @return {Promise}
     */
    getAllSites() {
      return accessTokenPromise.then(token => {
        return new Promise((resolve, reject) => {
          superagent
            .get(`${BASE_URL}/v1/sites`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(JSON.parse(res.text).items);
                // [{
                //   "id": "MDAwNjU0",
                //   "name": "beatya.com"
                // }, {
                //   "id": "MDAwNjU2",
                //   "name": "gametwist.de"
                // }]
              }
            });
        });
      });
    },

    /**
     * Get site ID by site name
     * @param  {string} name
     * @return {string}
     */
    getSiteIdByName(name) {
      return getAllSites()
        .then(sites => sites.filter((site) => site.name === name)[0]);
    },

    /**
     * Get site by ID
     * @param  {string} siteId
     * @return {Promise}
     */
    getSite(siteName) {
      const siteId = getSiteIdByName(siteName);

      return accessTokenPromise.then(token => {
        return new Promise((resolve, reject) => {
          superagent
            .get(`${BASE_URL}/v1/sites/${siteId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(JSON.parse(res.text));
                // {
                //   "id": "MDAwNjU3",
                //   "name": "stargames.com",
                //   "lastIterationPublishDate": "2017-02-13T10:32:28.0000000Z",
                //   "lastIterationPublishHash": "LgK4w_RWUHeClDakSoE7tvjZk_M"
                // }
              }
        });
      });
    },

    /**
     * Get all campaigns
     * @param  {string} siteId
     * @return {Promise}
     */
    getAllCampaigns(siteId) {
      return accessTokenPromise.then(token => {
        return new Promise((resolve, reject) => {
          superagent
            .get(`${BASE_URL}/v1/sites/${siteId}/sandbox/campaigns`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(JSON.parse(res.text));
                // [{
                //   "id": "MDA4ODUx",
                //   "name": "T4_SG_Header_CTA",
                //   "createdAt": "2014-06-20T07:45:15.0000000Z",
                //   "updatedAt": "2016-04-19T11:18:45.0000000Z",
                //   "createdBy": "Maxymiser Team",
                //   "state": "Completed"
                // },
                // {
                //   "id": "MDE0Mjk0",
                //   "name": "M2_SG_Multi_Monitoring",
                //   "createdAt": "2015-02-27T09:44:18.0000000Z",
                //   "updatedAt": "2016-04-19T11:26:10.0000000Z",
                //   "createdBy": "Maxymiser Team",
                //   "state": "Completed"
                // }]
              }
        });
      });
    },

    /**
     * Get campaign ID by its name
     * @param  {string} name
     * @return {string}
     */
    getCampaignIdByName(name) {
      return getAllCampaigns
        .then(campaigns => (
          campaigns.filter((campaign) => campaign.name === name)[0]
        );
    },

    /**
     * Get campaign by
     * @param  {[type]} siteName     [description]
     * @param  {[type]} campaignName [description]
     * @return {[type]}              [description]
     */
    getCampaign(siteName, campaignName) {
      const siteId = getSiteIdByName(siteName);
      const campaignId = getCampaignIdByName(campaignName);

      return accessTokenPromise.then(token => {
        return new Promise((resolve, reject) => {
          superagent
            .get(`${BASE_URL}/v1/sites/${siteId}/sandbox/campaigns/${campaignId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(JSON.parse(res.text));
                // {
                //   "id": "MDA4ODUx",
                //   "name": "T4_SG_Header_CTA",
                //   "description": "",
                //   "createdAt": "2014-06-20T07:45:15.0000000Z",
                //   "updatedAt": "2016-04-19T11:18:45.0000000Z",
                //   "createdBy": "Maxymiser Team",
                //   "state": "Completed"
                // }
              }
        });
      });
    }
  }
}
