const auth = require('../lib/auth');
const variants = require('../lib/variants');
const request = require('superagent');
const config = require('../mock/superagent-mock');
var superagent = require('superagent-mock')(request, config);

var authPath = 'https://api-auth-eu.maxymiser.com';
var basePath = 'https://api-eu.maxymiser.com/v1';
var credentials = {
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  username: 'username',
  password: 'password'
};
var token;

describe('campaigns.scripts.get()', () => {
  it('returns all campaign scripts', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var v = variants(basePath, authorize);
    var expectedResult = [
      {
        "id":"NDMyNDMy",
        "name":"Default",
        "isDefault":true,
        "isControl":true,
        "weight":100
      },
      {
        "id":"NDMyNDQ0",
        "name":"Variant2",
        "content":"<span>Search</search>",
        "isDefault":false,
        "isControl":true,
        "weight":100
      }
    ];

    return v.get({siteId: 'MzIxMzM', campaignId: 'MDA2MjYx', elementId: 'MDMyMDU4'})
      .then(variants => {
        expect(variants).toEqual(expectedResult);
      })
  });
});
