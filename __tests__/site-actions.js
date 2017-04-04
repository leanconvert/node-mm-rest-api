const auth = require('../lib/auth');
const actions = require('../lib/site-actions');
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

describe('a.get()', () => {
  it('returns all site actions by site ID', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var a = actions(basePath, authorize);
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
      },
      {
        'id': 'NDQ0NDMy',
        'name': 'Action3',
        'description': 'My third action',
        'type': 'Sales_Amount',
        'currency': 'GBP',
        'multiplier': 1
      }
    ];

    return a.get({siteId: 'MzIxMzM'})
      .then(actions => {
        expect(actions).toEqual(expectedResult);
      });
  });

  it('returns all site actions by site Name', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var a = actions(basePath, authorize);
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
      },
      {
        'id': 'NDQ0NDMy',
        'name': 'Action3',
        'description': 'My third action',
        'type': 'Sales_Amount',
        'currency': 'GBP',
        'multiplier': 1
      }
    ];

    return a.get({siteName: 'www.test.com'})
      .then(actions => {
        expect(actions).toEqual(expectedResult);
      });
  });
});
