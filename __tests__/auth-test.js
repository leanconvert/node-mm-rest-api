const auth = require('../lib/auth');

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
  it('Returns Promise', () => {
    const credentials = {
      clientId: 'clientId',
      clientSecret: 'clientSecret',
      username: 'username',
      password: 'password'
    };

    const promise = auth.getAccessToken('https://api-auth-eu.maxymiser.com', credentials);

    // promise
      // .then(result => {
      //   console.log(result);
      //   // expect(result).toEqual('Response goes here...');
      // })
      // .catch(err => {
      //   console.log(err)
      // });
  });
});
