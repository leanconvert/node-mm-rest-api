const auth = require('../lib/auth');
const scripts = require('../lib/site-scripts');
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

describe('sites.get()', () => {
  it('returns all site scripts by site ID', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = scripts(basePath, authorize);
    var expectedResult = [{
        id: "NDMyNDMy",
        name: "Script 1",
        description: "My first script",
        apiVersion: "CD API v.1.8",
        content: "var pageViews = visitor.getData( 'Page viewed' );\nconsole.log( 'Number of page views: ' + pageViews);"
      }, {
        id: "NDMyNDQ0",
        name: "Script 2",
        apiVersion: "mmcore",
        description: "My second script",
        content: "console.log( 'test' );"
      }
    ];

    return s.get({siteId: 'MzIxMzM'})
      .then(scripts => {
        expect(scripts).toEqual(expectedResult);
      });
  });

  it('returns all site scripts by site Name', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = scripts(basePath, authorize);
    var expectedResult = [{
        id: "NDMyNDMy",
        name: "Script 1",
        description: "My first script",
        apiVersion: "CD API v.1.8",
        content: "var pageViews = visitor.getData( 'Page viewed' );\nconsole.log( 'Number of page views: ' + pageViews);"
      }, {
        id: "NDMyNDQ0",
        name: "Script 2",
        apiVersion: "mmcore",
        description: "My second script",
        content: "console.log( 'test' );"
      }
    ];

    return s.get({siteName: 'www.test.com'})
      .then(scripts => {
        expect(scripts).toEqual(expectedResult);
      });
  });

  it('updates selected site script (by IDs)', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = scripts(basePath, authorize);
    var expectedResult = {
      'id': "MzIxMzM",
      'name': "Script 1",
      'description': "My first script",
      'apiVersion': "CD API v.1.8",
      'content': "console.log(123)"
    };

    return s.update(
      { siteId: 'MzIxMzM', scriptId: 'NDMyNDMy', content: 'console.log(123)' }
    ).then(script => {
      expect(script).toEqual(expectedResult);
    });
  });

  it('updates selected site script (by Names)', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = scripts(basePath, authorize);
    var expectedResult = {
      'id': "MzIxMzM",
      'name': "Script 1",
      'description': "My first script",
      'apiVersion': "CD API v.1.8",
      'content': "console.log(123)"
    };

    return s.update(
      { siteName: 'www.test.com', scriptName: 'Script 1', content: 'console.log(123)' }
    ).then(script => {
      expect(script).toEqual(expectedResult);
    });
  });
});
