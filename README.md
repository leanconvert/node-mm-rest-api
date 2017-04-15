# node-mm-rest-api

Node.js wrapper for the [Oracle Maxymiser REST API](http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/index.html).

# Table Of Contents

+ [Install](#install)
+ [Instantiate](#instantiate)
+ [Site Settings](#site-settings)
    + [Read Sites](#read-sites)
    + [Read Scripts](#read-scripts)
    + [Update Script](#update-script)
    + [Read Actions](#read-actions)
+ [Campaign Settings](#campaign-settings)
    + [Read Campaigns](#read-campaigns)
    + [Create Campaign](#create-element)
    + [Read Elements](#read-elements)
    + [Create Element](#create-element)
    + [Read Variants](#read-variants)
    + [Create Variant](#create-variant)
    + [Update Variant](#update-variant)
    + [Read Scripts](#read-scripts)
    + [Create Script](#create-script)
    + [Update Script](#update-script)
    + [Read Actions](#read-actions)
    + [Update Action](#update-action)
+ [Publishing](#publishing)

# Install

SSH:

```
npm i git+https://git@github.com/leanconvert/node-mm-rest-api.git --save
```

HTTPS:

```
npm i git+ssh://git@github.com/leanconvert/node-mm-rest-api.git --save
```

# Instantiate

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/OAuth2.html

```javascript
const MMRestApi = require('node-mm-rest-api');
const api = MMRestApi({
  // default values:
  // authHost: 'https://api-auth-eu.maxymiser.com/oauth2',
  // host: 'https://api-eu.maxymiser.com',
  // apiVersion: 1,
  credentials: {
    clientId: '<clientId>',
    clientSecret: '<clientSecret>',
    username: '<login for UI>',
    password: '<password for UI>'
  }
});
```

# Site Settings

> [http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/api-Site%20Settings.html](http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/api-Site%20Settings.html)

## Read Sites

> [http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-get.html](http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-get.html)

### Get all sites

```javascript
api.sites.get()
  .then(sites => {
    console.log(sites);
  });
```

### Get site by ID

```javascript
api.sites.get({siteId: 'MzIxMzM'})
  .then(site => {
    console.log(site);
  });
```

### Get site by Name

```javascript
api.sites.get({siteName: 'test.com'})
  .then(site => {
    console.log(site);
  });
```

## Read Scripts

> [http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-%7Bconfiguration%7D-scripts-get.html](http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-%7Bconfiguration%7D-scripts-get.html)

### Get all scripts by Site ID

```javascript
api.sites.scripts.get({siteId: 'MzIxMzM'})
  .then(scripts => {
    console.log(scripts);
  });
```

### Get all scripts by Site Name

```javascript
api.sites.scripts.get({siteName: 'test.com'})
  .then(scripts => {
    console.log(scripts);
  });
```

## Update Script

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-scripts-%7Bscript-id%7D-put.html

### Update Script by Name

```javascript
api.sites.scripts.update({
  siteId: 'MzIxMzM',
  // siteName: 'test.com',
  scriptName: 'renderer'
})
.then(result => {
  console.log(result);
});

api.publish({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
});
```

### Update Script by ID

```javascript
api.sites.scripts.update({
  siteId: 'MzIxMzM',
  // siteName: 'test.com',
  scriptId: 'Mzas3zM'
})
.then(result => {
  console.log(result);
});

api.publish({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
});
```

## Read Actions

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-elements-%7Belement-id%7D-variants-%7Bvariant-id%7D-put.html

### Read all actions

```javascript
api.sites.actions.update({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
})
.then(actions => {
  console.log(actions);
});

api.publish({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
});
```

# Campaign Settings

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/api-Campaign%20Settings.html

## Read Campaigns

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-get.html

```javascript
api.campaigns.get({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
}).then(campaigns => {
  console.log(campaigns);
})
```

## Create Campaign

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-post.html

```javascript
api.campaigns.create({
  siteId: 'MzIxMzM',
  // siteName: 'test.com',
  name: 'My campaign',
  desciption: ''
}).then(result => {
  console.log(result);
});

api.publish({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
});
```

## Read Elements

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-elements-get.html

```javascript
api.campaigns.elements.get({
  siteName: 'test.com',
  // siteId: 'MzIxMzM',
  campaignName: 'a31-test',
  // campaignId: 'MzIsdfMzM',
}).then(elements => {
  console.log(elements);
})
```

## Create Element

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-elements-post.html

```javascript
api.campaigns.elements.create({
  siteName: 'test.com',
  // siteId: 'MzIxMzM',
  campaignName: 'a31-test',
  // campaignId: 'MzIsdfMzM',
  name: 'Element1',
  description: ''
}).then(result => {
  console.log(result);
});

api.publish({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
});
```

## Read Variants

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-%7Bconfiguration%7D-campaigns-%7Bcampaign-id%7D-elements-%7Belement-id%7D-variants-get.html

```javascript
api.campaigns.variants.get({
  siteName: 'test.com',
  campaignName: 'a31-test',
  elementName: 'renderer',
  // siteId: 'MzIxMzM',
  // campaignId: 'MDA2MjYx',
  // elementId: 'MDMyMDU4'
}).then(variants => {
  console.log(variants);
});
```

## Create Variant

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-elements-%7Belement-id%7D-variants-post.html

```javascript
api.campaigns.variants.create({
  siteName: 'test.com',
  campaignName: 'a31-test',
  elementName: 'renderer',
  // siteId: 'MzIxMzM',
  // campaignId: 'MDA2MjYx',
  // elementId: 'MDMyMDU4',
  name: 'Variant2',
  content: '<span>Search</search>',
  isDefault: false,
  isControl: true,
  weight: 100
}).then(result {
  console.log(result);
});

api.publish({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
});
```

## Update Variant

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-elements-%7Belement-id%7D-variants-%7Bvariant-id%7D-put.html

```javascript
api.campaigns.variants.update({
  siteName: 'test.com',
  campaignName: 'a31-test',
  elementName: 'renderer',
  // siteId: 'MzIxMzM',
  // campaignId: 'MDA2MjYx',
  // elementId: 'MDMyMDU4',
  variantId: 'KHFed4',
  name: 'Variant2',
  content: '<span>Search</search>',
  isDefault: false,
  isControl: true,
  weight: 100
}).then(result {
  console.log(result);
});

api.publish({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
});
```

## Read Scripts

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-%7Bconfiguration%7D-campaigns-%7Bcampaign-id%7D-scripts-get.html

```javascript
api.campaigns.scripts.get({
  siteName: 'test.com',
  campaignName: 'a31-test',
  elementName: 'renderer',
  // siteId: 'MzIxMzM',
  // campaignId: 'MDA2MjYx',
  // elementId: 'MDMyMDU4'
}).then(scripts => {
  console.log(scripts);
});
```

## Create Script

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-%7Bconfiguration%7D-campaigns-%7Bcampaign-id%7D-scripts-post.html

```javascript
api.campaigns.scripts.create({
  siteName: 'test.com',
  campaignName: 'a31-test',
  elementName: 'renderer',
  // siteId: 'MzIxMzM',
  // campaignId: 'MDA2MjYx',
  // elementId: 'MDMyMDU4',
  name: 'renderer',
  description: '',
  content: 'console.log("test")';
}).then(result {
  console.log(result);
});

api.publish({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
});
```

## Update Script

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-scripts-%7Bscript-id%7D-put.html

```javascript
api.campaigns.scripts.update({
  siteName: 'test.com',
  campaignName: 'a31-test',
  elementName: 'renderer',
  // siteId: 'MzIxMzM',
  // campaignId: 'MDA2MjYx',
  // elementId: 'MDMyMDU4',
  scriptId: 'asdfASD3',
  name: 'Rendering',
  description: '',
  content: 'console.log("test")';
}).then(result {
  console.log(result);
});

api.publish({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
});
```

## Read Actions

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-actions-get.html

```javascript
api.campaigns.actions.get({
  siteName: 'test.com',
  campaignName: 'a31-test',
  elementName: 'renderer',
  // siteId: 'MzIxMzM',
  // campaignId: 'MDA2MjYx',
  // elementId: 'MDMyMDU4'
}).then(actions => {
  console.log(actions);
});
```

## Update Action

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-actions-%7Baction-id%7D-put.html

```javascript
api.campaigns.scripts.update({
  siteName: 'test.com',
  campaignName: 'a31-test',
  elementName: 'renderer',
  // siteId: 'MzIxMzM',
  // campaignId: 'MDA2MjYx',
  // elementId: 'MDMyMDU4',
  actionsId: 'NDMyNDMy',
  name: 'Action1',
  description: 'My first action',
  type: 'ClickCounts',
  isPrimary: 'true'
}).then(result {
  console.log(result);
});

api.publish({
  siteId: 'MzIxMzM',
  // siteName: 'test.com'
});
```

# Publishing

Every time you create/update Site or Campaign object using the [Oracle Maxymiser REST API](http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/index.html) the data is only being stored in the database. To apply the data to the Sandbox you need to make a **publish** request in addition.

> http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-publish-put.html

```javascript
api.publish({
  siteName: 'test.com'
  // siteId: 'MzIxMzM'
})
.then(() => {
  console.log('Published!');
})
```
