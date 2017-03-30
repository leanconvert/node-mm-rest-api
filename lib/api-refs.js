// --- SITE SETTINGS
mm.sites.get({
  siteId: '',
  siteName: ''
});

mm.sites.scripts.get({
  siteId: '',
  siteName: ''
});

mm.sites.actions.get({
  siteId: '',
  siteName: ''
});

mm.sites.scripts.update({
  siteId: '',
  siteName: '',
  scriptId: '',
  scriptName: '',

  name: '',
  description: '',
  content: ''
});

// --- CAMPAIGN SETTINGS
// campaigns
mm.campaigns.get({
  siteId: '',
  siteName: '',
  campaignId: '',
  campaignName: ''
});

mm.campaigns.create({
  siteId: '',
  siteName: '',

  name: 'a3-test',
  description: 'a3-test description'
});

// elements
mm.elements.create({
  siteId: '',
  siteName: '',
  campaignId: '',
  campaignName: ''
})

mm.elements.create({
  siteId: '',
  siteName: '',
  campaignId: '',
  campaignName: '',

  name: '',
  description: ''
});

// variants
mm.variants.get({
  siteId: '',
  siteName: '',
  campaignId: '',
  campaignName: '',
  elementId: '',
  elementName: ''
});

mm.variants.create({
  siteId: '',
  siteName: '',
  campaignId: '',
  campaignName: '',
  elementId: '',
  elementName: '',

  name: '',
  description: '',
  name: '',
  content: '',
  isControl: '',
  weight: ''
});

mm.variants.update({
  siteId: '',
  siteName: '',
  campaignId: '',
  campaignName: '',
  elementId: '',
  elementName: '',

  name: '',
  description: '',
  name: '',
  content: '',
  isControl: '',
  weight: ''
});

// scripts
mm.campaigns.scripts.get({
  siteId: '',
  siteName: '',
  campaignId: '',
  campaignName: ''
});

mm.campaigns.scripts.create({
  siteId: '',
  siteName: '',
  campaignId: '',
  campaignName: '',

  name: '',
  content: ''
  description: ''
});

mm.campaigns.scripts.update({
  siteId: '',
  siteName: '',
  campaignId: '',
  campaignName: '',

  name: '',
  content: ''
  description: ''
});

// actions
mm.campaigns.actions.get({
  siteId: '',
  siteName: '',
  campaignId: '',
  campaignName: ''
});
