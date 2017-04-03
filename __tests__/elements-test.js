const auth = require('../lib/auth');
const elements = require('../lib/elements');
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

describe('elements.get()', () => {
  it('returns all campaign elements', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var e = elements(basePath, authorize);
    var expectedResult = [{
      "siteId": "MzIxMzM",
      "campaignId": "MDA2MjYx",
      "id": "MDMyMDU4",
      "name": "A_Header",
      "description": "",
      "elementId": ""
    }];

    return e.get({siteId: 'MzIxMzM', campaignId: 'MDA2MjYx'})
      .then(elements => {
        expect(elements).toEqual(expectedResult);
      })
  });
});
