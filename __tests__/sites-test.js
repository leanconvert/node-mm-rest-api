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
