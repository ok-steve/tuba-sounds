const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const EleventyNavigation = require('@11ty/eleventy-navigation');

require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyNavigation);

  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');
  eleventyConfig.addPassthroughCopy('./public');
  eleventyConfig.addPassthroughCopy('./src/sw.js');

  eleventyConfig.addCollection('album', (collectionApi) =>
    collectionApi.getFilteredByGlob('src/album/*.{md,11ty.js}')
  );

  ['embed', 'image'].forEach((key) =>
    eleventyConfig.addShortcode(key, require(`./lib/shortcodes/${key}`))
  );

  return {
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts',
    },
  };
};
