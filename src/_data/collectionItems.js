const { AssetCache } = require('@11ty/eleventy-fetch');
const ZoteroFetch = require('../../lib/zotero');

async function getCollection(key, results = []) {
  const url = `/collections/${key}/items?sort=dateAdded&limit=100&start=${results.length}`;

  const data = await ZoteroFetch(url);

  const updatedResults = results.concat(data.body);

  const totalResults = data.headers['total-results'];

  if (updatedResults.length < totalResults) {
    return getCollection(key, updatedResults);
  }

  return updatedResults;
}

function parseData(data) {
  let cache = new AssetCache('parsed_data');

  if (cache.isCacheValid('1w')) {
    return cache.getCachedValue();
  }

  const dataMap = new Map();
  const childMap = new Map();

  // Place item data into a Map for quick reference. Separate out attachments
  // from top-level items.
  data.forEach((item) => {
    if (item.data.parentItem) {
      if (!childMap.has(item.data.parentItem)) {
        childMap.set(item.data.parentItem, []);
      }

      childMap.get(item.data.parentItem).push(item);
    } else {
      dataMap.set(item.key, item);
    }
  });

  childMap.forEach((value, key) => {
    if (dataMap.has(key)) {
      dataMap.get(key)['children'] = value;
    }
  });

  const items = Array.from(dataMap.values());

  cache.save(items, 'json');

  return items;
}

module.exports = async function () {
  const collectionItems = await getCollection(
    process.env.ZOTERO_COLLECTION_KEY
  );

  return parseData(collectionItems);
};
