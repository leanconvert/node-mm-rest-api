const auth = require('../lib/auth');
const actions = require('../lib/campaign-actions');
const request = require('superagent');
const config = require('../mock/superagent-mock');
var superagent = require('superagent-mock')(request, config);

var authPath = 'https://api-auth-eu.maxymiser.com/oauth2/v1';
var basePath = 'https://api-eu.maxymiser.com/v1';
var credentials = {
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  username: 'username',
  password: 'password'
};
var token;

describe('campaigns.actions.get()', () => {
  it('returns all campaign actions', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var a = actions(basePath, authorize);
    var expectedResult = [{
      "campaignId": "MDA2MjYx",
      "id":"NDMyNDMy",
      "name":"Action1",
      "description":"My first action",
      "type":"ClickCounts",
      "isPrimary":true
    }];

    return a.get({siteId: 'MzIxMzM', campaignId: 'MDA2MjYx'})
      .then(actions => {
        expect(actions).toEqual(expectedResult);
      })
  });
});

describe('campaigns.actions.update()', () => {
  it('updates an action by ID for the selected campaign', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var a = actions(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDMy",
      "name":"Action1",
      "description":"My first action",
      "type":"ClickCounts",
      "isPrimary":false
    };

    return a.update({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      actionId: 'NDMyNDMy',
      isPrimary: false
    }).then(actions => {
      expect(actions).toEqual(expectedResult);
    });
  });

  it('updates an action by Name for the selected campaign', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var a = actions(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDMy",
      "name":"Action1",
      "description":"My first action",
      "type":"ClickCounts",
      "isPrimary":false
    };

    return a.update({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      actionName: 'Action1',
      isPrimary: false
    }).then(actions => {
      expect(actions).toEqual(expectedResult);
    });
  });
});
