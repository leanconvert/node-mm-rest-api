const responses = {
  ['/oauth2/v1/tokens'](data) {
    const params = data.params || {};
    const headers = data.headers || {};

    // Success
    // -------
    if (params &&
        (params.username === 'username' ||
        params.password === 'password') &&
        params.grant_type === 'password' &&
        headers['Authorization'] === 'Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0' &&
        headers['Content-Type'] === 'application/x-www-form-urlencoded') {

      return {
        body: {
          access_token: 'eyJhbGciOiJSUzjFfb_FkJFoIdA'
        }
      };
    }


    // Errors
    // -----
    if (headers['Authorization'] !== 'Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0') {
      return {
        body: {
          error: 'invalid_client',
          statusCode: 400,
          error_description: 'Missing or incomplete Authorisation header'
        }
      }
    }

    if (headers['Content-Type'] !== 'application/x-www-form-urlencoded' ||
      params.grant_type !== 'password') {
        return {
          body: {
            error: 'invalid_request',
            statusCode: 400,
            error_description: 'Missing grant type'
          }
        }
    }

    if (params.username !== 'username' ||
      params.password !== 'password') {
        return {
          body: {
            error: 'invalid_grant',
            statusCode: 400,
            error_description: 'Invalid resource owner credentials'
          }
        }
    }
  },

  ['/sites'](data) {
    if (data && data.id) {
      return {
        body: {
          id: 'MzIxMzM',
          name: 'www.test.com',
          lastIterationPublishDate: '2017-02-13T10:32:28.0000000Z',
          lastIterationPublishHash: 'LgK4w_RWUHeClDakSoE7tvjZk_M'
        }
      }
    }

    return {
      body: {
        items: [{
          id: 'MzIxMzM',
          name: 'www.test.com'
        }, {
          id: 'MzIxMzI=',
          name: 'm.test.com'
        }]
      }
    };
  },

  ['/sites/scripts']() {
    return {
      body: {
        items: [
          {
            id: "NDMyNDMy",
            name: "Script 1",
            description: "My first script",
            apiVersion: "CD API v.1.8",
            content: "var pageViews = visitor.getData( 'Page viewed' );\nconsole.log( 'Number of page views: ' + pageViews);"
          },
          {
            id: "NDMyNDQ0",
            name: "Script 2",
            apiVersion: "mmcore",
            description: "My second script",
            content: "console.log( 'test' );"
          }
        ]
      }
    }
  },

  ['/sites/scripts/:id']() {
    return {
      body: {
        'id': "MzIxMzM",
        'name': "Script 1",
        'description': "My first script",
        'apiVersion': "CD API v.1.8",
        'content': "console.log(123)"
      }
    }
  },

  ['/sites/actions']() {
    return {
      body: {
        items: [
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
        ]
      }
    }
  }
};

module.exports = [{
  /**
   * regular expression of auth URL
   */
  pattern: '(.*)',

  /**
   * returns the data
   *
   * @param match array Result of the resolution of the regular expression
   * @param params object sent by 'send' function
   * @param headers object set by 'set' function
   * @param context object the context of running the fixtures function
   */
  fixtures: function (match, params, headers, context) {
    if (match[1] === 'https://api-auth-eu.maxymiser.com/oauth2/v1/tokens') {
      return {
        params: params,
        headers: headers
      }
    }
  },

  /**
   * returns the result of the GET request
   *
   * @param match array Result of the resolution of the regular expression
   * @param data  mixed Data returns by `fixtures` attribute
   */
  get: function (match, data) {
    const path = (match[1] || '').replace('https://api-eu.maxymiser.com/v1/', '');

    if (path === 'sites') {
      return responses['/sites']();
    }

    if (path === 'sites/MzIxMzM') {
      return responses['/sites']({id: 'MzIxMzM'});
    }

    if (path === 'sites/MzIxMzM/sandbox/scripts/') {
      return responses['/sites/scripts']();
    }

    if (path === 'sites/MzIxMzM/sandbox/actions') {
      return responses['/sites/actions']();
    }
  },

  /**
   * returns the result of the POST request
   *
   * @param match array Result of the resolution of the regular expression
   * @param data  mixed Data returns by `fixtures` attribute
   */
  post: function (match, data) {
    const path = match[1] || '';

    switch (path) {
      case 'https://api-auth-eu.maxymiser.com/oauth2/v1/tokens':
        return responses['/oauth2/v1/tokens'](data);
    }
  },

  put: function (match, data) {
    const path = match[1] || '';

    switch (path) {
      case 'https://api-eu.maxymiser.com/v1/sites/MzIxMzM/sandbox/scripts/NDMyNDMy':
        return responses['/sites/scripts/:id']();
    }
  }
}];

