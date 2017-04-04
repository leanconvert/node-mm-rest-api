const auth = require('../lib/auth');
const scripts = require('../lib/campaign-scripts');
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
    var s = scripts(basePath, authorize);
    var expectedResult = [{
      "campaignId": "MDA2MjYx",
      "id":"NDMyNDMy",
      "name":"Script 1",
      "description":"My first script",
      "content":"var pageViews = visitor.getData( 'Page viewed' );\nconsole.log( 'Number of page views: ' + pageViews);"
    }];

    return s.get({siteId: 'MzIxMzM', campaignId: 'MDA2MjYx'})
      .then(scripts => {
        expect(scripts).toEqual(expectedResult);
      })
  });
});

describe('campaigns.scripts.create()', () => {
  it('creates new campaign script for the selected campaign', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = scripts(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDQ0",
      "name":"Rendering",
      "description": "",
      "content":"console.log( 'test' );"
    };

    return s.create({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      name: 'Rendering',
      content: "console.log( 'test' );"
    }).then(scripts => {
      expect(scripts).toEqual(expectedResult);
    });
  });
});

describe('campaigns.scripts.update()', () => {
  it('updates campaign script by ID for the selected campaign', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = scripts(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDMy",
      "name":"Script 1",
      "description": "My first script",
      "content":"console.log( 'test' );"
    };

    return s.update({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      scriptId: 'NDMyNDMy',
      description: "My first script"
    }).then(script => {
      expect(script).toEqual(expectedResult);
    });
  });

  it('updates campaign script by Name for the selected campaign', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = scripts(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDMy",
      "name":"Script 1",
      "description": "My first script",
      "content":"console.log( 'test' );"
    };

    return s.update({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      scriptName: 'Script 1',
      description: "My first script"
    }).then(script => {
      expect(script).toEqual(expectedResult);
    });
  });
});
