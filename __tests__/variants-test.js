const auth = require('../lib/auth');
const variants = require('../lib/variants');
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

describe('campaigns.variants.get()', () => {
  it('returns all variants', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var v = variants(basePath, authorize);
    var expectedResult = [
      {
        siteId: 'MzIxMzM',
        campaignId: 'MDA2MjYx',
        elementId: 'MDMyMDU4',
        "id":"NDMyNDMy",
        "name":"Default",
        "isDefault":true,
        "isControl":true,
        "weight":100
      },
      {
        siteId: 'MzIxMzM',
        campaignId: 'MDA2MjYx',
        elementId: 'MDMyMDU4',
        "id":"NDMyNDQ0",
        "name":"Variant2",
        "content":"<span>Search</search>",
        "isDefault":false,
        "isControl":true,
        "weight":100
      }
    ];

    return v.get({siteId: 'MzIxMzM', campaignId: 'MDA2MjYx', elementId: 'MDMyMDU4'})
      .then(variants => {
        expect(variants).toEqual(expectedResult);
      })
  });
});

describe('campaigns.variants.create()', () => {
  it('creates new variant for the selected element', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var v = variants(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDQ0",
      "name":"Variant2",
      "content":"<span>Search</search>",
      "isDefault":false,
      "isControl":true,
      "weight":100
    };

    return v.create({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      elementId: 'MDMyMDU4',
      name: 'Variant2',
      content: "<span>Search</search>",
      "isDefault":false,
      "isControl":true,
      "weight":100
    }).then(scripts => {
      expect(scripts).toEqual(expectedResult);
    });
  });
});

describe('campaigns.variants.update()', () => {
  it('updates variant by ID for the selected campaign', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var v = variants(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDQ0",
      "name":"Variant2",
      "content":"<span>Search</search>",
      "isDefault":false,
      "isControl":true,
      "weight":100
    };

    return v.update({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      elementId: 'MDMyMDU4',
      variantId: 'NDMyNDQ0',
      name: 'Variant2',
      content: "<span>Search</search>"
    }).then(variant => {
      expect(variant).toEqual(expectedResult);
    });
  });

  it('updates campaign script by Name for the selected campaign', () => {
    var authorize = auth.authorize(token, authPath, credentials);
    var v = variants(basePath, authorize);
    var expectedResult = {
      "id":"NDMyNDQ0",
      "name":"Variant2",
      "content":"<span>Search</search>",
      "isDefault":false,
      "isControl":true,
      "weight":100
    };

    return v.update({
      siteId: 'MzIxMzM',
      campaignId: 'MDA2MjYx',
      elementId: 'MDMyMDU4',
      variantName: 'Variant2',
      content: "<span>Search</search>"
    }).then(variant => {
      expect(variant).toEqual(expectedResult);
    });
  });
});
