import album from "./album.js";

const collections = {
  album,
};

export default (config) => {
  Object.entries(collections).forEach((item) => {
    const [name, collection] = item;
    config.addCollection(name, collection);
  });
};
