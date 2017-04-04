const auth = require('../lib/auth');
const campaigns = require('../lib/campaigns');
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

describe('campaigns.get()', () => {
  it('returns all campaigns for the given site (by site ID)', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var c = campaigns(basePath, authorize);
    var expectedResult = [
      {
        "siteId": "MzIxMzM",
        "id":"MDA2MjYx",
        "name":"Homepage Banner",
        "createdAt":"2016-03-17T17:20:34.408430Z",
        "updatedAt":"2016-03-17T17:25:22.408430Z",
        "createdBy":"John Smith",
        "state":"Live"
      },
      {
        "siteId": "MzIxMzM",
        "id":"MDA2MzM3",
        "name":"Nav Color",
        "createdAt":"2016-02-19T17:20:34.408430Z",
        "updatedAt":"2016-03-14T17:25:22.408430Z",
        "createdBy":"Jason White",
        "state":"Implementing"
      }
    ];

    return c.get({siteId: 'MzIxMzM'})
      .then(campaigns => {
        expect(campaigns).toEqual(expectedResult);
      });
  });

  it('returns all campaigns for the given site (by site Name)', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var c = campaigns(basePath, authorize);
    var expectedResult = [
      {
        "siteId": "MzIxMzM",
        "id":"MDA2MjYx",
        "name":"Homepage Banner",
        "createdAt":"2016-03-17T17:20:34.408430Z",
        "updatedAt":"2016-03-17T17:25:22.408430Z",
        "createdBy":"John Smith",
        "state":"Live"
      },
      {
        "siteId": "MzIxMzM",
        "id":"MDA2MzM3",
        "name":"Nav Color",
        "createdAt":"2016-02-19T17:20:34.408430Z",
        "updatedAt":"2016-03-14T17:25:22.408430Z",
        "createdBy":"Jason White",
        "state":"Implementing"
      }
    ];

    return c.get({siteName: 'www.test.com'})
      .then(campaigns => {
        expect(campaigns).toEqual(expectedResult);
      });
  });

  it('creates campaign for given site (by ID/Name)', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var c = campaigns(basePath, authorize);
    var expectedResult = {
      "siteId": "MzIxMzM",
      "id":"MDA2MjYx",
      "name":"My campaign",
      "description":"",
      "createdAt":"2016-03-17T17:20:34.408430Z",
      "updatedAt":"2016-03-17T17:25:22.408430Z",
      "createdBy":"John Smith",
      "state":"Implementation"
    };

    return c.create({siteId: 'MzIxMzM', name: 'My campaign'})
      .then(campaign => {
        expect(campaign).toEqual(expectedResult);
      });
  });
});

describe('campaigns.elements.get()', () => {
  it('returns all campaign elements', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var c = campaigns(basePath, authorize);
    var expectedResult = [{
      "campaignId": "MDA2MjYx",
      "id": "MDMyMDU4",
      "name": "A_Header",
      "description": "",
      "elementId": ""
    }];

    return c.elements.get({siteId: 'MzIxMzM', campaignId: 'MDA2MjYx'})
      .then(elements => {
        expect(elements).toEqual(expectedResult);
      })
  });
});

describe('campaigns.elements.create()', () => {
  it('creates new element for the selected campaign (by site/campaign siteId/siteName)', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var c = campaigns(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDQ0",
      "name":"Element1",
      "description":"My element",
      "elementId":""
    };

    return c.elements.create({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      name: 'Element1',
      description: 'My element'
    }).then(elements => {
      expect(elements).toEqual(expectedResult);
    });
  });
});

describe('campaigns.actions.get()', () => {
  it('returns all campaign actions', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var c = campaigns(basePath, authorize);
    var expectedResult = [{
      "campaignId": "MDA2MjYx",
      "id":"NDMyNDMy",
      "name":"Action1",
      "description":"My first action",
      "type":"ClickCounts",
      "isPrimary":true
    }];

    return c.actions.get({siteId: 'MzIxMzM', campaignId: 'MDA2MjYx'})
      .then(actions => {
        expect(actions).toEqual(expectedResult);
      })
  });
});

describe('campaigns.actions.update()', () => {
  it('updates an action by ID for the selected campaign', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var c = campaigns(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDMy",
      "name":"Action1",
      "description":"My first action",
      "type":"ClickCounts",
      "isPrimary":false
    };

    return c.actions.update({
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
    var c = campaigns(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDMy",
      "name":"Action1",
      "description":"My first action",
      "type":"ClickCounts",
      "isPrimary":false
    };

    return c.actions.update({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      actionName: 'Action1',
      isPrimary: false
    }).then(actions => {
      expect(actions).toEqual(expectedResult);
    });
  });
});

describe('campaigns.scripts.get()', () => {
  it('returns all campaign scripts', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var c = campaigns(basePath, authorize);
    var expectedResult = [{
      "campaignId": "MDA2MjYx",
      "id":"NDMyNDMy",
      "name":"Script 1",
      "description":"My first script",
      "content":"var pageViews = visitor.getData( 'Page viewed' );\nconsole.log( 'Number of page views: ' + pageViews);"
    }];

    return c.scripts.get({siteId: 'MzIxMzM', campaignId: 'MDA2MjYx'})
      .then(scripts => {
        expect(scripts).toEqual(expectedResult);
      })
  });
});

describe('campaigns.scripts.create()', () => {
  it('creates new campaign script for the selected campaign', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var c = campaigns(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDQ0",
      "name":"Rendering",
      "description": "",
      "content":"console.log( 'test' );"
    };

    return c.scripts.create({
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
    var c = campaigns(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDMy",
      "name":"Script 1",
      "description": "My first script",
      "content":"console.log( 'test' );"
    };

    return c.scripts.update({
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
    var c = campaigns(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDMy",
      "name":"Script 1",
      "description": "My first script",
      "content":"console.log( 'test' );"
    };

    return c.scripts.update({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      scriptName: 'Script 1',
      description: "My first script"
    }).then(script => {
      expect(script).toEqual(expectedResult);
    });
  });
});
