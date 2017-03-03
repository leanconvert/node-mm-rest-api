const auth = require('../lib/auth');
const request = require('superagent');
const config = require('../mock/superagent-mock-config');
const logger = (log) => console.log('superagent call', log);
var superagent = require('superagent-mock')(request, config);

describe('getTokenURL()', () => {
  it('Returns request URL to get access token', () => {
    const token = auth.getTokenURL('https://api-auth-eu.maxymiser.com');
    const expectedResult = 'https://api-auth-eu.maxymiser.com/oauth2/v1/tokens';

    expect(token).toEqual(expectedResult);
  });

  it('Removes trailing /', () => {
    const token = auth.getTokenURL('https://api-auth-eu.maxymiser.com//////////');
    const expectedResult = 'https://api-auth-eu.maxymiser.com/oauth2/v1/tokens';

    expect(token).toEqual(expectedResult);
  });
});

describe('getBasicToken()', () => {
  it('Returns basic token', () => {
    const token = auth.getBasicToken('clientId', 'clientSecret');
    const expectedResult = 'Y2xpZW50SWQ6Y2xpZW50U2VjcmV0';

    expect(token).toEqual(expectedResult);
  });
});

describe('getAccessToken()', () => {
  it('Returns Bearer Access Token', () => {
    const credentials = {
      clientId: 'clientId',
      clientSecret: 'clientSecret',
      username: 'username',
      password: 'password'
    };
    const expectedResult = 'eyJhbGciOiJSUzjFfb_FkJFoIdA';
    const promise = auth.getAccessToken('https://api-auth-eu.maxymiser.com', credentials);

    return promise.then(result => {
      expect(result).toBe(expectedResult);
    });
  });

  it('Returns `invalid_grant` error if the `username` or `password` is missing', () => {
    const credentials = {
      clientId: 'clientId',
      clientSecret: 'clientSecret'
    };
    const expectedResult = {
      error: 'invalid_grant',
      statusCode: 400,
      message: 'Invalid resource owner credentials'
    };
    const promise = auth.getAccessToken('https://api-auth-eu.maxymiser.com', credentials);

    return promise.catch(err => {
      expect(err).toEqual(expectedResult);
    });
  });
});
