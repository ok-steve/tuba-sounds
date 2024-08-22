module.exports = function (collectionApi) {
  return collectionApi.getFilteredByGlob("src/album/*.{md,11ty.js}");
};
