/**
 * Filter out path options and undefined options
 * @param  {object} options
 * @return {object}
 */
const getUpdatedData = (options) => {
  var pathOptions = [
    'siteId',
    'siteName',
    'scriptId',
    'scriptName',
    'campaignId',
    'campaignName',
    'elementId',
    'elementName'
  ];

  return options.filter(option => {
    return options[option] && !pathOptions.includes(option);
  }).reduce((obj, option) => {
    return obj[option] = options[option], obj;
  }, {});
}

/**
 * Filter items to get one buy given name
 * @param  {array} items
 * @param  {string} name
 * @return {object}
 */
const getByName(items, name) => {
  return items.filter(item => item.name === name)[0]);
}

/**
 * Build script endpoing path
 * @param  {script} basePath
 * @param  {script} siteId
 * @param  {script} scriptId
 * @return {string}
 */
const getScriptPath = (basePath, siteId, scriptId) => {
  return `${basePath}/sites/${site.id}/sandbox/scripts/${script.id}`;
}

module.exports = {
  getUpdatedData,
  getByName,
  getScriptPath
};
