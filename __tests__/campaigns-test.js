const auth = require('../lib/auth');
const campaigns = require('../lib/campaigns');
const request = require('superagent');
const config = require('../mock/superagent-mock');
var superagent = require('superagent-mock')(request, config);

describe('campaigns.getAll()', () => {
  it('lists meta info of all available campaigns', () => {
    var authPath = 'https://api-auth-eu.maxymiser.com';
    var basePath = 'https://api-eu.maxymiser.com/v1';
    var credentials = {
      clientId: 'clientId',
      clientSecret: 'clientSecret',
      username: 'username',
      password: 'password'
    };
    var authorize = auth.authorize(token, authPath, credentials);
    var c = campaigns(basePath, authorize);
    var expectedResult = [{
      'id': 'MDA4ODUx',
      'name': 'T4_SG_Header_CTA',
      'createdAt': '2014-06-20T07:45:15.0000000Z',
      'updatedAt': '2016-04-19T11:18:45.0000000Z',
      'createdBy': 'Maxymiser Team',
      'state': 'Completed'
    }];
    var token;

    return c.getAll('M123ODUx')
      .then(campaigns => {
        expect(campaigns).toEqual(expectedResult);
      });
  });
});
