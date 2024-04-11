const { AssetCache } = require("@11ty/eleventy-fetch");
const fetch = require("node-fetch");

function iterToObj(iter) {
  const data = {};

  for (let [key, value] of iter) {
    data[key] = value;
  }

  return data;
}

// Roughly follow the API of EleventyFetch, but save headers.
module.exports = async function (
  url,
  { duration, type = "json", fetchOptions } = {}
) {
  const cache = new AssetCache(url);

  if (cache.isCacheValid(duration)) {
    return cache.getCachedValue();
  }

  const response = await fetch(url, fetchOptions);

  // Assumes the `type` option is 'json'.
  const body = await response.json();

  const headers = iterToObj(response.headers.entries());

  const data = {
    headers,
    body,
  };

  cache.save(data, "json");

  return data;
};
