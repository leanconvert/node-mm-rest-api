const auth = require('../lib/auth');
const sites = require('../lib/sites');
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

describe('sites.get()', () => {
  it('returns all available account sites if no arguments provided', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = sites(basePath, authorize);
    var expectedResult = [
      { id: 'MzIxMzM', name: 'www.test.com' },
      { id: 'MzIxMzI=', name: 'm.test.com' }
    ];

    return s.get()
      .then(sites => {
        expect(sites).toEqual(expectedResult);
      })
  });

  it('returns site by ID', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = sites(basePath, authorize);
    var expectedResult = {
      id: 'MzIxMzM',
      name: 'www.test.com',
      lastIterationPublishDate: '2017-02-13T10:32:28.0000000Z',
      lastIterationPublishHash: 'LgK4w_RWUHeClDakSoE7tvjZk_M'
    };

    return s.get({siteId: 'MzIxMzM'})
      .then(site => {
        expect(site).toEqual(expectedResult);
      })
  });

  it('returns site by name', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = sites(basePath, authorize);
    var expectedResult = {
      id: 'MzIxMzM',
      name: 'www.test.com'
    };

    return s.get({siteName: 'www.test.com'})
      .then(site => {
        expect(site).toEqual(expectedResult);
      })
  });

  it('returns site by ID if ID and Name are both provided', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = sites(basePath, authorize);
    var expectedResult = {
      id: 'MzIxMzM',
      name: 'www.test.com',
      lastIterationPublishDate: '2017-02-13T10:32:28.0000000Z',
      lastIterationPublishHash: 'LgK4w_RWUHeClDakSoE7tvjZk_M'
    };

    return s.get({siteId: 'MzIxMzM', siteName: 'www.test.com'})
      .then(site => {
        expect(site).toEqual(expectedResult);
      })
  });
});

describe('sites.scripts.get()', () => {
  it('returns all site scripts by site ID', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = sites(basePath, authorize);
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

    return s.scripts.get({siteId: 'MzIxMzM'})
      .then(scripts => {
        expect(scripts).toEqual(expectedResult);
      });
  });

  it('returns all site scripts by site Name', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = sites(basePath, authorize);
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

    return s.scripts.get({siteName: 'www.test.com'})
      .then(scripts => {
        expect(scripts).toEqual(expectedResult);
      });
  });
});

describe('sites.actions.get()', () => {
  it('returns all site actions by site ID', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = sites(basePath, authorize);
    var expectedResult = [
      {
        'id': 'NDMyNDMy',
        'name': 'Action1',
        'description': 'My first action',
        'type': 'Click_through'
      },
      {
        'id': 'NDMyNDQ0',
        'name': 'Action2',
        'description': 'My second action',
        'type': 'Page_Impressions'
      }
    ];

    return s.actions.get({siteId: 'MzIxMzM'})
      .then(actions => {
        expect(actions).toEqual(expectedResult);
      });
  });

  it('returns all site actions by site Name', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var s = sites(basePath, authorize);
    var expectedResult = [
      {
        'id': 'NDMyNDMy',
        'name': 'Action1',
        'description': 'My first action',
        'type': 'Click_through'
      },
      {
        'id': 'NDMyNDQ0',
        'name': 'Action2',
        'description': 'My second action',
        'type': 'Page_Impressions'
      }
    ];

    return s.actions.get({siteName: 'www.test.com'})
      .then(actions => {
        expect(actions).toEqual(expectedResult);
      });
  });
});
