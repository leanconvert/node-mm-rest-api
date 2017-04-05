module.exports = (basePath, authorize) => {
  const req = require('../util/req')(authorize);
  const util = require('../util/util');
  const elements = require('./elements.js')(basePath, authorize);

  /**
   * Get all variant of the given element
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-%7Bconfiguration%7D-campaigns-%7Bcampaign-id%7D-elements-%7Belement-id%7D-variants-get.html
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   * `campaignId` (optional if `campaignName` provided) - ID of the campaign to be fetched
   * `campaignName` (optional if `campaignId` provided) - name of the campaign to be fetched
   * `elementId` (optional if `elementName` provided) - ID of the element to be fetched
   * `elementName` (optional if `elementId` provided) - name of the element to be fetched
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const get = (options = {}) => {
    var {siteId, siteName, campaignId, campaignName, elementId, elementName} = options;

    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!campaignId && !campaignName) {
      return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
    }

    if (!elementId && !elementName) {
      return Promise.reject({ error: '`elementId` or `elementName` must be provided!' });
    }

    return elements.get({siteId, siteName, campaignId, campaignName})
      .then(elements => {
        var element = !elementId ?
          util.getByName(elements, elementName) :
          util.getById(elements, elementId);

        return req.get(
          `${basePath}/sites/${element.siteId}/sandbox/campaigns/${element.campaignId}/elements/${element.id}/variants`,
          {siteId: element.siteId, campaignId: element.campaignId, elementId: element.id}
        );
      });
  };


  /**
   * Create variant
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-elements-%7Belement-id%7D-variants-post.html
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   * `campaignId` (optional if `campaignName` provided) - ID of the campaign to be fetched
   * `campaignName` (optional if `campaignId` provided) - name of the campaign to be fetched
   * `elementId` (optional if `elementName` provided) - ID of the element to be fetched
   * `elementName` (optional if `elementId` provided) - name of the element to be fetched
   *
   * `name` (required) - campaign name
   * `content` (required) - campaign script content
   * `isDefault`
   * `isControl`
   * `weight`
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const create = (options = {}) => {
    var {
      siteId, siteName, campaignId, campaignName, elementId, elementName,
      name,
      content = '',
      isDefault = false,
      isControl = false,
      weight = 100
    } = options;

    var data = { name, content, isDefault, isControl, weight };

    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!campaignId && !campaignName) {
      return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
    }

    if (!data.name) {
      return Promise.reject({ error: '`name` must be provided!' });
    }

    return elements.get({siteId, siteName, campaignId, campaignName})
      .then(elements => {
        var element = !elementId ?
          util.getByName(elements, elementName) :
          util.getById(elements, elementId);

        return req.post(
          `${basePath}/sites/${element.siteId}/sandbox/campaigns/${element.campaignId}/elements/${element.id}/variants`,
          data
        );
      });
  };

  /**
   * Update Variant by ID/Name
   *
   * http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCGF/op-sites-%7Bsite-id%7D-sandbox-campaigns-%7Bcampaign-id%7D-elements-%7Belement-id%7D-variants-%7Bvariant-id%7D-put.html
   *
   * Possible options:
   * -----------------
   * `siteId` (optional if `siteName` provided) - ID of the site to be fetched
   * `siteName` (optional if `siteId` provided) - name of the site to be fetched
   * `campaignId` (optional if `campaignName` provided) - ID of the campaign to be fetched
   * `campaignName` (optional if `campaignId` provided) - name of the campaign to be fetched
   * `elementId` (optional if `elementName` provided) - ID of the element to be fetched
   * `elementName` (optional if `elementId` provided) - name of the element to be fetched
   *
   * `name` (required) - campaign name
   * `content` (required) - campaign script content
   * `isDefault`
   * `isControl`
   * `weight`
   *
   * @param  {Object} options
   * @return {Promise}
   */
  const update = (options = {}) => {
    var {
      siteId,
      siteName,
      campaignId,
      campaignName,
      elementId,
      elementName,
      variantId,
      variantName,
      name,
      content,
      isDefault,
      isControl,
      weight
    } = options;

    var data = util.getUpdatedData(options);

    if (!siteId && !siteName) {
      return Promise.reject({ error: '`siteId` or `siteName` must be provided!' });
    }

    if (!campaignId && !campaignName) {
      return Promise.reject({ error: '`campaignId` or `campaignName` must be provided!' });
    }

    if (!elementId && !elementName) {
      return Promise.reject({ error: '`elementId` or `elementName` must be provided!' });
    }

    if (!variantId && !variantName) {
      return Promise.reject({ error: '`variantId` or `variantName` must be provided!' });
    }

    return elements.get({siteId, siteName, campaignId, campaignName})
      .then(elements => {
        var element = !elementId ?
          util.getByName(elements, elementName) :
          util.getById(elements, elementId);


        if (!variantId) {
          return get({siteId: element.siteId, campaignId: element.campaignId, elementId: element.id})
            .then(variants => {
              var variant = util.getByName(variants, variantName);

              return req.put(
                `${basePath}/sites/${variant.siteId}/sandbox/campaigns/${variant.campaignId}/elements/${variant.elementId}/variants/${variant.id}`,
                data
              );
            });
        } else {
          return req.put(
            `${basePath}/sites/${element.siteId}/sandbox/campaigns/${element.campaignId}/elements/${element.id}/variants/${variantId}`,
            data
          );
        }
      });
  };

  return {
    get,
    create,
    update
  }
}
